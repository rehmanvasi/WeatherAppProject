//weather APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card= document.querySelector(".card");
const apikey ="c743432f2ff9ba77252b2e71c90bf3ab"; 

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city =cityInput.value;

    if(city){
        try{

            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter the City");
    }
});

async function getWeatherData(city) {
    
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    
    return await response.json();

}

function displayWeatherInfo(data){

   const {name: city,
          main:{temp,humidity},
          weather:[{description,id}]}= data;

          card.textContent="";
          card.style.display="flex";

          const cityDisplay= document.createElement("h1");
          const tempDisplay= document.createElement("P");
          const humadityDisplay= document.createElement("P");
          const descDisplay= document.createElement("P");
          const weatherEmoji= document.createElement("P");

          cityDisplay.textContent=city;
          tempDisplay.textContent=`${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
          humadityDisplay.textContent=`Humadity: ${humidity}`;
          descDisplay.textContent= description;
          weatherEmoji.textContent=getWeatherEmoji(id);

          
          cityDisplay.classList.add("citydisplay");
          tempDisplay.classList.add("tempDisplay");
          humadityDisplay.classList.add("humidityDisplay");
          descDisplay.classList.add("descDisplay");
          weatherEmoji.classList.add("weatherEmoji");

          card.appendChild(cityDisplay);
          card.appendChild(tempDisplay);
          card.appendChild(humadityDisplay);
          card.appendChild(descDisplay);
          card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true){
         case(weatherId >=200 && weatherId <300):
         return"⛈️";
         case(weatherId >=300 && weatherId <400):
         return"🌧️";
         case(weatherId >=500 && weatherId <600):
         return"🌧️";
         case(weatherId >=600 && weatherId <700):
         return"❄️";
         case(weatherId >=700 && weatherId <800):
         return"🌫️";
         case(weatherId ===800):
         return"🌞";
         case(weatherId >=801 && weatherId <810):
         return"☁️";
         default:
            return"❓";


    }

}

function displayError(message){
     const errprDisplay= document.createElement("p");
     errprDisplay.textContent=message;
     errprDisplay.classList.add("errorDisplay");

     card.textContent="";
     card.style.display="flex";
     card.appendChild(errprDisplay);
}