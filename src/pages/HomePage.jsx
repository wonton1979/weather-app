import {useEffect, useState} from "react";
import abstractGeolocationApi from "../services/abstractGeolocationApi.js";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/loading-animation.json";
import Header from "../components/Header.jsx";
import openMeteoApi from "../services/openMeteoApi.js";
import getWeatherDescriptionAndEmoji from "../utils/weatherCodesTable.js";
import DetailsCard from "../components/DetailCard.jsx";

export default function HomePage(){
    const [loading, setLoading] = useState(true);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [isCelsius,setIsCelsius] = useState(true);
    const [twelveHoursWeatherSummary, setTwelveHoursWeatherSummary] = useState([]);

    useEffect(() => {
        setLoading(true);
        abstractGeolocationApi().then((response) => {
            setCurrentWeatherData(response);
        }).catch((error) => {
            console.log(error);
        }).finally(
            () => setLoading(false)
        )

    },[]);

    useEffect(() => {

        if(!currentWeatherData?.latitude || !currentWeatherData.longitude) return;
        setLoading(true);

        (async () => {
            try {
                const response = await openMeteoApi(currentWeatherData.latitude, currentWeatherData.longitude);
                const currentHour = parseInt(response.current.time.toString().split(" ")[4].split(":")[0]);
                setCurrentWeatherData(current => ({...current,
                    currentTime:response.current.time.toString().slice(0,25),
                    currentTemperature: Math.round(response.current.temperature_2m),
                    feelLike: Math.round(response.current.apparent_temperature),
                    relativeHumidity: response.current.relativeHumidity,
                    precipitationProbability: response.hourly.precipitation_probability[currentHour],
                    windSpeed: Math.round(response.current.wind_speed_10m),
                    sunrise: response.daily.sunrise.toString().split(" ")[4].slice(0,5),
                    sunset: response.daily.sunset.toString().split(" ")[4].slice(0,5),
                    description: getWeatherDescriptionAndEmoji(response.current.weather_code).description,
                    emoji: getWeatherDescriptionAndEmoji(response.current.weather_code).emoji,
                    uxIndex: response.hourly.uv_index[currentHour].toFixed(2),
                }));

                const hourlySummary = []
                for (let i = currentHour; i < currentHour + 12; i++) {
                    hourlySummary.push(
                        {
                            "time":response.hourly.time[i].toString().split(" ")[4].slice(0, 5),
                            "temperature": Math.round(response.hourly.temperature_2m[i]),
                            "emoji": getWeatherDescriptionAndEmoji(response.hourly.weather_code[i]).emoji
                        })
                }

                setTwelveHoursWeatherSummary(hourlySummary)

                setLoading(false)
            }
            catch(error) {
                console.error(error)
            }
        })()

    },[currentWeatherData?.latitude,currentWeatherData?.longitude]);


    if (loading) {
        return (
            <div className="fixed inset-0 z-50 bg-white">
                <div className="w-[550px] h-[550px] mt-48 mx-auto">
                    <Lottie animationData={LoadingAnimation} loop={true} />
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="rounded-xl border border-slate-400 bg-white shadow-sm overflow-hidden md:w-1/2 lg:w-1/3 mt-8 mx-auto">
                <Header region={currentWeatherData.region}
                        country={currentWeatherData.country}
                        isCelsius={isCelsius}
                        setIsCelsius={setIsCelsius}
                />
                <DetailsCard
                    city={currentWeatherData.city}
                    currentTime={currentWeatherData.currentTime}
                    emoji={currentWeatherData.emoji}
                    currentTemperature={currentWeatherData.currentTemperature}
                    description={currentWeatherData.description}
                    feelLike={currentWeatherData.feelLike}
                    windSpeed={currentWeatherData.windSpeed}
                    relativeHumidity={currentWeatherData.relativeHumidity}
                    precipitationProbability={currentWeatherData.precipitationProbability}
                    sunrise={currentWeatherData.sunrise}
                    sunset={currentWeatherData.sunset}
                    uxIndex={currentWeatherData.uxIndex}
                    isCelsius={isCelsius}
                />
            </section>
        </>
    )
}