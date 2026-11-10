import { useEffect, useState } from 'react';
import './tops.css';

const Recommendations = () => {
    const authToken = localStorage.getItem('access_token');
    const [recommendations, setRecommendations] = useState(undefined);

    useEffect(() => {
        const getRecommendations = async () => {
            let recommendationsRetrieved = [];
            const randomTopArtistIndex = Math.floor(Math.random()*50);
            const topArtist = await fetch(
                `https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=1&offset=${randomTopArtistIndex}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            );
            const artist = await topArtist.json();
            const artistId = artist.items[0].id;
            const albumsOfArtist = await fetch(
                `https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            )
            const albums = await albumsOfArtist.json();
            for(let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * albums.limit);
                const album = albums.items[randomIndex];
                const albumSize = Number(album.total_tracks);
                const randomTrackIndex = Math.floor(Math.random() * albumSize);
                const trackFromAlbum = await fetch(
                    `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=1&offset=${randomTrackIndex}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": `Bearer ${authToken}`
                        }
                    }
                );
                let track = await trackFromAlbum.json();
                track.items[0].album = album;
                recommendationsRetrieved = [...recommendationsRetrieved, track.items[0]];
            }
            setRecommendations(recommendationsRetrieved);
        }
        if(authToken) getRecommendations();
    }, [authToken]);

    return (
        <div className='top-container'>
            <div className="top-items">
                {recommendations && recommendations.map((track) => (
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