// import { IoMdCalendar } from "react-icons/io";
// import { BsRobot } from "react-icons/bs";
// import { IoMenu } from "react-icons/io5";
// import { useRef, useState } from "react";
// import Drawer from "./Drawer";
// import { useSelector } from "react-redux";
// import { NavLink } from 'react-router-dom';
// import DropdownMenu from "./DropdownMenu";
// import Notifications from "./LessonNotifications";
// import MessagesNotif from "../Global/MessagesNotif";
// import SubscriptionPlan from "../Subscription/SubscriptionPlan";


 

// function NavBar() {
//     //handle drawer visibility
//     const [isOpen, setIsOpen] =useState(false)
    
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false)

//     const [paymentVisiblity, setPaymentVisibility] = useState(false)

//     const pfpRef = useRef(null)

//     const learnerData = useSelector(state => state.userData)
    
    
//     const handleDrawer = () => {
//         setIsOpen(true)
//     }


//     //handle DropDown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//     return (
//         <>
//             <div className="h-[10%] w-full bg-white z-10 shadow flex items-center space-x-8 pr-10 pl-10 md:pr-10 ">
//                     <NavLink to="/learner/profile"
//                         className="flex lg:hidden justify-center nav-link items-center h-full w-[150px] space-x-2"
//                     >
//                         <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
//                         <div className="font-bold text-xl ">LINGUIFY</div>
//                     </NavLink>
//                     <nav className="justify-center relative hidden lg:flex items-center w-auto h-full">
//                         <NavLink to="/learner/profile"
//                             className="flex justify-center nav-link items-center h-full w-[150px] space-x-2"
//                         >
//                             <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover"></img>
//                             <div className="font-bold text-xl ">LINGUIFY</div>
//                         </NavLink>
//                         <NavLink
//                             to="/learner/profile/Tutors"
//                             className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center"
//                         >
//                             <span className="text-darkg">Tutors</span>
//                         </NavLink>
//                         <NavLink
//                             to="/learner/profile/Courses"
//                             className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center"
//                         >
//                             <span className="text-darkg">Courses</span>
//                         </NavLink>
//                         <NavLink
//                             to="/learner/profile/LinguaBuddy"
//                             className="flex nav-link no-underline h-full w-[140px] justify-center cursor-pointer items-center space-x-2"
//                         >
//                             <BsRobot color="#F28585" size="22"></BsRobot>
//                             <span className="text-darkg">LinguaBuddy</span>
//                         </NavLink>
//                         <div className="animation startprofile"></div>
//                     </nav>
//                     <div className="flex-grow"></div>
//                     <div className=" ml-auto flex items-center w-auto h-full space-x-2 lg:space-x-6">
//                         {

//                             !learnerData.firstname?
//                             null
//                             :
//                             (!learnerData.subscribed?
//                             <button onClick={() => setPaymentVisibility(true)} className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
//                                 Subscribe
//                             </button>
//                             :
//                             <span
//                                 class="brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600"
//                                 >
//                                 <div
//                                     class="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-lg font-bold w-full h-full"
//                                 >
//                                     <div
//                                     class="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1"
//                                     >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke-width="1.8"
//                                         class="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
//                                     >
//                                         <path
//                                         stroke-linecap="round"
//                                         stroke-linejoin="round"
//                                         d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
//                                         ></path>
//                                     </svg>
//                                     Premium
//                                     </div>
//                                 </div>
//                             </span>)

//                         }
//                         <div className="py-2 lg:hidden cursor-pointer px-2 flex justify-center items-center bg-button rounded-full">
//                             <IoMenu onClick={handleDrawer} size="22" color="white"></IoMenu>
//                         </div>
//                         <MessagesNotif></MessagesNotif>
//                         <Notifications></Notifications>
//                         <NavLink to ="/learner/profile/Calendar">
//                             <IoMdCalendar className="cursor-pointer hidden lg:block" color="#767676" size="22"></IoMdCalendar>
//                         </NavLink>
//                         {
//                             learnerData.isLoading?
//                             <div className="rounded-full hidden lg:block animate-pulse bg-darkg w-12 h-12 self-center"></div>
//                             :
//                             <div className="relative">
//                                 <img 
//                                     ref={pfpRef}
//                                     src={`${learnerData.pic==="user.png" ? "/" +learnerData.pic: learnerData.pic }`} 
//                                     alt="profilepicture" 
//                                     referrerPolicy="no-referrer"
//                                     className="cursor-pointer hidden lg:block rounded-full min-w-10 min-h-10 w-12 h-12 object-cover"
//                                     onClick={toggleDropdown}
//                                 />
//                                 <DropdownMenu pfpRef={pfpRef} isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
//                             </div>
                            
