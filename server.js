require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io')


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { 
    origin: 'https://linguify.netlify.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
  }
});


// Middleware for parsing multipart/form-data
app.use(cors({
  cors
  // origin: "https://linguify.netlify.app"
}))

//port
const port = process.env.PORT || 5000

//specifying the limit of requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))




//assure that we get the body from the api calls 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//getting exported routers 
const googleSignupRouter = require('./routes/google_signup')
const regularSignupRouter = require('./routes/regular_signup')
const refreshTokenRouter = require('./routes/refreshToken')
const detailsRouter = require('./routes/learnerDetails')
const personalizeRouter = require('./routes/presonalize')
const beginRouter = require('./routes/begin')
const tutorGoogleSignUp = require('./routes/tutor_google_signup')
const tutorRegularSignupRouter = require('./routes/tutor_Regular_signup')
const resendVerificationRouter = require('./routes/resendVerification')
const imageFaceDetectionCallRouter = require('./routes/imageFaceDetectionCall')
const regularLoginRouter = require('./routes/regular_login')
const googleLoginRouter = require('./routes/googleLogin')
const speedTestRouter = require('./routes/speedTest')
const personalizationRouter = require('./routes/saveTutorPersonalization')
const tutorSearchRouter = require('./routes/SearchTutors')
const getFiles = require('./middleware/Files')
const forgotpassword = require('./routes/forgotPassword')
const verifyForgotPassword = require('./routes/verifyForgotPasswordToken')
const resetpassword = require('./routes/resetPassword')
const tutorDetails = require('./routes/tutorDetails')
const scheduleLesson = require('./routes/schedule')
const getFirstLessons = require('./routes/getFirstLessons') 
const getDayLessons = require('./routes/getDayLessons')
const getFreeTutors = require('./routes/getFreeTutors')
const getBusyTimes = require('./routes/getBusyScheduleTime')
const getTutorBookingNotifications = require('./routes/tutorBookingNotifications')
const notificationApproval = require('./routes/NotificationFeedBack')
const getLearnerBookingNotifications = require('./routes/learnerBookingNotifications')
const markTutorNotificationAsRead = require('./routes/markTutorNotificationRead')
const markLearnerNotificationAsRead = require('./routes/markLearnerNotificationRead')
const getNumberOfUnreadNotifsTutor = require('./routes/getTutorNumberUnreadNotifications')
const getNumberOfUnreadNotifsLearner = require('./routes/getLearnerNumberUnreadNotifications')
const tutorMarkAllAsReadRouter = require('./routes/TutormarkAllAsRead')
const learnerMarkAllAsReadRouter = require('./routes/LearnerMarkAllAsRead')
const tutorCalendarOverviewRouter = require('./routes/calendarOverviewTutor')
const emailVerificationRouter = require('./routes/VerifEmail')
const getDayLessonsTutor = require('./routes/getDayLessonsTutor')
const getSelectedTutorDetails = require('./routes/getSelectedTutorDetails')
const getBusyScheduleTimeLearnerAndTutor = require('./routes/getBusyScheduleTimeLearnerAndTutor')
const sendVideoCallEmail = require('./routes/sendVideoCallLink')
const updateLearner = require('./routes/LearnerUpdate')
const updateTutor = require('./routes/TutorUpdate')
const updateLearnerFile = require('./routes/UpdateLearnerFile')
const updateTutorFiles = require('./routes/UpdateTutorFiles')
const deleteLearnerAccount = require('./routes/deleteLearnerAccount')
const deleteTutorAccount = require('./routes/deleteTutorAccount')
const chatBot = require('./routes/chatBot')
const likeTutors = require('./routes/likeTutor')
const getLikedTutors = require('./routes/GetLikedTutors')
const RecommendedTutors = require('./routes/RecommendedTutors')
const createCourse = require('./routes/CreateCourse')
const getMyCourses = require('./routes/getCourses')
const deleteCourse = require('./routes/deleteCourse')
const getAllCourses = require('./routes/getAllCourses')
const getCourseInformation = require('./routes/getCourseInformation')
const getRecommendedCourses = require('./routes/getRecommendedCourses')
const tutorForLandingPage = require('./routes/tutorForLandingPage')
const getCoursesLP = require('./routes/getlandingPageCourses')
const getMessagesTutor = require('./routes/getMessagesTutor')
const getMessagesLearner = require('./routes/getMessagesLearner')
const saveTutorMessages = require('./routes/saveMessageTutor')
const saveLearnerMessages = require('./routes/saveMessageLearner')
const getLearner = require('./routes/SeletedLearner')
const getLatestMessagesTutor = require('./routes/getLatestMessagesforTutor')
const getLatestMessagesLearner = require('./routes/getLatestMessagesLearner')
const paymentRouter = require('./routes/payment')
const getSubscriptionHistory = require('./routes/getSubscriptionHistory')
const tutorRevenue = require('./routes/tutorRevenue')
const tutorInformation = require('./routes/tutorInformationalCard')
const adminLogin = require('./routes/AdminLogin')
const adminCreation = require('./routes/AdminCreation')
const adminDashBoardInfo = require('./routes/getAdminInformation')
const adminProfile = require('./routes/adminProfile')
const adminLearners = require('./routes/getLearners')
const adminTutors = require('./routes/listTutors')
const adminPurchaseHistory = require('./routes/purchaseHistory')
const adminDeleteCourse = require('./routes/AdminDeleteCourse')
const adminDeleteTutor = require('./routes/AdminDeleteTutor')
const adminDeleteLearner = require('./routes/AdminDeleteLearner')
const adminInformation = require('./routes/AdminAccountInfo')
const Getadmins = require('./routes/getAdmins')
const AdminDeleteAdmin = require('./routes/AdminDeleteAdmin')

