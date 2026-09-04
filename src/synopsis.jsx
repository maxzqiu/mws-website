import { useState,useEffect } from 'react'
import './synopsis.css'



function Synopsis(){
    let [data,setData]=useState(null)

    
    useEffect(()=>{
        async function run(){
            
            
            let payload={
                forecast:"synopsis",
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
                    
                    <div className="synopsis-container-header">
                        <h4>DAILY SYNOPSIS</h4>
                    </div>
                    
                    
                    <div>
                        <p>Last issued {new Date(parseInt((data.time[0].time))).toString()}</p>
                    
                    <div className="synopsis-text-box">
                       
                        <p className="synopsis-text">{data.text[0].text}</p>
                        
                    </div>
                    </div>
                    
                    
                </div>
                

            </>
        )
    }
    
}

export default Synopsis