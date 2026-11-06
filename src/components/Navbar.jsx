import './navbar.css';
import { HomeIcon, PlayCircleIcon, ListBulletIcon } from '@heroicons/react/16/solid';

const Navbar = () => {

    return (
        <div className="nav-bar">
                <HomeIcon className='icon'/>
                <PlayCircleIcon className='icon' />
                <ListBulletIcon className="icon" />
        </div>
    )
}

export default Navbar;