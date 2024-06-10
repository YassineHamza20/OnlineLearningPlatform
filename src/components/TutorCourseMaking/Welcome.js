
function Welcome(props) {
    return (
        <div className="rounded-2xl px-6 py-5 h-auto flex-col flex justify-center shadow space-y-3 items-center bg-white">
            <img className="w-52 h-52" src="/CreateCourse.png" alt="Course Creation" />
            <div className="font-bold text-2xl text-center">
                course making section 
            </div>
            <p className="text-gray-700 text-center text-base">
                As a tutor, you can upload your courses and consult them anytime. 
                Use our platform to manage and update your course content seamlessly. 
                Learners will be able to download and consult the courses you provide, 
                engaging with the material at their own pace.
            </p>
        </div>
    );
}

export default Welcome;