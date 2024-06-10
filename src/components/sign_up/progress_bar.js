import Step from './step'
import { useSelector } from 'react-redux'


export default function Progress() {
    //step index
    const step = useSelector((state) => state.userData.signupStep)
    
    return(
        <div className="flex items-center w-full sm:w-[80%] md:w-[75%] lg: xl:w-[70%] justify-between"> 
            <Step num="1" title="Sign up"></Step>
            <div className={`h-1 translate-y-[-11px] rounded-full w-[14%] ${step+1>1? "bg-elements": "bg-lightg"}`}></div>
            <Step num="2" title="Personalize"></Step>
            <div className={`h-1 rounded-full translate-y-[-11px] w-[14%] ${step+1>2? "bg-elements": "bg-lightg"}`}></div>
            <Step num="3" title="Begin!"></Step>
        </div>
    )
}