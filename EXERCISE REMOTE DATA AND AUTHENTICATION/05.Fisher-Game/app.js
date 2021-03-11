function attachEvents() {
  document.querySelector(".active").addEventListener("click", HomeFunc);
  document
    .querySelector("body > main > aside > button")
    .addEventListener("click", LOAD);



  const elementCatch = document.querySelector("#catches");
  const tokens = sessionStorage.getItem('token')
  const usersID = sessionStorage.getItem('userID')

  const addBTN = document.getElementsByClassName('add')[0]
  addBTN.addEventListener('click', addButonFunc)

  function HomeFunc() { }

  function tempalte(x) {
    let div = `<div class="catch" id ="${x._ownerId}" >
            <label>Angler</label>
            <input type="text" class="angler" value="${x.angler}" />
            <hr>
            <label>Weight</label>
            <input type="number" class="weight" value="${x.weight}" />
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${x.species}" />
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${x.location}" />
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${x.bait}" />
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${x.captureTime}" />
            <hr>
            <button disabled class="update" id= "${x._id}">Update</button>
            <button disabled class="delete" id ="${x._ownerId}">Delete</button>
        </div>`;

    elementCatch.innerHTML += div;
  }
  
  async function LOAD(e) {
    e.preventDefault();
      let responce = await fetch("http://localhost:3030/data/catches");
      let data = await responce.json();
      elementCatch.innerHTML = "";
      data.map((x) => tempalte(x));
      enableDeleteBtn()
      enableUpdate()
      addBTN.disabled = false
    


  }

  if (tokens !== null) {
    let loginChanger = document.getElementById('guest').firstElementChild
    loginChanger.textContent = 'Logout'
    loginChanger.addEventListener('click', e => {
      sessionStorage.clear()
      loginChanger.textContent = 'Login'
      document.querySelector("body > main > aside > button").disabled = false

    })
  }

  function enableDeleteBtn() {
    deleteButonsElement = document.getElementsByClassName('delete')
    Array.from(deleteButonsElement).forEach(x => {
      if (x.parentElement.id == usersID) {
        x.disabled = false
      }
      x.addEventListener('click', DeleteBtn)
    });

  }

  async function DeleteBtn(e) {
    let id = e.target.parentElement.id
    let responce = await fetch("http://localhost:3030/data/catches");
    let data = await responce.json();

    findingIdOfElemenet = data.find((x) => x._ownerId == usersID)
    let deleteID = findingIdOfElemenet._id


    await fetch("http://localhost:3030/data/catches/" + deleteID, {
      method: "delete",
      headers: { "X-Authorization": sessionStorage.getItem("token") }
    })
    e.target.parentElement.remove();
  }

  function enableUpdate() {
    updateButonsElement = document.getElementsByClassName('update')
    Array.from(updateButonsElement).forEach(x => {
      if (x.parentElement.id == usersID) {
        x.disabled = false
      }
      x.addEventListener('click', updateButton)
    });

  }

  async function updateButton(e) {
    items = e.target.parentElement.getElementsByTagName('input')


    let updateItem = {
      'angler': items[0].value,
      'weight': Number(items[1].value),
      'species': items[2].value,
      'location': items[3].value,
      'bazit': items[4].value,
      'captureTime': Number(items[5].value),
    }

    let id = e.target.id // възможно е да не правилното ИД

    let responce = await fetch('http://localhost:3030/data/catches/' + id, {
      method: 'PUT',
      headers: { "X-Authorization": sessionStorage.getItem("token") },
      body: JSON.stringify(updateItem)

    })

    let data = await responce.json()

    // console.log(data)


    //findingIdOfElemenet = data.find((x) => x._ownerId == usersID)






    updateInfo = {

    }

    // let responce = await fetch('http://localhost:3030/data/catches', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updateInfo)

    // })


  }

  async function addButonFunc(e) {
    let addForm = document.getElementById('addForm').getElementsByTagName('input')

    if (addForm[0].value == '' || addForm[2].value == "" || addForm[3].value == "" || addForm[4].value == "") {
      return alert('You must fill in all fields')
    } else if (!Number(addForm[1].value) || !Number(addForm[5].value)) {
      return alert('you must fill in fields with numbers')
    }

    let objectADD = {
      'angler': addForm[0].value,
      'weight': Number(addForm[1].value),
      'species': addForm[2].value,
      'location': addForm[3].value,
      'bazit': addForm[4].value,
      'captureTime': Number(addForm[5].value),
    }

    let responce = await fetch("http://localhost:3030/data/catches", {
      method: 'POST',
      headers: { "X-Authorization": sessionStorage.getItem("token") },
      body: JSON.stringify(objectADD)
    })


    console.log(objectADD)
  }


}

attachEvents();



