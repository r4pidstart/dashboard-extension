// todo
// replace icon to css?
// https://openweathermap.org/weather-conditions

const weatherForm=document.querySelector("#weather");

function paintWeather(data)
{
    console.log(data)
    weatherForm.querySelectorAll(".weatherChild").forEach(item => weatherForm.removeChild(item));

    let img=document.createElement("img");
    img.src="http://openweathermap.org/img/wn/10d@2x.png";
    img.className="weatherChild";

    let spanTemp=document.createElement("span");
    spanTemp.innerText=data.main.temp.toFixed(1)+" °C";
    spanTemp.className="weatherChild";
    let spanCountry=document.createElement("span");
    spanCountry.innerText=data.sys.country;
    spanCountry.className="weatherChild";
    let spanRegion=document.createElement("span");
    spanRegion.innerText=data.name;
    spanRegion.className="weatherChild";

    weatherForm.appendChild(img);
    weatherForm.appendChild(spanTemp);
    weatherForm.appendChild(spanCountry);
    weatherForm.appendChild(spanRegion);
}

function getUserWeather(lat, lon)
{
    const url=`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
    fetch(url).then(res => res.json()).then(paintWeather);
}

function getUserLoca()
{
    navigator.geolocation.watchPosition((pos) => getUserWeather(pos.coords.latitude, pos.coords.longitude));
}

getUserLoca();
setInterval(getUserLoca, 30000);