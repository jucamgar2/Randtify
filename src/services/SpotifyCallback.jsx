import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./SpotifyAuthToken";

const SpotifyCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const state = params.get("state");
            const error = params.get("error");
            if (error) {
                console.error("Spotify error:", error);
                navigate("/");
                return;
            }
            const savedState = localStorage.getItem("spotify_state");
            if (!code || !state || state !== savedState) {
                console.error("Invalid Spotify authorization response");
                navigate("/");
                return;
            }
            try {
                await getToken(code);
                navigate("/");
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        };
        authenticate();
    }, [navigate]);

    return <p>Conectando con Spotify...</p>;
};

export default SpotifyCallback;