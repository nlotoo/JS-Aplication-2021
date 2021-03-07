function attachEvents() {


    let textArea = document.querySelector("#messages")

    fetch("http://localhost:3030/jsonstore/messenger")
        .then(r => r.json())
        .then(data => {

            Object.values(data).forEach((line) => textArea.textContent += `${line.author}: ${line.content} \n`)
        })

    let refreshButton = document.querySelector("#refresh")
    let sendButtonElement = document.querySelector("#submit")
    let nameInputElement = document.querySelector("#author")
    let messageInputElement = document.querySelector("#content")

    refreshButton.addEventListener('click', refreshFunc)
    sendButtonElement.addEventListener("click", submitFunc)

    function submitFunc(e) {

        if (nameInputElement.value == '' || messageInputElement.value == '') {
            return
        }

        let submitDate = {
            "author": nameInputElement.value,
            "content": messageInputElement.value,
        }

        fetch("http://localhost:3030/jsonstore/messenger", {
            method: "post",
            headers: { "Content-type": "aplication/json" },
            body: JSON.stringify(submitDate)
        })

        nameInputElement.value = ''
        messageInputElement.value = ''
    }

    function refreshFunc(e) {
        textArea.textContent = ''
        fetch("http://localhost:3030/jsonstore/messenger")
            .then(r => r.json())
            .then(data => {

                Object.values(data).forEach((line) => textArea.textContent += `${line.author}: ${line.content} \n`)
            })

    }

}

attachEvents();