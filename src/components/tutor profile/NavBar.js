import { IoChatbubbles } from "react-icons/io5"
import { IoMdCalendar } from "react-icons/io"
import { BsRobot } from "react-icons/bs"
import { IoMenu } from "react-icons/io5"
import { useRef, useState } from "react"
import Drawer from "../learner profile/Drawer"
import { useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import DropdownMenu from "../learner profile/DropdownMenu"
import Notifications from "../Global/Notifications"
import MessagesNotif from "../Global/MessagesNotif"



 

function NavBar() {
    //handle drawer visibility
    const [isOpen, setIsOpen] =useState(false)
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const pfpRef = useRef(null) 


    const tutorData = useSelector(state => state.tutorData)
    
    
    const handleDrawer = () => {
        setIsOpen(true)
    }

    //handle DropDown visibility
    const toggleDropdown = () => {
        console.log("isDropDownOpen:", isDropdownOpen);
        setIsDropdownOpen(prevValue => !prevValue)
    };

  
    return (
        <>
            <div className="h-[10%] w-full bg-white z-10 shadow flex items-center space-x-8 pr-10 pl-10 md:pr-10 ">
                    <NavLink to="/tutor/profile"
                        className="flex lg:hidden justify-center nav-linkTutor items-center h-full w-[150px] space-x-2"
                    >
                        <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                        <div className="font-bold text-xl ">LINGUIFY</div>
                    </NavLink>
                    <nav className="justify-center relative hidden lg:flex items-center w-auto h-full">
                        <NavLink to="/tutor/profile"
                            className="flex justify-center nav-linkTutor items-center h-full w-[150px] space-x-2"
                        >
                            <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
                            <div className="font-bold text-xl ">LINGUIFY</div>
                        </NavLink>
                        <NavLink
                            to="/tutor/profile/Courses"
                            className="flex nav-linkTutor w-[80px] h-full no-underline justify-center cursor-pointer items-center"
                        >
                            <span className="text-darkg">Courses</span>
                        </NavLink>
                        <NavLink
                            to="/tutor/profile/LinguaBuddy"
                            className="flex nav-linkTutor no-underline h-full w-[140px] justify-center cursor-pointer items-center space-x-2"
                        >
                            <BsRobot color="#F28585" size="22"></BsRobot>
                            <span className="text-darkg">LinguaBuddy</span>
                        </NavLink>
                        <div className="animation startprofile"></div>
                    </nav>
                    <div className="flex-grow"></div>
                    <div className=" ml-auto flex items-center w-auto h-full space-x-2 lg:space-x-6">
                        <div className="py-2 lg:hidden cursor-pointer px-2 flex justify-center items-center bg-button rounded-full">
                            <IoMenu onClick={handleDrawer} size="22" color="white"></IoMenu>
                        </div>
                        <MessagesNotif></MessagesNotif>
                        <Notifications role ="Learner"></Notifications>
                        <NavLink to="/tutor/profile/Calendar">
                            <IoMdCalendar className="cursor-pointer hidden lg:block text-darkg" size="22"></IoMdCalendar>
                        </NavLink>
                        {
                            tutorData.isLoading?
                            <div className="rounded-full hidden lg:block animate-pulse bg-darkg w-12 h-12 self-center"></div>
                            :
                            <div className="relative">
                                <img 
                                    ref={pfpRef}
                                    src={tutorData.displayableImage}
                                    alt="profilepicture" 
                                    referrerPolicy="no-referrer"
                                    className="cursor-pointer hidden lg:block rounded-full min-w-10 min-h-10  w-12 h-12 object-cover"
                                    onClick={toggleDropdown}
                                />
                                <DropdownMenu pfpRef={pfpRef} isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                            </div>
                            
                        }
                    </div>
                </div>
                <Drawer role="tutor" userData={tutorData} isOpen={isOpen} closeDrawer={() => setIsOpen(!isOpen)}/>
        </>
    );
}

export default NavBar;