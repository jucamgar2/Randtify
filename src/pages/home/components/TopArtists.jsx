import { useEffect, useState } from 'react';
import './tops.css';

const TopArtists = () => {

    const [topArtists, setTopArtists] = useState(undefined);
    const authToken = localStorage.getItem("access_token");

    useEffect(() => {
        const getTopArtistsInfo = async () => {
            const response = await fetch(
                "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            );
            const data = await response.json();
            console.log(data);
            setTopArtists(data);
        }
        if(authToken) getTopArtistsInfo();
    }, [authToken])

    return (
        <div className='top-container'>
            <div className="top-items">
                {topArtists && topArtists.items.map((topArtist) => (
                    <div className='top-item'>
                        <img src={topArtist.images[0].url} alt={topArtist.name}/>
                        <p>{topArtist.name}</p>
                    </div>
                    
                ))}
            </div>
            
        </div>
    )

}

export default TopArtists;