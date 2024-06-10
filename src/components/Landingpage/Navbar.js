import { BsRobot } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import Drawer from "./Drawer";


 

function NavBar() {
    //handle drawer visibility
    const [isOpen, setIsOpen] =useState(false)

    
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    console.log("path: ", path, "segments: ", segments);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    
    
    const handleDrawer = () => {
        setIsOpen(true)
    }


    //handle DropDown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


    return (
        <>
            <div className="h-[10%] w-full bg-backg z-10 flex items-center space-x-8 pr-10 pl-10 md:pr-10 ">
                {
                    path ==="/"?
                    <NavLink to="/"
                        className="flex lg:hidden justify-center nav-link items-center h-full w-[150px] space-x-2"
                    >
                        <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                        <div className="font-bold text-xl ">LINGUIFY</div>
                    </NavLink>
                    :
                    <NavLink to="/landingpage"
                    className="flex lg:hidden justify-center nav-link items-center h-full w-[150px] space-x-2"
                    >
                        <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                        <div className="font-bold text-xl ">LINGUIFY</div>
                    </NavLink>
                }
                    <nav className="justify-center relative hidden lg:flex items-center w-auto h-full">
                        {
                            path ==="/"?
                            <NavLink to="/"
                                className="flex justify-center nav-link items-center h-full w-[150px] space-x-2"
                            >
                                <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                                <div className="font-bold text-xl ">LINGUIFY</div>
                            </NavLink>
                            :
                            <NavLink to="/landingpage"
                                className="flex justify-center nav-link items-center h-full w-[150px] space-x-2"
                            >
                                <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                                <div className="font-bold text-xl ">LINGUIFY</div>
                            </NavLink>


                        }
                        <NavLink
                            to="/landingpage/Tutors"
                            className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center"
                        >
                            <span className="text-darkg">Tutors</span>
                        </NavLink>
                        <NavLink
                            to="/landingpage/Courses"
                            className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center"
                        >
                            <span className="text-darkg">Courses</span>
                        </NavLink>
                        <NavLink
                            to="/landingpage/LinguaBuddy"
                            className="flex nav-link no-underline h-full w-[140px] justify-center cursor-pointer items-center space-x-2"
                        >
                            <BsRobot color="#F28585" size="22"></BsRobot>
                            <span className="text-darkg">LinguaBuddy</span>
                        </NavLink>
                        <div className="animation startprofile"></div>
                    </nav>
                    <div className="flex-grow"></div>
                    <div className=" ml-auto flex items-center w-auto h-full space-x-2 lg:space-x-6">
                        {/* Buttons */}
                        <div className="hidden lg:flex">
                          <NavLink to="/learner/signin" className="text-elements font-bold py-2 px-8 mr-2 rounded-full border border-elements hover:shadow-md">
                            Sign in
                          </NavLink>
                          <NavLink to="/learner/signup" className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
                            Sign up
                          </NavLink>
                        </div>
                        <div className="py-2 lg:hidden cursor-pointer px-2 flex justify-center items-center bg-button rounded-full">
                            <IoMenu onClick={handleDrawer} size="22" color="white"></IoMenu>
                        </div>
                    </div>
                </div>
                <Drawer isOpen={isOpen} closeDrawer={() => setIsOpen(!isOpen)}></Drawer>
        </>
    );
}

export default NavBar;

      
     