import { IoMdSettings } from "react-icons/io";
import { IoChatbubbles } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import {LogOut} from  '../Global/functions'
import { useDispatch } from "react-redux";
import { resetUserData as resetTutor } from "../../state/slices/tutorSlice";
import {resetUserData as resetLearner} from '../../state/slices/userSlice'
import { useRef, useEffect } from "react";


//drop down menu when clicking the user profile
const DropdownMenu = ({ pfpRef, isOpen, onClose }) => {

  const dropdownmenuRef = useRef(null)

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

  //if user clicks on anything other than the dropdown menu, it closes
  const handleOutsideClick = (event) => {
        if (dropdownmenuRef.current && !dropdownmenuRef.current.contains(event.target) && pfpRef.current && !pfpRef.current.contains(event.target) ) {
          onClose()
        }
    }

  //control the visibility of the dropdownMenu
  useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    }, [])

  return (
    <div 
      ref={dropdownmenuRef}
      className={`absolute hidden lg:block right-0 mt-2 w-48 bg-white border border-lightg rounded-md shadow-lg z-10 ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-transform duration-300 transform origin-top-right`}
    >
      <div className="py-1 px-2">
        <NavLink to={`/${firstSegment}/profile/Settings`} className="flex items-center px-2 rounded-lg hover:bg-button2 transition-colors hover:text-white duration-300 text-darkg cursor-pointer">
            <IoMdSettings size="20"></IoMdSettings>
            <div href="#" className="block px-4 py-2">Settings</div>
        </NavLink>
        <hr className="w-full h-1"></hr>
        <NavLink to={`/${firstSegment}/signin`} onClick={logout} className="flex items-center px-2 rounded-lg hover:bg-button2 transition-colors hover:text-white duration-300 text-darkg cursor-pointer">
            <IoLogOut size="20" color="red"></IoLogOut>
            <div className="block px-4 py-2">Log out</div>
        </NavLink>
      </div>
    </div>
  );
};

export default DropdownMenu;
