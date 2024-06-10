import Buttn from "./thirdstep_button"

export default function Third() {
    //list of goals
    const goals = [
        "Grow your career", 
        "Thrive at university",
        "Just for fun",
        "Travel abroad",
        "Prepare for a test",
        "Other"
    ]

    //list of topics
    const topics =[
        "Music",
        "Sports",
        "Technology",
        "TOEFL",
        "Movies",
        "IELTS", 
        "Food",
        "Grammar",
        "Science",
        "Healthcare",
        "Art",
        "Business"
    ]


    return(
       <>
            <span className="font-bold self-start text-lg text-[#000]">
                What are your learning goals?
            </span>
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 self-start gap-5">
                {
                    goals.map((goal, index) => {
                        return <Buttn key={index} text={goal} type="goals"></Buttn>
                    })
                }
            </div>
            <hr className="h-1 w-full"></hr>
            <span className="font-bold self-start text-lg text-[#000]">
                Which topics would you like to focus on?
            </span>
            <div className="grid sm:gird-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 grid-cols-3 self-start gap-3">
                {
                    topics.map((topic, index) => {
                        return <Buttn key={index} text={topic} type="topics"></Buttn>
                    })
                }
            </div>

       </> 
    )
}