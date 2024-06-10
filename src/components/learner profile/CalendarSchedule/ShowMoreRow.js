import { IoMdTime } from "react-icons/io"
import { handleLessonDifficultyColor, timeFormatter } from "../../Global/functions";
import { fetchFile } from "../../Global/functions";
import {useEffect, useState} from 'react'
import { isGoogleProfilePicture } from "../../Global/functions";
import ReactLoading from 'react-loading';

function ShowMoreRow({lesson}) {
    const [imageFile, setImageFile] = useState('')
    const [loading, setLoading] = useState(false)


    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const handleLessonStatus = (Accepted) => {
        if(Accepted === -1){
            return "On Hold"
        }else if(Accepted===0) {
            return "Canceled"
        }else {
            return "Approved"
        }
    }

    const fetchImage = async () => {
        try {
            setLoading(true)
            let imageUrl = lesson.pfp;
            if (!isGoogleProfilePicture(lesson.pfp)) {
                if(firstSegment === "learner") {
                    imageUrl = await fetchFile(lesson.pfp, "images", "tutor", lesson.tutor_id)
                }else {
                    imageUrl = await fetchFile(lesson.pfp, 'images', 'Learner', lesson.private_learner_id);
                }
            }
            setImageFile(imageUrl)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(lesson.pfp && lesson.tutor_id){
            fetchImage()
        }
    }, [lesson.pfp, lesson.tutor_id])

    return (
        <div className="flex p-2 rounded-lg hover:bg-lightg space-x-3 items-center">
            {
                loading?
                <div className="flex justify-start">
                    <ReactLoading type="spin" color="#FFA447" height={'80px'} width={'80px'} />
                </div>
                :
                <img 
                src={imageFile} 
                referrerPolicy="no-referrer"
                className="min-w-20 min-h-20 max-w-20 max-h-20  object-cover rounded-full" alt="tutorface"></img>
            }
            <div className="flex flex-col space-y-1 justify-center">
                <div className="flex items-center space-x-2">
                    <span className="text-base">{lesson.lesson_topic}</span>
                    <div className="flex items-center space-x-1">
                        <IoMdTime className="text-darkg" size="15"></IoMdTime>
                        <span className="text-darkg text-xs ">
                            {timeFormatter(lesson.start_time)} - {timeFormatter(lesson.end_time)}
                        </span>
                    </div>
                    <div className="flex">
                        <div className="bg-lightGreen text-xs p-1 border border-elements text-elements rounded-xl">
                            {
                                handleLessonStatus(lesson.Accepted)
                            }
                        </div>
                    </div>
                </div>
                <span className="text-sm" >
                    {
                        firstSegment === "learner"?
                        "Tutor: "
                        :
                        "Learner: "
                    }   
                    {lesson.firstname+" "+lesson.lastname}
                    </span>
                <div className="flex space-x-2">
                    <div className={`text-button2 bg-lightButton2 text-xs p-1 border border-button2 rounded-xl`}>
                        {lesson.language}
                    </div>
                    <div className={`${handleLessonDifficultyColor(lesson.lesson_difficulty, 'other')} text-xs p-1 border rounded-xl`}>
                        {lesson.lesson_difficulty}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowMoreRow;