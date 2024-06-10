import { NavLink } from "react-router-dom";
import Card from "./Card";
import Course from "./Course";

function CoursesCard(props) {

    const content = [
        <div key="0" className="flex w-full justify-between items-center">
            <span className="text-lg font-bold mb-5">
                Try a course (they're free)
            </span>
            <NavLink to='/learner/profile/Courses' className="border border-button text-button rounded-2xl h-10 bg-lightbutton px-3 flex justify-center items-center text-sm font-bold">See more</NavLink>
        </div>,
        <hr key="1" className="h-1 w-full"></hr>,
        <div key="2" className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {
                props.courses.map((course, index) => {
                    return <Course key={index} course={course}></Course>
                })
            }
        </div>

    ]
    return (
        <Card content={content}></Card>
    );
}

export default CoursesCard;