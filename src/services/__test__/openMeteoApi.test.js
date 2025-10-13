import {describe,test,expect} from 'vitest'
import openMeteoApi from "../openMeteoApi.js"

describe('openMeteoApi', () => {
    test('returns current,hourly and daily weather data with valid latitude and longitude', async () => {
        const data = await openMeteoApi(52.52,13.41)
        expect(data).toHaveProperty('current')
        expect(data).toHaveProperty('hourly')
        expect(data).toHaveProperty('daily')
    })

    test('returns all necessary weather data for current time of the provided location', async () => {
        const data = await openMeteoApi(52.52,13.41)
        expect(data).toHaveProperty('current.time')
        expect(data).toHaveProperty('current.temperature_2m')
        expect(data).toHaveProperty('current.relativeHumidity')
        expect(data).toHaveProperty('current.weather_code')
        expect(data).toHaveProperty('current.wind_speed_10m')
        expect(data).toHaveProperty('current.apparent_temperature')
    })

    test('returns all necessary weather data for hourly forecast of the provided location', async () => {
        const data = await openMeteoApi(52.52,13.41)
        expect(data).toHaveProperty('hourly.time')
        expect(data).toHaveProperty('hourly.temperature_2m')
        expect(data).toHaveProperty('hourly.relativeHumidity')
        expect(data).toHaveProperty('hourly.weather_code')
        expect(data).toHaveProperty('hourly.wind_speed_10m')
        expect(data).toHaveProperty('hourly.uv_index')
        expect(data).toHaveProperty('hourly.precipitation_probability')
    })

    test('returns all necessary weather data for daily forecast of the provided location', async () => {
        const data = await openMeteoApi(52.52,13.41);
        expect(data).toHaveProperty('daily.time');
        expect(data).toHaveProperty('daily.temperature_2m_min');
        expect(data).toHaveProperty('daily.temperature_2m_max');
        expect(data).toHaveProperty('daily.sunset');
        expect(data).toHaveProperty('daily.sunrise');
        expect(data).toHaveProperty('daily.wind_speed_10m_max');
        expect(data).toHaveProperty('daily.uv_index_max');
        expect(data).toHaveProperty('daily.precipitation_probability_max');
        expect(data).toHaveProperty('daily.weather_code');
    })

    test('checks data types of return value', async () => {

            const data = await openMeteoApi(53.4, -1.35)

            expect(data.current.time instanceof Date).toBe(true)
            expect(typeof data.current.temperature_2m).toBe('number')
            expect(typeof data.current.weather_code).toBe('number')
            expect(data.hourly.temperature_2m.length).toBeGreaterThan(0)
            expect(data.daily.weather_code.length).toBeGreaterThan(0)
        },
    )

    test('rejects on invalid latitude', async () => {
        try {
            await openMeteoApi(4553.4, 120)
            throw new Error('Invalid latitude')
        } catch (err) {
            expect(err.message).toMatch("Latitude must be in range of -90 to 90")
        }
    })

})