export default function Footer() {
    return (
        <footer className="mx-5 my-4 justify-between text-xs text-slate-500">
            <p>Data Source :  Abstract API-Geolocation | Open-Meteo | Google Map - Geocoding</p>
            <div className="flex items-center gap-2 mt-5">
                <a href="https://github.com/wonton1979/weather-app.git" className="hover:underline">
                    View on GitHub : Weather App
                </a>
            </div>
        </footer>
    )
}