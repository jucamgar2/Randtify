import { getAuthToken } from "../services/SpotifyAuthToken";
import { useEffect, useState } from "react";

const Home = () => {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
        setAuthToken(getAuthToken());
    }, [])

    return <>
        <h1>Holaaa</h1>
    </>
}

export default Home;