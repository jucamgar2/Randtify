import { getAuthToken } from "../../services/SpotifyAuthToken";
import { useEffect, useState } from "react";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import './home.css';
import Recommendations from "./components/Recommendations";

const Home = () => {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
        setAuthToken(getAuthToken());
    }, [])

    return <div>
        <h1>Randtify</h1>
        <div>
            <div className="home-content">
                <div>
                    <h2>Tus artistas del mes</h2>
                    <TopArtists />
                </div>
                <div>
                    <h2>Tus canciones del mes</h2>
                    <TopTracks />
                </div>
                <div>
                    <h2>Recomendaciones</h2>
                    <Recommendations />
                </div>
                
            </div>
            
        </div>
       
    </div>
}

export default Home;