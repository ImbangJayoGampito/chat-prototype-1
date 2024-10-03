import { addClickFunction, embedFunction, GatherMethod } from './basic_lib.js'
addClickFunction("img", embedFunction, document, GatherMethod.FROM_TAG);

function openChat() {
    let channel = document.getElementById("channel-page");
    let chat_page = document.getElementById("chat-page")
    console.log("meow")
    if (buttonPull === true) {
        chat_page.classList.add("on")
        chat_page.classList.remove("off")
        channel.classList.add("on")
        channel.classList.remove("off")
    }
    else {
        chat_page.classList.remove("on")
        chat_page.classList.add("off")
        channel.classList.remove("on")
        channel.classList.add("off")
    }
    buttonPull = !buttonPull;
}

let buttonPull = true;
let button = document.getElementById("panelShow")
button.onclick = () => { openChat() }
