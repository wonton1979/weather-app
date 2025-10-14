export default function DetailsCard() {
    return (
        <div className="p-5 bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">City</h2>
                    <p className="text-sm text-gray-500 mt-2">Current Time</p>
                </div>
                <div className="text-6xl">Weather emoji</div>
            </div>

            <div className="mt-3 flex items-end gap-2">
                <p className="text-4xl font-bold text-gray-900">currentTemperature</p>
                <p className="text-sm text-gray-600 mb-1">weather description</p>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm text-gray-700">
                <div className={"flex items-center gap-2 "}>
                    🌡️ <span>Feels Like </span>
                </div>
                <div className="flex items-center gap-2">
                    💨 <span>Wind Speed km/h</span>
                </div>
                <div className={"flex items-center gap-2"}>
                    💧 <span>Humidity  %</span>
                </div>
                <div className="flex items-center gap-2">
                    🌦️ <span>Precipitation Probability  %</span>
                </div>
                <div className="flex items-center gap-2">
                    🌅 <span>Sunrise Time / Sunset Time</span>
                </div>
                <div className="flex items-center gap-2">
                    🌞 <span> UX Index </span>
                </div>
            </div>
        </div>
    )
}