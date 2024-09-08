/* REMOVED FOR DEMO PURPOSES
let planList = document.getElementById("planList");
let answer;
fetch("/post/AIcall")
.then(response=>response.json())
.then(result => console.log(result));
*/

//creates an event listener on the send button
let sendBtn = document.getElementById(`sendButton`)
if(sendBtn){
    sendBtn.addEventListener("click", function(){
        //gets and resets the sent text
        let sentText = document.getElementById(`typedText`).value
        alert(`Sent text is ${sentText}`)
        document.getElementById(`typedText`).value = "";
        //creates a text node using that text
        let node = document.createTextNode(sentText)
        alert(`The node is ${node}`)
        //creates a div with the right class
        let newDiv = document.createElement("div")
        newDiv.setAttribute("class", "outgoing-chats-msg")
        alert(`new Div is ${newDiv}`)
        //creates a new paragraph and appends the node to it
        let newElement = document.createElement("p")         
        newElement.appendChild(node)
        alert(`new Element is ${newElement}`)
        //appends the p element to the div 
        newDiv.appendChild(newElement)
        //gets the div to append to
        let element = document.getElementById(`outgoingMessageDirectory`)
        alert(`Element is ${element}`)
        //appends the div with the paragraph to the outgoing chat messages div 
        element.appendChild(newDiv)
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