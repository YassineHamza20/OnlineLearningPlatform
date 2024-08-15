
import FocusTopics from "./FocusTopics";
import LearningGoals from "./LearningGoals";
import Proficiency from "./Proficiency";
import Title from "./Title";
import Country from "./Country";
import axiosInstance from "../../interceptors/axiosInterceptor";
import Languages from "./Languages";
import Description from "./Description";
import TeachingStyle from "./TeachingStyle";
import AboutMe from "./AboutMe";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import IntroductiveVideo from "./IntroductiveVideo";

function ProfileChange(props) {

    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const modifyCall = async (value, type) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`https://onlinelearningplatform-d9w2.onrender.com/${firstSegment}/Update`, {
                type: type,
                newParameter: value
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            .then((response) => {
                
                console.log(response.data.message);

                resolve('updated')
            })
            .catch((err) => {
                reject('error')
                console.log(err);
            })
        })
    }


 

    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title={firstSegment==="learner"? "Student Profile" : "Tutor Profile"}></Title>
            {
                firstSegment === "learner" ?
                <>
                    <Proficiency modifyCall={modifyCall} title="Language Proficiency"></Proficiency>
                    <LearningGoals modifyCall={modifyCall} title="Learning Goals"></LearningGoals>
                    <FocusTopics modifyCall={modifyCall} title="Focus Topics"></FocusTopics>
                    <Country modifyCall={modifyCall} title="From" role={firstSegment}></Country>
                </>
                :
                <>
                    <IntroductiveVideo title="Introductive Video"></IntroductiveVideo>
                    <Languages modifyCall={modifyCall} title="Languages"></Languages>
                    <WorkExperience title="Work Experience" modifyCall={modifyCall}></WorkExperience>
                    <Education title="Education" modifyCall={modifyCall}></Education>
                    <Description modifyCall={modifyCall} title ="Notes / Unavailable times"></Description>
                    <TeachingStyle modifyCall={modifyCall} title="Teaching Style & Description"></TeachingStyle>
                    <AboutMe modifyCall={modifyCall} title="About Me"></AboutMe>
                    <Country modifyCall={modifyCall} title="From" role={firstSegment}></Country>
                </>
            }
        </div>
    );
}

export default ProfileChange;