import {setEmail, setPassword, setConfpass} from '../../state/slices/tutorSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function TutorFields() {
    //getting tutor Data from store 
    const tutorData = useSelector(state => state.tutorData)

    //initializing the tool to change the tutor data on the redux store
    const dispatch = useDispatch()

    //handling the email field when typing
    const handleEmailChange =(e) => {
        dispatch(setEmail(e.target.value))
    }
    
    //handling the password field when typing
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    }

    //handling the confirm password field when typing 
    const handleConfirmPasswordChange = (e) => {
        dispatch(setConfpass(e.target.value))
    }

    return (
        <>
           <div className="flex flex-col w-full">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-button transition-colors duration-300"
                        type="email"
                        value = {tutorData?.email}
                        onChange={handleEmailChange}
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        placeholder="Email"
                    />
            </div>
            <div className="flex flex-col w-full">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                    <input
                        className="shadow text-sm rounded-lg appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-button transition-colors duration-300"
                        type="password"
                        value = {tutorData?.password}
                        onChange={handlePasswordChange}
                        minLength="8"
                        maxLength="30"
                        pattern="^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" // assuring the password contains at least one uppercase letter and one digit
                        title={`${tutorData?.password.length<8? `Contains at least 8 characters (currently at ${tutorData.password.length} characters), `:""}Contains at least an UpperCase letter and a digit`}
                        placeholder="Password"
                    />
            </div>
            <div className="flex flex-col w-full">   
                <label className="block text-[#000] text-sm font-semibold mb-2">Confirm Password</label>
                <input
                    className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-button transition-colors duration-300"
                    type="password"
                    value = {tutorData?.confpass}
                    pattern= {tutorData?.password}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    title="Passwords do not match"
                />
            </div> 
        </>
    );
}

export default TutorFields;