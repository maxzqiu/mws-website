import { useState, useEffect } from 'react';
import { UNITS } from './directory.jsx'
import "./mwsForecasts.css"

function DisplayCompositeData({data,location,product,scroll}){
  
}

function decode(product,value){
  if (product=="heatrisk"){
    if (value==0){
      return <td>None</td>;
    } else if (value==1){
      return <td className="color-yellow">Low</td>;

    } else if (value==2){
      return <td className="color-orange">Medium - Dry Air</td>;
    } else if (value==3){
      return <td className="color-orange">Medium - Humid Air</td>;
    } else if (value==4){
      return <td className="color-red">High - Dry Air</td>;
    } else if (value==5){
      return <td className="color-red">High - Humid Air</td>;
    }

  } else if (product=="tropical"){
    if (value==0){
      return <td>None</td>
    } else if (value==1){
      return <td className="color-green">No Impacts</td>
    } else if (value==2){
      return <td className="color-yellow">Tropical Impacts - Heat</td>
    } else if (value==3){
      return <td className="color-orange">Tropical Impacts - Rain/Wind</td>
    }else if (value==4){
      return <td className="color-red">Tropical Storm</td>
    } else if (value==5){
      return <td className="color-purple">Hurricane</td>
    }
  }else if (product=="excessiveRain"){
    if (value==0){
      return <td>None</td>
    } else if (value==1){
      return <td className="color-yellow">Low</td>
    } else if (value==2){
      return <td className="color-yellow">Conditional</td>
    } else if (value==3){
      return <td className="color-orange">Medium</td>
    }else if (value==4){
      return <td className="color-red">High</td>
    } 
  }else if (product=="fireWeather"){
    if (value==0){
      return <td>None</td>
    } else if (value==1){
      return <td className="color-yellow">Low</td>
    }  else if (value==2){
      return <td className="color-orange">Medium</td>
    }else if (value==3){
      return <td className="color-red">High</td>
    } 
  }else if (product=="denseFog"){
    if (value==0){
      return <td>None</td>
    } else if (value==1){
      return <td className="color-yellow">30%</td>
    }  else if (value==2){
      return <td className="color-orange">60%</td>
    }else if (value==3){
      return <td className="color-red">90%</td>
    } 
  }else {
    return value;
  }
}

function DisplayForecastData({ data, location, product, scroll }) {
  
  if (!data || !location || !product || !data[location] || !data[location][product]) {
    return <tr><td>No data available</td></tr>;
  }

  const timeKeys = Object.keys(data[location][product]);
  const visibleKeys = timeKeys.slice(scroll, scroll + 6);
  if (product=="initTime"){
    return (
      <tr>

        <td>Initialization Time: {data[location]["initTime"]}</td>
      </tr>
    )
  } else {
        return (
    <>
    
      {visibleKeys.map((timeStr, key) => (
        <tr key={key} className={(()=>{
            if (data[location][product][timeStr]==""){
            return "";
            }
           else if (product=="temperature" && data[location][product][timeStr]<=40){
           
            return "orange-alert";
          } else if (product=="temperature" && data[location][product][timeStr]>=95){
            
            return "orange-alert";
          } else if ((product=="apparentTemperature" && data[location][product][timeStr]<=40)){
            
            return "orange-alert"; 
          } else if (product=="apparentTemperature" && data[location][product][timeStr]>=95){
            
            return "orange-alert";
          } else if (product=="windSpeed" && data[location][product][timeStr]>=25){
            
            return "orange-alert";
          } else if (product=="windGust" && data[location][product][timeStr]>=55){
            
            return "orange-alert";
          } else if (product=="snowfallAmount" && data[location][product][timeStr]>0){
            
            return "orange-alert";
          } else if (product=="iceAccumulation" && data[location][product][timeStr]>0){
            
            return "orange-alert";
          } else if (product=="probabilityOfThunder" && data[location][product][timeStr]>=35){
            
            return "orange-alert";
          }else if (product=="relativeHumidity" && data[location][product][timeStr]<=15){
            
            return "orange-alert";
          }else if (product=="quantitativePrecipitation" && data[location][product][timeStr]>=1){
            
            return "orange-alert";
          }else {
            return "";
          }
        })()}>
          
          <td>{new Date(timeStr).toLocaleString('en-US', { weekday: 'short', hour: 'numeric' })}</td>
          <td>{decode(product,data[location][product][timeStr])}</td>
        </tr>
      ))}
    </>
  );
  }
  
}

function splitcamelCase(word){
  return word
  .replace(/([A-Z])/g, ' $1') // Adds spaces before capitals
  .trim()                    // Removes accidental trailing/leading spaces
  .toUpperCase();            // Converts everything to lowercase
}

function MWSForecasts({specific}) {

  let [data, setData] = useState(null);
  let [location, setLocation] = useState("");
  let [product, setProduct] = useState("");
  let [scroll, setScroll] = useState(0);
  
  useEffect(() => {
    async function run() {
      let payload = { forecast: "forecast" };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      };
      
      try {
        let res = await fetch("http://server.maxweatherservice.com/api/request", options);
        let response = await res.json();
        
       
        setData(response);
        
      
        const locations = Object.keys(response);
        if (locations.length > 0) {
          const firstLocation = locations[0];
          const products = Object.keys(response[firstLocation]);
          
          
          setLocation(firstLocation);
          if (specific!==null){
            setProduct(specific)
          } else if (products.length > 0) {
            setProduct(products[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    run();
  }, []);

  // Guard clause: Wait until data AND initial states are set
  if (!data || !location || !product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <label className="forecast-select-field" htmlFor="location-selection">Location: </label>
      <select className="forecast-select-field" id="location-selection" value={location} onChange={(e) => setLocation(e.target.value)}>
        {Object.keys(data).map((i, key) => (
          
          <option key={key} value={i}>{i}</option>
        ))}
      </select>

      <br></br>
        <label className="forecast-select-field" htmlFor="product-selection">Product: </label>
        {specific ? (
          <input className="forecast-select-field" id="product-selection" disabled value={splitcamelCase(specific)}></input>
        ):(
          <select className="forecast-select-field" id="product-selection" value={product} onChange={(e) => setProduct(e.target.value)}>
          {Object.keys(data[location] || {}).map((i,key)=>{
            if (i=="thunderstorms" || i=="quantitativePrecipitation" || i=="heatrisk" || i=="tropical" || i=="excessiveRain" || i=="fireWeather" || i=="denseFog" || i=="24HourRainfall"){
              return;
            } else {
              return (
                <option key={key} value={i}>{splitcamelCase(i)}</option>
              )
            }
          })}
          </select>
        )}

        
        <br></br>

        <button className="small-button" onClick={()=>{
        
        if (scroll==0){
            return;
        } else {
            setScroll(scroll=>scroll-1)
        }
      }}>Back</button>

      <button className="small-button" onClick={()=>{
        setScroll(scroll=>scroll+1)
      }}>Next</button>

      
      <h4>***FLASHING ORANGE INDICATES AN URGENT FORECAST POINT***</h4>
      <p>Unit of measurment is {Object.keys(UNITS).includes(product)?UNITS[product]:"None"}</p>
      <table className="table">
        <tbody>
            
          <DisplayForecastData data={data} location={location} product={product} scroll={scroll} />
        </tbody>
      </table>
    </div>
  );
}

export default MWSForecasts;
