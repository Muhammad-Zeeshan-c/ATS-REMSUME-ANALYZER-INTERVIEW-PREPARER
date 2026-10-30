import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { ATSAnalyzer } from './pages/ATSAnalyzer';
import { InterviewPrep } from './pages/InterviewPrep';
import { InterviewResults } from './pages/InterviewResults';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analyzer" element={<ATSAnalyzer />} />
          <Route path="/interview" element={<InterviewPrep />} />
          <Route path="/interview/results" element={<InterviewResults />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
