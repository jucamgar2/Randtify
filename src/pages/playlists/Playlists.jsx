import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/16/solid";
import './playlists.css';


const Playlists = () => {
    const authToken = localStorage.getItem('access_token');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getAllUserPlaylists = async () => {
            const userPlaylists = [];
            let next = 'https://api.spotify.com/v1/me/playlists?limit=50';
            while(next != null) {
                const playlists = await fetch(
                    next,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": `Bearer ${authToken}`
                        }
                    }
                );
                const items = await playlists.json();
                userPlaylists.push(...items.items);
                next = items.next;
            }
            setPlaylists(userPlaylists);
        }
        if(authToken) getAllUserPlaylists();
    }, [authToken]);
    
    return <div className="playlists">
        <h1>Tus playlists</h1>
        <div className="playlists-container">
            <div className="all-playlists-items">
                {playlists.length === 0 && <h1>Cargando...</h1>}
                {playlists.length > 0 && playlists.map((playlist) => (
                    <div className="all-playlists-item">
                        <img src={playlist.images[0].url} alt={playlist.name}/>
                        <p>
                            {playlist.name}
                        </p>
                        <div className="play-container">
                            <PlayIcon className="play-icon-btn" />
                        </div>
                    </div>
                ))
                    
                }
            </div>
        </div>
        
    </div>
}

export default Playlists;