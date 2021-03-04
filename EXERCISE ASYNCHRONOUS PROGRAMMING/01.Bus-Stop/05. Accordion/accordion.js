async function solution() {



    let url = `http://localhost:3030/jsonstore/advanced/articles/list`
    let responce = await fetch(url)
    let data = await responce.json()
    let main = document.querySelector("#main")

    data.forEach(x => {
        template(x)
    })



    function template(line) {

        main.innerHTML += `<div class="accordion">
    <div class="head">
    <span>${line.title}</span>
    <button class="button" id="${line._id}">More</button>
    </div>
    <div class="extra">
    <p>Scalable Vector Graphics .....</p>
    </div>
    </div>`

    }

    buttons = document.getElementsByTagName('button')

    Array.from(buttons).forEach(x => x.addEventListener('click', extraFunc))

    async function extraFunc(e) {



        let url = `http://localhost:3030/jsonstore/advanced/articles/details/` + e.target.id
        let responce = await fetch(url)
        let data = await responce.json()

        extraDIV = e.target.parentElement.parentElement.getElementsByClassName('extra')[0]

        buttonMore = e.target
        if (buttonMore.textContent == 'More') {
            extraDIV.querySelector('p').textContent = data.content
            buttonMore.textContent = 'Less'
            extraDIV.style.display = 'block'
        } else {
            buttonMore.textContent = 'More'
            extraDIV.style.display = 'none'
        }
    }





} solution();
