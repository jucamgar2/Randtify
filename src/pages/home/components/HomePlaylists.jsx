import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/16/solid";

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

    const randomReproduction = async (id) => {
        let tracks = [];
        let next = `https://api.spotify.com/v1/playlists/${id}/items?limit=50`;
        while(next != null) {
            const plalylistItems = await fetch(
                next,
                {    
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            );
            const items = await plalylistItems.json();
            tracks.push(...items.items
                    .map(element => element.item)
                    .filter(item => item !== null)
            );
            next = items.next;
        }
        let maxSize = Math.min(50, tracks.length);
        const body = []
        while(maxSize > 0 ) {
            const random = Math.floor(Math.random() * tracks.length);
            if(tracks[random].id){
                body.push(`spotify:track:${tracks[random].id}`);
                tracks.splice(random, 1);
                maxSize--;
            }
            
        }
        const response = await fetch(
            "https://api.spotify.com/v1/me/player/play",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    uris: body
                })
            },
        );
        if(!response.ok){
            console.error(response.status);
        }
    }

    return (
        <div className="playlists-home-container">
            <div className="playlists-items">
                {playlists.length > 0 && playlists.map((playlist) => (
                    <div className="playlists-item">
                        <img src={playlist.images[0].url} alt={playlist.name}/>
                        <p>
                            {playlist.name}
                        </p>
                        <div className="play-container" onClick={() => {randomReproduction(playlist.id)}}>
                            <PlayIcon className="play-icon-btn" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePlaylists;