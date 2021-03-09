function solution() {


    document.querySelector("#loadBooks").addEventListener('click', loandBooks)
    document.querySelector("body > form > button").addEventListener('click', submitFunc)

    let listBookElement = document.querySelector("body > table > tbody")
    let inputTitleElement = document.querySelector("#title")
    let inputAuthorElement = document.querySelector("#author")

    function hungOnButtons() {
        document.querySelector("body > table > tbody").querySelectorAll('button').forEach((typeButton, i) => {
            if (i % 2 !== 0) {
                typeButton.addEventListener('click', DeleteFunc)
            } else {
                typeButton.addEventListener('click', EditFunc)
            }

        })
    } hungOnButtons();


    async function loandBooks() {
        let responce = await fetch(`http://localhost:3030/jsonstore/collections/books`)
        let data = await responce.json()
        document.querySelector("body > table > tbody").innerHTML = ''
        //document.querySelector("body > table > tbody").innerHTML = ''
        Object.values(data).forEach((line, index) => {
            if (index % 2 == 0) {
                template(line)
            } else {
                template2(line)
            }

        })
        hungOnButtons();
    }

    async function DeleteFunc(e) {

        let td = e.target.parentElement.parentElement
        let responce = await fetch(`http://localhost:3030/jsonstore/collections/books/`)
        let data = await responce.json()

        return Object.entries(data).find(x => {
            if (x[1].title == td.children[0].textContent) {
                fetch('http://localhost:3030/jsonstore/collections/books/' + x[0], {
                    method: 'delete',
                })
                e.target.parentElement.parentElement.remove();

            }

        })

    }


    async function EditFunc(e) {

        let td = e.target.parentElement.parentElement
        el1 = td.children[0].textContent
        el2 = td.children[1].textContent

        templateForm(el1, el2)



        document.getElementById("put").addEventListener('click', async e => {
            e.preventDefault();
            let authorInput = document.querySelector("#author")
            let titleInput = document.querySelector("#title")
            let editData = {
                "author": authorInput.value,
                "title": titleInput.value
            }



            let responce = await fetch(`http://localhost:3030/jsonstore/collections/books/`)
            let data = await responce.json()

            return Object.entries(data).find(x => {
                if (x[1].title == td.children[0].textContent) {
                    fetch('http://localhost:3030/jsonstore/collections/books/' + x[0], {
                        method: 'put',
                        headers: { 'Content-type': 'aplciation/json' },
                        body: JSON.stringify(editData)
                    })
                    document.querySelector("#author").value = ""
                    titleInput.value = ""

                }

            })
        })




    }
    function templateForm(el1, el2) {
        let form = `<h3>Edit FORM</h3>
        <label>TITLE</label>
        <input type="title" id="title" placeholder="Title..." value = "${el1}">
        <label>AUTHOR</label>
        <input type="title" id="author" placeholder="Author..." value = "${el2}">
        <button id ="put">Submit</button>
        <button id ="cancel">Cancel</button>`

        document.querySelector("body > form").innerHTML = form
        document.querySelector("#cancel").addEventListener('click', CancelFunc)
    }
    function CancelFunc(e) {
        let form = `<h3>FORM</h3>
        <label>TITLE</label>
        <input type="title" id="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="title" id="author" placeholder="Author...">
        <button id ="put">Submit</button>
        `

        document.querySelector("body > form").innerHTML = form
    }
    function template(line) {
        let tr;
        tr = `<tr>
        <td>${line.title}</td>
        <td>${line.author}</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>
    </tr>`
        listBookElement.innerHTML += tr
    }

    function template2(line) {
        tr = `<tr>
        <td>${line.title}</td>
        <td>${line.author}</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>
    </tr>`



        listBookElement.innerHTML += tr

    }

    async function submitFunc(e) {


        if (document.querySelector("h3").textContent == 'FORM') {
            e.preventDefault();
            let submitData = {
                "author": inputAuthorElement.value,
                "title": inputTitleElement.value
            }

            fetch('http://localhost:3030/jsonstore/collections/books', {
                method: 'post',
                headers: { 'Content-type': 'aplication/json()' },
                body: JSON.stringify(submitData)

            })

            inputAuthorElement.value = ''
            inputTitleElement.value = ''
        } else {

        }


    }

}
solution();