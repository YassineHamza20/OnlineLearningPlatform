import { IoIosCloseCircle } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
import { NavLink } from "react-router-dom";







function Drawer(props) {
    return (
        <>
            <div className={`${props.isOpen ? "opacity-30" : "opacity-0 pointer-events-none" } lg:hidden absolute inset-0 bg-black  z-20 transition-opacity ease-in-out duration-300  `}></div>
            <div className={`fixed lg:hidden inset-y-0 right-0 bg-backg max-w-xs transform transition-transforml duration-300 z-50 shadow-lg w-full ${props.isOpen? "translate-x-0" : "translate-x-full"} `}>
                <div className="flex flex-col overflow-y-auto items-start w-full h-full space-y-5 relative">
                    <div className="w-full absolute flex justify-end ">
                        <IoIosCloseCircle color="#767676" className="cursor-pointer" onClick={props.closeDrawer} size="30"/>
                    </div>
                    <nav className="flex flex-col relative w-full px-4">
                        
                        <NavLink 
                            to="/landingpage/Tutors" 
                            className="flex h-10 drawerNav items-center w-full space-x-4"
                            >
                            <FaChalkboardTeacher size="25" color="#767676"></FaChalkboardTeacher>
                            <span className="">Tutors</span>
                        </NavLink>
                        <NavLink
                            to="/landingpage/Courses"
                            className="flex h-10 drawerNav items-center w-full space-x-4"
                            >
                            <FaBook size="25" color="#767676"
                            ></FaBook>
                            <span className="">Courses</span>
                        </NavLink>
                        <NavLink
                            to="/landingpage/LinguaBuddy"
                            className="flex h-10 mb-7 drawerNav items-center w-full space-x-4"
                            >
                            <BsRobot size="25" color="#767676"></BsRobot>
                            <span className="">LinguaBuddy</span>
                        </NavLink>
                        <div className="border-b border-darkg"></div>
                        <div className="animation2"></div>
                    </nav>
                    <nav className="flex flex-col space-y-5 w-full px-4">
                        {/* Buttons */}
                          <NavLink to="/learner/signin" className="text-elements font-bold py-2 px-8 text-center rounded-full border border-elements hover:shadow-md">
                            Sign in
                          </NavLink>
                          <NavLink to="/learner/signup" className="bg-elements text-white font-bold py-2 px-8 text-center rounded-full hover:shadow-md">
                            Sign up
                          </NavLink>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Drawer;
