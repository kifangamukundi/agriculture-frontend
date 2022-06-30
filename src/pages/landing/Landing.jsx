import "./landing.css";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
export default function Landing() {

  const isLoggedIn = useSelector((state) => state?.users?.currentUser?.accessToken);


  return (
    <div className="home">
      <header className="landingHeader">
        <div className="landingLogo">
          <img src="https://img.freepik.com/free-vector/logo-agricultural-industry-with-tractor-shovel-elements_116238-52.jpg?w=740" width="158px"/>
        </div>
        <nav className="landingNav">
          <ul className="landingItems">
            <li className="landingItem">Home</li>
            <li className="landingItem">About</li>
            <li className="landingItem">Contact</li>
            {isLoggedIn
              ? <Link to="/Dashboard"><li className="landingItem landingLogin">Dashboard</li></Link>
              : <Link to="/Login"><li className="landingItem landingLogin">Login</li></Link>
            }
          </ul>
        </nav>
      </header>
      <main className="landingMain">
        <div className="landingLeft">
          <h1 className="landingH1">Agriculture Management</h1>
          <h2 className="landingH2">Made Easy</h2>
          <p className="landingInfo">
            Keep track of your farming activities and thus enhance your strategy
            and realize high outputs and profits.
          </p>
          {isLoggedIn
              ? <Link to="/Dashboard"><li className="landingItem landingLogin">Dashboard</li></Link>
              : <Link to="/Register"><button className="landingCTA">Start Today</button></Link>
            }
        </div>
        <div className="landingRight">
            <img src="https://img.freepik.com/free-vector/happy-female-farmer-working-farm-feed-population-flat-vector-illustration-cartoon-farm-with-automation-technology_74855-8400.jpg?t=st=1655589590~exp=1655590190~hmac=16d6aad57d5523471bcddc87fa1452afacba06f85471dd171c20d8c22a51e161&w=900" className="landingHeroImg" />
        </div>
      </main>
    </div>
  );
}
