// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoWeightInput = document.querySelector("input[name=cargoWeight]");
      document.getElementById("pilotStatus").innerHTML = `${pilotNameInput.value} is ready!`;
      document.getElementById("copilotStatus").innerHTML = `${copilotNameInput.value} is ready!`;
      if (fuelLevelInput.value < 10000){
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch`;
         event.preventDefault();
      }
      if (cargoWeightInput.value > 10000){
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerHTML = `Cargo weight too high for launch`;
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch`;
         event.preventDefault();
      }
      if (cargoWeightInput.value <= 10000 && fuelLevelInput.value >= 10000){
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
         document.getElementById("cargoStatus").innerHTML = `Cargo weight low enough for launch`;
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").innerHTML = `Shuttle ready for launch`;
         event.preventDefault();
      }
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoWeightInput.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
      }
      if (typeof pilotNameInput.value !== "string" || typeof copilotNameInput.value !== "string" || isNaN(pilotNameInput.value) === false || isNaN(copilotNameInput.value) === false || isNaN(fuelLevelInput.value) === true || isNaN(cargoWeightInput.value) === true){
         alert("Input is not valid");
         event.preventDefault();
      }
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         // Access the JSON in the response
         response.json().then( function(json) {
            const planet = document.getElementById("missionTarget");
            planet.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[0].name}</li>
                  <li>Diameter: ${json[0].diameter}</li>
                  <li>Star: ${json[0].star}</li>
                  <li>Distance from Earth: ${json[0].distance}</li>
                  <li>Number of Moons: ${json[0].moons}</li>
               </ol>
               <img src="${json[4].image}"></img>
               `
         });
   });
});
});