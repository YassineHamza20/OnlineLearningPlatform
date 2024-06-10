import { GrFormPreviousLink } from "react-icons/gr"
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import {setSignUpStep} from '../../state/slices/userSlice'


function BackButton() {
    //step index
    const step = useSelector((state) => state.userData.signupStep)

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //Back Button logic going backwards through the steps
    const handlePrevious =(e) => {
        e.preventDefault()
        dispatch(setSignUpStep(step>0 ?step - 1: step))
    }

    return (
        <button type="button" onClick={handlePrevious} className={`text-button bg-lightbutton border-button  border space-x-2 ${step<2? "hidden": ""} sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 flex justify-center items-center sm:w-[15%] md:w-[15%] lg:w-[15%] xl:w-[15%] w-[20%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full cursor-pointer hover:shadow`}>
            <GrFormPreviousLink  size="25"></GrFormPreviousLink>
            <span className="text-base hidden sm:block md:block lg:block xl:block">Back</span>
        </button>
    );
}

export default BackButton;