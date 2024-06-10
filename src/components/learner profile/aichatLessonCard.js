import Card from "./Card";
import {NavLink} from 'react-router-dom'

function ChatLessonCard() {
    
    const content = [
        <img key="image" src="/chatbot-bro.png" alt="chatbot" className="w-40 h-40"></img>,
        <div key="text" className="flex flex-col self-start justify-center items-center space-y-1">
            <span className="font-bold text-xl text-left self-start">Session with LinguaBuddy</span>
            <span className="text-sm self-start text-left"> Practice speaking with our ai for free today!</span>
        </div>,
        <NavLink
        to={`LinguaBuddy`}
        className="border border-button text-button rounded-2xl h-10 bg-lightbutton flex justify-center items-center text-sm font-bold w-full">
            Start a chat with LinguaBuddy
        </NavLink>
    ]

    return (
        <Card content={content}></Card>
    );
}

export default ChatLessonCard;