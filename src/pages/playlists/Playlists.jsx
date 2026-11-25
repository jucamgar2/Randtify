import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/16/solid";


const Playlists = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {

    });
    
    return <div>
        <h1>Tus playlists</h1>
        <div>
            {playlists.length == 0 && <h1>Cargando...</h1>}
            {playlists.length > 0 && playlists.map((playlist) => (
                <div>
                    <img src={playlist} alt={playlist}/>
                    <p>
                        {playlist}
                    </p>
                    <div className="play-container">
                        <PlayIcon className="play-icon-btn" />
                    </div>
                </div>
            ))
                
            }
        </div>
    </div>
}

export default Playlists;