import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { TbProgressCheck } from "react-icons/tb";
import { useSelector } from "react-redux";


const Phase = ({label, index}) => {
    const tutorData = useSelector(state => state.tutorData)

    return (
        <div className={`flex justify-center items-center space-x-1 w-[25%] border`}>
            {
                index < tutorData.steps?
                    <FaCircleCheck color="green" size="17"></FaCircleCheck>//already passed step
                :
                    index === tutorData.steps?
                    <TbProgressCheck color="#FFA447" size="17"/> //step in progress
                    :
                    <FaRegCircle color='gray' size="17"/>//not reached step
            }
            <span className={`text-sm ${index === tutorData.steps? 'font-bold': 'font-normal'}`}>{label}</span>
        </div>
    );
};

export default Phase;