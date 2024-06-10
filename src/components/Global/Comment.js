import React from 'react';

function Comment(props) {
    return (
        <div className="flex flex-col self-start space-y-2">
            <div className="flex space-x-2 items-center w-full">
                <img src="/teach.jpg" alt="profile" className="object-cover w-14 h-14 rounded-full "></img>
                <div className="flex  h-full flex-col space-y-1">
                    <span className=" ">User</span>
                    <span className=" text-sm text-darkg">May 2024</span>                
                </div>
            </div>
            <span className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
        </div>
    );
}

export default Comment;