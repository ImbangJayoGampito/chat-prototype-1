
function validateString(input, len) {
    let val = input.value;
    console.log(val.length)
    return val.length > 0;
}
function validateEmail(input) {
    let val = input.value;
    return String(val)
        .toLowerCase()

        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
function setLabel(input) {
    let inputAlmost = Object.keys(invalid_msg).find(key => invalid_msg[key] === input);
    let inputId = Object.keys(invalid_msg).find(key => invalid_msg[key] === inputAlmost)
    console.log(inputAlmost)
    let inputField = document.getElementById(inputAlmost);
    let parent_div = inputField.parentElement;
    let feedback = document.getElementById(inputAlmost + "valid");
    if (feedback === null) {
        feedback = document.createElement('p')
        feedback.id = inputAlmost + "valid";
        feedback.classList.add("incorrectText");
        parent_div.appendChild(feedback);
    }
    return inputField
}
function inputUpdate(inputField, parent_div, feedback, validationFunc, invalidMessage) {
    inputField.addEventListener('input', function (event) {

        if (validationFunc(inputField)
        ) {
            parent_div.classList.remove("invalid");
            feedback.innerHTML = "";
            parent_div.classList.add("valid")
        }
        else {
            parent_div.classList.remove("valid")
            feedback.innerHTML = invalidMessage;
            parent_div.classList.add("invalid")
        }
    })
}
function setValidation(input, eventType) {
    input = invalid_msg[input]
    let inputField = setLabel(input)
    let parent_div = inputField.parentElement
    let feedback = document.getElementById(inputField.id + "valid");
    inputField.addEventListener(eventType, function (event) {

        if (input.func(inputField)
        ) {
            parent_div.classList.remove("invalid");
            feedback.innerHTML = "";
            parent_div.classList.add("valid")
        }
        else {
            parent_div.classList.remove("valid")
            feedback.innerHTML = input.text;
            parent_div.classList.add("invalid")
        }
    })
}
function checkValidation(input) {
    input = invalid_msg[input]
    let inputField = setLabel(input);
    let parent_div = inputField.parentElement
    let feedback = document.getElementById(inputField.id + "valid");
    if (input.func(inputField)
    ) {
        parent_div.classList.remove("invalid");
        feedback.innerHTML = "";
        parent_div.classList.add("valid")
        return true;
    }
    else {
        parent_div.classList.remove("valid")
        feedback.innerHTML = input.text;
        parent_div.classList.add("invalid")
        return false;
    }
}
const invalid_msg = {
    nameInput: {
        text: 'Name can not be empty!',
        func: validateString
    },
    email: {
        text: 'Email is not valid!',
        func: validateEmail
    },
    pesan: {
        text: 'Message can not be empty!',
        func: validateString
    }
}
for (const key in invalid_msg) {
    setValidation(key, 'click')
    setValidation(key, 'input')
}
let form = document.getElementById("contactForm");
form.addEventListener('submit', function (event) {
    let submit = true;
    for (const key in invalid_msg) {
        submit = checkValidation(key);
    }
    if (!submit) {
        event.preventDefault();
    }
});