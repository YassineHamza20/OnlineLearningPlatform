import Card from '../../components/sign_up/card'
import Errorpop from '../../components/Global/Error_popup'
import { useSelector } from "react-redux"
import { setError } from "../../state/slices/userSlice";

export default function Signup() {
    //Signup Error from store
    const error = useSelector((state) => state.userData.error)
    
    return(
        <div className="bg-backg relative w-screen h-screen flex justify-center items-center">
            <Card></Card>
            <Errorpop error={error} setError={setError}></Errorpop>
        </div>
    )
}