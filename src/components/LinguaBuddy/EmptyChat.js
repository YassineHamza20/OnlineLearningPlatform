import { NavLink } from "react-router-dom";

function EmptyChat(props) {

  
  const path = window.location.pathname;


    const languages = [
        "Arabic",
        "English", 
        "French",
        "Deutsch",
        "Spanish",
        "Italian",
        "Russian"
    ]
    
    const topics = [
        "Language Learning Basics",
        "Travel and Culture",
        "Business and Professional Development",
        "Technology and Innovation",
        "Health and Wellness",
        "Arts and Creativity",
        "Science and Environment",
        "History and Politics",
        "Education and Learning Strategies",
        "Personal Development and Self-Improvement"
    ]

    const handleTopicClick = (topic) => {
        props.setTopic(topic)
    }
    
    const handleLanguageClick = (lang) => {
        props.setLanguage(lang)
    }

    return (
        <div className="flex flex-col h-screen space-y-2 justify-start items-center">
          <img 
            key="image" 
            src="/chatbot-bro.png" 
            alt="chatbot" 
            className="w-52 h-52"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome to our Chatbot!
          </h1>
          <p className="text-center text-gray-600 max-w-lg">
            Our chatbot engages in meaningful conversations. Choose a language and a topic, and our bot will start the discussion. Practice a new language, explore subjects, or just have a friendly chat. Enjoy an interactive experience with us. Let's chat!
          </p>
          {
            path !== "/landingpage/LinguaBuddy"?
            <>
              <div className="flex flex-wrap justify-center gap-3">
              {
                  !props.language?
                  languages.map((language, key) => (
                  <div 
                      key={key}
                      onClick={(e) => handleLanguageClick(language)}
                      className="rounded-full py-2 px-4 text-sm text-center border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-button hover:border-button hover:text-white transition duration-300"
                  >
                      {language}
                  </div>
                  
                  ))
                  :
                  null
              }
            </div>
            {
              !props.topic && props.language?
              <div className="flex flex-wrap justify-center gap-3">
                  {topics.map((topic, key) => (
                      <div 
                          key={key}
                          onClick={(e) => handleTopicClick(topic)}
                          className="rounded-full py-2 px-4 text-sm text-center border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-button hover:border-button hover:text-white transition duration-300"
                      >
                          {topic}
                      </div>
                  ))}
              </div>
              :
              null
            }
            </>
          :
          <div className="flex items-center space-x-3">
              <div className="hidden lg:flex">
                <NavLink to="/learner/signin" className="text-elements font-bold py-2 px-8 mr-2 rounded-full border border-elements hover:shadow-md">
                  Sign in
                </NavLink>
                <NavLink to="/learner/signup" className="bg-elements text-white font-bold py-2 px-8 rounded-full hover:shadow-md">
                  Sign up
                </NavLink>
              </div>            
          </div>
        }
        </div>
      );
}


export default EmptyChat;