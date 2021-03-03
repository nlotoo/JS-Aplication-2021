async function lockedProfile() {

   
    let url = `http://localhost:3030/jsonstore/advanced/profiles`
    let responce = await fetch(url)
    let data = await responce.json()

    console.log(Object.values(data))
    const main = document.getElementById('main')
    main.innerHTML = Object.values(data).map((x, i) => tempanda(x, i + 1)).join("")


    function tempanda(user, index) {
        return `<div class="profile">
    <img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user${index}Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user${index}Locked" value="unlock"><br>
    <hr>
    
    <label>Username</label>
    <input type="text" name="user${index}}Username" value="${user.username}" disabled readonly />
    <div id="${user._id}" style="display:none; >
        <hr>
        <label>Email:</label>
        <input type="email" name="user${index}Email" value="${user.email}" disabled readonly />
        <label>Age:</label>
        <input type="email" name="user${index}Age" value="${user.age}" disabled readonly />
    </div>
    <button>Show more</button>
    </div>`}


    main.addEventListener("click", (e) => {
        if(e.target.tagName !== "BUTTON") {
            return
        }
        const profile = e.target.parentElement
        if(!profile.querySelectorAll("input")[1].checked) {
            return
        }
        const divToShow = profile.querySelector("div")

        divToShow.style.display = e.target.innerHTML ==="Show more" ? "block" : "none"
        e.target.innerHTML = e.target.innerHTML ==="Show more" ? "Hide it" : "Show more"
    })
   

}