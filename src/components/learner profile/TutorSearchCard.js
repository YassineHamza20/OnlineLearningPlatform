import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { useEffect, useState } from 'react'
import { fetchCountryData, fetchFile, isGoogleProfilePicture } from "../Global/functions";
import { NavLink } from "react-router-dom"
import axiosInstance from "../../interceptors/axiosInterceptor";
import {useDispatch, useSelector} from 'react-redux'
import { appendItem, removeItem } from "../../state/slices/likedTutorSlice";


function TutorSearchCard(props) {

    //controlling wether the user liked this tutor or not
    const [liked, setLiked] = useState(props.liked)

    //tutor profile picture
    const [imageData, setImageData] = useState()

    //flag image of the tutor's country
    const [countryData, setCountryData] = useState(null);

    const learnerId = useSelector(state => state.userData.id)

    const learnerData = useSelector(state => state.userData)

    const dispatch = useDispatch()

    
    const path = window.location.pathname;





    const handleLike = async () => {
        if(!liked){//liking the tutor
            try {
                console.log("tutorId:", props.tutor.id);
                const response = await axiosInstance.post('http://localhost:5000/learner/Like', {
                    tutorId: props.tutor.id,
                    action: 'Like'
                })
                //generating current date object
                const currentDate = new Date();

                // Extract individual components of the date and time
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
                const day = String(currentDate.getDate()).padStart(2, '0');
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');


                dispatch(appendItem({
                    likeId: response.data.message,
                    id: props.tutor.id,
                    learnerId: learnerId,
                    LikeDate: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                    lastname: props.tutor.lastname,
                    firstname: props.tutor.firstname,
                    email: props.tutor.email,
                    pfp: props.tutor.pfp,
                    country: props.tutor.Country, 
                    tel: props.tutor.tel,
                    Birthday: props.tutor.Birthday,
                    introductionVideo: props.tutor.introductionVideo,
                    description: props.tutor.description, 
                    teachingStyle: props.tutor.teachingStyle,
                    AboutMe: props.tutor.AboutMe,
                    Languages: props.tutor.Languages,
                    WorkExperience: props.tutor.WorkExperience, 
                    Education: props.tutor.Education,
                    uuid: props.tutor.uuid,
                }))

            } catch (error) {
                console.log(error);
            }
        }else {//disliking the tutor
            try {
                console.log("tutorId:", props.tutor.id);

                await axiosInstance.post('http://localhost:5000/learner/Like', {
                    tutorId: props.tutor.id,
                    action: 'Dislike'
                })
                dispatch(removeItem(props.tutor.id))

            } catch (error) {
                console.log(error);
            }
        }
        setLiked(prevValue => !prevValue)
    }


    //fetching tutor profile picture from backend
    async function fetchData () {
        if(props.tutor.pfp && props.tutor.id){
            if(!isGoogleProfilePicture(props.tutor.pfp)){
                fetchFile(props.tutor.pfp, "images", "Tutor", props.tutor.id)
                .then(response => {
                    setImageData(response)
                })
                .catch(error => {
                    console.log(error);
                })
            }else {
                setImageData(props.tutor.pfp)
            }
        }
    }

    
      const fetchFlag = async () => {
        const data = await fetchCountryData(props.tutor.Country);
        setCountryData(data);
      };

    useEffect(() => {
        //getting tutor picture
        fetchData()
        //getting the flag of the tutor's country
        fetchFlag()
    }, [])

    
    return (
        <div className="cursor-pointer hover:bg-lightButton2 transition-colors duration-300 min-h-72 max-h-72 rounded-2xl flex flex-col space-y-3 shadow-lg px-5 py-2 bg-white border-darkg border" >
            <div className="flex w-full items-center space-x-3">
                <img 
                referrerPolicy="no-referrer"
                src={imageData} 
                alt="prolfiepicture" 
                className="rounded-3xl min-w-24 max-w-24 h-24 object-cover"></img>
                <div className="flex flex-col space-y-2 w-full h-full truncate">
                    <span className="text-lg truncate">
                        {props.tutor.firstname && props.tutor.lastname ? props.tutor.firstname + " " + props.tutor.lastname : props.tutor.email}
                    </span>
                    <div className="flex space-x-2 items-center">
                        {countryData && countryData[0]?.flags && (
                            <img className="rounded-lg w-9 h-9 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                        )}
                        <span className="text-darkg">{props.tutor.Country}</span>
                    </div>                
                </div>
                {
                    path!=="/landingpage/Tutors"?
                    <div onClick={handleLike} className="rounded-full self-start flex p-1 hover:bg-lightg justify-center items-center">
                        {
                            liked?
                            <IoIosHeart size="22" color="red"></IoIosHeart>
                            :
                            <IoIosHeartEmpty size="22" color=""></IoIosHeartEmpty>
                        }
                    </div>
                    :
                    null
                }
            </div>
            <hr key="1" className="h-1 w-full"></hr>
            <div className="flex flex-col w-full h-full overflow-y-auto break-before-avoid scrollbar-hidden"  style={{ scrollbarWidth: 'none',}}>
                <span className="font-bold ">
                    Introduction:
                </span>
                <span className="text-darkg w-full h-full text-sm">{props.tutor.description}</span>
            </div>
            {
                path !=="/landingpage/Tutors"?
                (
                    learnerData.firstname?
                    (
                        learnerData.subscribed?
                        <div className="flex space-x-3 self-end">
                            <NavLink
                            target="_blank" 
                            rel="noopener noreferrer"
                            to={`/learner/profile/Chat/${props.tutor.uuid}`}
                            className={`bg-button2 border border-button2 flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-white hover:shadow`}>
                            Text</NavLink>
                            {/*navigating to tutor profile*/}
                            <NavLink      
                            target="_blank" 
                            rel="noopener noreferrer"
                            to={`/learner/profile/Tutor/${props.tutor.uuid}`}
                            className={`bg-backg  border border-button2 flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-button2 hover:shadow`}>
                            Profile</NavLink>
                        </div>
                        :
                        <NavLink      
                        target="_blank" 
                        rel="noopener noreferrer"
                        to={`/learner/profile/Tutor/${props.tutor.uuid}`}
                        className={`bg-backg  border border-button2 flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-button2 hover:shadow`}>
                        Profile</NavLink>
                      
                    )
                    :
                    null
                )
                
                :
                null
            }
        </div>
    );
}

export default TutorSearchCard;