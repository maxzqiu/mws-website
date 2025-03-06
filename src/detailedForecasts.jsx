import { useState,useEffect } from 'react'

const DIRECTORY={
    "Newport Beach":"https://api.weather.gov/gridpoints/SGX/38,57/",
    "Los Angeles":"https://api.weather.gov/gridpoints/LOX/155,45/",
    "Claremont":"https://api.weather.gov/gridpoints/LOX/174,44",
  }

const UNITS={
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
}

function conversion(value,product){
  if (product==="temperature" || product==="dewpoint" || product==="maxTemperature" || product==="minTemperature" || product==="apparentTemperature" || product==="wetBulbGlobeTemperature"){
    return Math.round(value*1.8+32)
  } else if (product==="windSpeed" || product==="windGust"){
    return Math.round(value/1.852)
  } else if (product==="quantitativePrecipitation"){
    return Math.round(value/25.4);
  } else {
    return Math.round(value);
  }
}

function toReadableDate(str){
  return (str.substring(0,3))+" "+(str.substring(16,18))+":00";
}

// function parseDatesToLocal(date){
//   let json=date;
//   //console.log(json);
//   let dateTime=new Date();
//   dateTime=dateTime.toString();
//   if (dateTime.substring(30,31)==="7"){
//     if (json.hour<7){
//       json.hour+=24;
//       if (json.day===1){
//         if (json.month===1){
//           json.day=31;
//           json.month=12;
//           json.year-=1;
//         } else if (json.month===3){
//           json.month=2
//           if (json.year%4===0){
//             json.day=29;
//           } else {
//             json.day=28;
//           }
//         } else if (json.month===2 || json.month===4 || json.month===6 || json.month===8 || json.month===9 || json.month===11){
//           json.day=31;
//           json.month-=1;
//         } else {
//           json.day=30;
//           json.month-=1;
//         }
//       }
//     }
//     json.hour-=7;
//   } else {
//     if (json.hour<8){
//       json.hour+=24;
//       if (json.day===1){
//         if (json.month===1){
//           json.day=31;
//           json.month=12;
//           json.year-=1;
//         } else if (json.month===3){
//           json.month=2
//           if (json.year%4===0){
//             json.day=29;
//           } else {
//             json.day=28;
//           }
//         } else if (json.month===2 || json.month===4 || json.month===6 || json.month===8 || json.month===9 || json.month===11){
//           json.day=31;
//           json.month-=1;
//         } else {
//           json.day=30;
//           json.month-=1;
//         }
//       }
//     }
//     json.hour-=8;
//   }
  
//   return json.month+"/"+json.day+" "+json.hour+":00"
// }

