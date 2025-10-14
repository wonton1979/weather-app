export default function DetailsCard({city,currentTime,emoji,currentTemperature,
                                        description,windSpeed,uxIndex,sunset,feelLike,
                                        sunrise,relativeHumidity,precipitationProbability}) {
    return (
        <div className="p-5 bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{city}</h2>
                    <p className="text-sm text-gray-500 mt-2">{currentTime}</p>
                </div>
                <div className="text-6xl">{emoji}</div>
            </div>

            <div className="mt-3 flex items-end gap-2">
                <p className="text-4xl font-bold text-gray-900">{currentTemperature}°</p>
                <p className="text-sm text-gray-600 mb-1">{description}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm text-gray-700">
                <div className={"flex items-center gap-2 "}>
                    🌡️ <span>Feels Like {feelLike}°</span>
                </div>
                <div className="flex items-center gap-2">
                    💨 <span>Wind Speed {windSpeed} km/h</span>
                </div>
                <div className={"flex items-center gap-2"}>
                    💧 <span>Humidity  {relativeHumidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                    🌦️ <span>Precipitation Probability  {precipitationProbability}%</span>
                </div>
                <div className="flex items-center gap-2">
                    🌅 <span>Sunrise Time {sunrise} / Sunset Time {sunset}</span>
                </div>
                <div className="flex items-center gap-2">
                    🌞 <span> UX Index {uxIndex}</span>
                </div>
            </div>
        </div>
    )
}