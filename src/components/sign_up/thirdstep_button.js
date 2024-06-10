import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {setGoals, setTopics} from '../../state/slices/userSlice';
import { useSelector } from 'react-redux';

export default function Buttn({text, type}) {
    //getting userData from redux store
    const userData = useSelector(state => state.userData)
    
    //checking whether the content of the button exists in the userData
    const isTextIncluded = userData.goals.includes(text) || userData.topics.includes(text);


    //color changer
    const [color, setColor] = useState(isTextIncluded? "bg-button" : "bg-[#f0f0f0]")

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //alternating between colors when clicking buttons 
    const handleClick = () => {
        setColor( prevValue => prevValue ==="bg-button"? "bg-[#f0f0f0]" : "bg-button" )
        if(type === 'goals') {
            dispatch(setGoals(text))
        }else if(type === 'topics') {
            dispatch(setTopics(text))
        }
    }

    return(
        <div 
            className={`rounded-full h-14 p-3 text-sm text-center border flex justify-center items-center ${color==="bg-[#f0f0f0]"? "border-lightg": "border-transparent text-white"} ${color} cursor-pointer `}
            onClick={handleClick}>
            {text}
        </div>
    )
}