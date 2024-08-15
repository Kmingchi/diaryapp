document.addEventListener('DOMContentLoaded', (event) => {
    let socket = new SockJS('/chat');
    let stompClient = Stomp.over(socket);
    let currentUser = ''; // 공백으로 설정된 사용자 닉네임
    let currentChat = 'User1'; // 기본 채팅방 설정
    let map, searchBox, geocoder;
    let selectedLocationMarker = null;
    let lastSelectedLocation = null;
    let markers = [];

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (messageOutput) {
            showMessage(JSON.parse(messageOutput.body));
        });

        // 채팅 페이지 바로 표시 및 초기 채팅방 설정
        document.getElementById("chat-page").style.display = 'flex';
        document.getElementById("chat-header-title").innerText = currentChat;
    });

    window.sendMessage = function() {
        let messageContent = document.getElementById("message-input").value;
        if (messageContent && stompClient && currentChat) {
            let chatMessage = {
                sender: currentUser,
                content: messageContent,
                chat: currentChat
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
            document.getElementById("message-input").value = '';
        }
    };

    window.showMessage = function(message) {
        let chatWindow = document.getElementById("chat-window");
        let messageElement = document.createElement('div');
        messageElement.className = 'message';
        if (message.sender === currentUser) {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
        }
        messageElement.appendChild(document.createTextNode(message.content));
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    window.openChat = function(user) {
        document.getElementById("chat-header-title").innerText = user;
        document.getElementById("chat-window").innerHTML = '';
        currentChat = user;
        // Load previous messages for this user if needed
    };

    window.checkEnter = function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    window.toggleMap = function(event) {
        event.stopPropagation();
        var mapElement = document.getElementById('map');
        var inputElement = document.getElementById('pac-input');
        if (mapElement.style.display === 'none' || mapElement.style.display === '') {
            mapElement.style.display = 'block';
            inputElement.style.display = 'block';
            initMap();
            if (lastSelectedLocation) {
                map.setCenter(lastSelectedLocation);
                if (selectedLocationMarker) {
                    selectedLocationMarker.setPosition(lastSelectedLocation);
                    selectedLocationMarker.setMap(map);
                } else {
                    selectedLocationMarker = new google.maps.Marker({
                        position: lastSelectedLocation,
                        map: map,
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            size: new google.maps.Size(32, 32),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(16, 32),
                            scaledSize: new google.maps.Size(32, 32)
                        }
                    });
                }
            }
        } else {
            mapElement.style.display = 'none';
            inputElement.style.display = 'none';
        }
    };

    function initMap() {
        if (!map) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 37.3595704, lng: 127.105399 },
                zoom: 10
            });
            geocoder = new google.maps.Geocoder();
        }

        var input = document.getElementById('pac-input');
        if (!searchBox) {
            searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = [];

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    var icon = {
                        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        size: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 32),
                        scaledSize: new google.maps.Size(32, 32)
                    };

                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });

            map.addListener('click', function(event) {
                if (selectedLocationMarker) {
                    selectedLocationMarker.setMap(null);
                }

                selectedLocationMarker = new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        size: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 32),
                        scaledSize: new google.maps.Size(32, 32)
                    }
                });

                lastSelectedLocation = event.latLng;

                var lat = event.latLng.lat();
                var lng = event.latLng.lng();

                geocoder.geocode({ 'location': { lat: lat, lng: lng } }, function(results, status) {
                    if (status === 'OK') {
                        if (results[0]) {
                            var placeName = results[0].formatted_address;
                            sendLocationMessage(placeName);
                            hideMap();
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            });
        }
    }

    function sendLocationMessage(placeName) {
        if (placeName && stompClient) {
            let chatMessage = {
                sender: currentUser,
                content: placeName,
                chat: currentChat
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        }
    }

    function hideMap() {
        var mapElement = document.getElementById('map');
        var inputElement = document.getElementById('pac-input');
        mapElement.style.display = 'none';
        inputElement.style.display = 'none';
    }

    document.getElementById('chat-page').addEventListener('click', function(event) {
        if (event.target.id !== 'map' && event.target.id !== 'pac-input') {
            hideMap();
        }
    });

    document.getElementById('map').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.getElementById('pac-input').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
