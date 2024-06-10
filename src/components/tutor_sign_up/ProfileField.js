import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAboutMe, setTeachingStyle } from "../../state/slices/tutorSlice";

function ProfileField(props) {
    const dispatch = useDispatch()
    const TeachingStyle = useSelector(state => state.tutorData.TeachingStyle)
    const AboutMe = useSelector(state => state.tutorData.AboutMe)

    const maxDescriptionLength = 800


    const handleChange = (e) => {
        if (props.title === 'Teaching Style') {
            dispatch(setTeachingStyle(e.target.value))
        }else if(props.title === 'About Me') {
            dispatch(setAboutMe(e.target.value))
        }
    }
    return (
        <div className="w-[80%] md:w-[50%] h-[30%] flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
            <div className="w-full h-[15%] flex items-center space-x-2 ">
                {props.icon}
                <span className="text-black text-sm font-bold h-full">{props.title}</span>
            </div>
            <div className="relative h-[85%] w-full shadow rounded-xl">
                <textarea onChange={handleChange} maxLength={maxDescriptionLength} value={props.title==='Teaching Style'? TeachingStyle : AboutMe} className="w-full resize-none focus:outline-none border focus:border-button transition-colors duration-300 h-full rounded-xl p-2 text-sm" placeholder={props.placeholder}></textarea>
                <span className="bottom-0 absolute text-sm right-3 ">{props.title ==='Teaching Style'? TeachingStyle.length : AboutMe.length}/{maxDescriptionLength}</span>
            </div>
        </div>
    );
}

export default ProfileField;