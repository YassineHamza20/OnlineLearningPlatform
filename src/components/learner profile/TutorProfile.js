import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTutor } from "../../state/slices/userSlice";
import { fetchFile, fetchCountryData, isGoogleProfilePicture } from "../Global/functions";
import { IoMdCalendar } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import LikeButton from "./LikeButton";
import ScheduleLessonFromTutorProfile from "./ScheduleLessonFromTutorProfile";
import { setLikedTutors } from "../../state/slices/likedTutorSlice";
import Footer from "../Global/Footer";
import ReviewForm from "../../pages/learner/Profile/review";
import ViewReviews from "../../pages/learner/Profile/ViewReviews";
import { Button, useDisclosure } from '@chakra-ui/react';

function TutorProfile() {
    const [videoUrl, setVideoUrl] = useState(null);
    const dispatch = useDispatch();
    const selectedTutorData = useSelector(state => state.userData.selectedTutor);
    const [imgUrl, setImgUrl] = useState(null);
    const [countryFlag, setCountryFlag] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const param = useParams();
    const scheduleRef = useRef(null);

    const scrollToSchedule = () => {
        scheduleRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/learner/selectedTutor', {
                uuid: param.uuid
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });

            dispatch(setSelectedTutor(response.data.message));

            if (!isGoogleProfilePicture(response.data.message.pfp)) {
                const resp = await fetchFile(response.data.message.pfp, "images", "tutor", response.data.message.id);
                setImgUrl(resp);
            } else {
                setImgUrl(response.data.message.pfp);
            }

            if (response.data.message.introductionVideo) {
                const data = await fetchFile(response.data.message.introductionVideo, "videos", "tutor", response.data.message.id);
                setVideoUrl(data);
            }

            if (response.data.message.country) {
                const flag = await fetchCountryData(response.data.message.country);
                setCountryFlag(flag);
            }

            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchLikedTutors = async () => {
            try {
                const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/learner/LikedTutors', {});
                dispatch(setLikedTutors(response.data.message));
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikedTutors();
        fetchData();
    }, [param.uuid]);
 //fetching the video from database
                // if(response.data.message.introductionVideo) {
                //     const data = await fetchFile(response.data.message.introductionVideo, "videos", "tutor", response.data.message.id)
                //     //storing the video
                //     setVideoUrl(data)
                // }
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="h-[90%] w-full p-2 lg:p-10 overflow-x-hidden flex flex-col space-y-3">
            {
                selectedTutorData && !isLoading ? (
                    <>
                        <div className="bg-white rounded-lg shadow-xl pb-8 flex flex-col items-center justify-center">
                            <div className="w-full h-[200px]">
                                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" alt="Profile Background" />
                            </div>
                            <div className="flex flex-col items-center -mt-20">
                                <img
                                    referrerPolicy="no-referrer"
                                    src={imgUrl}
                                    className="min-w-40 max-w-40 min-h-40 max-h-40 object-cover border-4 border-white rounded-full"
                                    alt="Profile"
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-2xl">{selectedTutorData.firstname + " " + selectedTutorData.lastname}</span>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    {countryFlag && countryFlag[0]?.flags && (
                                        <img className="rounded-lg w-9 h-9 object-cover" src={countryFlag[0].flags.png} alt={selectedTutorData.country} />
                                    )}
                                    <p className="text-sm text-gray-500">{selectedTutorData.country}</p>
                                </div>
                            </div>
                            {videoUrl && (
                                <video
                                    poster={imgUrl}
                                    className="object-cover h-[500px] mt-4 w-[70%] flex justify-center items-center rounded-xl"
                                    controls
                                    muted
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>
                            )}
                            <div className="flex flex-col w-full justify-center items-center space-y-3 mt-4">
                                <button onClick={scrollToSchedule} className="button w-[70%] flex items-center justify-center space-x-2 bg-white border py-3 px-4 rounded-full hover:bg-button2 transition-colors duration-300 hover:text-white border-button2 text-button2">
                                    <IoMdCalendar size="25" className="icon"></IoMdCalendar>
                                    <span>Schedule</span>
                                </button>
                                <div className="flex items-center justify-evenly w-full">
                                    <div className="flex flex-col justify-center items-center space-y-1">
                                        <LikeButton id={selectedTutorData.id}></LikeButton>
                                        <span className="text-black text-sm text-center">Like</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Description</h4>
                            <p className="mt-2 text-gray-700">{selectedTutorData.description}</p>
                        </div>
                        <div className="flex flex-col space-y-3 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Informations</h4>
                            <div className="flex items-center space-x-2">
                                <FaChalkboardTeacher size="25" className="text-button"></FaChalkboardTeacher>
                                <h4 className="text-lg text-gray-700 font-bold">Teaching Style</h4>
                            </div>
                            <p className="mt-2 text-gray-700">{selectedTutorData.teachingStyle}</p>
                            <div className="flex items-center space-x-2">
                                <IoIosInformationCircle size="25" className="text-button"></IoIosInformationCircle>
                                <h4 className="text-lg text-gray-700 font-bold">About Me</h4>
                            </div>
                            <p className="mt-2 text-gray-700">{selectedTutorData.AboutMe}</p>
                            <div className="flex items-center space-x-2">
                                <MdLanguage size="25" className="text-button"></MdLanguage>
                                <h4 className="text-lg text-gray-700 font-bold">Languages</h4>
                            </div>
                            <div className="rounded-2xl h-auto flex flex-wrap">
                                {selectedTutorData.Languages && JSON.parse(selectedTutorData.Languages).map((item, index) => (
                                    <span key={index} className="bg-white rounded-2xl border mr-2 mb-2 border-darkg px-2 py-1 text-sm">{item.language}</span>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2">
                                <MdDateRange size="25" className="text-button"></MdDateRange>
                                <h4 className="text-lg text-gray-700 font-bold">Joined</h4>
                            </div>
                            <span className="">{formatTimestamp(selectedTutorData.created_at)}</span>
                            <div className="flex items-center space-x-2">
                                <MdWork size="25" className="text-button"></MdWork>
                                <h4 className="text-lg text-gray-700 font-bold">Work Experience</h4>
                            </div>
                            {selectedTutorData.WorkExperience && JSON.parse(selectedTutorData.WorkExperience).map((item, index) => (
                                <div key={index} className="flex flex-col h-full">
                                    <div className="h-full flex space-x-2">
                                        <span className="text-black">{item.title}</span>
                                        <span className="text-darkg">{item.tag}</span>
                                    </div>
                                    <span className="text-black text-sm">{item.description}</span>
                                </div>
                            ))}
                            <div className="flex items-center space-x-2">
                                <RiGraduationCapFill size="25" className="text-button"></RiGraduationCapFill>
                                <h4 className="text-lg text-gray-700 font-bold">Education</h4>
                            </div>
                            {selectedTutorData.Education && JSON.parse(selectedTutorData.Education).map((item, index) => (
                                <div key={index} className="flex flex-col h-full">
                                    <div className="h-full flex space-x-2">
                                        <span className="text-black">{item.title}</span>
                                        <span className="text-darkg">{item.tag}</span>
                                    </div>
                                    <span className="text-black text-sm">{item.description}</span>
                                </div>
                            ))}
                            <div className="container mt-4">
                                <Button
                                    onClick={onOpen}
                                    className="py-1 px-2 bg-white text-black rounded-lg"
                                >
                                    Add Review
                                </Button>
                                <ReviewForm isOpen={isOpen} onClose={onClose} onReviewSubmitted={fetchData} />
                            </div>
                        </div>
                        <div ref={scheduleRef} className="flex flex-col space-y-3 bg-white rounded-lg shadow-xl p-8">
                            <ScheduleLessonFromTutorProfile />
                        </div>
                    </>
                ) : null
            }
            <Footer />
        </div>
    );
}

export default TutorProfile;
