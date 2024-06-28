import { useSelector } from "react-redux";
import {ColumnLoading, RowLoading, RowCardsLoading, ColumnRowLoading} from '../../components/Global/LoadingCards'
import Card from "../../components/learner profile/Card";
import InformationalCard from "../../components/tutor profile/FollowersCard";
import Calendar from "../../components/tutor profile/Calendar"
import Revenue from "../../components/tutor profile/Revenue"
import Footer from "../../components/Global/Footer";

function Feed(props) {

    const tutorData = useSelector(state => state.tutorData)

   

    //introduction card of the tutor
    const content = [
        // <img key="0"  src={tutorData.displayableImage}  alt="profilepicture"  className="w-20 h-20 object-cover rounded-full"></img>,
        <div key="Country" className="flex items-center space-x-2">
            {tutorData.countryFlag && tutorData.countryFlag[0]?.flags && (
                <img className="rounded-lg w-8 h-8 object-cover" src={tutorData.countryFlag[0].flags.png} alt={tutorData.Country} />
            )}
            <span className="text-darkg ">From {tutorData.Country}</span>
        </div>,
        <span key="1"  className="font-bold text-2xl text-center">Welcome to Linguify, {tutorData.firstname+" "+tutorData.lastname}!</span>
]

    //content to show the component has finished loading
    const loadedContent = [
        <div key="loaded" className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div key="leftpart" className="flex flex-col col-span-1 h-auto space-y-5">
                <Card content={content}></Card>
                <InformationalCard></InformationalCard>
                <Revenue></Revenue>
            </div>
            <div key="rightpart" className="flex flex-col col-span-1 md:col-span-2 h-auto space-y-5">
                <Calendar></Calendar>
            </div>
            <Footer></Footer>
        </div>
    ]

   //content to show when the component is loading
    const loadingContent = [
        <div key="loading" className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div key="leftpart" className="flex flex-col col-span-1 h-auto space-y-5">
                <ColumnLoading></ColumnLoading>
                <RowLoading></RowLoading>
                <ColumnLoading></ColumnLoading>
                <ColumnLoading></ColumnLoading>
            </div>
            <div key="right part" className="flex flex-col col-span-1 md:col-span-2 h-auto space-y-5">
                <ColumnRowLoading></ColumnRowLoading> 
                <RowCardsLoading></RowCardsLoading>
                <RowCardsLoading></RowCardsLoading>
            </div>
        </div>
    ]


    return (
        <>
            {
                tutorData.isLoading?
                loadingContent
                :
                loadedContent
            }
        </>
    );
}

export default Feed;