const buttons = {
    "register": document.getElementById("register"),
    "login": document.getElementById("login")
}

buttons.register.addEventListener("click", registerFunc)

function registerFunc(e) {

}

const form = document.querySelectorAll('form')[0].addEventListener('submit', async (event) => {

    event.preventDefault();

    let formData = new FormData(event.target)
    let email = formData.get('email')
    let password = formData.get('password')
    let repass = formData.get('rePass')

    if (email == '' || password == '') {
        return alert('You must filed rows')
    } else if (password != repass) {
        return alert('Passowrd`s must match')
    }


    let responce = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (responce.ok) {
        const data = await responce.json()
    } else {
        const error = await responce.json()
        alert(`${error.message}`)
    }
})

buttons.login.addEventListener("click", async (e) => {
    e.preventDefault()
    let email = document.querySelector("#exercise > div > div > div > div > form:nth-child(5) > label:nth-child(1) > input[type=text]").value
    let password = document.querySelector("#exercise > div > div > div > div > form:nth-child(5) > label:nth-child(2) > input[type=password]").value

    let responce = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // 'X-Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({ email, password })
    })

    if (responce.ok) {
        const data = await responce.json()
        sessionStorage.setItem('token', data.accessToken)
        sessionStorage.setItem('userID', data._id)
        sessionStorage.setItem('email', data.email)


    } else {
        const error = await responce.json()
        alert(`${error.message}`)
    }

    let tokens = sessionStorage.getItem('token')

    if (tokens !== null) {
        loginIn()
    }
})

async function loginIn() {

    let responce = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token')
        },
    })
   window.location.pathname = 'index.html'
  }
