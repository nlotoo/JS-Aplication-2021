function solve() {
    document.querySelector("#submit").addEventListener('click', submitFunc)
    let firstaNameInputElement = document.querySelector("#firstName")
    let lastNameInputElement = document.querySelector("#lastName")
    let FACInputElement = document.querySelector("#facultyNumber")
    let gradeInputElement = document.querySelector("#grade")




    async function submitFunc() {

        if (firstaNameInputElement.value == '' || lastNameInputElement.value == '' ||
            FACInputElement == '' || gradeInputElement == '') {
            return
        }

        let submitData = {
            "firstName": firstaNameInputElement.value,
            "lastName": lastNameInputElement.value,
            "facultyNumber": FACInputElement.value,
            "grade": gradeInputElement.value,
        }

        fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { 'Content-type': 'aplication/json' },
            body: JSON.stringify(submitData)
        })


        document.querySelector("#results > tbody").innerHTML = ''
        ApllyDataBase()
    }



    async function ApllyDataBase() {

        let responce = await fetch('http://localhost:3030/jsonstore/collections/students')
        let data = await responce.json()

        Object.values(data).map((x) => template(x))

        function template(line) {
            let tr = `<tr>
            <th>${line.firstName}</th>
            <th>${line.lastName}</th>
            <th>${line.facultyNumber}</th>
            <th>${line.grade}</th> </tr>`

            document.querySelector("#results > tbody").innerHTML += tr
        }


    } ApllyDataBase();



    let tbody = document.getElementById('tbody>tr')

    console.log(tbody)


}
solve()



