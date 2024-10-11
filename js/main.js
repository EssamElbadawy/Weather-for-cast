const apiKey = `115adb811a4d48248bf120027242606`;
const baseUrl = `http://api.weatherapi.com/v1/forecast.json`;
const forcastCards = document.querySelector('.forecast-cards')

async function getWeather(location = "cairo") {
    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}&days=3`)
    const data = await response.json(response)
    displayWeatherData(data)
}

getWeather()

function displayWeatherData(data) {
    const days = data.forecast.forecastday
    let cardHTML = ``;
    for (const day of days) {
        let date = new Date(day.date);
        const weekDay = date.toLocaleDateString("en-Us", { weekday: "long" });
        const timeNow = new Date(data.location.localtime)
        const locateTime = timeNow.toLocaleTimeString("en-Us", { hour: "numeric", minute: "numeric" })
        const temp = day.hour[timeNow.getHours()].temp_c;
        cardHTML += `<div class="today forecast-cards col-md-4 rounded-3 p-2 ">
                        <div class="forecast-content rounded-4 " id="current">
                            <div class="forecast-header d-flex justify-content-between rounded-3  p-2" id="today ">
                                <div class="day text-white">${weekDay}</div>
                                <div class=" date text-white"> ${locateTime}</div>
                            </div>
                            <div class="location m-3 text-white"></div>
                            <div class="degree m-3">
                                <div class="num fs-size"><sup>${temp}</sup>C&deg</div>
                                <div class="forecast-icon">
                                    <img src="https://${day.hour[timeNow.getHours()].condition.icon}" alt="" width=" ">
                                </div>
                            </div>
                            <div class="custom text-primary m-3">${data.current.condition.text}</div>
                            <div class="content-today d-flex justify-content-around mt-3 p-3 text-white">
                               <span><img src="https://${day.day.condition.icon}"
                                        class="m-3" alt="" width="21" height="21">20%</span>
                                <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" class="m-3"alt="" width="23" height="21">${day.hour[timeNow.getHours()].vis_km}km/h</span>
                                <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" class="m-3"
                                        alt="" width="21" height="21">East</span>
                            </div>
                        </div>
                    </div>`
    }
    forcastCards.innerHTML = cardHTML
}

$('.searchBox').on('keyup', function (e) {
    if (e.code == "Enter")
        getWeather(this.value)
})