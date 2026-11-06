import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutWithNavbar = () => {
    return (
        <div className="layout">
            <div>
                <Navbar/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
            
        </div>
    )
}

export default LayoutWithNavbar;