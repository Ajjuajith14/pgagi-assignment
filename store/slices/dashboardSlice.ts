import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type WidgetPosition = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

type DashboardState = {
  widgets: WidgetPosition[]
  layout: "grid" | "list"
}

const initialState: DashboardState = {
  widgets: [
    { id: "weather-widget", x: 0, y: 0, width: 1, height: 1 },
    { id: "news-widget", x: 1, y: 0, width: 1, height: 1 },
    { id: "stocks-widget", x: 2, y: 0, width: 1, height: 1 },
  ],
  layout: "grid",
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateWidgetPosition: (state, action: PayloadAction<WidgetPosition>) => {
      const index = state.widgets.findIndex((w) => w.id === action.payload.id)
      if (index !== -1) {
        state.widgets[index] = action.payload
      }
    },
    setLayout: (state, action: PayloadAction<"grid" | "list">) => {
      state.layout = action.payload
    },
  },
})

export const { updateWidgetPosition, setLayout } = dashboardSlice.actions
export default dashboardSlice.reducer