import { useEffect, useState } from "react";
import { fetchCountryData, fetchFile, isGoogleProfilePicture } from "../Global/functions";
import {MdOutlineNavigateNext} from 'react-icons/md'
import { NavLink } from "react-router-dom";


function CourseMaker(props) {

    const handleTimeFormat = () => {
        const createdAt = new Date(props.info.tutorJoined)
        const year = createdAt.getFullYear()
        console.log("year:", year);
        return `Tutor since ${year}`
    }

    const [imgUrl, setImgUrl] = useState(null)
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(props.info){
                    let imageUrl = props.info.pfp
                    if(imageUrl) {
                        if (!isGoogleProfilePicture(imageUrl)) {
                            imageUrl = await fetchFile(imageUrl, "images", "tutor", props.info.tutorId);
                        }
                    }
                    setImgUrl(imageUrl)
                    const data = await fetchCountryData(props.info.Country)
                    setCountryData(data)
                }

            } catch (error) {
                console.log("error: ", error);
            }
        }

        fetchData()

    }, [props.info])

    return (
        <div key={props.info.id} className="flex flex-col bg-white w-80 space-y-6 pb-3 rounded-3xl border hover:bg-lightg">
            <img src={imgUrl} alt="tutorvideo" className="w-full min-h-72 max-h-72 object-cover rounded-t-3xl"></img> 
            <div className="flex flex-col px-5 w-full space-y-2 h-full cursor-pointer">
                <div className="flex justify-between items-start w-full">
                    <span className="font-bold">{props.info.firstname+ " "+ props.info.lastname}</span>
                    <div className="flex space-x-2 items-center ">
                        {countryData && countryData[0]?.flags && (
                            <img className="rounded-full max-h-6 max-w-6 min-w-6 min-h-6 object-cover" src={countryData[0].flags.png} alt={props.info.Country} />
                        )}
                        <span className="text-darkg">{props.info.Country}</span>
                    </div>   
                </div>
                <span className="text-sm">{handleTimeFormat()}</span>
                <div className="flex-grow"></div>
                <NavLink 
                target="_blank" 
                rel="noopener noreferrer"
                to={`/learner/profile/Tutor/${props.info.uuid}`}
                className="flex space-x-1 rounded-full font-bold p-2 bg-lightbutton border border-button text-button items-center justify-center mt-2">
                    <span className="text-sm">See profile</span>
                    <MdOutlineNavigateNext size="22" color="#FFA447"></MdOutlineNavigateNext>
                </NavLink>
            </div>
        </div>
    );
}

export default CourseMaker;