function dates(data,product){
  
  let dates=[];
  let readableDate=""
  
  let currentDate=data.properties[product].values[0].validTime;
  
  currentDate=currentDate.substring(0,25);
  let daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  if (product==="maxTemperature" || product==="minTemperature"){
    let currentDay=(new Date).getDay();
    console.log(currentDay);
    for (let i=currentDay;i<currentDay+7;i+=1){
      dates.push(daysOfWeek[i]);
      
    }
    return dates;
  } else {
    currentDate=new Date(currentDate);
  
    currentDate=currentDate.getTime();
    let readable=""
  
    for (let i=0;i<200;i+=1){
      currentDate+=3600000;
      
      currentDate=(new Date(currentDate));
      
      currentDate=currentDate.toString();
      
      readable=toReadableDate(currentDate);
      
      dates.push(readable);
      currentDate=(new Date(currentDate));
      currentDate=currentDate.getTime();
      
    }
    
    // {
    //   "year":parseInt(data.properties[product].values[0].validTime.substring(0,4)),
    //   "month":parseInt(data.properties[product].values[0].validTime.substring(5,7)),
    //   "day":parseInt(data.properties[product].values[0].validTime.substring(8,10)),
    //   "hour":parseInt(data.properties[product].values[0].validTime.substring(11,13)),
    // }
    // console.log(currentDate);
    
    
  
    // for (let i=0;i<200;i+=1){
    //   if (currentDate.hour===23){
    //     currentDate.hour=0;
    //     if ((currentDate.month===1 || currentDate.month===3 || currentDate.month===5 || currentDate.month===7) || currentDate.month===8 || currentDate.month===10 || currentDate.month===12){
    //       if (currentDate.day===31){
    //         currentDate.day=1;
    //         currentDate.month+=1;
  
    //         if (currentMonth===12){
    //           currentYear+=1;
    //         }
    //       }
          
    //     } else if (currentDate.month===2){
    //       if (currentDate.day===28 && currentDate.year%4!==0){
    //         currentDate.day=1;
    //         currentDate.month+=1;
    //       } else if (currentDate.day===29 && currentDate.year%4===0){
    //         currentDate.day=1;
    //         currentDate.month+=1;
    //       } else {
    //         currentDate.day+=1;
    //       }
    //     } else {
    //       if (currentDate.day===30){
    //         currentDate.month+=1;
    //         currentDate.day=1;
    //       }
          
    //     }
        
    //   } else {
    //     currentDate.hour+=1
        
    //   }
    //   console.log(currentDate);
    //   dates.push(currentDate);
      
    // }
    // console.log(parseDatesToLocal({
    //   "year":2025,
    //   "month":12,
    //   "day":25,
    //   "hour":10,
    // }))
    // dates.map((json)=>parseDatesToLocal(json));
    // console.log(dates);
    
    console.log(dates);
    return dates;
  }
  

  
}

function toHours(validTime){
  if (validTime.length===30){
    //console.log(parseInt(validTime.substring(28,29)));
    return parseInt(validTime.substring(28,29));
  } else if (validTime.length===31){
    //console.log(parseInt(validTime.substring(28,30)));
    return parseInt(validTime.substring(28,30));
  
    
  } else if (validTime.length===32){
    console.log(parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,31)));
    return parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,31));
  } else {
    console.log(parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,32)));
    return parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,32));
  }
}

