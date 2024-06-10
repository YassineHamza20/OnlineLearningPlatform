
import Mail from './mail_signup'
import Fields from './normal_signup'
import Orline from '../Global/Or_line'
import { NavLink } from 'react-router-dom'



export default function First() {
    return (
        <>
            <span className="font-bold self-start text-lg text-[#000]">
                Welcome! Choose how to sign up
            </span>
            <span className="text-darkg self-start text-sm">
                By creating an account, you agree to our <span className="underline cursor-pointer"> User Agreement </span>
                and <span className="underline cursor-pointer"> Privacy Policy</span>.
            </span> 
            <span className="text-darkg self-start text-sm"> Already have an account? <NavLink to="/learner/signin" className="underline cursor-pointer">Log in</NavLink> </span>
            <Mail></Mail>
            <Orline width="6%"></Orline>
            <Fields></Fields>
        </>
    )

}