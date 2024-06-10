
import { BsPersonPlus } from "react-icons/bs";
import { BsPersonCheckFill } from "react-icons/bs";
import { useState } from "react";

function FollowTutor(props) {

    const [follow, setFollow] = useState(false)


    const handleFollow = () => {
        setFollow(prevValue => !prevValue)
    }

    return (
        <div className="flex flex-col justify-center transition-all duration-300 w-6 items-center space-y-1">
            {
                follow?
                <BsPersonCheckFill onClick={handleFollow} className="text-elements cursor-pointer" size="25"></BsPersonCheckFill>
                :
                <BsPersonPlus onClick={handleFollow} size="25" className="text-black cursor-pointer"></BsPersonPlus>
            }
            <span className={`${follow? "text-elements" : "text-black"} text-sm`}>
                {
                    follow?
                    "Unfollow"
                    :
                    "Follow"
                }
            </span>
        </div>
    );
}

export default FollowTutor;