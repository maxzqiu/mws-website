import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Forecasts from "./detailedForecasts"
import Radar from "./radar"
import { LOCATIONS, UNITS, PRODUCTS, MARINELOCATIONS, MARINEPRODUCTS} from "./directory.jsx"




export function Presentations(){
  return (
    <>
      <h2>MWS Presentations</h2>
      <div className="presentations">
        <button><Link to="/presentations/santa-ana-winds-in-southern-california">
        
          
          <img width="500px" src="/santa-ana-winds-poster.png" alt="Santa Ana Winds Presentation Poster"></img>
        
        </Link></button>
        <button><Link to="/presentations/upper-level-and-surface-high-and-low-pressure">
        
        
          <img width="500px" src="/high-and-low-pressure-poster.png" alt="High and Low Pressure Presentation Poster"></img>
        
        </Link></button>
        <button><Link to="/presentations/causes-of-the-marine-layer-in-coastal-southern-california">
        
 
          <img width="500px" src="/marine-layer-poster.png" alt="The Marine Layer Presentation Poster"></img>
        
        </Link></button>
        <button><Link to="/presentations/active-wildfire-season-2024">
        
 
          <img width="500px" src="/wildfire-season-poster.png" alt="Active Wildfire Season Presentation Poster"></img>
        
        </Link></button>
      </div>
      
    </>
  )
}
function CreatePage({title, name}){
  return (
    <>
    <h2>{title}</h2>
    <embed
            src={name}
            type="application/pdf"
            className="embed"
            
            >
    </embed>
    </>
  )
}

export function WeatherReports(){
  return (
    <>
      <h2>Latest MWS Weather Report</h2>
      <h4><Link to="/weather-reports/minnesota">Click here to see Minnesota weather reports! </Link></h4>
      <p>Note: Please double check the date to make sure you are not viewing an outdated presentation! </p>
      <p>This display may not work on mobile phones. A laptop or desktop computer is recommended.</p>
      <embed
            src={"/weather-report.pdf"}
            type="application/pdf"
            className="embed"
            
            >
    </embed>
    
    </>
  )
}

export function MNWeatherReports(){
  return (
    <>
      <h2>Latest Minnesota Weather Report</h2>
      <p>Note: Please double check the date to make sure you are not viewing an outdated presentation! </p>
      <p>This display may not work on mobile phones. A laptop or desktop computer is recommended.</p>
      <embed
            src={"/mn-weather-report.pdf"}
            type="application/pdf"
            className="embed"
            
            >
    </embed>
    
    </>
  )
}

export function About(){
  return (
    <>
      <h3>About MWS</h3>
      <p className="about">Max's Weather Service is a weather office that delivers forecasts for Orange and Los Angeles Counties. 
        Our products include forecast discussions, text forecasts, and advisories during severe weather, all of which are available on email. 
        You can see our automated forecasts and observations at the links provided in the Home page. 
      </p>
      <p className="about">Questions? Email us and we will get back to you as soon as possible!  </p>
    </>
  )
}



export function Home(){
  return (
    <>
      <div className="news">
        <h4 className="mws_info">MWS Info</h4>
        <Link to="/info/daily-hazards-table"><button>MWS General Forecast Product: Daily Hazards Table Info</button></Link>
        <br></br>
        <Link to="/info/wet_bulb_globe_temp"><button>What is Wet Bulb Globe Temperature?</button></Link>
      </div>
      
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
  let [checked,setChecked]=useState(false);
  
  return (
    <>
      <nav>
      <button
        className="toggle-menu"
        onClick={() => {
          if (checked) {
            setChecked(false);
          } else {
            setChecked(true);
          }
        }}
      >
        <img className="menu" src="hamburger_menu.png"></img>
      </button>

        <ul className={checked ? "disappear" : ""} >
          <div className="navigation-bar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/forecasts">Forecasts</Link></li>
            <li><Link to="/weather-reports">Weather Reports</Link></li>
            <li><Link to="/presentations">Presentations</Link></li>
            <li><Link to="/radar">Radar</Link></li>
            <li><Link to="/about">About MWS</Link></li>

            
            
          </div>
          
          
        </ul>
      </nav>
    </>
  )
}

function App() {
  let [time,setTime]=useState(null);
  let [utcTime,setUtcTime]=useState(null);
  function getTime(){
    setTime(new Date().toLocaleString("en-GB", {timeZone: "America/Los_Angeles"}).toString().substring(12,20))
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
        <table id="time" className="time">
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
          <Route path="/presentations" element={<Presentations />}></Route>
          <Route path="/weather-reports" element={<WeatherReports />}></Route>
          <Route path="/weather-reports/minnesota" element={<MNWeatherReports />}></Route>
          <Route path="/forecasts" element={
            <>
              
              <button className="go-to-marine"><Link to="/forecasts/marine">Click here for marine forecasts.</Link></button>
              <h2>MWS Detailed Forecasts</h2>
              <Forecasts products={PRODUCTS} locations={LOCATIONS} units={UNITS} area="land" />
            </>}></Route>
          <Route path="/presentations/santa-ana-winds-in-southern-california" element={<CreatePage 
          title="Santa Ana Winds in Southern California and Analysis on the Jan 7-8, 2025 Santa Ana Wind Event That Fueled The Devastating LA Wildfires"
          name="/Santa-Ana-Winds.pdf"
          />}></Route>

          <Route path="/info/daily-hazards-table" element={<CreatePage 
          title="MWS Daily Hazards Table Information"
          name="/daily-hazards-table-info.pdf"
          />}/>
          <Route path="/presentations/upper-level-and-surface-high-and-low-pressure" 
          element={<CreatePage  title="Upper Level and Surface High and Low Pressure"
            name="/upper-level-and-surface-high-and-low-pressure.pdf" />
          }
          ></Route>
          <Route path="/presentations/causes-of-the-marine-layer-in-coastal-southern-california" 
          element={<CreatePage title="Causes of the Marine Layer in Coastal Southern California"
          name="/the-marine-layer-in-coastal-southern-california.pdf"/>}></Route>
          <Route path="/presentations/active-wildfire-season-2024" 
          element={<CreatePage title="An Active Wildfire Season is Expected In Fall 2024"
          name="/Very-Active-Wildfire-Season.pdf"/>}></Route>
          <Route path="/forecasts/marine" 
          element={
            <>
            <h2>MWS Detailed Marine Forecasts</h2>
              <Forecasts products={MARINEPRODUCTS} locations={MARINELOCATIONS} units={UNITS} area={"marine"} />
            </>}></Route>
          <Route path="/info/wet_bulb_globe_temp" element={
            <CreatePage title="What is Wet Bulb Globe Temperature?" name="/wet_bulb_globe_temp_info.pdf"></CreatePage>
          }></Route>
          <Route path="/radar" element={
            <Radar />
          }></Route>
          
          
        </Routes>
        <br></br>
        <br></br>
        <p>This website is still being built! Make sure to check back later to see new features! </p>
      </Router>
      
    </>
    
  )
}

export default App