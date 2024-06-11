import { useEffect, useState } from "react";
import TutorSearchCard from "../../../components/learner profile/TutorSearchCard";
import { resetFilterOptions, resetPageNumber, setMaxPageNumber, setTutorSearchList } from "../../../state/slices/userSlice";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../../components/Global/Loading'
import ShowMoreTutors from "../../../components/learner profile/ShowMoreTutors";
import SearchTutors from "../../../components/learner profile/TutorFilterOption/SearchTutors";
import LanguageSelection from "../../../components/learner profile/TutorFilterOption/LanguageSelection";
import Availability from '../../../components/learner profile/TutorFilterOption/Availability'
import Proficiency from "../../../components/learner profile/TutorFilterOption/Proficiency";
import { setLikedTutors } from "../../../state/slices/likedTutorSlice";
import Footer from "../../../components/Global/Footer";

function TutorsSearch(props) {

    const dispatch = useDispatch()
    
    const [date, setDate] = useState() 

    const [selectedOption, setSelectedOption] = useState('All')
    const tutorSearchList = useSelector(state => state.userData.tutorSearchList);
    const [loading, setLoading] = useState(false)

    const learnerData = useSelector(state => state.userData)

    const filterOptions = useSelector(state => state.userData.filterOptions)

    const maxPageNumber = useSelector(state => state.userData.maxPageNumber)

    const likedTutors = useSelector(state => state.likedTutors.likedTutors)
    
    const path = window.location.pathname;

    useEffect(() => {
        const fetchLikedTutors = async () => {
            try {
                const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/learner/LikedTutors', {})
                
                dispatch(setLikedTutors(response.data.message))
            } catch (error) {
                console.log(error);
            }
        }
        fetchLikedTutors()
    }, [])

    //getting tutors from the database
    async function fetchData (filterOption) {
        try {
                dispatch(resetPageNumber())
                setLoading(true)
                const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/SearchTutors', {
                    page: 1,
                    pageSize: 3,
                    filterOptions: filterOption
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                });
                if(!response.data.message) { // no error 
                    console.log(response.data);
                    dispatch(setTutorSearchList(response.data.tutorsList))
                    dispatch(setMaxPageNumber(response.data.tutorsNumber))
                }
                setLoading(false)
            }catch(err) {
                console.log(err)
                setLoading(false)
            }
    }

    //reset the fields and get all the data again 
    const handleReset = () => {
        dispatch(resetFilterOptions())
        fetchData({
            name:"",
            language:"",
            proficiency: "",
            availability: ""
        })
        setDate("")
    }

    useEffect(() => {
        fetchData(filterOptions)
    }, [])

    return (
            <div className="flex flex-col space-y-4 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7">
                <div className="flex w-full items-center space-x-8 ">
                    <span className="font-bold text-2xl text-center"> Find a Tutor</span>
                    <span onClick={()=> setSelectedOption("All")} className={`cursor-pointer ${selectedOption === "All"? "border-b-button border-b-2 text-button font-bold": ""} px-2`}>All</span>
                    {
                        path !=="/landingpage/Tutors"?
                        <span onClick={() => setSelectedOption("Favorites")} className={`${selectedOption === "Favorites"? "border-b-button border-b-2 text-button font-bold": ""} cursor-pointer px-2`}>Favorites</span>
                        :
                        null
                    }
                </div>
                {
                    selectedOption === "All"?
                    <>
                        <SearchTutors fetchData={fetchData}></SearchTutors>
                        <Proficiency fetchData={fetchData}></Proficiency>
                        <hr className="h-1"></hr>
                        <div className="w-full flex items-center space-x-3 h-auto flex-wrap"> 
                            <span className="">Filter by:</span>
                            <Availability date={date} setDate={setDate} fetchData={fetchData}></Availability>
                            <LanguageSelection fetchData={fetchData}></LanguageSelection>
                            <div className="flex-grow hidden lg:block"></div>
                            {
                                filterOptions.language || filterOptions.proficiency || filterOptions.availability?
                                    <div onClick={handleReset} className=" transition-all duration-200 py-[6px] px-9 rounded-lg cursor-pointer button bg-darkg text-white">Clear</div>
                                :
                                    null
                            }
                        </div>
                        {
                            loading? 
                            <Loading></Loading>
                            :
                            <>
                                {learnerData.tutorSearchList && learnerData.tutorSearchList.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5 ">
                                        {
                                            learnerData.tutorSearchList.map((tutor, index) => {
                                                const liked = likedTutors.find(item => item.id === tutor.id)
                                                return <TutorSearchCard liked={liked} key={index} tutor={tutor}></TutorSearchCard>
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div className="w-full text-center text-gray-500">No tutors found</div>
                                )}
                                {
                                    (learnerData.tutorSearchList && learnerData.tutorSearchList.length > 0 && (maxPageNumber !== learnerData.tutorSearchList.length))?
                                    <ShowMoreTutors></ShowMoreTutors>
                                    :
                                    null
                                }
                            </>
                        }
                    </>
                    :
                    <>
                        {likedTutors && likedTutors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5 ">
                                {
                                    likedTutors.map((tutor, index) => {
                                        return <TutorSearchCard liked={1} key={index} tutor={tutor}></TutorSearchCard>
                                    })
                                }
                            </div>
                        ) : (
                            <div className="w-full text-center text-gray-500">No favorite tutors liked yet , like to view here !</div>
                        )}
                    </>
                }
                <Footer></Footer>
            </div>
    );
}

export default TutorsSearch;
