import { NavLink } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


const Footer = () => {
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 
  return (
    <footer className=" text-darkg mt-8 bg-white w-full p-4 rounded-lg col-span-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="font-bold mb-2">Linguify</h5>
            <p>We provide language learning courses tailored to specific fields such as medical, legal, and business.</p>
          </div>

          {/* Navigation Links */}
          <div className="w-full items-center md:w-1/4 mb-6 md:mb-0">
                {
                    firstSegment === "learner"?
                    <>
                    <h5 className="font-bold mb-2">Navigation</h5>
                    <ul>
                        <li><NavLink to='/learner/profile' className="hover:underline">Home</NavLink></li>
                        <li><NavLink to='/learner/profile/Tutors' className="hover:underline">Tutors</NavLink></li>
                        <li><NavLink to='/learner/profile/Courses' className="hover:underline">Courses</NavLink></li>
                        <li><NavLink to='/learner/profile/LinguaBuddy' className="hover:underline">LinguaBuddy</NavLink></li>
                    </ul>
                    </>
                    :
                    (
                      firstSegment === "tutor"?
                      <>
                        <h5 className="font-bold mb-2">Navigation</h5>
                        <ul>
                            <li><NavLink to='/tutor/profile' className="hover:underline">Home</NavLink></li>
                            <li><NavLink to='/tutor/profile/Courses' className="hover:underline">Courses</NavLink></li>
                            <li><NavLink to='/tutor/profile/LinguaBuddy' className="hover:underline">LinguaBuddy</NavLink></li>
                        </ul>
                      </>
                      :
                      null
                    )
                }
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="font-bold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/9antra.tn" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 flex justify-center items-center bg-button rounded-full">
                    <FaFacebookF className="text-white" size="15"></FaFacebookF>
                </div>
              </a>
              <a href="https://www.instagram.com/9antra.tn_the_bridge/" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 flex justify-center items-center bg-button rounded-full">
                    <FaInstagram className="text-white" size="15"></FaInstagram>
                </div>
              </a>
              <a href="https://www.youtube.com/channel/UCalTz8mh5A5V0otTFon3lZg" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 flex justify-center items-center bg-button rounded-full">
                    <FaYoutube className="text-white" size="15"></FaYoutube>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4">
            <h5 className="font-bold mb-2">Contact Us</h5>
            <p>Parc Technologique El Ghazela Ariana 2088</p>
            <p>Email: admin@beecoders.tn</p>
            <p>Phone: +216 58 84 00 64</p>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Linguify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
