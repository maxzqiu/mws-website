import { useState, useEffect } from 'react'
import "./briefingPage.css"
import { DisplayForecastData } from "./mwsForecasts.jsx" 
import Synopsis from "./synopsis.jsx"
// no "default" in export in mwsForecasts.jsx so use curly braces for import statement

function HazardHeadlines({location_data}){
  //console.log(location_data)
  //console.log(location_data)
  let hazardList=[]
  let productList=["heatrisk","tropical","excessiveRain","windSpeed","windGust","denseFog","fireWeather"]
  let highest_values={}
  for (let i of productList){
    for (let [t,time] of Object.keys(location_data[i]).entries()){
        if (t==0){
          highest_values[i]=location_data[i][time]
        } else if (t==8){
          break;
        }else {
          if (highest_values[i]<location_data[i][time]){
            highest_values[i]=location_data[i][time]
          }
        }
    }
  }
    //console.log(highest_values)
    ///////////////
    for (let hazard_product of Object.keys(highest_values)){
      //console.log(hazard_product,highest_values,hazardList,highest_values[hazard_product])

      if (hazard_product=="heatrisk"){
        if (highest_values[hazard_product]==3){
          hazardList.push("HIGH HEAT INDICES")
        }else if (highest_values[hazard_product]>=4){
          hazardList.push("EXTREME HEAT")
        }
      } else if (hazard_product=="tropical"){
          if (highest_values[hazard_product]==3){
          hazardList.push("TROPICAL RAIN/THUNDERSTORMS")
        }else if (highest_values[hazard_product]==4){
          hazardList.push("TROPICAL STORM")
        }else if (highest_values[hazard_product]==5){
          hazardList.push("HURRICANE")
        }
      }else if (hazard_product=="excessiveRain"){
          if (highest_values[hazard_product]==1){
          hazardList.push("MINOR FLOODING")
        }else if (highest_values[hazard_product]==2){
          hazardList.push("POSSIBLE FLOODING")
        }else if (highest_values[hazard_product]==3){
          hazardList.push("MODERATE FLOODING")
        }else if (highest_values[hazard_product]==4){
          hazardList.push("EXTREME FLOODING")
        }
      }else if (hazard_product=="windSpeed"){
          if (highest_values[hazard_product]>=25){
          hazardList.push("HIGH WIND")
        }
      }else if (hazard_product=="windGust"){
          if (highest_values[hazard_product]>=55){
          hazardList.push("HIGH WIND")
        }
      }else if (hazard_product=="denseFog"){
          if (highest_values[hazard_product]>=2){
          hazardList.push("DENSE FOG")
        }
      }else if (hazard_product=="fireWeather"){
          if (highest_values[hazard_product]==2){
          hazardList.push("RED FLAG/FIRE WEATHER")
        } else if (highest_values[hazard_product]>=3){
          hazardList.push("PDS RED FLAG")
        }
      }
    }
  
  return (
    <table className="situation-overview-hazards-table">
                  <thead>
                    <tr>{hazardList.length>1?
                      <th className="orange-alert">***Multiple Hazards In Effect Next 48 Hours!***</th>:<th>Hazards In Effect For Next 48 Hours</th>}</tr>
                  </thead>
                  <tbody>
                    {hazardList.map((i,key)=>{
                       return (<tr>
                        <td className="briefing-page-hazard-alert" key={key}><strong>{i}</strong></td>
                      </tr>)
                    })}
                    <tr className="hazards-table-spacer-row"></tr>
                  </tbody>
                </table>
      
    
  )
  
}



function BriefingPage(){
  let [time,setTime]=useState(null);
  let [utcTime,setUtcTime]=useState(null);
  function getTime(){
    setTime(new Date().toLocaleString("en-GB", {timeZone: "America/Los_Angeles"}).toString().substring(12,20))
    setUtcTime((new Date().toUTCString().substring(17,26)))
  }

  setInterval(getTime,1000)
    //console.log("Briefing page is re rendering")
    let [data,setData]=useState(null)
    let [scroll, setScroll] = useState(0);
    let [location,setLocation]=useState("Newport Beach");
    //let [hazardList,setHazardsList]=useState([])
    
    // let [product,setProduct]=useState(null)
    useEffect(() => {
    async function run() {
      let payload = { forecast: "forecast" };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      };
      
      try {
        let res = await fetch("http://localhost:8000/api/request", options);
        let response = await res.json();
        
       
        setData(response);
        console.log(response)
        
      
        // const locations = Object.keys(response);
        // if (locations.length > 0) {
        //   const firstLocation = locations[0];
        //   const products = Object.keys(response[firstLocation]);
          
          
        //   setLocation(firstLocation);
        //   if (specific!==null){
        //     setProduct(specific)
        //   } else if (products.length > 0) {
        //     setProduct(products[0]);
        //   }
        // }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    run();
  }, []);
    if (!data || !location || data["status"]=="not available") {
    return <p>Loading...</p>;
    }
    return (
        <div className="briefing-page-body">
            <h2>MWS SITUATION OVERVIEW</h2>

            <div className="briefing-page-synopsis-and-time-container">
              <Synopsis />
              <div className="time">
              <label htmlFor="time"><b>CURRENT TIME</b></label>
              <table id="time" >
                <tbody>
                  <tr>
                    <th>LOCAL</th>
                    
                    <th>UTC</th>
                  </tr>
                  <tr>
                    <td>{time}</td>
                    <td>{utcTime}</td>
                  </tr>
                </tbody>
                
              </table>
          </div>
        
              </div> 
            
            
            <div className="briefing-page-location-selection">
                <label  htmlFor="location-selection">Location: </label>
                <select id="location-selection" value={location} onChange={(e) => {
                  setLocation(e.target.value)
                  
                  }}>
                {Object.keys(data).map((i, key) => (
                  
                <option key={key} value={i}>{i}</option>
                ))}
                </select>
            </div>
            <div>

            
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
            </div>
            <div className="forecast-parent-container">
                
                <table>
                    <thead>
                      <tr><th>Temperature</th></tr>
                    </thead>
                    <tbody>
                    <   DisplayForecastData data={data} location={location} product={"temperature"} scroll={scroll} />
                    </tbody>
                </table>
                
                <table >
                    <thead>
                      <tr><th>Chance of Rain</th></tr>
                    </thead>
                    <tbody>
                        <DisplayForecastData data={data} location={location} product={"probabilityOfPrecipitation"} scroll={scroll} />
                    </tbody>
                </table>
                
                <HazardHeadlines location_data={data[location]} />
            </div>
            
            
            <div>
              <img className="forecast-discussion-icon" src="\forecast-discussion-icon.png" alt="forecast-discussion-icon"></img>
              <a className="briefing-page-forecast-discussion-link" href="/forecasts/forecast-discussion">MWS Forecast Discussion</a>
            </div>
        </div>
        
    )
}

export default BriefingPage;