import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { HiOutlineUpload } from "react-icons/hi";
import { setIntroductionVideo, setIsLoading, setError } from '../../state/slices/tutorSlice';
import Loading from '../Global/Loading';
import { useState } from 'react';


function IntroductionVideo() {

    //getting tutorData from redux slice
    const tutorData = useSelector(state => state.tutorData)

    const dispatch = useDispatch()
    
    //handling the video upload 
    const videoRef = useRef(null)

    const [video, setVideo] = useState("")
    
    //storing both the video to be displayed to the user and the videoFile that we're gonna send to the server lately
    const handleVideoChange= (event) => {
        const reader = new FileReader() 
        if (event.target.files.length > 0) {
            //resetting the values on every video change
            dispatch(setIsLoading(true))
            dispatch(setIntroductionVideo(''))
            setVideo('')
            //dispatch(setDisplayableVideo(''))
            const videoFile = event.target.files[0]
            dispatch(setIntroductionVideo(videoFile));
            reader.onload = () => {
                const videoDataURL = reader.result;   
                console.log("Video state after setting: ", videoDataURL);
                dispatch(setIsLoading(false))
                //dispatch(setDisplayableVideo(videoDataURL))
                setVideo(videoDataURL)
            };
            reader.onerror = (error) => {
                dispatch(setError('Cannot load video!'));
                console.log("Error", error);
                dispatch(setIsLoading(false))
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    const handleSelectedVideo = () => {
        videoRef.current.click()
    }

    useEffect(() => {
        if(tutorData.introductionVideo) {
            dispatch(setIsLoading(true))
            const reader = new FileReader() 
            reader.onload = () => {
                const videoDataURL = reader.result;   
                console.log("Video state after setting: ", videoDataURL);
                dispatch(setIsLoading(false))
                //dispatch(setDisplayableVideo(videoDataURL))
                setVideo(videoDataURL)
            };
            reader.onerror = (error) => {
                dispatch(setError('Cannot load video!'));
                console.log("Error", error);
                dispatch(setIsLoading(false))
            };
            reader.readAsDataURL(tutorData.introductionVideo);
        }
    }, [])

    return (
        <div className=" relative rounded-xl h-full m-auto flex flex-col space-y-3 p-[13px] bg-lightg w-[80%] md:w-[50%]">
            <span className="text-black font-bold">
                Introductive Video
            </span>
            <span className="text-darkg text-sm flex justify-center items-center">
                Please upload a video introducing yourself or promoting your expertise. This will help learners connect with you and gain insight into your teaching style and personality.
            </span>
            {
                tutorData.introductionVideo && video?
                <>
                    <video
                    className="w-full h-[85%] rounded-xl"
                    loop
                    autoPlay
                    controls
                    muted
                >
                    <source src={video} type="video/mp4" />
                    </video>
                    <div onClick={handleSelectedVideo} className="absolute cursor-pointer right-3 top-0 h-10 w-10 bg-darkg opacity-75 rounded-full flex justify-center items-center">
                        <MdEdit size="17" color="#ffffff"></MdEdit>
                    </div>
                </>
                :
                <div onClick={handleSelectedVideo} className="w-full shadow cursor-pointer h-full bg-backg border-dashed rounded-xl border flex justify-center items-center border-black">
                    {
                        tutorData.isLoading? 
                        <Loading></Loading>
                        :
                        <HiOutlineUpload color="#767676" size="40"></HiOutlineUpload>
                    }
                </div>
            }
            <input  ref={videoRef} type="file" onChange={handleVideoChange} accept="video/*" className="hidden" ></input>
        </div>
    );
}

export default IntroductionVideo;