import React from 'react';

// Define StarRating component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} className="text-yellow-400 text-2xl">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="text-gray-400 text-2xl">&#9733;</span>);
    }
  }
  return (
    <div className="flex items-center">
      <span className="mr-1 text-base">{rating}</span>
      {stars}
    </div>
  );
};

// Courses component
export default function Courses() {
  return (
    <div>
      <div className="text-center mt-8">
        <h2 className="lg:text-5xl text-4xl font-extrabold text-black">Popular Courses</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-backg px-[20px] lg:px-[120px] py-8">

        {/* Course cards */}
        {/* Course 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="jj.jpg" alt="Course 1" className="w-full h-auto rounded-lg mb-2" />
          <div className="text-black font-bold mb-1">English - Preparing for IELTS</div>
          <div className="text-gray-500 text-sm mb-1">Dr. Christopher Columbs</div>
          <StarRating rating={5.0} />
          <div className="text-black text-sm"><span className="font-bold text-lg mr-10">100 TND</span> <del className="text-lg text-[#9E9E9E]">200 TND</del></div>
        </div>

        {/* Course 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="jj.jpg" alt="Course 2" className="w-full h-auto rounded-lg mb-2" />
          <div className="text-black font-bold mb-1">French - Everyday french</div>
          <div className="text-gray-500 text-sm mb-1">Dr. Meryem Mohamed Zayenne</div>
          <StarRating rating={4.5} />
          <div className="text-black text-sm"><span className="font-bold text-lg mr-10">60 TND</span> <del className="text-lg text-[#9E9E9E]">80 TND</del></div>
        </div>

        {/* Course 3 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="jj.jpg" alt="Course 3" className="w-full h-auto rounded-lg mb-2" />
          <div className="text-black font-bold mb-1">Business English</div>
          <div className="text-gray-500 text-sm mb-1">Dr. Great Adam</div>
          <StarRating rating={3.8} />
          <div className="text-black text-sm"><span className="font-bold text-lg mr-10">50 TND</span></div>
        </div>

        {/* Course 4 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="jj.jpg" alt="Course 4" className="w-full h-auto rounded-lg mb-2" />
          <div className="text-black font-bold mb-1">Work interview</div>
          <div className="text-gray-500 text-sm mb-1">Dr. less great</div>
          <StarRating rating={4.2} />
          <div className="text-black text-sm"><span className="font-bold text-lg mr-10">100 TND</span> <del className="text-lg text-[#9E9E9E]">200 TND</del></div>
        </div>
      </div>

      {/* View All button */}
      <div className="text-center">
        <button className="bg-button hover:bg-[#E69440] text-white font-bold py-5 px-12 rounded-full">
          View All
        </button>
      </div>

    </div>
  );
}
