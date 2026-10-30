import { createContext, useContext, useState, useCallback } from 'react';
import { mockAnalysisResult } from '../services/mockData';
import { simulateAnalysis } from '../services/analysisService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [analysisState, setAnalysisState] = useState({
    status: 'idle',
    progress: 0,
    stage: '',
    result: null,
    file: null,
  });

  const [jobDescription, setJobDescription] = useState('');
  const [interviewSource, setInterviewSource] = useState('direct');
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const analyzeResume = useCallback(async (file, jobDesc = '') => {
    setJobDescription(jobDesc);
    setAnalysisState({ status: 'analyzing', progress: 0, stage: 'Starting analysis...', result: null, file });

    await simulateAnalysis(({ label, progress }) => {
      setAnalysisState((prev) => ({ ...prev, progress, stage: label }));
    });

    const jdBoostedScore = jobDesc.trim().length > 50 ? mockAnalysisResult.overallScore : mockAnalysisResult.overallScore - 8;

    setAnalysisState({
      status: 'complete',
      progress: 100,
      stage: 'Analysis complete',
      result: {
        ...mockAnalysisResult,
        fileName: file.name,
        overallScore: Math.max(0, jdBoostedScore),
        hasJobDescription: jobDesc.trim().length > 0,
      },
      file,
    });

    showToast('Resume analysis complete! Your ATS report is ready.', 'success');
  }, [showToast]);

  const resetAnalysis = useCallback(() => {
    setAnalysisState({ status: 'idle', progress: 0, stage: '', result: null, file: null });
    setJobDescription('');
    setInterviewSource('direct');
  }, []);

  const initiateInterviewFromATS = useCallback(() => {
    setInterviewSource('ats');
  }, []);

  return (
    <AppContext.Provider value={{
      analysisState,
      analyzeResume,
      resetAnalysis,
      jobDescription,
      setJobDescription,
      interviewSource,
      initiateInterviewFromATS,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
