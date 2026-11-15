import { useEffect, useState } from "react";

const HomePlaylists = () => {
    const authToken = localStorage.getItem('access_token');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getUserPlaylists = async () => {
            const userPlaylists = await fetch(
                'https://api.spotify.com/v1/me/playlists?limit=50',
                {    
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            )
            const firstPlaylists = await userPlaylists.json();
            let items = firstPlaylists.items;
            items.sort((a, b) => Number(b.items.total) - Number(a.items.total));
            items = items.slice(0, 9);
            setPlaylists(items);
        }
        if(authToken) getUserPlaylists();
    }, [authToken]);

    return (
        <div className="playlists-home-container">
            <div className="playlists-items">
                {playlists && playlists.map((playlist) => (
                    <div className="playlists-item">
                        <img src={playlist.images[0].url} alt={playlist.name}/>
                        <p>
                            {playlist.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePlaylists;