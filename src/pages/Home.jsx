import { getToken } from "../services/SpotifyApiToken";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        getToken();
    }, [])

    return <>
        <h1>Holaaa</h1>
    </>
}

export default Home;