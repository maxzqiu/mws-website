import { useState,useEffect } from 'react'



function conversion(value,product){
  if (product==="temperature" || product==="dewpoint" || product==="maxTemperature" || product==="minTemperature" || product==="apparentTemperature" || product==="wetBulbGlobeTemperature"){
    return Math.round(value*1.8+32)
  } else if (product==="windSpeed" || product==="windGust"){
    return Math.round(value/1.852)
  } else if (product==="quantitativePrecipitation"){
    return Math.ceil((value/25.4)*100)/100;
  } else if (product==="waveHeight" || product==="swellHeight" || product==="windWaveHeight") {
    return Math.ceil((value*3.28)*10)/10
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
    //console.log(parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,31)));
    return parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,31));
  } else {
    //console.log(parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,32)));
    return parseInt(validTime.substring(27,28))*24+parseInt(validTime.substring(30,32));
  }
}

function createData(data,product,conversion){
    let display=[]
        let validTime=null;
        let current=0;
        

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
          
          for (let i=7;i<13;i+=1){
            display[i]=null;
          }
          
        }
  return display;
}

function Forecasts({ products, locations, units, area }){
    let [data,setData]=useState(null);
    let [location,setLocation]=useState(Object.keys(locations)[0]);
    let [product,setProduct]=useState((products)[0][0]);
    let [scroll,setScroll]=useState(0);
    let [info,setInfo]=useState("");
    let [listofdates,setListofdates]=useState([]);
    let [update,setUpdate]=useState("");
    let [loading,setLoading]=useState("LOADING");
    let [currentLocation,setCurrentLocation]=useState("");
    let [hazards,setHazards]=useState(<td>NONE</td>);
    let [dataDirectory,setDataDirectory]=useState(null);
    
    let landHazards=["coldWeather","frost","freeze","excessiveHeat","fireWeather","wind","flooding","dmgWind","sgnftFlooding","pdsRedFlag"];
       
       let marineHazards=["mrglSmallCraft","smallCraft","nearGale","gale","hazardousSeas","lightning","storm","hurricane-force"];
       function scanHazards(index,dataDirectory){
        console.log(index);
        setHazards("NONE");
        if (area==="land"){
         for (let i=0;i<landHazards.length+1;i+=1){
           for (let j=0;j<12;j+=1){
             if (i===0){ // Cold Weather
               if (dataDirectory["temperature"][j+index]<42 || dataDirectory["apparentTemperature"][j+index]<37){
                 setHazards(<td className="blue">COLD</td>);
               } 
             }else if (i===1){
               if (dataDirectory["temperature"][j+index]<36){
                 setHazards(<td className="blue">FROST</td>);
               }
             } else if (i===2){
               if (dataDirectory["temperature"][j+index]<32){
                 setHazards(<td className="yellow">FREEZE</td>);
               }
             } else if (i===3){
               if (dataDirectory["temperature"][j+index]>90 || dataDirectory["apparentTemperature"][j+index]>90 || dataDirectory["wetBulbGlobeTemperature"][j+index]>80){
                 setHazards(<td className="orange">EXCESSIVE HEAT</td>);
               }
             } else if (i===4){
              if (dataDirectory["windSpeed"][j+index]>25 || dataDirectory["windGust"][j+index]>45){
                setHazards(<td className="yellow">WIND</td>);
              }
             } else if (i===5){
               
               if (dataDirectory["windSpeed"][j+index]>20 && dataDirectory["relativeHumidity"][j+index]<25 && dataDirectory["temperature"][j+index]>50){
                setHazards(<td className="orange">RED FLAG</td>);
              } else if (dataDirectory["windGust"][++index]>40 && dataDirectory["relativeHumidity"][j+index]<25 && dataDirectory["temperature"][j+index]>50){
                setHazards(<td className="orange">RED FLAG</td>);
              } else if (dataDirectory["windGust"][j+index]>30 && dataDirectory["relativeHumidity"][j+index]<15 && dataDirectory["temperature"][j+index]>50){
                setHazards(<td className="orange">RED FLAG</td>);
              }
             } else if (i===6){
               if (dataDirectory["quantitativePrecipitation"][j+index]>0.5){
                 setHazards(<td className="orange">FLOODING</td>);
               }
             } else if (i===7){
               if (dataDirectory["windSpeed"][j+index]>35 || dataDirectory["windGust"][j+index]>60){
                 setHazards(<td className="red">DAMAGING WIND</td>);
               }
             } else if (i===8){
               if (dataDirectory["quantitativePrecipitation"][j+index]>1){
                 setHazards(<td className="purple">SGNFT FLOODING</td>);
               }
             } else if (i===9){
               if (dataDirectory["windSpeed"][j+index]>30 && dataDirectory["relativeHumidity"][j+index]<15 && dataDirectory["temperature"][j+index]>60){
                 setHazards(<td className="purple">PDS RED FLAG</td>);
               } else if (dataDirectory["windGust"][j+index]>55 && dataDirectory["relativeHumidity"][j+index]<10 && dataDirectory["temperature"][j+index]>60){
                 setHazards(<td className="purple">PDS RED FLAG</td>);
               } else if (dataDirectory["windGust"][j+index]>35 && dataDirectory["relativeHumidity"][j+index]<7 && dataDirectory["temperature"][j+index]>60){
                 setHazards(<td className="purple">PDS RED FLAG</td>);
               }
             } 
               
             
             
           }
         }
       } else if (area==="marine"){
         for (let i=0;i<marineHazards.length+1;i+=1){
           for (let j=0;j<12;j+=1){
             if (i===0){
               if (dataDirectory["windSpeed"][j+index]>=12 || dataDirectory["windGust"][j+index]>=15){
                 setHazards(<td className="blue">MRGL SMALL CRAFT</td>);
               } else if (dataDirectory["waveHeight"][j+index]>=5){
                 setHazards(<td className="blue">MRGL SMALL CRAFT</td>)
               }
             } else if (i===1){
               if (dataDirectory["windSpeed"][j+index]>=21 || dataDirectory["windGust"][j+index]>=21){
                 setHazards(<td className="yellow">SMALL CRAFT</td>)
               } else if (dataDirectory["waveHeight"][j+index]>=7){
                 setHazards(<td className="yellow">SMALL CRAFT</td>)
               }
             } else if (i===2){
               if (dataDirectory["windSpeed"][j+index]>=28 || dataDirectory["windGust"][j+index]>=28){
                 setHazards(<td className="orange">NEAR GALE</td>);
               }
             } else if (i===3){
               if (dataDirectory["windSpeed"][j+index]>=34 || dataDirectory["windGust"][j+index]>=34){
                 setHazards(<td className="orange">GALE</td>);
               }
             } else if (i===4){
               if (dataDirectory["waveHeight"][j+index]>=12){
                 setHazards(<td className="red">HAZARDOUS SEAS</td>)
               }
             } else if (i===5){
               if (dataDirectory["lightningActivityLevel"][j+index]>=3){
                 setHazards(<td className="red">LIGHTNING</td>)
               }
             } else if (i===6){
               if (dataDirectory["windSpeed"][j+index]>=48 || dataDirectory["windGust"][j+index]>=48){
                 setHazards(<td className="purple">STORM</td>)
               }
             } else if (i===7){
               if (dataDirectory["windSpeed"][j+index]>=64 || dataDirectory["windGust"][j+index]>=64){
                 setHazards(<td className="purple">HURRICANE FORCE</td>)
               }
             } 
           }
 
         }
       }
       }
    useEffect(()=>{
      setLoading("LOADING")
      async function run(){
        
          
        
        if (currentLocation!==location){
          let res= await fetch(locations[location]);
          data= await res.json();
          setData(data);
          setCurrentLocation(location);
          console.log("The API is called. ")
          console.log(data);
        }
        setUpdate((data.properties.updateTime).substring(11,13)+(data.properties.updateTime).substring(14,16));
        
        
        
        //console.log("CREATED! ")
        
        // POTENTIAL HAZARDS CODE HERE
        
        let dataDir={}
        setLoading("");
        for (let i=0;i<products.length;i+=1){
          dataDir[products[i][0]]=createData(data,products[i][0],conversion)
        }
        console.log(dataDir);
        setInfo(createData(data,product,conversion));
        setListofdates(dates(data,product));
        console.log(dates(data,product))


        setDataDirectory(dataDir);
        /* Land hazards: Cold Weather, Frost, Freeze, Excessive Heat, Fire Weather, Wind, Flooding, Dmg Wind, Sgnft Flooding, PDS Red Flag, 
            Marine hazards: Mrgl Small Craft, Small Craft, Near-Gale, Gale, Hazardous Seas, Lightning, Storm, Hurricane-Force
        */
       
       
        scanHazards(0,dataDir);

        
      
      }
      run();
    },[product,location]
    
    )
    
    return (
      <>
        
        <h4 className="important">IMPORTANT! This product is EXPERIMENTAL until March 31, 2025. Questions, comments or suggestions? Let us know! </h4>
        <label htmlFor="location">Choose Location:</label>
        <select id="location" onChange={(e)=>{setLocation(e.target.value)}}>
         
          {Object.keys(locations).map((i,key)=><option key={key} value={i}>{i}</option>)}
        </select>
        <label htmlFor="productSelection">Select Product: </label>
        
        <select id="productSelection" onChange={(e)=>{
          setProduct(e.target.value);
          setScroll(0);
          }}>
          
          {products.map((i,key)=><option key={key} value={i[0]}>{i[1]}</option>)}
  
        </select>
        <br></br>
        <button onClick={()=>{
          if (scroll===0){
            scanHazards(0,dataDirectory);
            return;
            
          } else {
            setScroll(scroll-1);
            scanHazards(scroll-1,dataDirectory);
          }
        }}>Previous</button>
        <button onClick={()=>{
          if (scroll===(info.length)-1){

            return;
          } else if (scroll===(info.length)-12){
            setScroll(scroll+1);
          
          } else {
            setScroll(scroll+1);
            scanHazards(scroll+1,dataDirectory);
          }
        }}>Next</button>
        <p>Unit of measurement is {units[product]}</p>
        <p>{loading}</p>
        <div className="one-line">
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
        <table className="potential-hazard">
          <tbody>
            <tr>
              <th>Potential Hazard</th>
            </tr>
            <tr>
              {hazards}
            </tr>
          </tbody>
        </table>
          
        </div>
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
