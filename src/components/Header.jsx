export default function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-800 truncate">
                    Region <span className="text-slate-400">•</span> Country
                </h2>
            </div>

            <div className="inline-flex rounded-lg border border-slate-500 overflow-hidden">
                <button
                    type="button"
                    className="px-3 py-1 text-sm font-medium bg-slate-900 text-white"
                    title="Switch Between Celsius and Fahrenheit"
                >
                    °C
                </button>
                <div className="w-px bg-slate-300" />
                <button
                    type="button"

                    className="px-3 py-1 text-sm font-medium bg-white"
                    title="Switch Between Celsius and Fahrenheit"
                >
                    °F
                </button>
            </div>
        </header>
    )
}