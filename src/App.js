import "./App.css";
import { useState, useEffect } from "react";
import Weather from "./components/Weather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

function App() {
    const [weather, setWeather] = useState();
    const [hours, setHours] = useState();
    const [windDirection, setWindDirection] = useState();
    const [temperature, setTemperature] = useState([]);
    const [precipitation, setPrecipitation] = useState([]);
    const [weatherCode, setWeatherCode] = useState([]);

    const [weatherBC, setWeatherBC] = useState();
    const [hoursBC, setHoursBC] = useState();
    const [windDirectionBC, setWindDirectionBC] = useState();
    const [temperatureBC, setTemperatureBC] = useState([]);
    const [precipitationBC, setPrecipitationBC] = useState([]);
    const [weatherCodeBC, setWeatherCodeBC] = useState([]);

    useEffect(() => {
        const windDirect = [
            { 0: "N", 12.25: "NNE" },
            { 12: "NNE", 33.25: "NE" },
            { 33: "NE", 56.25: "ENE" },
            { 56: "ENE", 78.25: "E" },
            { 78: "E", 102.25: "ESE" },
            { 102: "ESE", 124.25: "SE" },
            { 124: "SE", 147.25: "SSE" },
            { 147: "SSE", 169.25: "S" },
            { 169: "S", 192.25: "SSW" },
            { 192: "SSW", 214.25: "SW" },
            { 214: "SW", 236.25: "WSW" },
            { 236: "WSW", 259.25: "W" },
            { 259: "W", 282.25: "WNW" },
            { 282: "WNW", 304.25: "NW" },
            { 304: "NW", 327.25: "NNW" },
            { 327: "NNW", 349.25: "N" },
            { 349: "N", 360: "N" },
        ];
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=50.4422&longitude=30.5367&hourly=temperature_2m,precipitation&current_weather=true&timezone=Europe%2FMoscow"
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setWeather(data);
                setHours(data.hourly.time);
                setTemperature(data.hourly.temperature_2m);
                setPrecipitation(data.hourly.precipitation);
                setWindDirection(data.current_weather.winddirection);
                setWeatherCode(data.current_weather.weathercode);
            });
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=49.80&longitude=30.05&hourly=temperature_2m,precipitation&current_weather=true&timezone=Europe%2FMoscow"
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setWeatherBC(data);
                setHoursBC(data.hourly.time);
                setTemperatureBC(data.hourly.temperature_2m);
                setPrecipitationBC(data.hourly.precipitation);
                setWindDirectionBC(data.current_weather.winddirection);
                setWeatherCodeBC(data.current_weather.weathercode);
            });
    }, []);
    return (
        <>
            {weather ? (
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Weather
                            weather={weatherBC}
                            hours={hoursBC}
                            temperature={temperatureBC}
                            precipitation={precipitationBC}
                            windDirection={windDirectionBC}
                            weatherCode={weatherCodeBC}
                            city={"Bila Tserkva"}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Weather
                            weather={weather}
                            hours={hours}
                            temperature={temperature}
                            precipitation={precipitation}
                            windDirection={windDirection}
                            weatherCode={weatherCode}
                            city={"Kiev"}
                        />
                    </SwiperSlide>
                </Swiper>
            ) : (
                <div style={{ textAlign: "center" }}> Loading Data ....</div>
            )}
        </>
    );
}

export default App;
