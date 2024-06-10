import axios from 'axios'
import { useEffect, useState } from 'react';
import {useParams, useNavigate, NavLink} from 'react-router-dom'
import Loading from '../components/Global/Loading';
import { FaLessThanEqual } from 'react-icons/fa';


function ForgotPassword() {
    //getting the token from the url
    const param = useParams()

    const navigate = useNavigate()

    //handle user input
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")

    //handle loading
    const [isLoading, setIsloading] = useState(true)
    const [isValid, setIsValid] = useState(false)

    const [loading, setLoading] = useState(false)

    const [notification, setNotification] = useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfPassword(e.target.value)
    }

    const verifyToken = async () => {
        try {
           const response = await axios.post('http://localhost:5000/verifyForgotPassword', {},
                { 
                    headers: {
                    Authorization: `Bearer ${param.token}`
                } 
                }
            )
            setIsValid(true)
            setIsloading(false)
        }catch(err) {
            console.log(err)
            setIsloading(false)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])


    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5000/resetpassword', {
                password: password
            },
            { 
                headers: {
                Authorization: `Bearer ${param.token}`
            } 
            })
            setNotification("Password Changed Successfully!")
            setLoading(false)
            navigate(`/${response.data.role}/signin`)


        }catch(err) {
            console.log(err)
            setLoading(false)
            setNotification("Couldn't change password return back later!")
        }
    }

    console.log(notification);
    return (
        <form onSubmit={handleResetPassword} className="bg-backg flex flex-col justify-center items-center w-screen h-screen">
            {
                !isLoading?
                (
                    isValid?
                    (<div className="p-8 flex flex-col justify-center rounded-2xl w-[90%] md:w-[30%]  items-center space-y-4 bg-white">
                        <img src="/Forgot password.png" alt="forgotpassword" className="w-36 h-36 self-center object-cover"></img>
                        {
                            !loading?
                            (
                            <>
                            <span className="font-bold text-xl"> Reset Password</span>
                            <span className=""> Enter your password below</span>
                            <div className="flex flex-col w-full">
                                    <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                                    <input
                                        className="shadow text-sm rounded-lg appearance-none border  w-full py-2 px-3 focus:border-button transition-colors duration-300"
                                        type="password"
                                        value = {password}
                                        onChange={handlePasswordChange}
                                        minLength="8"
                                        maxLength="30"
                                        pattern="^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" // assuring the password contains at least one uppercase letter and one digit
                                        title={`${password.length<8? `Contains at least 8 characters (currently at ${password.length} characters), `:""}Contains at least an UpperCase letter and a digit`}
                                        placeholder="Password"
                                    />
                            </div>
                            <div className="flex flex-col w-full">   
                                <label className="block text-[#000] text-sm font-semibold mb-2">Confirm Password</label>
                                <input
                                    className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 focus:border-button transition-colors duration-300"
                                    type="password"
                                    value = {confPassword}
                                    pattern= {password}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm Password"
                                    title="Passwords do not match"
                                />
                            </div> 
                            <span className={`${notification? (notification === "Password Changed Successfully!"? "text-elements": "text-errortext") :"hidden"}`}>{notification}</span>
                            <button type="submit" className={`bg-button border border-button flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-white hover:shadow`}>Reset Password</button>
                            </>)
                            :
                            <Loading></Loading>
                        }
                    </div>)
                    :
                    <>
                        <img src="/erreur-404.png" alt="verified" className="object-cover h-80 w-80"></img>
                        <div className="flex items-center space-x-2"> 
                            <NavLink to='/tutor/signup' className="rounded-md py-2 px-4 bg-white border-button2 border text-button2">Sign up As Tutor</NavLink>
                            <NavLink to='/learner/signup' className="rounded-md py-2 px-4 bg-button2 text-white">Sign up As Learner</NavLink>
                        </div>
                    </>
                )
                :
                null
            }
        </form>
    );
}

export default ForgotPassword;