import { NavLink } from "react-router-dom";

export default function Subscription() {
  return (
    <div className="bg-white px-[20px] lg:px-[120px] py-8">
      <h1 className="text-center text-elements text-3xl mb-24" style={{ fontFamily: 'Holtwood One SC' }}>Pick the plan that works for you</h1>
      
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:space-x-12 lg:space-y-0 space-y-8">
        <div className="w-[80%] lg:w-1/4 border border-gray-300 rounded-lg shadow-md">
          {/* Gold Plan */}
          <div className="bg-[#f7f7f7] rounded-lg p-6">
            <div className="flex items-center mb-4">
              <img src="logo.png" alt="Logo" className="w-16 h-16 rounded-full bg-gray-300 mr-4" />
              <img src="gold.png" alt="gold Image" className="w-17 h-12 mr-4" />
            </div>
            <p className="text-base text-gray-600 mb-6">Full access to all of Linguify</p>
            <ul className="list-none pl-0 mb-6">
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
                Our most comprehensive experience
              </li>
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
                Work with a tutor and 1-2 other students
              </li>
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
                Real-world conversation experience
              </li>
            </ul>
          </div>
          <div className="bg-[#f0f0f0] rounded-b-lg p-6 border-t border-gray-300 flex justify-between items-center">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-lg">50 TND</span>/month
            </p>
            <NavLink to="/learner/signup" className="bg-elements text-white px-6 py-3 rounded-full hover:bg-[#6C871B] focus:outline-none">Sign up</NavLink>
          </div>
        </div>
      </div>
      
        <div className="w-full lg:w-1/2 border border-gray-300 rounded-lg shadow-md mt-8 mx-auto">
          <div className="bg-[#f7f7f7] rounded-lg p-6 flex items-start"> 
            <img src="logo.png" alt="Logo" className="w-16 h-16 rounded-full bg-gray-300 mr-4" style={{ alignSelf: 'flex-start' }} /> 
            <div>
              <h2 className="text-lg font-bold mb-4">LUNGUIFY MiniLesson</h2>
              <div className="flex items-center mb-6">
                <p className="text-base text-gray-600 mr-4">Practice speaking English with LUNGUIFY AI for free today!</p> 
                <NavLink to="/learner/signup" className="bg-elements text-white px-6 py-3 rounded-full hover:bg-[#6C871B] focus:outline-none">Signup</NavLink>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
