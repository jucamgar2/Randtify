import { useEffect, useState } from 'react';
import './tops.css';

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(undefined);
    const authToken = localStorage.getItem("access_token");

    useEffect(() => {
        const getTopTracksInfo = async () => {
            const response = await fetch(
                "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            );
            const data = await response.json();
            setTopTracks(data);
        }
        if(authToken) getTopTracksInfo();
    }, [authToken])

    return (
        <div className='top-container secondary'>
            <div className="top-items">
                {topTracks && topTracks.items.map((topTrack) => (
                    <div className='top-item'>
                        <img src={topTrack.album.images[0].url} alt={topTrack.name}/>
                        <p>
                            {topTrack.name} - {topTrack.artists.map(artist => artist.name).join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopTracks;