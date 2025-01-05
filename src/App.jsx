import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

export function About(){
  return (
    <>
      <h3>About MWS</h3>
      <p className="about">Max's Weather Service is a weather office that delivers forecasts for Orange and Los Angeles Counties. 
        Our products include forecast discussions, text forecasts, and advisories during severe weather, all of which are available on email. 
        You can see our automated forecasts and observations at the links provided in the Home page. 
      </p>
      <p className="about">Questions? Email maxzqiu@gmail.com and we will get back to you as soon as possible!  </p>
    </>
  )
}

export function Home(){
  return (
    <>
      <div className="home">
        <div>
        <a href="https://forecasts-mws.vercel.app"><img className="icon" src="\Screenshot (2674).png" alt="Forecasts"></img></a>
        <p>7-Day Forecasts</p>
        </div>
        <div>
        <a href="https://observation-mws.vercel.app"><img className="icon" src="\weather_station.png" alt="Observations"></img></a>
        <p>Current Observations</p>
        </div>
      </div>
      
      
    </>
  )
}

export function NavBar(){
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About MWS</Link></li>
        </ul>
      </nav>
    </>
  )
}

function App() {
  let [time,setTime]=useState(null);
  let [utcTime,setUtcTime]=useState(null);
  function getTime(){
    setTime(new Date().toString().substring(16,24))
    setUtcTime((new Date().toUTCString().substring(17,26)))
  }

  setInterval(getTime,1000)
 

  return (
    <>
      
      
      <Router>
        <div className="one-line">
          <h2>Max's Weather Service Newport Beach CA</h2>
          <img className="logo" src=".\Screenshot (1053).png" alt="MWS Logo"></img>
        </div>
        
        <h4>Welcome to our website! </h4>
        <br></br>
        <label htmlFor="time"><b>CURRENT TIME</b></label>
        <table id="time">
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
        
        
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <br></br>
        <br></br>
        <p>This website is still being built! Make sure to check back later to see new features! </p>
      </Router>
      
    </>
    
  )
}

export default App
