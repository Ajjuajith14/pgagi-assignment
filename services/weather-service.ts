
interface WeatherForecastDay {
      date: string
      temperature: number
      condition: string
    }
    
    interface WeatherData {
      location: string
      current: {
        temperature: number
        feelsLike: number
        humidity: number
        wind: number
        condition: string
      }
      forecast: WeatherForecastDay[]
    }
    
    export async function fetchWeatherData(city: string): Promise<WeatherData> {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
        )
    
        if (!currentResponse.ok) {
          throw new Error(`Weather API error: ${currentResponse.statusText}`)
        }
    
        const currentData = await currentResponse.json()
    
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
        )
    
        if (!forecastResponse.ok) {
          throw new Error(`Forecast API error: ${forecastResponse.statusText}`)
        }
    
        const forecastData = await forecastResponse.json()
    
        const forecast: WeatherForecastDay[] = forecastData.list
          .filter((item: any, index: number) => index % 8 === 0)
          .slice(0, 7)
          .map((item: any) => ({
            date: item.dt_txt,
            temperature: Math.round(item.main.temp),
            condition: item.weather[0].main,
          }))
    
        return {
          location: `${currentData.name}, ${currentData.sys.country}`,
          current: {
            temperature: Math.round(currentData.main.temp),
            feelsLike: Math.round(currentData.main.feels_like),
            humidity: currentData.main.humidity,
            wind: Math.round(currentData.wind.speed),
            condition: currentData.weather[0].main,
          },
          forecast,
        }
      } catch (error) {
        console.error("Error fetching weather data:", error)
        throw error
      }
    }