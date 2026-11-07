import './navbar.css';
import { HomeIcon, PlayCircleIcon, ListBulletIcon } from '@heroicons/react/16/solid';

const Navbar = () => {

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
            
        </div>
    )
}

export default Navbar;