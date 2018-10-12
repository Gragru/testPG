/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


        // ### My code ###

        var options = {maximumAge: 3000, timeout: 5000,  enableHighAccuracy: true };
        
        navigator.geolocation.watchPosition(onSuccess, onError, options);

        function onSuccess(position) {


            console.log('Coordinates: ' + position.coords.latitude);
            console.log('Timestamp: ' + position.timestamp);

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var positions = new Array(7);
            positions[0] = ["Hemma", 59.322601323663186, 17.990458189619122];
            positions[1] = ["Båtklubben", 59.324022, 17.996582];
            positions[2] = ["Jobbet", 59.309918, 18.021902];
            positions[3] = ["Woken", 59.321466, 17.989168];
            positions[4] = ["Älghorn", 59.408742, 17.733135];

            positions[5] = ["Ingela", 59.322601323663186, 17.990458189619122];
            positions[6] = ["Bilen", 59.322601323663186, 17.990458189619122];





            var lat1 = 59.322601323663186;
            var lon1 = 17.990458189619122;

            var lat2 = 59.324022;
            var lon2 = 17.996582;

            var lat3 = 59.309918;
            var lon3 = 18.021902;

            var lat4 = 59.321466;
            var lon4 = 17.989168;

            var lat5 = 59.408742;
            var lon5 = 17.733135;

            var dist1 = distance(lat, lon, lat1, lon1, "M");
            var dist2 = distance(lat, lon, lat2, lon2, "M");
            var dist3 = distance(lat, lon, lat3, lon3, "M");
            var dist4 = distance(lat, lon, lat4, lon4, "M");
            var dist5 = distance(lat, lon, lat5, lon5, "M");

            var postext = document.getElementById('postext');
            var posdata = document.getElementById('posdata');

            var date = new Date(position.timestamp);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            posdata.innerHTML = "<tr><th>Place</th><th>Distance</th></tr>";
            // for each outer array row
            for (var i = 0 ; i < positions.length; i++) 
            {
                var tr = document.createElement("tr");

                var td = document.createElement("td");
                var txt = document.createTextNode(positions[i][0]);
                td.appendChild(txt);
                tr.appendChild(td);

                var td = document.createElement("td");
                var txt = document.createTextNode(distance(lat, lon, positions[i][1], positions[i][2], "M"));
                td.appendChild(txt);
                tr.appendChild(td);
                posdata.appendChild(tr);
            }

            







            
            // postext.innerHTML = position.coords.latitude + " - " + position.coords.longitude +" - "+ formattedTime + "<br/>" + 
            // " <br/> Hemma: " + dist1 + " m" +
            // " <br/> Båtklubben: " + dist2 + " m" +
            // " <br/> Jobbet: " + dist3 + " m" +
            // " <br/> Woken: " + dist4 + " m" +
            // " <br/> Älghorn: " + dist5 + " m";



        
        }
        function onError(error) {
            console.log('message: ' + error.message);
            console.log ('code: ' + error.code);
        
        }




        function distance(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=="K") { dist = Math.round(dist * 1.609344 * 100)/100; }
            if (unit=="N") { dist = dist * 0.8684 }
            if (unit=="M") { dist = Math.round(dist * 1609.344); }
            
            return dist
        }


        


    }
};
