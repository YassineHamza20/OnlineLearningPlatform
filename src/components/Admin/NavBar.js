import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function NavBar(props) {
    const navigate = useNavigate()
    const info = useSelector(state => state.adminData.admin)


    const handleLogout = () => {
        localStorage.clear()
        navigate('/backOffice/admin/login')
    }
    return (
        
        <div className="fixed w-full flex shadow-md items-center justify-between h-14 text-black z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-white dark:bg-gray-800 border-none">
            <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
            <span className="hidden md:block">{info.firstname + " "+info.lastname}</span>
            </div>
            <div className="flex justify-between items-center h-14 bg-white dark:bg-gray-800 header-right">
            <div className="flex-grow"></div>
            <ul className="flex items-center">
                <li>
                <button onClick={handleLogout} className="flex items-center mr-4 hover:text-button">
                    <span className="inline-flex mr-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </span>
                    Logout
                </button>
                </li>
            </ul>
            </div>
        </div>
    );
}

export default NavBar;