import { PlayCircleIcon } from "@heroicons/react/16/solid";
import "./SongReproductor.css";

const SongReproductor = () => {
  return <PlayCircleIcon className="play-icon" />;
};

export default SongReproductor;

export const reproduceSong = async (trackId) => {
    const authToken = localStorage.getItem('access_token');

    const body = {
        uris: [`spotify:track:${trackId}`]
    };

    const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(body)
        },
    );

    if(!response.ok){
        console.error(response.status);
    }
};