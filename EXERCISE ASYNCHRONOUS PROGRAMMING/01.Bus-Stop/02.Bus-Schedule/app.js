function solve() {
    let departBTN = document.getElementById('depart');
    let arriveBTN = document.getElementById('arrive');
    let banner = document.querySelector("#info span")

    let stop = {
        next: 'depot'
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/` + stop.next
        const responce = await fetch(url)
        const data = await responce.json()
        
        stop = data
        banner.textContent = `Next stop ${stop.name}`




        departBTN.disabled = true
        arriveBTN.disabled = false
    }

    function arrive() {
        banner.textContent = `Arriving at ${stop.name}`
        departBTN.disabled = false
        arriveBTN.disabled = true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();