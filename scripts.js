// map varibles 
var map;
var champ;
var ability;
var calloutState = false;
var abilityFilter = false;

var champs = ['Breach', 'Brimstone', 'Cypher', 'Jett', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Sova', 'Viper'];
var abilities = [
                    ['Aftershock', 'Flashpoint', 'Fault_Line', 'Rolling_Thunder'],
                    ['Incendiary', 'Stim_Beacon', 'Sky_Smoke', 'Orbital_Strike'], 
                    ['Trapwire', 'Cyber_Cage', 'Spycam', 'Neural_Theft'],
                    ['Cloudburst', 'Updraft', 'Tailwind', 'Blade_Storm'],
                    ['Shrouded_Step', 'Paranoia', 'Dark_Cover', 'From_The_Shadow'],
                    ['Blaze', 'Curveball', 'Hot_Hands', 'Run_it_Back'],
                    ['Boom_Bot', 'Blast_Pack', 'Paint_Shells', 'Showstopper'],
                    ['Leer', 'Devour', 'Dismiss', 'Empress'],
                    ['Barrier_Orb', 'Slow_Orb', 'Healing_Orb', 'Resurrection'],
                    ['Shock_Bolt', 'Owl_Drone', 'Recon_Bolt', "Hunter's Fury"],
                    ['Snake_Bite', 'Poison_Cloud', 'Toxic_Screen', "Viper's_Pit"]
                ];

// icon class 
var ValorantIcon = L.Icon.extend({
    options: {
        iconSize:     [24, 24],
        shadowSize:   [0, 0],
        iconAnchor:   [12, 12],
        shadowAnchor: [0, 0],
        popupAnchor:  [0, -12]
    }
});

var LineupIcon = L.Icon.extend({
    options: {
        iconSize:     [8, 8],
        shadowSize:   [0, 0],
        iconAnchor:   [4, 4],
        shadowAnchor: [0, 0],
        popupAnchor:  [0, -4]
    }
});

// change champ function called on button press -> string formatting
function changeChamp(champSelection){

    abilityFilter = false;

    // change current champ variable
    champ = champSelection;

    var champAudio = ["./sfx/champLines/" + champ.ignoreCase + "/" + champ.toLowerCase() + "1.wav", "./sfx/champLines/" + champ.toLowerCase() + "/" + champ.toLowerCase() + "2.wav", "./sfx/champLines/" + champ.toLowerCase() + "/" + champ.toLowerCase() + "3.wav"]

    // 
    champGet = (element) => element == champ

    // ability variables taken from champ array
    ability1 = '"' + abilities[champs.findIndex(champGet)][0] + '"';
    ability2 = '"' + abilities[champs.findIndex(champGet)][1] + '"';
    ability3 = '"' + abilities[champs.findIndex(champGet)][2] + '"';
    ability4 = '"' + abilities[champs.findIndex(champGet)][3] + '"';

    // change champ 
    document.getElementById('agentImg').src = "./img/champIcons/" + champ + "_Icon.webp";
    document.getElementById('agentText').innerText = champ;

    // setup ability dropdown 
    document.getElementById('ability1').innerHTML = "<button href='#' onclick='changeAbility("+ ability1 +")'>" + ability1.replace(/"/g, " ").replace(/_/g, " ") + "</button>"
    document.getElementById('ability2').innerHTML = "<button href='#' onclick='changeAbility("+ ability2 +")'>" + ability2.replace(/"/g, " ").replace(/_/g, " ") + "</button>"
    document.getElementById('ability3').innerHTML = "<button href='#' onclick='changeAbility("+ ability3 +")'>" + ability3.replace(/"/g, " ").replace(/_/g, " ") + "</button>"
    document.getElementById('ability4').innerHTML = "<button href='#' onclick='changeAbility("+ ability4 +")'>" + ability4.replace(/"/g, " ").replace(/_/g, ' ') + "</button>"

    var audio = document.getElementById('audioPlayer')

    audio.src = champAudio[Math.floor(Math.random() * champAudio.length)];

    console.log(audio.src)

    audio.play()

    mainPinGroup.clearLayers();
    childPinGroup.clearLayers();
    loadPins();
}

// change ability function (called when abilities are filtered)
function changeAbility(selectedAbility){

    abilityFilter = true;

    mainPinGroup.clearLayers();

    ability = selectedAbility;

    loadPins();
    childPinGroup.clearLayers();

}

// load pins
function loadPins(){

    for (i = 0 ; i < pins.length; i++){       

        // if correct champ selected, load said champ's pins
        if (abilityFilter){
            if (pins[i][0] == champ && pins[i][1] == ability){

                // new marker -> i|0 -> champ, i|1 -> ability, i|2 -> x, i|3 -> y, i|4 -> pin note/name, i|5 child-pins
                const newMarker = L.marker([pins[i][2], pins[i][3]], {icon: new ValorantIcon({iconUrl: "./img/abilityIcons/" + pins[i][1] +".webp"  })}).addTo(mainPinGroup);
                newMarker.bindPopup("<b> " + pins[i][4] + " </b>");

                // store children pins in constant variable to allow multiple children across multiple pins
                const newMarkerChildren = pins[i][5];

                newMarker.on('click', function (e) {

                    // reset all current child pins so that no other child pins are active
                    childPinGroup.clearLayers();

                    for (i = 0; i < newMarkerChildren.length; i++){
                        
                        // make new child pin
                        const newMarkerChild = L.marker([newMarkerChildren[i][0],newMarkerChildren[i][1]], {icon: new LineupIcon({iconUrl: "./img/abilityIcons/pinImg.png" })}).addTo(childPinGroup);
                        
                        newMarkerChild.bindPopup('<iframe style="border-radius: 3%;" src=' + newMarkerChildren[i][3] + ' width="500" height="315" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>', 
                        {keepInView: false,autoPan: false,closeButton: false,maxWidth: 1000});


                    }

                })
            }

        } else {

            if (pins[i][0] == champ){

                // new marker -> i|0 -> champ, i|1 -> ability, i|2 -> x, i|3 -> y, i|4 -> pin note/name, i|5 child-pins
                const newMarker = L.marker([pins[i][2], pins[i][3]], {icon: new ValorantIcon({iconUrl: "./img/abilityIcons/" + pins[i][1] +".webp"  })}).addTo(mainPinGroup);
                newMarker.bindPopup("<b> " + pins[i][4] + " </b>");

                // store children pins in constant variable to allow multiple children across multiple pins
                const newMarkerChildren = pins[i][5];

                newMarker.on('click', function (e) {

                    // reset all current child pins so that no other child pins are active
                    childPinGroup.clearLayers();

                    for (i = 0; i < newMarkerChildren.length; i++){
                        
                        // make new child pin
                        const newMarkerChild = L.marker([newMarkerChildren[i][0],newMarkerChildren[i][1]], {icon: new LineupIcon({iconUrl: "./img/abilityIcons/pinImg.png" })}).addTo(childPinGroup);
                        
                        newMarkerChild.bindPopup('<iframe style="border-radius: 3%;" src=' + newMarkerChildren[i][3] + ' width="500" height="315" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>', 
                        {keepInView: false,autoPan: false,closeButton: false,maxWidth: 1000});


                    }

                })
            }


        }
    }
}

function calloutEnabler(){
    calloutsImage = document.getElementById('mapImg2');
    if (calloutState == true){
        calloutState = false;
        calloutsImage.className = 'fade-out';
    }
    else {
        calloutState = true;
        calloutsImage.className = 'fade-in';
    }
}

// init leaflet map
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 1
});

// init main + child pin groups allowing to clear them
var mainPinGroup = L.layerGroup().addTo(map);
var childPinGroup = L.layerGroup().addTo(map);

var bounds = [[0,0], [4096,4096]];

// test pin
//var sol = L.marker([ 0, 0 ]).addTo(map);
//sol.bindPopup('<iframe src="https://www.youtube.com/embed/dr1r8zp75XA" width="500" height="315" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>', {keepInView: false,autoPan: false,closeButton: false,maxWidth: 1000}).openPopup();

// load in pins 
loadPins();

map.fitBounds(bounds);

map.on('click', 
function(e){
    if (drawingPins){
        var coord = e.latlng.toString().split(',');
         var lat = coord[0].split('(');
         var lng = coord[1].split(')');

         alert("You clicked the map at LAT: " + lat[1] + " and LONG: " + lng[0]);

         if (document.getElementById("pinType").value == "Child Pin"){
            newMarker = L.marker(e.latlng, {draggable: true, icon: new LineupIcon({iconUrl: "./img/abilityIcons/pinImg.png" })}).addTo(childPinGroup);
         }
         else {
            newMarker = L.marker(e.latlng, {draggable: true, icon: new ValorantIcon({iconUrl: "./img/abilityIcons/" + document.getElementById("abilities").value + ".webp" })}).addTo(mainPinGroup);
        }
         newMarker.on('dragend', function() {
			var coord = String(newMarker.getLatLng()).split(',');
			//console.log(coord);
			var lat = coord[0].split('(');
			//console.log(lat);
			var lng = coord[1].split(')');
			//console.log(lng);
            newMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".");
		});
    }
     });