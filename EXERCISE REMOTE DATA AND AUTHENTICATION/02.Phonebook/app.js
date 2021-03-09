function attachEvents() {


    let ulMainelement = document.querySelector("#phonebook")
    document.querySelector("#btnCreate").addEventListener('click', CreateButtonFunc)
    document.querySelector("#btnLoad").addEventListener('click', LoandButtonFunc)
    let inputPersonElement = document.querySelector("#person")
    let inputPhoneElement = document.querySelector("#phone")





    fetch('http://localhost:3030/jsonstore/phonebook')
        .then(r => r.json())
        .then(data => {
            Object.values(data).map(line => {

                let li = document.createElement('li')
                li.id = line._id
                li.textContent = `${line.person}: ${line.phone}`
                let deleteButton = document.createElement('button')
                deleteButton.textContent = 'Delete'
                deleteButton.addEventListener('click', DeleteFunct)
                li.appendChild(deleteButton)
                ulMainelement.appendChild(li)

            })
        })

    function DeleteFunct(e) {

        let id = e.target.parentElement.id
        fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete'
        })
        e.target.parentElement.remove()
    }

    function CreateButtonFunc(e) {
        if(inputPersonElement.value == '' || inputPhoneElement.value == ''){
            return
        }

        let incomingDate = {
            "person": inputPersonElement.value,
            "phone": inputPhoneElement.value,
        }

        fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-type': 'aplication/json' },
            body: JSON.stringify(incomingDate)
        })
        inputPersonElement.value = ''
         inputPhoneElement.value = ''

    }

    function LoandButtonFunc(e) {


        fetch('http://localhost:3030/jsonstore/phonebook')
            .then(r => r.json())
            .then(data => {
                ulMainelement.innerHTML = ''
                Object.values(data).map(line => {

                    let li = document.createElement('li')
                    li.id = line._id
                    li.textContent = `${line.person}: ${line.phone}`
                    let deleteButton = document.createElement('button')
                    deleteButton.textContent = 'Delete'
                    deleteButton.addEventListener('click', DeleteFunct)
                    li.appendChild(deleteButton)
                    ulMainelement.appendChild(li)

                })
            })
    }

}

attachEvents();