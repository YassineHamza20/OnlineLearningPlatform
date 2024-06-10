import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ReactLoading from 'react-loading';



function LogIn(props) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [pword, setPword] = useState('')
    const navigate = useNavigate()
    
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/login`, {
                email: email,
                password: pword
            })
            localStorage.clear();
            localStorage.setItem('refreshtoken', response.data.refreshToken)
            localStorage.setItem('accesstoken', response.data.accessToken)
            setLoading(false)
            navigate('/admin/Dashboard')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src="/logo.png" alt="Your Company"></img>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input 
                    value={email}
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    id="email" name="email" type="email" autocomplete="email" required className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-elements sm:text-sm sm:leading-6"></input>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                    <input 
                    value={pword}
                    onChange={(e) => setPword(e.target.value)}
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    autocomplete="current-password" required className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-button transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-elements sm:text-sm sm:leading-6"></input>
                    </div>
                </div>

                {
                    loading?
                    <div className="w-full items-center justify-center flex">
                        <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />

                    </div>
                    :
                    <div>
                        <button type="submit" className="flex w-full justify-center hover:bg-orange-600 rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ">Sign in</button>
                    </div>

                }
                </form>
            </div>
        </div>
    );
}

export default LogIn;