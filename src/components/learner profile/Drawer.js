import { IoIosCloseCircle } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { NavLink } from "react-router-dom";
import {LogOut} from  '../Global/functions'
import { useDispatch } from "react-redux";
import { resetUserData as resetTutor } from "../../state/slices/tutorSlice";
import {resetUserData as resetLearner} from '../../state/slices/userSlice'
import { IoLogOut } from "react-icons/io5";

import { AiFillStar } from 'react-icons/ai';






function Drawer(props) {
    const dispatch = useDispatch()

    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;
  
    // Split the path by "/"
    const segments = path.split('/');
  
    // Get the value of the first segment
    const firstSegment = segments[1]; 
  
    const logout = () => {
      LogOut()
      if(firstSegment === "tutor") {
        dispatch(resetTutor())
      } else if (firstSegment === "learner") {
        dispatch(resetLearner())
      }
    }

    return (
        <>
            <div className={`${props.isOpen ? "opacity-30" : "opacity-0 pointer-events-none" } lg:hidden absolute inset-0 bg-black  z-20 transition-opacity ease-in-out duration-300  `}></div>
            <div className={`fixed lg:hidden inset-y-0 right-0 bg-backg max-w-xs transform transition-transforml duration-300 z-50 shadow-lg w-full ${props.isOpen? "translate-x-0" : "translate-x-full"} `}>
                <div className="flex flex-col overflow-y-auto items-start w-full h-full space-y-5 ">
                    <div className="w-full relative flex flex-col justify-center items-center space-y-2 h-[30%] bg-button">
                        <IoIosCloseCircle color="#767676" className="absolute cursor-pointer right-2 top-2" onClick={props.closeDrawer} size="30"/>
                        {
                            props.role === "tutor"?
                            <img 
                            src={props.userData.displayableImage} 
                            alt="prolfiepicture" 
                            className="cursor-pointer rounded-full w-20 h-20 object-cover"
                            ></img>
                            :
                            <img 
                            src={`${props.userData.pic==="user.png"? "/"+props.userData.pic : props.userData.pic}`} 
                            referrerPolicy="no-referrer"
                            alt="prolfiepicture" 
                            className="cursor-pointer rounded-full w-20 h-20 object-cover"
                            ></img>
                        }
                        <span className="text-white text-base">{props.userData.firstname+" "+props.userData.lastname}</span>
                        <span className="text-white text-base">{props.userData.email}</span>
                    </div>
                    <nav className="flex flex-col relative w-full px-4">
                        {
                            props.role === "learner"?
                            <>
                                <NavLink 
                                    to="/learner/profile/Tutors" 
                                    className="flex h-10 drawerNav items-center w-full space-x-4"
                                    >
                                    <FaChalkboardTeacher size="25" color="#767676"></FaChalkboardTeacher>
                                    <span className="">Tutors</span>
                                </NavLink>
                                <NavLink
                                    to="/learner/profile/Courses"
                                    className="flex h-10 drawerNav items-center w-full space-x-4"
                                    >
                                    <FaBook size="25" color="#767676"
                                    ></FaBook>
                                    <span className="">Courses</span>
                                </NavLink>
                                <NavLink
                                    to="/learner/profile/LinguaBuddy"
                                    className="flex h-10 mb-7 drawerNav items-center w-full space-x-4"
                                    >
                                    <BsRobot size="25" color="#767676"></BsRobot>
                                    <span className="">LinguaBuddy</span>
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink
                                    to="/tutor/profile/Courses"
                                    className="flex h-10 drawerNav items-center w-full space-x-4"
                                    >
                                    <FaBook size="25" color="#767676"
                                    ></FaBook>
                                    <span className="">Courses</span>
                                </NavLink>
                                <NavLink
                                    to="/tutor/profile/LinguaBuddy"
                                    className="flex h-10 mb-7 drawerNav items-center w-full space-x-4"
                                    >
                                    <BsRobot size="25" color="#767676"></BsRobot>
                                    <span className="">LinguaBuddy</span>
                                </NavLink>
                            </>
                        }

                        <div className="border-b border-darkg"></div>
                        <div className="animation2"></div>
                    </nav>
                    <nav className="flex flex-col w-full px-4">
                        {props.role === "learner"? 
                        <>
                            <NavLink
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoChatbubbles size="25" color="#767676"></IoChatbubbles>
                                <span className="">Chat</span>
                            </NavLink>
                            <NavLink 
                                to="/learner/profile/Notifications"
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoNotifications size="25" color="#767676"></IoNotifications>
                                <span className="">Notifications</span>
                            </NavLink>
                            <NavLink 
                                to='/learner/profile/Calendar'
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoMdCalendar size="25" color="#767676"></IoMdCalendar>
                                <span className="">Calendar</span>
                            </NavLink>
                            <NavLink to="/learner/profile/feedback" 
                             className="flex h-10 drawerNav items-center w-full space-x-4">
                       
                        <AiFillStar size="25" color="#767676"></AiFillStar>
                        <span className="">Review</span>
                    </NavLink>
                            <NavLink to={`/${firstSegment}/signin`} onClick={logout}
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoLogOut size="25" color="red"></IoLogOut>
                                <div className="">Log out</div>
                            </NavLink>
                        </>
                        :
                        <>
                            <NavLink
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoChatbubbles size="25" color="#767676"></IoChatbubbles>
                                <span className="">Chat</span>
                            </NavLink>
                            <NavLink 
                                to="/tutor/profile/Notifications"
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoNotifications size="25" color="#767676"></IoNotifications>
                                <span className="">Notifications</span>
                            </NavLink>
                            <NavLink 
                                to="/tutor/profile/Calendar"
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoMdCalendar size="25" color="#767676"></IoMdCalendar>
                                <span className="">Calendar</span>
                            </NavLink>
                            <NavLink to="/learner/profile/feedback" 
                             className="flex h-10 drawerNav items-center w-full space-x-4">
                       
                        <AiFillStar size="25" color="#767676"></AiFillStar>
                        <span className="">Review</span>
                    </NavLink>
                            <NavLink to={`/${firstSegment}/signin`} onClick={logout}
                                className="flex h-10 drawerNav items-center w-full space-x-4">
                                <IoLogOut size="25" color="red"></IoLogOut>
                                <div className="">Log out</div>
                            </NavLink>
                        </>
                        }
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Drawer;
