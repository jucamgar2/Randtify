import { getAuthToken } from "../../services/SpotifyAuthToken";
import { useEffect, useState } from "react";

const Home = () => {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
        setAuthToken(getAuthToken());
    }, [])

    return <div>
        <h1>Holaaa</h1>
    </div>
}

export default Home;