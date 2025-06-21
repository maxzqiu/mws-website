import { useState,useEffect } from 'react'

function Radar(){
    let [station,setStation]=useState("KSOX")
    let url="https://radar.weather.gov/ridge/standard/"+station+"_loop.gif"
    return (
        <>
            <h2>National Weather Service Doppler Radar</h2>
            <label htmlFor="center">Center Map On: </label>
            <select onChange={(e)=>setStation(e.target.value)} id="center">
                <option value="KSOX">Santa Ana Mountains - KSOX</option>
                <option value="KNKX">San Diego - KNKX</option>
                <option value="KVTX">Los Angeles/Oxnard - KVTX</option>
                <option value="KEYX">Edwards AFB - KEYX</option>
                <option value="KMPX">Twin Cities - KMPX</option>
            </select>
            <br></br>
            <embed src={url} className="radar"/>
        </>
        

    )
}

export default Radar