import {describe,test,expect,vi} from 'vitest'
import abstractGeolocationApi from "../abstractGeolocationApi.js";

describe('abstractGeolocationApi', () => {
    test('returns coordinates according my ip address', async () => {
        const data = await abstractGeolocationApi()
        expect(data).toHaveProperty('latitude')
        expect(data).toHaveProperty('longitude')
        expect(data).toHaveProperty('city')
        expect(data).toHaveProperty('region')
        expect(data).toHaveProperty('country')
    })

    test('returns correct location according my ip address', async () => {
        const data = await abstractGeolocationApi()
        expect(['Rotherham','Barnsley','Mexborough']).toContain(data.city)
    })

    test('handles fetch failure if network or api server not available', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')))
        const consoleSpy = vi.spyOn(console, 'log')
        const result = await abstractGeolocationApi()
        expect(result).toBeUndefined()
        expect(consoleSpy).toHaveBeenCalledWith('network error')
        vi.unstubAllGlobals()
        consoleSpy.mockRestore()
    })
})