import { useEffect, useState } from "react";
import Card from "./Card";
import Tutor from "./Tutor";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { NavLink } from "react-router-dom";

function TutorsCard(props) {
    const [recommendedTutors, setRecommendedTutors] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/learner/RecommendedTutors', {})
                console.log("response: ", response.data);
                setRecommendedTutors(response.data)
            }catch(err) {
                console.log(err);
            }
        }

        fetchData()
    }, [])
    
    const content =[
        <div key="0" className="flex w-full justify-between  items-center">
            <span className="text-lg font-bold mb-5">
                Tutors for you
            </span>
            <NavLink
             to="/learner/profile/Tutors"
             className="border hover:bg-orange-600 hover:text-white border-button text-button rounded-2xl h-10 bg-lightbutton px-3 flex justify-center items-center text-sm font-bold">
                See all
            </NavLink>
        </div>,
        <hr key="Lineee" className="h-1 w-full"></hr>,
        <div key="2" className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {
                recommendedTutors.map((tutor, index) => {
                    return <Tutor key={index} tutor={tutor}></Tutor>
                })
            }
        </div>

    ]

    return (
        <Card content={content}></Card>
    );
}

export default TutorsCard;