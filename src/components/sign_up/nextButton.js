import { GrFormNextLink } from "react-icons/gr"
import {useSelector} from 'react-redux'

function NextButton() {
    //step index
    const step = useSelector((state) => state.userData.signupStep)

    //getting elements from redux store
    const userData = useSelector((state) => state.userData)

    //handling the opacity of the next button if it's disabled
    const handleButtonDisabilityOpacity = () => {
        if(step === 0 ) {
            if ((userData?.email === "" || userData?.password === "" || userData?.confpass === "" || userData?.pic === "")){
                return "opacity-60"
            }
            else {
                return "cursor-pointer"
            }
        }
        else if(step === 1) {
            if(userData?.proficiency === "" || userData?.firstname === "" || userData?.lastname === ""){
                return "opacity-60"
            }
            else {
                return "cursor-pointer"
            }
        }
        else if(step === 2) {
            if(userData?.goals.length === 0 || userData?.topics.length === 0){
                return "opacity-60"
            }
            else{
                return "cursor-pointer"
            }
        }
    }

    
    //setting the button disabled if the user didn't provide the data of the form
    const handleButtonDisability = () => {
        if(step === 0) {
            if ((userData?.email === "" || userData?.password === "" || userData?.confpass === "" || userData?.pic === "")){
                return true
            }
            else {
                return false
            }
        }
        else if(step ===1){
            if(userData?.proficiency === "" || userData?.firstname === "" || userData?.lastname === "") {
                return true
            }
            else {
                return false
            }
        }
        else if(step === 2) {
            if(userData?.goals.length === 0 || userData?.topics.length === 0){
                return true
            }
            else {
                return false 
            }
        }
    }


    return (
        <button type="submit" disabled={handleButtonDisability()} className={`bg-button ${handleButtonDisabilityOpacity()} sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 border border-button flex justify-center items-center w-[20%] sm:w-[15%] md:w-[15%] lg:w-[15%] xl:w-[15%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white hover:shadow`}>
            <span className="text-base hidden sm:block md:block lg:block xl:block">Next</span>
            <GrFormNextLink size="25"></GrFormNextLink>
        </button>
    );
}

export default NextButton;