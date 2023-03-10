import './App.css';
import Header from "./components/med/re-comp/Header";
import Quiz from "./components/Quiz";
import Error from "./components/Error";
import Home from "./components/Home";
import Result from "./components/Result";
import AddQuestions from "./components/AddQuestions";
import Home2 from '../src/components/med/Home'
import SingleNote from '../src/components/med/SingleNote'
import CollectUserData from './components/med/CollectUserData';
import StartQuiz from './components/med/StartQuiz';
import ResultShow from './components/med/ResultShow';
import UserLogin from './components/med/UserLogin';
import UserSignup from './components/med/UserSignup';
import UserProfile from './components/med/UserProfile';
import AdminSite from './components/med/AdminSite';
// import MedlocusAdminPanel from './components/med/MedlocusAdminPanel'
import AboutMedlocus from './components/med/AboutMedlocus';
import StudentsFeedback from './components/med/StudentsFeedback';
import ContributeToMedlocus from './components/med/ContributeToMedlocus';

import ShowOverallResult from './components/med/ShowOverallResult';

import { SupraHeader } from './components/med/re-comp/Header';

import LogoAnimation from './components/med/re-comp/LogoAnimation';
import ArchiveTests from './components/med/ArchiveTests';

// HOME PAGE NAVIGATE
import Notes from '../src/components/med/Notes'
import ConfusingTerms from '../src/components/med/ConfusingTerms'
import Test from '../src/components/med/Test'
// import { useNavigate } from 'react-router-dom'

// TO ROUTE ALL COMPONENTS USDER COMMON HEADER
// useLocation to conditionally hide the Header in home page
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function App() {
//   const location = useLocation();
//   // // to conditionally hid ethe navebar when in the HOME page
// const isHomePage = location.pathname === '/';
  return (
    <>
      <BrowserRouter>

      {/* <Header /> */}
      {/* <SupraHeader /> */}

        <Routes>
        
          {/* <Route exact path="" element={<Header />} /> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home2 />} />
          <Route path="/quiz" element={<Quiz />} />
          {/* <Route path="/result" element={<Result />} /> */}
          <Route path="/notes" element={<Notes />} />
          <Route path="/confusingterms" element={<ConfusingTerms />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<ArchiveTests />} />
          <Route path="/results/:testId" element={<ShowOverallResult />} />
          <Route path="/addquestions" element={<AddQuestions />} />
          <Route path="/logo" element={<LogoAnimation />} />
          <Route path="/adminsite" element={<AdminSite />} />
          <Route path="/aboutmedlocus" element={<AboutMedlocus />} />
          <Route path="/studentsfeedback" element={<StudentsFeedback />} />
          <Route path="/contribute" element={<ContributeToMedlocus />} />
          {/* <Route path="/medlocusadminpanel" element={<MedlocusAdminPanel />} /> */}
          {/* TO PUT CUSTOM URL */}
          <Route path="/note/:noteId" element={<SingleNote />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/test/:testId" element={<CollectUserData />} />
          <Route path="/test/:testId/:username" element={<StartQuiz />} />
          <Route path="/test/:testId/:username/result" element={<ResultShow />} />
          <Route path="/userprofile" element={<UserProfile />} />
          {/* * for no specific path */}
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>

  )

  return (
    <>
      <Home />
    </>
  )
}

export default App;
