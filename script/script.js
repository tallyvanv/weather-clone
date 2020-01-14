(() => {

    let descDayHTML1 = document.getElementById("descDayOne");
    let descDayHTML2 = document.getElementById("descDayTwo");
    let descDayHTML3 = document.getElementById("descDayThree");
    let descDayHTML4 = document.getElementById("descDayFour");
    let descDayHTML5 = document.getElementById("descDayFive");

    let iconDay1 = document.getElementById("iconDayOne");
    let iconDay2 = document.getElementById("iconDayTwo");
    let iconDay3 = document.getElementById("iconDayThree");
    let iconDay4 = document.getElementById("iconDayFour");
    let iconDay5 = document.getElementById("iconDayFive");

    async function getWeather() {

        let tempDay1DOM = document.getElementById("tempDayOne");
        let tempDay2DOM = document.getElementById("tempDayTwo");
        let tempDay3DOM = document.getElementById("tempDayThree");
        let tempDay4DOM = document.getElementById("tempDayFour");
        let tempDay5DOM = document.getElementById("tempDayFive");

        let city = document.getElementById("cityInput").value;
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
            //console.log(dateArray[i]);
            //console.log(lengthFirstDay.length);
        }
        let tempAllDays = [];

        for (let i = 0; i < data.list.length; i++) {
            tempAllDays.push(data.list[i].main.temp);
        }
        //console.log(tempAllDays);

        let tempDay1 = tempAllDays.slice(0, lengthFirstDay.length);
        let tempDay2 = tempAllDays.slice(lengthFirstDay.length, lengthFirstDay.length + 8);
        let tempDay3 = tempAllDays.slice(lengthFirstDay.length + 8, lengthFirstDay.length + 16);
        let tempDay4 = tempAllDays.slice(lengthFirstDay.length + 16, lengthFirstDay.length + 24);
        let tempDay5 = tempAllDays.slice(lengthFirstDay.length + 24, tempAllDays.length);

        console.log(tempDay1, tempDay2, tempDay3, tempDay4, tempDay5)

        function average(array) {
            return Math.round(array.reduce((a, b) => a + b) / array.length);
        }

        let avgTempDay1 = average(tempDay1);
        let avgTempDay2 = average(tempDay2);
        let avgTempDay3 = average(tempDay3);
        let avgTempDay4 = average(tempDay4);
        let avgTempDay5 = average(tempDay5);

        //console.log(avgTempDay1, avgTempDay2, avgTempDay3, avgTempDay4, avgTempDay5);

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
        let iconAllDays = [];


    }
    //data.list[i].weather.description
    //data.list[i].weather.0.icon

    document.getElementById("run").onclick = function() {getWeather()};
})();