// const { response } = require("express");

var points = [],
    velocity2 = 5, // velocity squared
    canvas = document.getElementById("animation"),
    context = canvas.getContext("2d"),
    baseRadius = 5, // base radius for spheres
    radiusVariation = 2, // max variation in radius
    boundaryX = 550,
    boundaryY = 200,
    numberOfPoints = Math.floor(Math.random() * 30) + 10;

init();

function init() {
  // create points
  for (var i = 0; i < numberOfPoints; i++) {
    createPoint();
  }
  // create connections
  for (var i = 0, l = points.length; i < l; i++) {
    var point = points[i];
    if (i == 0) {
      points[i].buddy = points[points.length - 1];
    } else {
      points[i].buddy = points[i - 1];
    }
  }

  // animate
  animate();
}

function createPoint() {
  var point = {},
      vx2,
      vy2;
  point.x = Math.random() * boundaryX;
  point.y = Math.random() * boundaryY;
  point.radius = baseRadius + Math.random() * radiusVariation; 
  point.vx = (Math.floor(Math.random()) * 2 - 1) * Math.random();
  vx2 = Math.pow(point.vx, 2);
  vy2 = velocity2 - vx2;
  point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
  points.push(point);
}

function resetVelocity(point, axis, dir) {
  var vx, vy;
  if (axis == "x") {
    point.vx = dir * Math.random();
    vx2 = Math.pow(point.vx, 2);
    vy2 = velocity2 - vx2;
    point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
  } else {
    point.vy = dir * Math.random();
    vy2 = Math.pow(point.vy, 2);
    vx2 = velocity2 - vy2;
    point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
  }
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#97badc";
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = "#8ab2d8";
  context.stroke();
}

function draw() {
  for (var i = 0, l = points.length; i < l; i++) {
    var point = points[i];
    point.x += point.vx;
    point.y += point.vy;
    point.radius = baseRadius + Math.random() * radiusVariation; // Update radius with variation
    drawCircle(point.x, point.y, point.radius);
    drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
    if (point.x < 0 + point.radius) {
      resetVelocity(point, "x", 1);
    } else if (point.x > boundaryX - point.radius) {
      resetVelocity(point, "x", -1);
    } else if (point.y < 0 + point.radius) {
      resetVelocity(point, "y", 1);
    } else if (point.y > boundaryY - point.radius) {
      resetVelocity(point, "y", -1);
    }
  }
}

function animate() {
  context.clearRect(0, 0, boundaryX, boundaryY);
  draw();
  requestAnimationFrame(animate);
}
let responses = ["Hello I am your personal Chatbot!"]; 
//creates an event listener on the send button
let sendBtn = document.getElementById(`sendButton`);

if(sendBtn){
    sendBtn.addEventListener("click", function(){
        //gets and resets the sent text
        let sentText = document.getElementById(`typedText`).value;
        responses.push(sentText);
        document.getElementById(`typedText`).value = "";
        //creates a text node using that text
        let node = document.createTextNode(sentText)
        //creates a div with the right class
        let newDiv = document.createElement("div")
        newDiv.setAttribute("class", "outgoing-chats-msg")
        //creates a new paragraph and appends the node to it
        let newElement = document.createElement("p")         
        newElement.appendChild(node)
        //appends the p element to the div 
        newDiv.appendChild(newElement)
        //gets the div to append to
        let element = document.getElementById(`outgoingMessageDirectory`)
        //appends the div with the paragraph to the outgoing chat messages div 
        element.appendChild(newDiv)

        fetch("/post/ChatBotCall", {
          mother: "POST",
          headers: {
            'content-type': "text/plain"
          },
          body: sentText
        }).then(response => response.json())
        .then(result => {
          sendMessageToUser(result);
        });
    })
}

function sendMessageToUser(textToSend){
    //gets the div to append divs to  
    let directory = document.getElementById("messageInbox")
    //creates the textNode with the text needed
    let node = document.createTextNode(textToSend)
    //creates a new div with the right website
    let newDiv = document.createElement("div")
    newDiv.setAttribute("class", "received-msg-inbox")
    //create a new p tag and append the text to it
    let newElement = document.createElement("p")
    newElement.appendChild(node)
    newDiv.appendChild(newElement)
    directory.appendChild(newDiv)
}