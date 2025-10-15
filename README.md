# Weather App

Weather application shows current conditions, next 12 hours, and next 7 days with emoji icons, unit toggle (°C/°F), location search, and a date picker to preview a specific day’s forecast (Within 14 Days).

> Built with React + Vite, Tailwind CSS, Open‑Meteo for weather, Abstract Geolocation for IP‑based location, and Google Geocoding for place search.

---

## ✨ Features

* **Auto‑detect location** on first load via Abstract Geolocation, then fetches live weather. 
* **Current weather panel** with temperature, feels‑like, humidity, wind, precipitation probability, sunrise/sunset, UV index, and an emoji description. 
* **Hourly forecast**: horizontally scrollable “next 12 hours” strip. 
* **Daily forecast**: “next 7 days” list; clicking a day updates the main card (and shows min/max). 
* **Unit toggle** between °C and °F, with conversion utility. 
* **Search by place name** using Google Maps Geocoding API, with simple loading and no‑results states. 
* **Date picker** (1–14 days ahead) to jump to a specific forecast date, with validation and error message. 
* **“Live” button** to return from a selected future date back to current conditions. 
* **Loading animation overlay** on initial app load (Lottie). 
* **footer** with data source and GitHub link. 

---

## 🧱 Tech Stack

* **Frontend:** React (Vite), JSX
* **Styling:** Tailwind CSS utility classes
* **Icons:** Emoji (Unicode) via the weather code table
* **APIs:**
    * Abstract Geolocation — IP to city/region/country & coords
    * Open‑Meteo — current/hourly/daily weather data
    * Google Maps Geocoding — convert place name to coordinates
* **Animations:** Lottie JSON for loading

---

## 📁 Project Structure

```
src/
  components/
    DailySummaryCard.jsx
    DatePicker.jsx
    DetailCard.jsx
    Footer.jsx
    Header.jsx
    HourlySummaryCard.jsx
    SearchBar.jsx
  pages/
    HomePage.jsx
  services/
    abstractGeolocationApi.js
    googleMapGeoCodingApi.js
    openMeteoApi.js
  utils/
    celsiusToFahrenheit.js
    weatherCodesTable.js
  assets/
    loading-animation.json
```

*Component responsibilities are visible in the code:*

* **HomePage** control data fetching, state, and layout. 
* **DetailCard** renders the main weather panel. 
* **HourlySummaryCard** shows a single hour cell; 
* **DailySummaryCard** shows a day weather summary row and raises a click event to update the main view. 
* **Header** contains the region/country title, unit toggle, and Live button when previewing a future date. 
* **SearchBar** handles place queries and no‑results feedback. 
* **DatePicker** enforces min/max and surfaces validation messaging. 

---

## 🔑 Environment Variables

Create a `.env` file in the project root (Vite format):

```
VITE_GOOGLE_MAP_GEOCODING_API_KEY=<your_google_maps_geocoding_api_key>
VITE_ABSTRACT_GEOLOCATION_API_KEY=<your_abstract_api_key>
```

These keys are read via `import.meta.env` and used inside the services.

---

## 🚀 Getting Started

**Prerequisites**

* Node.js 18+

**Install & Run**

```bash
# install deps
npm install

# start dev server (Vite)
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

---

## 🖱️ Usage Guide

* **Auto‑show on first visit**: when you open the site, it uses your **IP‑based location** to immediately display your current weather and forecast. 
* **Search**: type “London” (or any place) → **Search**. If no data, a red notice appears. 
* **Pick a date**: choose a date within **tomorrow → +14 days** and press **Show**. Out‑of‑range dates show a warning. 
* **Preview a day**: click any day in **Next 7 days**; the main card switches to that day's details.
* **Back to live**: press **⟳ Live** in the header which back to current live weather details.
* **Switch units**: tap **°C/°F** in the header. 

---


## ⚠️ Error Handling & Limits

* **Date range**: forecasts are limited to **1–14 days ahead**; older or farther dates trigger a warning. 
* **Place search**: shows a red warning if Google Geocoding returns `ZERO_RESULTS`. Loading state prevents repeat clicks. 
* **Initial load**: a full‑screen loading animation while data fetching from Abstract Geolocation is not ready ; 

---


## 📦 Deployment

### Netlify 
https://weather-app-yguan.netlify.app/

---

## 🙌 Acknowledgements

* **Weather**: Open‑Meteo
* **IP Geolocation**: Abstract
* **Geocoding**: Google Maps Geocoding API
* **Animation**: Lottie

---

## 📄 License

MIT

---

## 🔗 Repository

* GitHub: https://github.com/wonton1979/weather-app.git 
