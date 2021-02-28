const API_KEY = 'fb1e044cf479073315777f8f59ca800a';

let weatherData = {};
let xhr = new XMLHttpRequest();

const NuernbergLaengengrad = 49.4741;
const NuernbergBreitengrad = 11.1296;

document.addEventListener('DOMContentLoaded', function() {
    geolocation();
}, false);


function geolocation(){

        navigator.geolocation.getCurrentPosition(setPosition, setDefault);
   
}

function setDefault(){
    getWeather(NuernbergLaengengrad, NuernbergBreitengrad);
}

function setPosition(position){
    let laengengrad = position.coords.latitude;
    let breitengrad = position.coords.longitude;

    console.log(laengengrad + " " + breitengrad);

    getWeather(laengengrad, breitengrad);
}

function getWeather(laengengrad, breitengrad){
        let api = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ laengengrad +'&lon='+ breitengrad +'&units=metric&lang=de&exclude=minutely,hourly,alerts&appid=' + API_KEY;
        
        xhr.open('GET', api);
        xhr.responseType = 'text';
        xhr.send();
        
}

xhr.addEventListener('load', function(){
    if(xhr.status === 200){
        weatherData = JSON.parse(xhr.responseText);
        infos();
    }
}, false)

function infos(){
 
    let zahlTag = 0
    let textBeschreibungCounter = 0;
    let i = 0;
    
    let klasse = document.getElementsByClassName('temp-value');
    let textBeschreibung = document.getElementsByClassName('text-weather');
 
   while(i != klasse.length){
       if(i < 1){
            klasse[0].innerText = Math.round(weatherData.current.temp);
            klasse[1].innerText = Math.round(weatherData.daily[i].temp.min);
            klasse[2].innerText = Math.round(weatherData.daily[i].temp.max);
            textBeschreibung[0].innerText = weatherData.current.weather[0].description;
            i = i + 3;
       } 
       else{
            klasse[i].innerText = Math.round(weatherData.daily[zahlTag].temp.day);
            i++;
            klasse[i].innerText = Math.round(weatherData.daily[zahlTag].temp.min);
            i++;
            klasse[i].innerText = Math.round(weatherData.daily[zahlTag].temp.max);
            i++;
          

            textBeschreibung[textBeschreibungCounter].innerText = weatherData.daily[zahlTag].weather[0].description;

            weatherIcon(weatherData.current.weather[0].id, zahlTag);
       }

       textBeschreibungCounter = textBeschreibungCounter + 3;
       zahlTag++;
   }
   
   
}

function weatherIcon(id, zahlTag){
    console.log("test" + id);
    let namen = [ 'sonneWolken','schneien','regen','hagel'];
    let ergebnis;
    switch(true){
        case id <= 531:
            ergebnis = namen[2];
            break;
        case id <= 622:
            ergebnis = namen[1];
            break;
        case id <= 802:
            ergebnis = namen[0];
            break;
        case id <= 906:
            ergebnis = namen[3];
            break;
    }

    document.getElementsByClassName('weather-svg')[zahlTag].data = "../images/svg/" + ergebnis + ".svg";
}


