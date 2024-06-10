import Form from "../../components/tutor_sign_up/form"
import Errorpop from "../../components/Global/Error_popup";
import { useSelector } from "react-redux";
import { setError } from "../../state/slices/tutorSlice"

export default function TutorSignUp() {
    //Signup Error from store
    const error = useSelector((state) => state.tutorData.error)

    return (
        <div className="bg-backg relative w-screen h-screen flex justify-center items-center">
            <Form></Form>
            <img src="/teach.jpg" alt="tutorbg" className="h-full hidden sm:block md:block lg:block xl:block 2xl:block sm:w-[50%] md:w-[50%] lg:w-[70%] xl:w-[70%] 2xl:w-[70%] object-cover"></img>
            <Errorpop error={error} setError={setError}></Errorpop>
        </div>
    );
}
