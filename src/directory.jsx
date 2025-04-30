export const LOCATIONS={
    "Newport Beach":"https://api.weather.gov/gridpoints/SGX/38,57/",
    "Los Angeles":"https://api.weather.gov/gridpoints/LOX/155,45/",
    "Claremont":"https://api.weather.gov/gridpoints/LOX/174,44",
    "Maple Plain":"https://api.weather.gov/gridpoints/MPX/95,73"
  }

export const UNITS={
  "temperature":"Fahrenheit",
  "dewpoint":"Fahrenheit",
  "maxTemperature":"Fahrenheit",
  "minTemperature":"Fahrenheit",
  "relativeHumidity":"Percent",
  "apparentTemperature":"Fahrenheit",
  "wetBulbGlobeTemperature":"Fahrenheit",
  "skyCover":"Percent",
  "windDirection":"Degrees",
  "windSpeed":"Knots",
  "windGust":"Knots",
  "quantitativePrecipitation":"Inches",
  "probabilityOfPrecipitation":"Percent",
  "waveHeight":"Feet",
  "primarySwellHeight":"Feet",
  "wavePeriod":"Seconds",
  "primarySwellDirection":"Degrees",
  "windWaveHeight":"Feet",
  "lightningActivityLevel":"Lightning Activity Level",
}

export const PRODUCTS=[
    ["temperature","Temperature"],
    ["dewpoint","Dewpoint"],
    ["maxTemperature","Maximum Temperature"],
    [ "minTemperature","Minimum Temperature"],
    ["relativeHumidity","Relative Humidity"],
    ["apparentTemperature","Apparent Temperature"],
    ["wetBulbGlobeTemperature","Wet Bulb Globe Temperature"],
    ["skyCover","Sky Cover"],
    ["windDirection","Wind Direction"],
    ["windSpeed","Wind Speed"],
    ["windGust","Wind Gust"],
    ["quantitativePrecipitation","Quantitative Precipitation Forecast - QPF"],
    ["probabilityOfPrecipitation","Probability of Precipitation"],
]

export const MARINEPRODUCTS=[
    ["temperature","Temperature"],
    ["apparentTemperature","Apparent Temperature"],
    ["skyCover","Sky Cover"],
    ["windDirection","Wind Direction"],
    ["windSpeed","Wind Speed"],
    ["windGust","Wind Gust"],
    ["quantitativePrecipitation","Quantitative Precipitation Forecast - QPF"],
    ["probabilityOfPrecipitation","Probability of Precipitation"],
    ["lightningActivityLevel","Lightning Activity Level"],
    ["waveHeight","Wave Height"],
    ["wavePeriod","Wave Period"],
    ["primarySwellHeight","Swell Height"],
    ["primarySwellDirection","Swell Direction"],
    ["windWaveHeight","Wind Wave Height"]
    
]

export const MARINELOCATIONS={
    "Nearshore Waters of Southern California from Newport Beach Harbor and out 5 NM":"https://api.weather.gov/gridpoints/LOX/163,23",
}