//                         }
//                     </div>
//                 </div>
//                 <Drawer userData={learnerData} role="learner" isOpen={isOpen} closeDrawer={() => setIsOpen(!isOpen)}/>
//                 <SubscriptionPlan visibility={paymentVisiblity} setVisibility={setPaymentVisibility}></SubscriptionPlan>
//         </>
//     );
// }

// export default NavBar;


import React, { useRef, useState } from 'react';
import { IoMdCalendar } from "react-icons/io";
import { BsRobot } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import Drawer from "./Drawer";
import DropdownMenu from "./DropdownMenu";
import Notifications from "./LessonNotifications";
import MessagesNotif from "../Global/MessagesNotif";
import SubscriptionPlan from "../Subscription/SubscriptionPlan";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [paymentVisiblity, setPaymentVisibility] = useState(false);
    const pfpRef = useRef(null);
    const learnerData = useSelector(state => state.userData);

    const handleDrawer = () => {
        setIsOpen(true);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="h-16 w-full bg-white z-10 shadow flex items-center space-x-8 pr-10 pl-10 md:pr-10">
                <NavLink to="/learner/profile" className="flex lg:hidden justify-center nav-link items-center h-full w-[150px] space-x-2">
                    <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover" />
                    <div className="font-bold text-xl">LINGUIFY</div>
                </NavLink>
                <nav className="justify-center relative hidden lg:flex items-center w-auto h-full">
                    <NavLink to="/learner/profile" className="flex justify-center nav-link items-center h-full w-[150px] space-x-2">
                        <img src="/e-learningLogo.png" alt="logo" className="w-12 h-12 object-cover" />
                        <div className="font-bold text-xl">LINGUIFY</div>
                    </NavLink>
                    <NavLink to="/learner/profile/Tutors" className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center">
                        <span className="text-darkg">Tutors</span>
                    </NavLink>
                    <NavLink to="/learner/profile/Courses" className="flex nav-link w-[80px] h-full no-underline justify-center cursor-pointer items-center">
                        <span className="text-darkg">Courses</span>
                    </NavLink>
                    <NavLink to="/learner/profile/LinguaBuddy" className="flex nav-link no-underline h-full w-[140px] justify-center cursor-pointer items-center space-x-2">
                        <BsRobot color="#F28585" size="22" />
                        <span className="text-darkg">LinguaBuddy</span>
                    </NavLink>
                    <div className="animation startprofile"></div>
                </nav>
                <div className="flex-grow"></div>
                <div className="ml-auto flex items-center w-auto h-full space-x-2 lg:space-x-6">
                    {!learnerData.firstname ? null : (!learnerData.subscribed ? (
                        <button onClick={() => setPaymentVisibility(true)} className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
                            Subscribe
                        </button>
                    ) : (
                        <span className="brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600">
                            <div className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-lg font-bold w-full h-full">
                                <div className="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" className="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456ZM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423Z" />
                                    </svg>
                                    Premium
                                </div>
                            </div>
                        </span>
                    ))}
                    <div className="py-2 lg:hidden cursor-pointer px-2 flex justify-center items-center bg-button rounded-full">
                        <IoMenu onClick={handleDrawer} size="22" color="white" />
                    </div>
                    <MessagesNotif />
                    <Notifications />
                    <NavLink to="/learner/profile/Calendar">
                        <IoMdCalendar className="cursor-pointer hidden lg:block" color="#767676" size="22" />
                    </NavLink>

                    <NavLink to="/learner/profile/feedback">
                        <span className="text-darkg ">
                            <AiFillStar className="text-2xl text-grey-400 mr-1  " /></span>
                    </NavLink>

                    {learnerData.isLoading ? (
                        <div className="rounded-full hidden lg:block animate-pulse bg-darkg w-12 h-12 self-center"></div>
                    ) : (
                        <div className="relative">
                            <img
                                ref={pfpRef}
                                src={`${learnerData.pic === "user.png" ? "/" + learnerData.pic : learnerData.pic}`}
                                alt="profilepicture"
                                referrerPolicy="no-referrer"
                                className="cursor-pointer hidden lg:block rounded-full min-w-10 min-h-10 w-12 h-12 object-cover"
                                onClick={toggleDropdown}
                            />
                            <DropdownMenu pfpRef={pfpRef} isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                        </div>
                    )}
                </div>
            </div>
            <Drawer userData={learnerData} role="learner" isOpen={isOpen} closeDrawer={() => setIsOpen(!isOpen)} />
            <SubscriptionPlan visibility={paymentVisiblity} setVisibility={setPaymentVisibility} />
        </>
    );
}

export default NavBar;
