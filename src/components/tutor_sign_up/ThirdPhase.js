import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import AboutMe from './AboutMe'
import Languages from './Languages'
import WorkExperience from './WorkExperience'
import Education from './Education'
import TeachingStyle from './TeachingStyle'


function ThirdPhase() {

   //indicators for the completion of the fields
   const listOfEducationSaved = useSelector(state => state.listData.listOfEducationSaved)
   const listOfLanguagesSaved = useSelector(state => state.listData.listOfLanguagesSaved)
   const listOfWorkExperienceSaved = useSelector(state => state.listData.listOfWorkExperienceSaved)
   const TeachingStylee = useSelector(state => state.tutorData.TeachingStyle)
   const AboutMee = useSelector(state => state.tutorData.AboutMe)
   
   //list of tags
   const Tags = [
      'Education',
      'It',
      'Advertising',
      'Agriculture',
      'Entrepreneurship',
      'Government',
      'Law',
      'Customer Support',
  ]

    
   //icons and placeholders and titles for the fields
   const element = [
      {
         icon: <FaChalkboardTeacher color={`${TeachingStylee.length>0? "#FFA447": "#767676"}`} size="20"></FaChalkboardTeacher>,
         placeholder: 'Give students a glimpse into what to expect from your class...',
         title: 'Teaching Style'
      },
      {
         icon: <IoIosInformationCircle
         color={`${AboutMee.length>0? "#FFA447": "#767676"}`} 
         size="20" 
         ></IoIosInformationCircle>,
         placeholder: 'Feel free to share more about yourself here. Adding details about your hobbies, interests, and travel experiences can help connect with students who share similar interests...',
         title: 'About Me'
      },
      {
         icon: <MdLanguage color={`${listOfLanguagesSaved? "#FFA447": "#767676"}`} size="20"></MdLanguage>,
         placeholder: 'Kindly indicate languages you speak.',
         title: 'Languages'
      },
      {
         icon: <MdWork color={`${listOfWorkExperienceSaved? "#FFA447": "#767676"}`} size="20"></MdWork>,
         placeholder: '',
         title: 'Work Experience'
      },
      {
         icon: <RiGraduationCapFill color={`${listOfEducationSaved? "#FFA447": "#767676"}`} size="20"></RiGraduationCapFill>,
         placeholder: '',
         title: 'Education'
      },
   ]
    return (
        <div className="w-full h-[80%] space-y-2 py-3 overflow-y-auto"> 
            <TeachingStyle {...element[0]} ></TeachingStyle>
            <AboutMe {...element[1]}></AboutMe>
            <Languages {...element[2]}></Languages>
            <WorkExperience Tags={Tags} {...element[3]}></WorkExperience>
            <Education Tags={Tags} {...element[4]}></Education>
        </div>
    );
}

export default ThirdPhase;