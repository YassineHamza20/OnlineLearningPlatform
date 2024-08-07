import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/learner/signin';
import Signup from './pages/learner/signup';
import TutorSignUp from './pages/tutorSignUp/Signup';
import AccountPersonalization from './pages/tutorSignUp/AccountPersonalization';
import Verification from './pages/EmailVerif';
import TutorProfile from './pages/tutorProfile/TutorProfile';
import LearnerProfile from './pages/learner/Profile/learnerProfile';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordContent from './components/sign_in/ForgotPasswordContent';
import Landingpage from './pages/Landingpage';
import VideoCall from './components/Global/VideoCall';
import VerifyEmail from './components/Settings/VerifyEmail';
import Admin from './pages/admin/Admin';
import LogIn from './pages/admin/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import FeedbackForm from './pages/learner/Profile/FeedbackForm.js';
function App() {
  return (
    <Router>
      <Routes>
        {/* Learner Routes */}
        <Route path='/learner/signup' element={<Signup />} />
        <Route path='/learner/signup/personalize' element={<AccountPersonalization />} />
        <Route path='/learner/signin' element={<Signin />} />
        <Route path='/learner/signin/forgotpassword' element={<ForgotPasswordContent />} />
        <Route path='/learner/profile' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Tutors' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/LinguaBuddy' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Courses' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Classrooms' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Settings' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Notifications' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Tutor/:uuid' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Settings/student-profile' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Settings/account' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Settings/subscription' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Courses/:uuid' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route path='/learner/profile/Chat/:uuid' element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} />
        <Route
          path='/learner/profile/feedback'
          element={
            <ProtectedRoute>
              <FeedbackForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/learner/profile/Calendar'
          element={
            <ProtectedRoute>
              <LearnerProfile />
            </ProtectedRoute>
          }
        />
        {/* Tutor Routes */}
        <Route path='/tutor/signup' element={<TutorSignUp />} />
        <Route path='/tutor/signup/personalization' element={<AccountPersonalization />} />
        <Route path='/tutor/signin' element={<Signin />} />
        <Route path='/tutor/signin/forgotpassword' element={<ForgotPasswordContent />} />
        <Route path='/tutor/profile' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/LinguaBuddy' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Courses' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Classrooms' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Settings' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Exams' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Calendar' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Notifications' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Settings/tutor-profile' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Settings/account' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Settings/subscription' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route path='/tutor/profile/Chat/:uuid' element={<ProtectedRoute><TutorProfile /></ProtectedRoute>} />
        <Route
          path='/tutor/profile/Calendar'
          element={
            <ProtectedRoute>
              <TutorProfile />
            </ProtectedRoute>
          }
        />
        {/* Common Routes */}
        <Route path='/users/verify/:token' element={<Verification />} />
        <Route path='/users/ForgotPassword/:token' element={<ForgotPassword />} />
        <Route path='/videoCall/:uuid' element={<VideoCall />} />
        <Route path='/users/profile/Settings/verifyEmail/:token' element={<VerifyEmail />} />
        <Route path='/admin/Dashboard' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/admin/Profile' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/admin/CreateAdmin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/backOffice/admin/login' element={<LogIn />} />
        <Route path='/landingpage' element={<Landingpage />} />
        <Route path='/landingpage/Courses' element={<Landingpage />} />
        <Route path='/landingpage/Tutors' element={<Landingpage />} />
        <Route path='/landingpage/LinguaBuddy' element={<Landingpage />} />
 <Route
          path='/learner/profile/Courses'
          element={
            <ProtectedRoute>
              <LearnerProfile />
            </ProtectedRoute>
          }
        />
        {/* Default Route */}
        <Route index element={<Landingpage />} />
      </Routes>
    </Router>
  );
}

export default App;
