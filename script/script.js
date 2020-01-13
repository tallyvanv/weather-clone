(() => {

    async function getWeather() {
        let city = document.getElementById("weatherLocation").value;
        const apiKey = "appid=239a3fc05faa415afe41364be9e3c3f7";
        let path = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&${apiKey}&units=metric`;

        const weather = await fetch(path);
        const data = await weather.json();
        console.log(data);

        document.getElementById("location-timezone").innerHTML= data.city.name;
        document.getElementById("degree1").innerHTML= ;

    }

    document.getElementById("run").onclick = function() {getWeather()};
})();