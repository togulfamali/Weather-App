const userlocation = document.getElementById("userlocation"),
converter=document.getElementById("converter"),
weatherIcon=document.querySelector(".weatherIcon"),
tempareture=document.querySelector(".tempareture"),
feelslike=document.querySelector(".feelslike"),
discription=document.querySelector(".discription"),
date=document.querySelector(".date"),
city=document.querySelector(".city"),

HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SValue = document.getElementById("SValue"),
CVValue = document.getElementById("CVValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
Forecast = document.getElementById("Forecast");

WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid=d9fb7c4d6c27124c5495690a011363ab&q=';

const WEATHER_DATA_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?appid=d9fb7c4d6c27124c5495690a011363ab&exclude=minutely&units=metric&";

function findUserLocation() {
    fetch(WEATHER_API_ENDPOINT + userlocation.value)
    .then((response)=>response.json())
    .then((data) => {
        if(data.cod != "" && data.cod !=200) {
            alert(data.message);
            return;
        }
        console.log(data);
        city.innerHTML = data.name + ", " + data.sys.country;
        weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
        fetch(
            WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`
        )
          .then((response)=>response.json())
          .then((data) => {
            console.log(data);

            tempareture.innerHTML = TemConverter(data.main.temp);
            feelslike.innerHTML = "Feels like " + data.main.feels_like;
            discription.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;`+
            data.weather[0].description;
  
            let HValue = document.querySelector(".HValue"); 
            if (HValue) {
                HValue.innerHTML = Math.round(data.main.humidity)+"<span>%</span>";
            }

            let WValue = document.querySelector(".WValue"); 
            if (WValue) {
                WValue.innerHTML = Math.round(data.wind.speed)+"<span>m/s</span>";
            }

            const options1={
                hour:"numeric",
                minute:"numeric",
                hour12: true,
            }

            let SRValue = document.querySelector(".SRValue"); 
            if (SRValue) {
                SRValue.innerHTML = getLongFormateDateTime(data.sys.sunset,data.timezone,options1);
            }

            let SSValue = document.querySelector(".SSValue"); 
            if (SSValue) {
                SSValue.innerHTML ="";
            }

            let CValue = document.querySelector(".CValue"); 
            if (CValue) {
                CValue.innerHTML = data.clouds.all+"<span>%</span>";
            }

            let UVValue = document.querySelector(".UVValue"); 
            if (UVValue) {
                UVValue.innerHTML = data.main.sea_level;
            }

            let PValue = document.querySelector(".PValue"); 
            if (PValue) {
                PValue.innerHTML = data.main.pressure;
            }

        });
    });
}

function formateUnixTime(dtValue ,offSet , _option={}){
    const date = new Date((dtValue+offSet) * 1000);
    return date.toLocaleTimeString([], {timeZone: "UTC", ..._option });
}

function getLongFormateDateTime(dtValue,offSet,_options){
    return formatUnixTime(dtValue, offSet.options);
}

function TemConverter(temp){
    let tempValue=Math.round(temp);
    let message="";
    if (converter.value=="°C"){
        message=tempValue+"<span>"+"\xB0C</span>";
    }
    else{
        let ctof=(tempValue*9)/5+32;
        message = ctof+"<span>"+"\xB0F</span>";
    }
      return message;
}