function attachEvents() {


    // закачаме си евнт на бутона
    const buttonGetWather = document.querySelector("#submit")
    buttonGetWather.addEventListener('click', getInfo)

    const inputBar = document.getElementById('location')


    async function getInfo(e) {

        //правим си заявките

        let url = `http://localhost:3030/jsonstore/forecaster/locations`
        let responce = await fetch(url)
        let data = await responce.json()
        let codeLocation;

        // претърсваме за масива с лакаците за конкретният инпут
        data.forEach(x => {
            if (x.name === inputBar.value) {
                codeLocation = x.code
            }
        });

        let urlCodeLocationToday = `http://localhost:3030/jsonstore/forecaster/today/` + codeLocation
        let urlCodeLocationUpcomming = `http://localhost:3030/jsonstore/forecaster/upcoming/` + codeLocation
        try {
            let responceToday = await fetch(urlCodeLocationToday)
            let dataToday = await responceToday.json()

            let responceUpcomming = await fetch(urlCodeLocationUpcomming)
            dataUpcoming = await responceUpcomming.json()

            // Today

            let wheaterSymbol = {
                'Sunny': '&#x2600',
                'Partly sunny': '&#x26C5;',
                'Overcast': '&#x2601;',
                'Rain': '&#x2614;',
                'Degrees': '&#176;',
            }
            typeWheater = `${dataToday['forecast'].condition}`


            let divToday = document.createElement('div')
            divToday.classList.add('forecasts')
            let spanSymbol = document.createElement('span')
            spanSymbol.classList = 'condition symbol'
            spanSymbol.innerHTML = wheaterSymbol[typeWheater]
            let spanMain = document.createElement('span')
            spanMain.classList.add('condition')

            console.log(divToday)
            let spanNameOfTheCity = document.createElement('span')
            spanNameOfTheCity.classList.add('forecast-data')
            spanNameOfTheCity.textContent = dataToday['name']
            let spanDegreces = document.createElement('span')
            spanDegreces.classList.add('forecast-data')
            spanDegreces.innerHTML = `${dataToday['forecast'].low}${wheaterSymbol['Degrees']}/${dataToday['forecast'].high}${wheaterSymbol['Degrees']}`
            let spanTypeOfWheter = document.createElement('span')
            spanTypeOfWheter.classList.add('forecast-data')
            spanTypeOfWheter.textContent = typeWheater

            document.querySelector("#current").appendChild(divToday)
            divToday.appendChild(spanSymbol)
            document.querySelector("#current").appendChild(spanMain)

            spanMain.appendChild(spanNameOfTheCity)
            spanMain.appendChild(spanDegreces)
            spanMain.appendChild(spanTypeOfWheter)


            // Upcomming
            document.querySelector("#upcoming > div.forestcast-info")
          
            let div3DaysMain = document.createElement('div')

            div3DaysMain.classList.add('forestcast-info')

            let spanMain1Day = document.createElement('span')
            spanMain1Day.classList.add('upcoming')
            
            let spanSymbol1Day = document.createElement('span')
            spanSymbol1Day.classList.add('symbol')
            spanSymbol1Day.innerHTML = wheaterSymbol[dataUpcoming['forecast'][0].condition]
            let spanDegreces1Day = document.createElement('span')
            spanDegreces1Day.classList.add('forecast-data')
            spanDegreces1Day.innerHTML = `${dataUpcoming['forecast'][0].low}${wheaterSymbol['Degrees']}/${dataUpcoming['forecast'][0].high}${wheaterSymbol['Degrees']}`
            let spanTypeOfWheter1Day = document.createElement('span')
            spanTypeOfWheter1Day.classList.add('forecast-data')
            spanTypeOfWheter1Day.textContent = dataUpcoming['forecast'][0].condition

            spanMain1Day.appendChild(spanSymbol1Day)
            spanMain1Day.appendChild(spanDegreces1Day)
            spanMain1Day.appendChild(spanTypeOfWheter1Day)
            div3DaysMain.appendChild(spanMain1Day)

            let spanMain2Day = document.createElement('span')
            spanMain2Day.classList.add('upcoming')
            let spanSymbol2Day = document.createElement('span')
            spanSymbol2Day.classList.add('symbol')
            spanSymbol2Day.innerHTML = wheaterSymbol[dataUpcoming['forecast'][1].condition]
            let spanDegreces2Day = document.createElement('span')
            spanDegreces2Day.classList.add('forecast-data')
            spanDegreces2Day.innerHTML = `${dataUpcoming['forecast'][1].low}${wheaterSymbol['Degrees']}/${dataUpcoming['forecast'][1].high}${wheaterSymbol['Degrees']}`
            let spanTypeOfWheter2Day = document.createElement('span')
            spanTypeOfWheter2Day.classList.add('forecast-data')
            spanTypeOfWheter2Day.textContent = dataUpcoming['forecast'][1].condition

            spanMain2Day.appendChild(spanSymbol2Day)
            spanMain2Day.appendChild(spanDegreces2Day)
            spanMain2Day.appendChild(spanTypeOfWheter2Day)
            div3DaysMain.appendChild(spanMain2Day)

            let spanMain3Day = document.createElement('span')
            spanMain3Day.classList.add('upcoming')
            let spanSymbol3Day = document.createElement('span')
            spanSymbol3Day.classList.add('symbol')
            spanSymbol3Day.innerHTML = wheaterSymbol[dataUpcoming['forecast'][2].condition]
            let spanDegreces3Day = document.createElement('span')
            spanDegreces3Day.classList.add('forecast-data')
            spanDegreces3Day.innerHTML = `${dataUpcoming['forecast'][2].low}${wheaterSymbol['Degrees']}/${dataUpcoming['forecast'][2].high}${wheaterSymbol['Degrees']}`
            let spanTypeOfWheter3Day = document.createElement('span')
            spanTypeOfWheter3Day.classList.add('forecast-data')
            spanTypeOfWheter3Day.textContent = dataUpcoming['forecast'][2].condition

            spanMain3Day.appendChild(spanSymbol3Day)
            spanMain3Day.appendChild(spanDegreces3Day)
            spanMain3Day.appendChild(spanTypeOfWheter3Day)
            div3DaysMain.appendChild(spanMain3Day)



            document.querySelector("#upcoming").appendChild(div3DaysMain)

            // правим бутона видим
            document.querySelector("#forecast").style.display = 'block'
        } catch (error) {
            document.querySelector("#current > div.forecasts").textContent = 'Error'
            document.querySelector("#current > span").remove()
            document.querySelector("#upcoming > div.forestcast-info").remove()
        }


    }





}

attachEvents();