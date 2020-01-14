(() => {

    async function getWeather() {
        let city = document.getElementById("cityInput").value;
        const apiKey = "appid=239a3fc05faa415afe41364be9e3c3f7";
        let path = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&${apiKey}&units=metric`;

        const weather = await fetch(path);
        const data = await weather.json();
        console.log(data);

        document.getElementById("cityName").innerHTML= data.city.name;
        document.getElementById("").innerHTML= data.list[0].main.temp;

        for (let i = 0; i < data.list.length; i++) {
            const tempAvg = {};
            const date = new Date(data.list[i].dt_txt.split(' ')[0]);
            const minTemp = Math.floor(data.list[i].main.temp_min);
            const maxTemp = Math.floor(data.list[i].main.temp_max);
            if (!tempAvg[date]) {
                tempAvg[date] = {min: minTemp, max: maxTemp};
            }
            if (minTemp < tempAvg[date].min) {
                tempAvg[date].min = minTemp;
            }
            if (maxTemp < tempAvg[date].max) {
                tempAvg[date].max = maxTemp;
            }
            console.log(tempAvg);
            return tempAvg;
        }


    }


    document.getElementById("run").onclick = function() {getWeather()};
})();