function Forecasts(){
    let [data,setData]=useState(null);
    let [location,setLocation]=useState("Newport Beach");
    let [product,setProduct]=useState("temperature");
    let [scroll,setScroll]=useState(0);
    let [info,setInfo]=useState("");
    let [listofdates,setListofdates]=useState([]);
    let [update,setUpdate]=useState("");
    let [loading,setLoading]=useState("LOADING");
    
    useEffect(()=>{
      setLoading("LOADING")
      async function run(){
        
          
        
        
        let res= await fetch(DIRECTORY[location]);
        let data= await res.json();
        setData(data);
        //console.log(data);
        
        //console.log("CREATED! ")
        let display=[]
        let validTime=null;
        let current=0;
        setUpdate((data.properties.updateTime).substring(11,13)+(data.properties.updateTime).substring(14,16));

        if (product==="maxTemperature" || product==="minTemperature"){
          for (let i=0;i<(data.properties[product].values.length);i+=1){
            display.push(data.properties[product].values[i].value);
          }
          while (display.length!==12){
            display.push(null)
          }
        } else {
          for (let i=0;i<(data.properties[product].values).length;i+=1){
          
            if (i===((data.properties[product].values).length)-1-scroll){
              //console.log((((data.properties[product].values).length)-1));
              //console.log(scroll);
              
              display.push(data.properties[product].values[i].value); // Only put the last value in once 
              //.log("Last one")
              break;
            } else { // Push the values for one time until the next one in the JSON
              //console.log(i);
              current=(data.properties[product].values[i].validTime)
              for (let j=0;j<(parseInt((toHours(current))));j+=1){
                
                display.push(data.properties[product].values[i].value);
              }
            }
          }
        }
        
        // for (let i=0;i<12;i+=1){
        //   if (display.length===12){
        //     break;
        //   } else {
        //     for (let j=0;j<toHours(data.properties[product].values[scroll+i].validTime);j+=1){
        //       display.push(data.properties[product].values[i+scroll].value);
        //       if (display.length===12){
        //         break;
        //       }
        //     }
        //   }
        // }
        display=display.map((i)=>conversion(i,product));
        if (product==="maxTemperature" || product==="minTemperature"){
          console.log("this has been ran")
          for (let i=7;i<13;i+=1){
            display[i]=null;
          }
          console.log(display);
        }
        setLoading("");
        setInfo(display);
        setListofdates(dates(data,product));
        
      
      
      }
      run();
    },[product,location]
    )
    return (
      <>
        <h2>MWS Detailed Forecasts</h2>
        <h4 className="important">IMPORTANT! This product is EXPERIMENTAL until March 31, 2025. Questions, comments or suggestions? Let us know! </h4>
        <label htmlFor="location">Choose Location:</label>
        <select id="location" onChange={(e)=>{setLocation(e.target.value)}}>
          <option value="Newport Beach">Newport Beach</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Claremont">Claremont</option>
        </select>
        <label htmlFor="productSelection">Select Product: </label>
      
        <select id="productSelection" onChange={(e)=>{
          setProduct(e.target.value);
          setScroll(0);
          }}>
          
          <option value="temperature">Temperature</option>
          <option value="dewpoint">Dewpoint</option>
          <option value="maxTemperature">Maximum Temperature</option>
          <option value="minTemperature">Minimum Temperature</option>
          <option value="relativeHumidity">Relative Humidity</option>
          <option value="apparentTemperature">Apparent Temperature</option>
          <option value="wetBulbGlobeTemperature">Wet Bulb Globe Temperature</option>
          <option value="skyCover">Sky Cover</option>
          <option value="windDirection">Wind Direction</option>
          <option value="windSpeed">Wind Speed</option>
          <option value="windGust">Wind Gust</option>
          <option value="quantitativePrecipitation">Quantitative Precipitation Forecast - QPF</option>
          <option value="probabilityOfPrecipitation">Probability of Precipitation</option>
  
        </select>
        <br></br>
        <button onClick={()=>{
          if (scroll===0){
            return;
          } else {
            setScroll(scroll-1);
          }
        }}>Previous</button>
        <button onClick={()=>{
          if (scroll===parseInt((data.properties[product].values).length)-1){
            return;
          } else {
            setScroll(scroll+1);
          }
        }}>Next</button>
        <p>Unit of measurement is {UNITS[product]}</p>
        <p>{loading}</p>
        <table className="table">
          <tbody >
          <tr>
            <td>{listofdates[0+scroll]}</td>
            <td>{listofdates[1+scroll]}</td>
            <td>{listofdates[2+scroll]}</td>
            <td>{listofdates[3+scroll]}</td>
            <td>{listofdates[4+scroll]}</td>
            <td>{listofdates[5+scroll]}</td>
            <td>{listofdates[6+scroll]}</td>
            <td>{listofdates[7+scroll]}</td>
            <td>{listofdates[8+scroll]}</td>
            <td>{listofdates[9+scroll]}</td>
            <td>{listofdates[10+scroll]}</td>
            <td>{listofdates[11+scroll]}</td>
          </tr>
          
          
          <tr>
            <td>{(info[0+scroll])}</td>
            <td>{(info[1+scroll])}</td>
            <td>{(info[2+scroll])}</td>
            <td>{(info[3+scroll])}</td>
            <td>{(info[4+scroll])}</td>
            <td>{(info[5+scroll])}</td>
            <td>{(info[6+scroll])}</td>
            <td>{(info[7+scroll])}</td>
            <td>{(info[8+scroll])}</td>
            <td>{(info[9+scroll])}</td>
            <td>{(info[10+scroll])}</td>
            <td>{(info[11+scroll])}</td>
            
          </tr>
          </tbody>
        </table>
        <br></br>
        <div className="info-box">
          <p>MWS AUTOMATIC DAY 1-7 FORECASTS</p>
          <p>ISSUED {update} UTC</p>
          <p>FORECASTER: AUTO</p>
        </div>
        
      </>
    )
  }

export default Forecasts;