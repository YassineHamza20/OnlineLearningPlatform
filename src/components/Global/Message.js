import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchFile, isGoogleProfilePicture } from "./functions";
import ElapsedTime from "./ElapsedTime";


function Message(props) {
    const [imageUrl, setImageUrl] = useState(null)

    
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                let imageUrl = props.message.pfp;
                if (!isGoogleProfilePicture(props.message.pfp)) {
                    imageUrl = await fetchFile(props.message.pfp, 'images', props.role === "learner"? "tutor" : "learner", props.role ==="learner"? props.message.IdTutor : props.message.IdLearner);
                }
                setImageUrl(imageUrl);
            } catch (err) {
                console.log(err);
                setImageUrl(null);
            }
        };
    
        fetchImageUrl();
    }, [])

    return (
        <NavLink
        to={`/${props.role}/profile/Chat/${props.message.uuid}`}
        key={props.TextID} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`flex p-2 relative space-x-2 hover:bg-backg rounded-t-lg items-center py-4 border-b`}>
            {
                imageUrl? 
                <img 
                alt="pfp" 
                src={imageUrl}
                referrerPolicy="no-referrer"
                className="min-w-16 self-start max-w-16 max-h-16 rounded-full min-h-16 object-cover"></img>
                : 
                <div className="min-w-16 animate-pulse bg-darkg max-w-16 max-h-16 rounded-full self-start min-h-16 object-cover">
                </div>
            }
            <div className="flex flex-col self-start space-y-1 truncate">
                <span className="font-bold truncate">
                    {props.message.firstname+" "+props.message.lastname}
                </span>
                <span className="text-sm text-darkg truncate">
                    {(props.message.Sender.toLowerCase() ===props.role ? "You: ": "")+props.message.message}
                </span>
                <span className={`text-button2 text-xs`}>
                    {ElapsedTime(props.message.MessageTime)} ago
                </span>
            </div>
        </NavLink> 
    );
}

export default Message;