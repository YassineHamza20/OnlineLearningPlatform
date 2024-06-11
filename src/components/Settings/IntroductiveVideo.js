import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFile } from "../Global/functions";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import {setIntroductionVideo} from '../../state/slices/tutorSlice'
import axiosInstance from "../../interceptors/axiosInterceptor";
import ReactLoading from 'react-loading';


function IntroductiveVideo(props) {
    const [video, setVideo] = useState()
    const [loading, setLoading] = useState(false)
    const tutorData = useSelector(state => state.tutorData)
    //handling the video upload 
    const videoRef = useRef(null)
    const dispatch = useDispatch()

    

     //trigger edit mode
     const handleClick = async () => {
        videoRef.current.click()
            
        }
    

        const handleVideoChange= (event) => {
            const reader = new FileReader() 
            const formData = new FormData()
            if (event.target.files.length > 0) {
                //resetting the values on every video change
                setLoading(true)
                setVideo('')
                const videoFile = event.target.files[0]
                formData.append("userFile", videoFile)
                formData.append('type', "video")

                reader.onload = async () => {
                    const videoDataURL = reader.result;   
                    try {
                        const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/tutor/UpdateFile', formData, 
                            {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                                }
                            }
                        )
                        
                        dispatch(setIntroductionVideo(response.data.fileName))
                    }catch(err) {
                        console.log(err);
                    }
                    setLoading(false)
                    setVideo(videoDataURL)
                };
                reader.onerror = (error) => {
                    console.log("Error", error);
                    setLoading(false)
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    



    useEffect( () => {

        async function fetchData (){
            //fetching the image from database
            try {
                setLoading(true)
                const data = await fetchFile(tutorData.introductionVideo, "videos", "tutor", tutorData.id);
                setVideo(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }   
        if (tutorData.introductionVideo && tutorData.id) {
            fetchData()
        }
    }, [tutorData.introductionVideo])


    console.log("loading: ", loading);
    return (
        <form onClick={handleClick} className={` cursor-pointer border-b px-2 hover:bg-lightg justify-between items-start flex border-lightg py-2`}>
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            <input  ref={videoRef} type="file" onChange={handleVideoChange} accept="video/*" className="hidden" ></input>
            {
                !loading?
                <>
                     <div className="rounded-2xl h-auto flex flex-wrap">
                        {
                            video?
                             <>
                             <video
                             className="w-full h-52 rounded-xl"
                             loop
                             autoPlay
                             controls
                             muted
                         >
                             <source src={video} type="video/mp4" />
                             </video>
                             <div  className="absolute cursor-pointer right-3 top-0 h-10 w-10 bg-darkg opacity-75 rounded-full flex justify-center items-center">
                                 <MdEdit size="17" color="#ffffff"></MdEdit>
                             </div>
                         </>
                         :
                         null
                        }
                    </div>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <div className="w-full flex items-start h-full justify-center">
                    <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                </div>
            }
            
        </form>
    );
}

export default IntroductiveVideo;