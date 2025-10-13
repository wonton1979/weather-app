import {describe,test,expect} from 'vitest'
import googleMapGeocodingApi from '../googleMapGeocodingApi.js'

describe('googleMapGeocodingApi', () => {
    test('returns city,region,country,latitude,longitude with location name input', async () => {
        const data = await googleMapGeocodingApi("London")
        expect(data).toHaveProperty('city')
        expect(data).toHaveProperty('region')
        expect(data).toHaveProperty('country')
        expect(data).toHaveProperty('latitude')
        expect(data).toHaveProperty('longitude')
    })

    test('rejects on empty input', async () => {
        const data = await googleMapGeocodingApi("")
        expect(data.status).toBe("INVALID_REQUEST")
    })

    test('rejects on the location input is not exist', async () => {
        const data = await googleMapGeocodingApi("12324523")
        expect(data.status).toBe("ZERO_RESULTS")
    })
})