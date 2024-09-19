const socket = io()

const clientsTotal = document.getElementById("client-total")

const messageContainer = document.getElementById("message-container")
const nameInput = document.getElementById("name-input")
const messageForm = document.getElementById("message-form")
const messageInput = document.getElementById("message-input")
const messageTone = document.getElementById("")

messageForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    sendMessage()
})


socket.on('clients-total', (data) =>{
    clientsTotal.innerHTML = `Total clients: ${data}`
})

function sendMessage(){
    // console.log(messageInput.value)
    if(messageInput.value ==="")return


    const data = {
        name: nameInput.value,
        message: messageInput,
        dataTime: new Date()
    }
    // console.log(data)
    socket.emit("message", data)
    addMessageToUI(true, data) 
    messageInput.value = ""
}

socket.on("chat-message", (data) => {
    console.log(data)
    addMessageToUI(false, data)

})


function addMessageToUI(isOwnMessage, data){
    const element = `
            <li class="${isOwnMessage ? "message-right" : "message-left"}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
                </p>
            </li>
    `

    messageContainer.innerHTML += element
    scrolToBottom()
}

function scrolToBottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}