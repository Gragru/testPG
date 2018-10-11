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

            var lat1 = position.coords.latitude;
            var lon1 = position.coords.longitude;
            var lat2 = 59.322881;
            var lon2 = 17.990198;

           var dist = distance(lat1, lon1, lat2, lon2, "M");

            var postext = document.getElementById('postext');

            var date = new Date((978307200 + position.timestamp)*1000);
            var date2 = new Date(position.timestamp);


            var hours = date2.getHours();
            var minutes = "0" + date2.getMinutes();
            var seconds = "0" + date2.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);



            postext.innerText = position.coords.latitude + " - " + position.coords.longitude +" - "+ formattedTime + " - " + dist + " meters" ;



        
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
