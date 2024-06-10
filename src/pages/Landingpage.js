import Navbar from "../components/Landingpage/Navbar"
import Welcome from "../components/Landingpage/Welcome"
import Tutors from "../components/Landingpage/Tutors"
import Subscription from "../components/Landingpage/Subscription"
import Suite from "../components/Landingpage/Suite"
import Features from "../components/Landingpage/Features"
import TutorsSearch from "./learner/Profile/TutorsSearch"
import CoursesSearch from "./learner/Profile/CoursesSearch"
import LinguaBuddy from "./learner/Profile/LinguaBuddy"
import Footer from "../components/Global/Footer"

export default function Landingpage() {
  
  const path = window.location.pathname
  


  const handleBody = () => {
      if (path === "/" || path === "/landingpage") {
        return (
          <>
            <Welcome />
            <Tutors />
            <Features />
            <Subscription />
            <Suite />
            <Footer></Footer>
          </>
        );
      } else if (path === "/landingpage/Tutors") {
        return <TutorsSearch />;
      } else if (path === "/landingpage/Courses") {
        return <CoursesSearch />;
      }else if(path ==="/landingpage/LinguaBuddy"){
        return <LinguaBuddy></LinguaBuddy>
      }
    }

  console.log("Condition: ", path ==="/" || path ==="/landingpage")
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-backg">
            <Navbar></Navbar>
            {
              handleBody()
            }
    </div>
  )
}
