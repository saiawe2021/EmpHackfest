//creates an event listener on the 
document.getElementById(`sendButton`).addEventListener("click", function(){
    let sentText = document.getElementById(`typedText`).textContent
    document.getElementById(`typedText`).textContent = "";
    let node = document.createTextNode(sentText)
    let newElement = document.createElement("p")
    newElement.appendChild(node)
    let element = document.getElementById(`outgoing-chats-msg`)
    element.appendChild(newElement)


})