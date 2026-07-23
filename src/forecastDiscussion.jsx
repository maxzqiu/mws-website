import { useState, useEffect } from 'react'

function ForecastDiscussion(){
    let [data,setData]=useState(null);
    useEffect(()=>{
            async function run(){
                
                
                let payload={
                    forecast:"discussion",
                    number:0
                }
                // let sendover=JSON.stringify(payload)
                const options = {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                };
                  
                let res = await fetch("https://server.maxweatherservice.com/api/request", options);
                let response=await res.json();
                
                setData(response);
    
                  
            }
            run();
        },[])
        if (!data){
            return (
                <p>LOADING</p>
            )
        }else {
            return (
                <>
                    <div className="synopsis">
                        <h4>Forecaster's Discussion</h4>
                        <p>Updated: {(new Date(data.time[0].time)).toString()}</p>
                        <div className="synopsis-text-box">
                            <div></div>
                                <p className="synopsis-text"><strong>Next 5 Days: </strong>{data["shortterm"][0]["shortterm"]}</p>
                            <div></div>
                        </div>
                        <div className="synopsis-text-box">
                            <div></div>
                                <p className="synopsis-text"><strong>Extended Range Discussion: </strong>{data["longterm"][0]["longterm"]}</p>
                            <div></div>
                        </div>
                        <div className="synopsis-text-box">
                            <div></div>
                                <p className="synopsis-text"><strong>MARINE: </strong>{data["marine"][0]["marine"]}</p>
                            <div></div>
                        </div>
                        
                        <div className="synopsis-text-box">
                            <div></div>
                                <p className="synopsis-text"><strong>ADDITIONAL NOTES/REMARKS: </strong>{data["remarks"][0]["remarks"]}</p>
                            <div></div>
                        </div>
                        
                    </div>
                    
    
                </>
            )
        }
}

export default ForecastDiscussion