var form = document.querySelector(".hero__form")

function handleForm(event) {
    event.preventDefault()
    let formData = new FormData(event.target).entries()
    for (let input of formData) {
        let inputName = input[0]
        let inputValue = input[1]
        resetValidity(inputName)
        if (isValueEmpty(inputValue)) {
            setErrorMessage(inputName, `Please do not leave ${inputName} empty!`)
            continue
        }
        if (inputName === "email") {
            if (!isEmailValid(inputValue))
                setErrorMessage(inputName, `Please provide a valid ${inputName}`)
            else
                subscribed()
        }
    }
}

function subscribed() {
    let hero = document.querySelector(".hero")
    let subscribedText = hero.querySelector(".hero__subscribed")
    hero.classList.add("subscribed")
    subscribedText.textContent = "You have successfully subscribed!"
}

//set aria-invalid to default/false
function resetValidity(name) {
    let input = form.querySelector(`[name='${name}']`)
    input.setAttribute("aria-invalid", false)
}

//set error message to be displayed
function setErrorMessage(name, message) {
    let input = form.querySelector(`[name='${name}']`)
    let errorMessage = form.querySelector(".form__error")
    input.setAttribute("aria-invalid", true)
    errorMessage.textContent = message
}

//check if input value is empty
function isValueEmpty(value) {
    return value.replace(' ', '').length === 0
}

//check if email is valid/properly formatted
function isEmailValid(email) {
    let regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regexExp.test(email)
}

form.addEventListener("submit", handleForm)