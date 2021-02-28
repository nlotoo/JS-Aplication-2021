async function getInfo() {
    const inputBar = document.querySelector("#stopId")
    let id = inputBar.value
    const bustStopName = document.querySelector("#stopName")
    const busNumbers = document.querySelector("#buses")





    let url = `http://localhost:3030/jsonstore/bus/businfo/` + id


    try {
        let responce = await fetch(url)
        let data = await responce.json()
    
        bustStopName.textContent = data.name
        busNumbers.innerHTML = ''
        Object.entries(data.buses).forEach(line => {
            let li = document.createElement('li')
            li.textContent = `Bus ${line[0]} arrives in ${line[1]}`
            busNumbers.appendChild(li)
        });
    } catch (error) {
        document.querySelector("#stopName").textContent = 'Error'
        busNumbers.innerHTML = ''
    }

}