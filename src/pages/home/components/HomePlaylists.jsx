import { useEffect, useState } from "react";

const HomePlaylists = () => {
    const authToken = localStorage.getItem('access_token');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getUserPlaylists = async () => {
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
            items.sort((a, b) => Number(a.items.total) - Number(b.items.total));
            setPlaylists(items);
        }
        if(authToken) getUserPlaylists();
    })

    return
}

export default HomePlaylists;