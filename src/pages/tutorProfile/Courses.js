import Footer from "../../components/Global/Footer";
import MakeCourses from "../../components/TutorCourseMaking/MakeCourses";
import MyCourses from "../../components/TutorCourseMaking/MyCourses";
import Welcome from "../../components/TutorCourseMaking/Welcome";

function Courses(props) {
    return (
        <div key="loaded" className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div key="leftpart" className="flex flex-col col-span-1 h-auto space-y-5">
                <Welcome></Welcome>
            </div>
            <div key="rightpart" className="flex flex-col col-span-1 md:col-span-2 h-auto space-y-5">
                <MakeCourses></MakeCourses>
            </div>
            <div key="belowpart" className="flex flex-col col-span-1 md:col-span-3 h-auto space-y-5">
                <MyCourses></MyCourses>
            </div> 
            <Footer></Footer>
        </div>
    );
}

export default Courses;