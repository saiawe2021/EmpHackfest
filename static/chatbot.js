let planList = document.getElementById("planList");
let answer;
fetch("/post/AIcall")
.then(response=>response.json())
.then(result => console.log(result));

//creates an event listener on the send button
document.getElementById(`sendButton`).addEventListener("click", function(){
    //gets and resets the sent text
    let sentText = document.getElementById(`typedText`).innerText
    document.getElementById(`typedText`).innerText = "";
    //creates a text node using that text
    let node = document.createTextNode(sentText)
    //creates a div with the right class
    let newDiv = document.createElement("div")
    newDiv.setAttribute("class", "outgoing-chats-msg")
    //creates a new paragraph and appends the node to it
    let newElement = document.createElement("p")         
    newElement.appendChild(node)
    //gets the div to append to
    let element = document.getElementById(`outgoing-msg`)
    //appends the div with the paragraph to the outgoing chat messages div 
    element.appendChild(newDiv)
})

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