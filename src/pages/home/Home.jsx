import { getAuthToken } from "../../services/SpotifyAuthToken";
import { useEffect, useState } from "react";
import TopArtists from "./components/TopArtists";

const Home = () => {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
        setAuthToken(getAuthToken());
    }, [])

    return <div>
        <h1>Randtify</h1>
        <div>
            <div>
                <h2>Tus artistas del mes</h2>
                <TopArtists />
            </div>
            
        </div>
       
    </div>
}

export default Home;