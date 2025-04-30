import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface WeatherResponse {
  location: string
  current: {
    temperature: number
    feelsLike: number
    humidity: number
    wind: number
    condition: string
  }
  forecast: Array<{
    date: string
    temperature: number
    condition: string
  }>
}

// Create the API
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, string>({
      query: (city) => `weather?city=${encodeURIComponent(city)}`,
    }),
  }),
})

export const { useGetWeatherQuery } = weatherApi