import axios from "axios";
import { useEffect, useState } from "react";
import Tutor from "./Tutor";
import { NavLink } from "react-router-dom";


const Tutors = () => {
  const [tutors, setTutors] = useState([])


  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.post('https://onlinelearningplatform-d9w2.onrender.com/visitor/getTutorinfoLandingPage')
        setTutors(response.data.result)
        console.log("tutors: ", response.data.result) 
    }
    fetchData()
  }, [])


  return (
    <>
      <div className="flex justify-center items-center w-full">
            <div className="flex items-center justify-center flex-wrap w-full gap-4 p-4 px-[20px] lg:px-[120px] py-8">
                {tutors.map((tutor, index) => (
                    <Tutor key={index} tutor={tutor}></Tutor>
                ))}
            </div>
        </div>

      {/* Additional Content */}
      <div className="text-center mt-8 bg-backg">
        <h2 className="text-button2 mb-8 text-3xl" style={{ fontFamily: 'Holtwood One SC' }}>Start Your Learning Journey</h2>
        <p className="text-gray-500 text-lg mb-8">Choose the tutor with the personality, professional experience, or area of interest you need!</p>
        <NavLink to="/learner/signup" className="bg-button2 hover:bg-[#DA7878] text-white font-bold py-4 px-28 lg:px-44 rounded-full mb-20">Start Learning</NavLink>
      </div>
    </>
  );
};

export default Tutors;
