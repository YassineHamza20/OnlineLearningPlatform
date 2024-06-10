import {useDispatch, useSelector} from 'react-redux'
import { setEmail, setPassword, setConfpass } from '../../state/slices/userSlice';

export default function Fields() {
    //getting userData from the store
    const userData = useSelector((state) => state.userData )

    //initializing the tool to change the user data on the redux store
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

    return(
        <div className="w-full flex flex-col space-y-5 items-center">
            
            <div className="grid grid-cols-1 gap-4 w-full">
                <div className="flex flex-col">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        value = {userData?.email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                    <input
                        className="shadow text-sm rounded-lg appearance-none border  w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="password"
                        value = {userData?.password}
                        onChange={handlePasswordChange}
                        minLength="8"
                        maxLength="30"
                        pattern="^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" // assuring the password contains at least one uppercase letter and one digit
                        title={`${userData?.password.length<8? `Contains at least 8 characters (currently at ${userData.password.length} characters), `:""}Contains at least an UpperCase letter and a digit`}
                        placeholder="Password"
                    />
                </div>
                <div className="flex flex-col">   
                    <label className="block text-[#000] text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="password"
                        value = {userData?.confpass}
                        pattern= {userData?.password}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        title="Passwords do not match"
                    />
                </div>
            </div>
        </div>
    )
}