function loadCommits() {
    let userName = document.querySelector("#username").value
    let repo = document.querySelector("#repo").value

    const url = `https://api.github.com/repos/${userName}/${repo}/commits`

    fetch(url)
        .then(r => r.json())
        .then(r => headError)
        .then(data => {

            document.querySelector("#commits").innerHTML = ''

            data.forEach(ele => {
                let autorName = ele.commit['author']['name']
                let authorMessage = ele.commit['message']
                let li = document.createElement('li')
                li.textContent = `${autorName}: ${authorMessage}`
                document.querySelector("#commits").appendChild(li)
            });
        })
        .catch(err => {
            document.querySelector("#commits").innerHTML += err
        })


}
function headError(r) {
    if (r.status === 404) {
        throw new Error(`Error : ${r.status} ( ${r.statusText} )`)
    }
    return r
}
