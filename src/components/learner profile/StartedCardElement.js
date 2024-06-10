import {MdOutlineNavigateNext} from 'react-icons/md'
import { NavLink } from 'react-router-dom';

function StartedCardElement(props) {
    return (
        <div className="flex items-center w-full space-x-3 ">
            <img src={`/${props.image}`} alt="talktoteacher" className=" object-cover w-32 h-32" ></img>
            <div className="flex flex-col max-w-[35%]">
                <span className="font-semibold">
                    {props.title}
                </span>
                <span className="text-sm">
                    {props.description}
                </span>
            </div>
            <div className="flex-grow"></div>
            <NavLink to={props.action} className="flex justify-center border cursor-pointer border-elements rounded-full bg-lightGreen items-center  w-10 h-10">
                <MdOutlineNavigateNext size="22" color="#87A922"></MdOutlineNavigateNext>
            </NavLink>
        </div>
    );
}

export default StartedCardElement;