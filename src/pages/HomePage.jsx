import {useEffect, useState} from "react";
import abstractGeolocationApi from "../services/abstractGeolocationApi.js";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/loading-animation.json";
import Header from "../components/Header.jsx";
import openMeteoApi from "../services/openMeteoApi.js";
import getWeatherDescriptionAndEmoji from "../utils/weatherCodesTable.js";
import DetailsCard from "../components/DetailCard.jsx";
import HourlySummaryCard from "../components/HourlySummaryCard.jsx";
import DailySummaryCard from "../components/DailySummaryCard.jsx";
import Footer from "../components/Footer.jsx";

export default function HomePage(){
    const [loading, setLoading] = useState(true);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [isCelsius,setIsCelsius] = useState(true);
    const [twelveHoursWeatherSummary, setTwelveHoursWeatherSummary] = useState([]);
    const [sevenDaysWeatherSummary, setSevenDaysWeatherSummary] = useState([]);
    const [displayWeatherData,setDisplayWeatherData] = useState(null);
    const [isFutureDateSelected,setIsFutureDateSelected] = useState(false);

    function displayWeatherDetails(dayWeatherSummary) {
        setDisplayWeatherData(currentWeatherData=>({...currentWeatherData,
            currentTime:dayWeatherSummary.time,
            currentTemperature:dayWeatherSummary.temperatureMax,
            precipitationProbability:dayWeatherSummary.precipitationProbabilityMax,
            sunrise: dayWeatherSummary.sunrise,
            sunset: dayWeatherSummary.sunset,
            windSpeed: dayWeatherSummary.windSpeedMax,
            emoji: dayWeatherSummary.emoji,
            uxIndex: dayWeatherSummary.uxIndexMax,
            temperatureMin: dayWeatherSummary.temperatureMin,
        }));
    }

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

                const sevenDaysSummary = []
                const timeRegexPattern =  /^[A-Za-z]{3}\s[A-Za-z]{3}\s[0-9]{2}\s[0-9]{4}/;
                for(let i = 1; i < 8; i++){
                    sevenDaysSummary.push(
                        {
                            "day": response.daily.time[i].toString().split(" ")[0],
                            "time": response.daily.time[i].toString().match(timeRegexPattern)[0],
                            "emoji": getWeatherDescriptionAndEmoji(response.daily.weather_code[i]).emoji,
                            "temperatureMax": Math.round(response.daily.temperature_2m_max[i]),
                            "temperatureMin": Math.round(response.daily.temperature_2m_min[i]),
                            "precipitationProbabilityMax": response.daily.precipitation_probability_max[i],
                            "windSpeedMax": Math.round(response.daily.wind_speed_10m_max[i]),
                            "sunrise": response.daily.sunrise[i].toString().split(" ")[4].slice(0,5),
                            "sunset": response.daily.sunset[i].toString().split(" ")[4].slice(0,5),
                            "uxIndexMax": response.daily.uv_index_max[i].toFixed(2),
                        }
                    )
                }
                setSevenDaysWeatherSummary(sevenDaysSummary);

            }
            catch(error) {
                console.error(error)
            }
        })()

    },[currentWeatherData?.latitude,currentWeatherData?.longitude]);

    useEffect(() => {
        setDisplayWeatherData(currentWeatherData)
    }, [twelveHoursWeatherSummary,sevenDaysWeatherSummary,currentWeatherData]);

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
                    currentWeatherData={currentWeatherData}
                    isCelsius={isCelsius}
                    displayWeatherData={displayWeatherData}
                    isFutureDateSelected={isFutureDateSelected}
                />

                <div className="px-4 pb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">Next 12 hours</p>
                    <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                        {twelveHoursWeatherSummary && twelveHoursWeatherSummary.map((eachHour)=>
                            (
                                <
                                    HourlySummaryCard
                                    key={eachHour.time}
                                    time={eachHour.time}
                                    emoji={eachHour.emoji}
                                    temperature={eachHour.temperature}
                                    isCelsius ={isCelsius}
                                />
                            ))}
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">Next 7 days</p>
                    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-400 overflow-hidden">
                        {sevenDaysWeatherSummary && sevenDaysWeatherSummary.map((eachDay)=>(
                            <
                                DailySummaryCard
                                key={eachDay.day}
                                dayWeatherSummary={eachDay}
                                isCelsius ={isCelsius}
                                displayWeatherDetails={displayWeatherDetails}
                            />
                        ))}
                    </ul>
                </div>

                <Footer />

            </section>
        </>
    )
}