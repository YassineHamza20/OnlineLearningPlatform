import {NavLink} from 'react-router-dom'

function SideBar(props) {


    return (
        <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-[#f4761c] dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-bold tracking-wide text-white uppercase">Main</div>
              </div>
            </li>
            <li>
              <NavLink to="/admin/Dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-orange-600 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-button dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
              </NavLink>
            </li>
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center mt-5 h-8">
                <div className="text-sm font-bold tracking-wide text-white uppercase">Settings</div>
              </div>
            </li>
            <li>
              <NavLink to="/admin/Profile" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-orange-600 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-button dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/CreateAdmin" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-orange-600 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-button dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Admin Creation</span>
              </NavLink>
            </li>
          </ul>
          <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2024</p>
        </div>
      </div>
    
    );
}

export default SideBar;