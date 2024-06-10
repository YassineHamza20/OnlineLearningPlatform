
import { useEffect, useState } from 'react';
import {MdOutlineNavigateNext} from 'react-icons/md'
import { fetchCountryData, fetchFile, isGoogleProfilePicture } from '../Global/functions';
import { NavLink } from 'react-router-dom';
function Tutor(props) {
    const [imgUrl, setImgUrl] = useState(null)
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("COuntry: ", props.tutor);
                if(props.tutor.pfp) {
                    if (!isGoogleProfilePicture(props.tutor.pfp)) {
                        props.tutor.pfp = await fetchFile(props.tutor.pfp, "images", "tutor", props.tutor.tutor_id);
                    }
                }
                setImgUrl(props.tutor.pfp)
                const data = await fetchCountryData(props.tutor.country)
                setCountryData(data)

            } catch (error) {
                console.log("error: ", error);
            }
        }

        fetchData()

    }, [props.tutor])

    const handleTimeFormat = () => {
        const createdAt = new Date(props.tutor.created_at)
        const year = createdAt.getFullYear()
        console.log("year:", year);
        return `Tutor since ${year}`
    }

    return (
        <div key={props.tutor.tutor_id} className="flex flex-col space-y-6 pb-3 rounded-3xl border hover:bg-lightg">
            <img src={imgUrl}
            referrerPolicy="no-referrer"
             alt="tutorvideo" className="w-full min-h-36 max-h-36 object-cover rounded-t-3xl"></img> 
            <div className="flex flex-col px-5 w-full space-y-2 h-full cursor-pointer">
                <div className="flex justify-between items-start w-full">
                    <span className="font-bold">{props.tutor.firstname+ " "+ props.tutor.lastname}</span>
                    <div className="flex space-x-2 items-center ">
                        {countryData && countryData[0]?.flags && (
                            <img className="rounded-full max-h-6 max-w-6 min-w-6 min-h-6 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                        )}
                        <span className="text-darkg">{props.tutor.Country}</span>
                    </div>   
                </div>
                <span className="text-sm">{handleTimeFormat()}</span>
                <div className="flex-grow"></div>
                <NavLink 
                target="_blank" 
                rel="noopener noreferrer"
                to={`/learner/profile/Tutor/${props.tutor.uuid}`}
                className="flex space-x-1 rounded-full font-bold p-2 bg-lightbutton border border-button text-button items-center justify-center mt-2">
                    <span className="text-sm">See profile</span>
                    <MdOutlineNavigateNext size="22" color="#FFA447"></MdOutlineNavigateNext>
                </NavLink>
            </div>
        </div>
    );
}

export default Tutor;