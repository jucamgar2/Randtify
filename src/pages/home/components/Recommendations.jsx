import { useEffect, useState } from 'react';
import './tops.css';

const Recommendations = () => {
    const authToken = localStorage.getItem('access_token');
    const [recommendations, setRecommendations] = useState(undefined);

    useEffect(() => {
        const getRecommendations = async () => {
            
            const response = await fetch(
                "https://api.spotify.com/v1/recommendations?limit=5",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            );
            const data = await response.json();
            setRecommendations(data);
        }
        if(authToken) getRecommendations();
    }, [authToken]);

    return (
        <div className='top-container secondary'>
            <div className="top-items">
                {recommendations && recommendations.items.map((track) => (
                    <div className='top-item'>
                        <img src={track.album.images[0].url} alt={track.name}/>
                        <p>
                            {track.name} - {track.artists.map(artist => artist.name).join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recommendations;