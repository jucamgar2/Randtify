import { useEffect, useState } from 'react';
import './navbar.css';
import { HomeIcon, PlayCircleIcon, ListBulletIcon } from '@heroicons/react/16/solid';

const Navbar = () => {

    const authToken = localStorage.getItem('access_token');
    const [userImage, setUserImage] = useState("");
    const [userName, setUserName] = useState("");
    const [spotifyUrl, setSpotifyUrl] = useState("");

    useEffect(() => {
        const getCurrentUserInfo = async () => {
            const response = await fetch(
                'https://api.spotify.com/v1/me',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    }
                }
            );
            const data = await response.json();
            setUserName(data.display_name);
            setUserImage(data.images[0].url);
            setSpotifyUrl(data.external_urls.spotify);
        };
        if(authToken) getCurrentUserInfo();
    }, [authToken])

    return (
        <div className="nav-bar">
            <div className='icon-container'>
                <HomeIcon className='icon'/>
                <p>Inicio</p>
            </div>
            
            <div className='icon-container'>
                <PlayCircleIcon className='icon' />
                <p>Reproducción</p>
            </div>
            
            <div className='icon-container'>
                <ListBulletIcon className="icon" />
                <p>Playlists</p>
            </div>

            <div className='icon-container' onClick={() =>window.open(spotifyUrl)}>
                <img src={userImage} alt={userName} className='icon'/>
                <p>{userName}</p>
            </div>
            
        </div>
    )
}

export default Navbar;