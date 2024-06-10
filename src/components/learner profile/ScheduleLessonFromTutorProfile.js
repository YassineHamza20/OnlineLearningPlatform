import BigCalendar from './BigCalendar'

function ScheduleLessonFromTutorProfile(props) {
    

    return (
        <>
            <h4 className="text-xl text-gray-900 font-bold">Schedule a lesson</h4>
            <span className="">Welcome to the scheduling section. Here, you can conveniently arrange a lesson with your chosen tutor. Please note that you will automatically be presented with available time slots that align with both your and the tutor's schedules.</span>
            <BigCalendar></BigCalendar>
        </>
    );
}

export default ScheduleLessonFromTutorProfile;