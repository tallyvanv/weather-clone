(() => {

    document.getElementById("run").onclick = function() {getWeather()};

    let descDay1DOM = document.getElementById("description1");
    let descDay2DOM = document.getElementById("description2");
    let descDay3DOM = document.getElementById("description3");
    let descDay4DOM = document.getElementById("description4");
    let descDay5DOM = document.getElementById("description5");

    let iconDay1DOM = document.getElementById("imageOne");
    let iconDay2DOM = document.getElementById("imageTwo");
    let iconDay3DOM = document.getElementById("imageThree");
    let iconDay4DOM = document.getElementById("imageFour");
    let iconDay5DOM = document.getElementById("imageFive");

    let city;

    async function getWeather() {
        city = document.getElementById("cityInput").value;

        let tempDay1DOM = document.getElementById("tempDayOne");
        let tempDay2DOM = document.getElementById("tempDayTwo");
        let tempDay3DOM = document.getElementById("tempDayThree");
        let tempDay4DOM = document.getElementById("tempDayFour");
        let tempDay5DOM = document.getElementById("tempDayFive");


        const apiKey = "appid=239a3fc05faa415afe41364be9e3c3f7";
        let path = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&${apiKey}&units=metric`;

        const weather = await fetch(path);
        const data = await weather.json();
        console.log(data);

        document.getElementById("cityName").innerHTML= data.city.name;
        // document.getElementById("").innerHTML= data.list[0].main.temp;
        let dateString;
        let dateSlice = [];
        let dateArray = [];
        let lengthFirstDay = [];

        for (let i = 0; i < data.list.length; i++) {
            dateString = data.list[i].dt_txt;//isolate the string with the date
            dateSlice.push(dateString.slice(0, 10));//push isolated slice into new array
            //console.log(dateSlice[i]);
            dateArray.push(new Date(dateSlice[i]).getDay());
            if (dateArray[0] === dateArray[i]){//if the date in our new array is the same as first element in array => first day
                lengthFirstDay.push(dateArray[i]);
            }
        }
        let tempAllDays = [];

        for (let i = 0; i < data.list.length; i++) {
            tempAllDays.push(data.list[i].main.temp);
        }

        let tempDay1 = tempAllDays.slice(0, lengthFirstDay.length);
        let tempDay2 = tempAllDays.slice(lengthFirstDay.length, lengthFirstDay.length + 8);
        let tempDay3 = tempAllDays.slice(lengthFirstDay.length + 8, lengthFirstDay.length + 16);
        let tempDay4 = tempAllDays.slice(lengthFirstDay.length + 16, lengthFirstDay.length + 24);
        let tempDay5 = tempAllDays.slice(lengthFirstDay.length + 24, tempAllDays.length);

        function average(array) {
            return Math.round(array.reduce((a, b) => a + b) / array.length);
        }

        let avgTempDay1 = average(tempDay1);
        let avgTempDay2 = average(tempDay2);
        let avgTempDay3 = average(tempDay3);
        let avgTempDay4 = average(tempDay4);
        let avgTempDay5 = average(tempDay5);

        let toDay = new Date();
        let weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        tempDay1DOM.innerHTML = `Today </br> <strong id="tempToday">${avgTempDay1.toString()}°C</strong>`;
        tempDay2DOM.innerHTML = `${weekdays[toDay.getDay()+1]} </br> ${avgTempDay2.toString()}°C`;
        tempDay3DOM.innerHTML = `${weekdays[toDay.getDay()+2]} </br> ${avgTempDay3.toString()}°C`;
        tempDay4DOM.innerHTML = `${weekdays[toDay.getDay()+3]} </br> ${avgTempDay4.toString()}°C`;
        tempDay5DOM.innerHTML = `${weekdays[toDay.getDay()+4]} </br> ${avgTempDay5.toString()}°C`;

        let descAllDays = [];

        for (let i = 0; i < data.list.length; i++) {
            descAllDays.push(data.list[i].weather[0].description);
        }

        let descDay1 = descAllDays.slice(0, lengthFirstDay.length);
        let descDay2 = descAllDays.slice(lengthFirstDay.length, lengthFirstDay.length + 8);
        let descDay3 = descAllDays.slice(lengthFirstDay.length + 8, lengthFirstDay.length + 16);
        let descDay4 = descAllDays.slice(lengthFirstDay.length + 16, lengthFirstDay.length + 24);
        let descDay5 = descAllDays.slice(lengthFirstDay.length + 24, tempAllDays.length);

        let desc1 = getMostFrequent(descDay1);
        let desc2 = getMostFrequent(descDay2);
        let desc3 = getMostFrequent(descDay3);
        let desc4 = getMostFrequent(descDay4);
        let desc5 = getMostFrequent(descDay5);

        //Putting desc in HTML
        descDay1DOM.innerHTML = `<strong> ${desc1.toString()}</strong>`;
        descDay2DOM.innerHTML = `<strong> ${desc2.toString()}</strong>`;
        descDay3DOM.innerHTML = `<strong> ${desc3.toString()}</strong>`;
        descDay4DOM.innerHTML = `<strong> ${desc4.toString()}</strong>`;
        descDay5DOM.innerHTML = `<strong> ${desc5.toString()}</strong>`;

        let iconAllDays = [];

        for (let i = 0; i < data.list.length; i++) {
            iconAllDays.push(data.list[i].weather[0].icon);
        }

        let iconDay1 = iconAllDays.slice(0, lengthFirstDay.length);
        let iconDay2 = iconAllDays.slice(lengthFirstDay.length, lengthFirstDay.length + 8);
        let iconDay3 = iconAllDays.slice(lengthFirstDay.length + 8, lengthFirstDay.length + 16);
        let iconDay4 = iconAllDays.slice(lengthFirstDay.length + 16, lengthFirstDay.length + 24);
        let iconDay5 = iconAllDays.slice(lengthFirstDay.length + 24, tempAllDays.length);

        let icon1 = getMostFrequent(iconDay1);
        let icon2 = getMostFrequent(iconDay2);
        let icon3 = getMostFrequent(iconDay3);
        let icon4 = getMostFrequent(iconDay4);
        let icon5 = getMostFrequent(iconDay5);

        iconDay1DOM.setAttribute("src", `http://openweathermap.org/img/wn/${icon1}.png`);
        iconDay2DOM.setAttribute("src", `http://openweathermap.org/img/wn/${icon2}.png`);
        iconDay3DOM.setAttribute("src", `http://openweathermap.org/img/wn/${icon3}.png`);
        iconDay4DOM.setAttribute("src", `http://openweathermap.org/img/wn/${icon4}.png`);
        iconDay5DOM.setAttribute("src", `http://openweathermap.org/img/wn/${icon5}.png`);

        getPhoto();
    }



   async function getPhoto() {
        let response = await fetch('https://api.unsplash.com/search/photos?query=$'+city+'&client_id=8b3303518e733b03bb9fbe890041915da381de31ef0602ad71dc8adfd4b79f83');
        let data = await response.json();
        let countryImage = data.results[4].urls.regular;
        document.body.style.backgroundImage = `url(${countryImage})`;
    }
})();


function getMostFrequent(arr1) {
    let mf = 1;
    let m = 0;
    let item;
    for (let i=0; i<arr1.length; i++)
    {
        for (let j=i; j<arr1.length; j++)
        {
            if (arr1[i] === arr1[j])
                m++;
            if (mf<m)
            {
                mf=m;
                item = arr1[i];
            }
        }
        m=0;
    }
    return item;
}