const feedback = require('./routes/feedback');  
const getAllFeedback =require('./routes/ViewFeedBack');  
const updatefeedback =require('./routes/UpdateFeedback');  
const review =require('./routes/Review');  
const getreview =require('./routes/Review');  

//apis
app.use('/', googleSignupRouter)
app.use('/', regularSignupRouter)
app.use('/api/refreshToken', refreshTokenRouter)
app.use('/learner', detailsRouter)
app.use('/', personalizeRouter)
app.use('/', beginRouter)
app.use('/tutor', tutorGoogleSignUp)
app.use('/tutor', tutorRegularSignupRouter)
app.use('/resend', resendVerificationRouter)
app.use('/', imageFaceDetectionCallRouter )
app.use('/', regularLoginRouter)
app.use('/', googleLoginRouter)
app.use('/', speedTestRouter)
app.use('/tutor', personalizationRouter)
app.use('/', tutorSearchRouter)
app.use('/', getFiles)
app.use('/', forgotpassword)
app.use('/', verifyForgotPassword)
app.use('/', resetpassword)
app.use('/tutor', tutorDetails)


app.use('/learner', scheduleLesson)
app.use('/learner', getFirstLessons)
app.use('/learner', getDayLessons)
app.use('/tutor', getDayLessonsTutor)
app.use('/learner', getFreeTutors)
app.use('/', getBusyTimes)
app.use('/tutor', getTutorBookingNotifications)
app.use('/tutor', notificationApproval)
app.use('/learner', getLearnerBookingNotifications)
app.use('/learner', markLearnerNotificationAsRead)
app.use('/tutor', markTutorNotificationAsRead)
app.use('/tutor', getNumberOfUnreadNotifsTutor)
app.use('/learner', getNumberOfUnreadNotifsLearner)
app.use('/learner', learnerMarkAllAsReadRouter)
app.use('/tutor', tutorMarkAllAsReadRouter)
app.use('/tutor', tutorCalendarOverviewRouter)
app.use('/user', emailVerificationRouter)
app.use('/learner', getSelectedTutorDetails)
app.use('/learner', getBusyScheduleTimeLearnerAndTutor)
app.use('/tutor', sendVideoCallEmail)
app.use('/learner', updateLearner)
app.use('/tutor', updateTutor)
app.use('/learner', updateLearnerFile)
app.use('/tutor', updateTutorFiles)
app.use('/tutor', deleteTutorAccount)
app.use('/learner', deleteLearnerAccount)
app.use('/user', chatBot)
app.use('/learner', likeTutors)
app.use('/learner', getLikedTutors)
app.use('/learner', RecommendedTutors)
app.use('/tutor', createCourse)
app.use('/tutor', getMyCourses)
app.use('/tutor', deleteCourse)
app.use('/learner', getAllCourses)
app.use('/learner', getCourseInformation)
app.use('/learner', getRecommendedCourses)
app.use('/visitor', tutorForLandingPage)
app.use('/visitor', getCoursesLP)
app.use('/learner', getMessagesLearner)
app.use('/learner', saveLearnerMessages)
app.use('/tutor', saveTutorMessages)
app.use('/tutor', getMessagesTutor)
app.use('/tutor', getLearner)
app.use('/tutor', getLatestMessagesTutor)
app.use('/learner', getLatestMessagesLearner)

app.use('/learner', paymentRouter)


app.use('/learner', getSubscriptionHistory)
app.use('/tutor', tutorRevenue)
app.use('/tutor', tutorInformation)


app.use('/learner', feedback);
app.use('/admin', getAllFeedback);
app.use('/admin', updatefeedback);
app.use('/learner', review)
app.use('/learner', getreview)



app.use('/admin', adminLogin)
app.use('/admin', AdminDeleteAdmin)
app.use('/admin', Getadmins)
app.use('/admin', adminCreation)
app.use('/admin', adminDashBoardInfo)
app.use('/admin', adminProfile)
app.use('/admin', adminLearners)
app.use('/admin', adminPurchaseHistory)
app.use('/admin', adminTutors)
app.use('/admin', adminDeleteCourse)
app.use('/admin', adminDeleteTutor)
app.use('/admin', adminDeleteLearner)
app.use('/admin', adminInformation)

  
// Socket.io logic
require('./helpers/socketHandler')(io);//non authenticated 

app.get('/check', (req, res) => {
  res.status(200).send('Server is running');
});


const https = require('https');

// Data to send with the POST request (if needed)
const postData = JSON.stringify({});

// Function to send a POST request to the specified URL
function pingServer() {
  const options = {
    hostname: 'onlinelearningplatform-d9w2.onrender.com',
    port: 443, // Use 80 if it's HTTP, 443 for HTTPS
    path: '/admin/getAllFeedback',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      // Add additional headers here if needed (e.g., Authorization)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Pinged server, statusCode: ${res.statusCode}`);
    
    res.on('data', (data) => {
      process.stdout.write(data);
    });
  });

  req.on('error', (e) => {
    console.error('Error pinging server:', e);
  });

  // Write data to request body
  req.write(postData);
  req.end();
}

// Ping the server every 20 minutes (20 * 60 * 1000 milliseconds)
setInterval(pingServer, 1200000);

// Optional: Initial ping when the server starts
pingServer();

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  }); 