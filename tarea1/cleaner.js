// MIT License
// Copyright (c) 2020 Luis Espino

//modified by: Walter Santizo

//adding the full states of the environment
const stat = [
  { A: "DIRTY", B: "DIRTY", location: "A", visited: false, state: 1 ,image:'./img/1.png'},
  { A: "DIRTY", B: "DIRTY", location: "B", visited: false, state: 5 ,image:'./img/5.png'},
  { A: "DIRTY", B: "CLEAN", location: "A", visited: false, state: 2 ,image:'./img/2.png'},
  { A: "DIRTY", B: "CLEAN", location: "B", visited: false, state: 6 ,image:'./img/6.png'},
  { A: "CLEAN", B: "DIRTY", location: "A", visited: false, state: 3 ,image:'./img/3.png'},
  { A: "CLEAN", B: "DIRTY", location: "B", visited: false, state: 7 ,image:'./img/7.png'},
  { A: "CLEAN", B: "CLEAN", location: "A", visited: false, state: 4 ,image:'./img/4.png'},
  { A: "CLEAN", B: "CLEAN", location: "B", visited: false, state: 8 ,image:'./img/8.png'}
];

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

// function to get the state that generated the action and mark it as visited
function getCurrentState(states) {
  const currentState = stat.find(s => 
      s.A === states[1] && 
      s.B === states[2] && 
      s.location === states[0]
  );
  //marca el estado como visitado
  if (currentState) currentState.visited = true;
  
  return currentState ? currentState : "Unknown";
}

// check if all states have been visited
function allStatesVisited() {
  return stat.every(s => s.visited);
}

function test(states) {
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);
  var currentState = getCurrentState(states);
  var img = `<img src="${currentState.image}" alt="state ${currentState.state}" style="display: block; margin-top: 10px;">`;
  document.getElementById("log").innerHTML += img.concat("<br>Location: ").concat(location).concat(" | Action: ").concat(action_result).concat(" | Action generated by state: ").concat(currentState.state);

  if (allStatesVisited()) {
    document.getElementById("log").innerHTML += "<br><strong>All states have been visited!</strong>";
    return; // Stop the simulation
  }
    
  if (action_result == "CLEAN") {
      if (location == "A") states[1] = "CLEAN";
      else if (location == "B") states[2] = "CLEAN";
  }
  else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";

  // Guardar el estado anterior antes de aplicar el cambio aleatorio
  var previousA = states[1];
  var previousB = states[2];

  // pick a random state
  var randomState = Math.floor(Math.random() * 8);
  states[1] = stat[randomState].A;
  states[2] = stat[randomState].B;

  // Informar sobre los cambios en A y B
  if (previousA !== states[1]) {
    document.getElementById("log").innerHTML += `<br><strong>A cambió de ${previousA} a ${states[1]} debido al agente externo.</strong>`;
  } else {
    document.getElementById("log").innerHTML += `<br><strong>A permaneció ${states[1]}. No hubo influencia del agente externo.</strong>`;
  }

  if (previousB !== states[2]) {
    document.getElementById("log").innerHTML += `<br><strong>B cambió de ${previousB} a ${states[2]} debido al agente externo.</strong>`;
  } else {
    document.getElementById("log").innerHTML += `<br><strong>B permaneció ${states[2]}. No hubo influencia del agente externo.</strong>`;
  }

  setTimeout(function () { test(states); }, 2000);
}

var states = ["A", "DIRTY", "DIRTY"];

test(states);