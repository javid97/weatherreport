let input = document.querySelector('.search');
let btn = document.querySelector('.fa-search');
let locationName = document.querySelector('.locationName');
let longLat = document.querySelector('.longLat');
let temperature = document.querySelector('.temperature');
let tempStatus = document.querySelector('.tempStatus');
let feelsLike = document.querySelector('.feelsLike');
let windSpeed = document.querySelector('.windSpeed');
let humidity = document.querySelector('.humidity');
let visibility = document.querySelector('.visibility');
let weatherCondition = document.getElementById('weatherCondition');
let sun = document.querySelector('.sun');
let mainHeading = document.querySelector('.mainHeading');
let mainPara = document.querySelector('.mainPara');
let locationIcon = document.querySelector('.locationIcon');
let rainDrop = weatherCondition.getElementsByClassName('rainDrop');
let snowFlake = weatherCondition.getElementsByClassName('snowFlake');
let emptyInput = document.querySelector('.emptyInput');

// Fetching Data using fetch function
const fetchData = () => {
    if (input.value !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=df401346306992b0bafdda5b176a1970&units=metric`)
            .then(res => res.json())
            .then(data => {
                displayData(data);
            })
            .catch(err => {
                error(err);
            });
    }
}
//Defining data to be displayed on the basis of weather
const displayData = (data) => {
    //Setting background on the basis of weather conditon
    if (data.weather[0].main == 'Rain') {
        rain();
    } else if (data.weather[0].main == 'Snow') {
        snow()
    } else if (data.weather[0].main == 'Clear') {
        Clear()
    } else if (data.weather[0].main == 'Smoke' || data.weather[0].main == 'Haze') {
        smoke()
    } else {
        clouds()
    }
    //Displaying the data
    locationIcon.style.display = 'inline-block';
    locationName.innerHTML = data.name + ", " + data.sys.country;
    longLat.innerHTML = `Lat: ${data.coord.lat} - Long: ${data.coord.lon}`
    temperature.innerHTML = Math.trunc(data.main.temp) + "&deg;C";
    tempStatus.innerHTML = `${data.weather[0].description}`;
    feelsLike.innerHTML = `feels like: ${Math.trunc(data.main.feels_like)}&deg;C`;
    windSpeed.innerHTML = `wind speed: ${data.wind.speed}mps`;
    humidity.innerHTML = `humidity: ${data.main.humidity}%`;
    visibility.innerHTML = `visibility: ${data.visibility / 1000}km`;
}

//Defining Snow Condition
const snow = () => {
    weatherCondition.style.background = '#ccc';
    mainHeading.style.display = 'none';
    mainPara.style.display = 'none';
    sun.style.display = 'none';
    //hiding rainDrops
    if (rainDrop.length !== 0) {
        for (let i = 0; i <= rainDrop.length; i++) {
            rainDrop[i].style.display = 'none';
        }
    }
    //Creating snowFlakes when they don't exist
    if (snowFlake.length == 0) {
        for (let i = 0; i <= 300; i++) {
            let snowFlakes = document.createElement("i");
            snowFlakes.className = "snowFlake";
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            let height = Math.random() * 10;
            let width = Math.random() * 10;
            let duration = Math.random() * 5;
            snowFlakes.style.height = height + "px";
            snowFlakes.style.width = width + "px";
            snowFlakes.style.top = y + "px";
            snowFlakes.style.left = x + "px";
            snowFlakes.style.animationDuration = duration + "s";
            weatherCondition.appendChild(snowFlakes);
        }
    }
}
//Defining Rain Conditon
const rain = () => {
    weatherCondition.style.background = 'rgb(158, 196, 204)';
    mainHeading.style.display = 'none';
    mainPara.style.display = 'none';
    sun.style.display = 'none';
    //Hiding SnowFlakes
    if (snowFlake.length !== 0) {
        for (let i = 0; i <= snowFlake.length; i++) {
            snowFlake[i].style.display = 'none';
        }
    }
    //Creating Rain Drops when they don't exist
    if (rainDrop.length == 0) {
        for (let i = 0; i <= 300; i++) {
            let rainDrops = document.createElement("i");
            rainDrops.className = "rainDrop";
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight - 700;
            let height = Math.random() * 50;
            let width = Math.random() * 3;
            let delay = Math.random() * 2;
            rainDrops.style.height = height + "px";
            rainDrops.style.width = width + "px";
            rainDrops.style.top = y + "px";
            rainDrops.style.left = x + "px";
            rainDrops.style.animationDelay = delay + "s";
            weatherCondition.appendChild(rainDrops);

        }
    }
}

//Defining Clouds Condition
const clouds = () => {
    //hiding rain drops and snowFlakes
    let drops = weatherCondition.getElementsByTagName('i').length;
    if (drops !== 0) {
        for (let i = 0; i <= snowFlake.length; i++) {
            drops[i].style.display = 'none';
        }
    }
    //hiding the main heading and paragraph
    mainHeading.style.display = 'none';
    mainPara.style.display = 'none';
    sun.style.display = 'block';
    weatherCondition.style.background = 'rgb(117, 119, 247)';
}

//Defining Smoke Condition
const smoke = () => {
    //hiding rain drops and snowFlakes
    let drops = weatherCondition.getElementsByTagName('i').length;
    if (drops !== 0) {
        for (let i = 0; i <= snowFlake.length; i++) {
            drops[i].style.display = 'none';
        }
    }
    //hiding the main heading and paragraph
    mainHeading.style.display = 'none';
    mainPara.style.display = 'none';
    sun.style.display = 'block';
    weatherCondition.style.background = 'linear-gradient(rgb(117, 119, 247),#ddd)';
}

// Defining Clear Condition when the weather is Clear
const Clear = () => {
    //hiding rain drops and snowFlakes
    let drops = weatherCondition.getElementsByTagName('i').length;
    if (drops !== 0) {
        for (let i = 0; i <= snowFlake.length; i++) {
            drops[i].style.display = 'none';
        }
    }
    //hiding the main heading and paragraph
    mainHeading.style.display = 'none';
    mainPara.style.display = 'none';
    sun.style.display = 'block';
    weatherCondition.style.background = 'rgb(117, 119, 247)';
    let cloud1 = document.querySelector('.cloud1');
    let cloud2 = document.querySelector('.cloud2');
    let cloud3 = document.querySelector('.cloud3');
    //cloud1.style.display = 'none';
    cloud2.style.display = 'none';
    cloud3.style.display = 'none';
}
const  error =(err) => {
    mainHeading.style.display = 'block';
    mainPara.style.display = 'block';
    let drops = weatherCondition.getElementsByTagName('i').length;
    if (drops !== 0) {
        for (let i = 0; i <= snowFlake.length; i++) {
            drops[i].style.display = 'none';
        }
    }
    locationIcon.style.display = '';
    locationName.innerHTML = '';
    longLat.innerHTML = ``;
    temperature.innerHTML = '';
    tempStatus.innerHTML = ``;
    feelsLike.innerHTML = ``;
    windSpeed.innerHTML = ``;
    humidity.innerHTML = ``;
    visibility.innerHTML = ``;
    mainHeading.innerHTML = `<label style = "color: #f33">!City not found</label>`;
    mainPara.innerHTML = `<label style = "color: #f33">Please Make sure you spelled correctly</label>`;
}

//loads data when the user press the enter key
input.addEventListener('keyup', () => {
    if(event.keyCode === 13){
        if(input.value == ''){
            emptyInput.className = "emptyInput showEmptyMessage";
            setTimeout(() => {
                emptyInput.className = "emptyInput";
            },2000);
        }else{fetchData();}
        
    }
});
// Loads data when the user clicks the search button
btn.addEventListener('click', () => {
    if(input.value == ''){
        emptyInput.className = "emptyInput showEmptyMessage";
        setTimeout(() => {
            emptyInput.className = "emptyInput";
        },2000);
    }else{fetchData();}
});