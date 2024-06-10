import EditName from "../Settings/EditName";
import EditPfp from "../Settings/EditPfp";
import { MdFace } from "react-icons/md";
import {MdOutlineNavigateNext} from 'react-icons/md'
import { MdAccountCircle } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import Card from "../Settings/Card";
import { useState } from "react";
import DeleteAccountModal from "../Settings/DeleteAccountModal";
import Footer from "./Footer";




function Settings(props) {

    
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const [deleteAccountModal, setDeleteAccountModal] = useState(false)

    
    

    const handlePicture = () => {
        let picture
        if (firstSegment === "learner") {
             picture =  `${props.userData.pic==="user.png" ? "/" +props.userData.pic: props.userData.pic }`
        }else {
            picture = props.userData.displayableImage
        }

        return picture
    }

    
    const profilepicture = handlePicture()


    return (
        <>
            <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <div className="flex space-x-6 justify-center flex-wrap items-center ">
                    <EditPfp role={firstSegment} profilepicture={profilepicture}></EditPfp>
                    <EditName role={firstSegment}></EditName>
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center ">
                    <Card 
                        icon={<MdFace size="25" className="text-black"></MdFace>}
                        next={<MdOutlineNavigateNext size="25" className=""></MdOutlineNavigateNext>}
                        description="Update your learning goals and interests."
                        title={`${firstSegment === "learner"? "Student" : "Tutor" } Profile`}
                        role={firstSegment}
                        route={firstSegment==="learner"? "student-profile": "tutor-profile"}
                    ></Card>
                    <Card 
                        icon={<MdAccountCircle size="25" className="text-black"></MdAccountCircle>}
                        title="Account" 
                        next={<MdOutlineNavigateNext size="25" className=""></MdOutlineNavigateNext>}
                        description="Update your personal details and tell us how to reach you."
                        role={firstSegment}
                        route="account"
                    ></Card>
                    {
                        firstSegment === "learner"?
                        <Card 
                            icon={<MdPayment size="25" className="text-black"></MdPayment>}
                            title="Subscription"
                            next={<MdOutlineNavigateNext size="25" className=""></MdOutlineNavigateNext>}
                            description="Handle your subscription and see your payement history." 
                            role={firstSegment}
                            route="subscription"
                        ></Card>
                        :
                        null

                    }
                </div>
                <div className="justify-center flex flex-col items-center  space-y-3">
                    <span className="">
                        If you would like to delete your account, 
                    </span>
                    <button onClick={() => setDeleteAccountModal(true)} className="px-4 cursor-pointer py-3 bg-errortext hover:border hover:border-errortext hover:bg-errorbg hover:text-errortext transition-colors duration-200 text-white rounded-md">Click here</button>
                </div>
                <Footer></Footer>
            </div>
            {
                deleteAccountModal?
                <DeleteAccountModal role={firstSegment} visibility={deleteAccountModal} setVisibility={setDeleteAccountModal}></DeleteAccountModal>
                :
                null

            }
        </>
    );
}

export default Settings;