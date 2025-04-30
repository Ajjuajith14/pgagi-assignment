
interface StockDataPoint {
      date: string
      price: number
      volume: number
    }
    
    interface StockData {
      symbol: string
      companyName: string
      price: number
      change: number
      changePercent: number
      open: number
      high: number
      low: number
      volume: number
      historicalData: StockDataPoint[]
    }
    
    const FALLBACK_STOCKS: Record<string, StockData> = {
      AAPL: {
        symbol: "AAPL",
        companyName: "Apple Inc.",
        price: 182.63,
        change: 1.25,
        changePercent: 0.0069,
        open: 181.38,
        high: 183.42,
        low: 180.97,
        volume: 54387265,
        historicalData: generateHistoricalData("AAPL", 30, 182.63),
      },
      MSFT: {
        symbol: "MSFT",
        companyName: "Microsoft Corporation",
        price: 417.88,
        change: 2.35,
        changePercent: 0.0056,
        open: 415.53,
        high: 418.79,
        low: 414.21,
        volume: 22567890,
        historicalData: generateHistoricalData("MSFT", 30, 417.88),
      },
      GOOGL: {
        symbol: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 175.98,
        change: -0.87,
        changePercent: -0.0049,
        open: 176.85,
        high: 177.32,
        low: 174.91,
        volume: 18934567,
        historicalData: generateHistoricalData("GOOGL", 30, 175.98),
      },
      AMZN: {
        symbol: "AMZN",
        companyName: "Amazon.com Inc.",
        price: 182.41,
        change: 1.78,
        changePercent: 0.0098,
        open: 180.63,
        high: 183.25,
        low: 180.11,
        volume: 32456789,
        historicalData: generateHistoricalData("AMZN", 30, 182.41),
      },
      TSLA: {
        symbol: "TSLA",
        companyName: "Tesla, Inc.",
        price: 215.32,
        change: -3.45,
        changePercent: -0.0158,
        open: 218.77,
        high: 219.35,
        low: 214.68,
        volume: 67891234,
        historicalData: generateHistoricalData("TSLA", 30, 215.32),
      },
      META: {
        symbol: "META",
        companyName: "Meta Platforms, Inc.",
        price: 478.22,
        change: 5.67,
        changePercent: 0.012,
        open: 472.55,
        high: 479.88,
        low: 471.23,
        volume: 15678901,
        historicalData: generateHistoricalData("META", 30, 478.22),
      },
      NVDA: {
        symbol: "NVDA",
        companyName: "NVIDIA Corporation",
        price: 924.79,
        change: 12.34,
        changePercent: 0.0135,
        open: 912.45,
        high: 928.56,
        low: 910.23,
        volume: 43219876,
        historicalData: generateHistoricalData("NVDA", 30, 924.79),
      },
    }
    
    function generateHistoricalData(symbol: string, days: number, currentPrice: number): StockDataPoint[] {
      const data: StockDataPoint[] = []
      const volatility = getVolatility(symbol)
      let price = currentPrice
    
      const now = new Date()
    
      for (let i = days; i > 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
    
        const change = (Math.random() - 0.5) * volatility * price
        price = Math.max(price + change, 1) 
    
        data.push({
          date: date.toISOString().split("T")[0],
          price: Number.parseFloat(price.toFixed(2)),
          volume: Math.floor(Math.random() * 50000000) + 10000000,
        })
      }
    
      return data
    }
    
    function getVolatility(symbol: string): number {
      const volatilities: Record<string, number> = {
        AAPL: 0.015,
        MSFT: 0.012,
        GOOGL: 0.018,
        AMZN: 0.022,
        TSLA: 0.035,
        META: 0.025,
        NVDA: 0.03,
      }
    
      return volatilities[symbol] || 0.02
    }
    
    export async function fetchStockData(symbol: string): Promise<StockData> {
      try {
        console.log(`Fetching stock data for symbol: ${symbol}`)
        const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY
    
        if (!apiKey) {
          console.warn("Alpha Vantage API key is missing. Using fallback data.")
          return getFallbackStockData(symbol)
        }
    
        const quoteResponse = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`,
        )
    
        if (!quoteResponse.ok) {
          console.error(`Stock API error: ${quoteResponse.statusText}`)
          return getFallbackStockData(symbol)
        }
    
        const quoteData = await quoteResponse.json()
        const quote = quoteData["Global Quote"]
    
        if (!quote || Object.keys(quote).length === 0) {
          console.warn(`No stock data available for ${symbol}. Using fallback data.`)
          return getFallbackStockData(symbol)
        }
    
        const overviewResponse = await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`,
        )
    
        let companyName = symbol
        if (overviewResponse.ok) {
          const overviewData = await overviewResponse.json()
          if (overviewData.Name) {
            companyName = overviewData.Name
          }
        }
    
        const historicalResponse = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`,
        )
    
        let processedHistoricalData: StockDataPoint[] = []
    
        if (historicalResponse.ok) {
          const historicalData = await historicalResponse.json()
          const timeSeries = historicalData["Time Series (Daily)"]
    
          if (timeSeries && Object.keys(timeSeries).length > 0) {
            processedHistoricalData = Object.keys(timeSeries)
              .slice(0, 30) // Get last 30 days
              .map((date) => ({
                date,
                price: Number.parseFloat(timeSeries[date]["4. close"]),
                volume: Number.parseInt(timeSeries[date]["5. volume"], 10),
              }))
              .reverse() // Oldest to newest
          } else {
            const price = Number.parseFloat(quote["05. price"] || "0")
            processedHistoricalData = generateHistoricalData(symbol, 30, price)
          }
        } else {
          const price = Number.parseFloat(quote["05. price"] || "0")
          processedHistoricalData = generateHistoricalData(symbol, 30, price)
        }
    
        return {
          symbol: symbol,
          companyName: companyName,
          price: Number.parseFloat(quote["05. price"] || "0"),
          change: Number.parseFloat(quote["09. change"] || "0"),
          changePercent: Number.parseFloat((quote["10. change percent"] || "0%").replace("%", "")) / 100,
          open: Number.parseFloat(quote["02. open"] || "0"),
          high: Number.parseFloat(quote["03. high"] || "0"),
          low: Number.parseFloat(quote["04. low"] || "0"),
          volume: Number.parseInt(quote["06. volume"] || "0", 10),
          historicalData: processedHistoricalData,
        }
      } catch (error) {
        console.error("Error fetching stock data:", error)
        return getFallbackStockData(symbol)
      }
    }
    
    function getFallbackStockData(symbol: string): StockData {
      if (FALLBACK_STOCKS[symbol]) {
        console.log(`Using fallback data for ${symbol}`)
        return FALLBACK_STOCKS[symbol]
      }
    
      const fallbackData = { ...FALLBACK_STOCKS["AAPL"] }
      fallbackData.symbol = symbol
      fallbackData.companyName = `${symbol} Inc.`
      fallbackData.historicalData = generateHistoricalData(symbol, 30, fallbackData.price)
    
      return fallbackData
    }