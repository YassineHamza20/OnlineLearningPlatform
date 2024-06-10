import { IoMdInformationCircleOutline } from "react-icons/io";
import {useDispatch, useSelector} from 'react-redux'
import {setProficiency} from '../../state/slices/userSlice';


export default function RadioButton({title, infos, index}) {
    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //fetch proficiency from the store
    const proficiency = useSelector((state) => state.userData.proficiency)

    //saving the second step selection
    const handleRadioButtonSelection = (e) => {
        dispatch(setProficiency(title))
    }

    const handleChecked = () => {
        if(proficiency !== "") {
            if(proficiency === title) {
                return true
            }else {
                return false
            }
        }
        else {
            return false
        }
    }

    return (
        <div className="flex flex-wrap gap-2 self-start">
            <label  className="flex items-center space-x-2 h-7">
                <div className=" rounded-full w-6 h-6  flex flex-shrink-0 justify-center items-center relative">
                    <input onChange={handleRadioButtonSelection} checked={handleChecked()} aria-labelledby="label1" type="radio" name="radio" className="checkbox  border-button appearance-none  focus:outline-none border-2 rounded-full absolute cursor-pointer w-full h-full checked:border-none"/>
                    <div className="check-icon hidden border-8 border-button rounded-full w-full h-full z-1"></div>
                </div>
                <span className="cursor-pointer text-sm">{index} - {title}</span>
                <div className="myDIV flex justify-center items-center">
                    <IoMdInformationCircleOutline 
                    color="grey" 
                    size="20" 
                    ></IoMdInformationCircleOutline>
                </div>
                <div className={`hide p-2 w-[45%] sm:1/3 md:w-1/3 lg:w-1/3 xl:1/3 z-10 text-left rounded-md bg-black text-white text-xs`}>
                        {infos}
                </div>
            </label>
        </div>
      );
}