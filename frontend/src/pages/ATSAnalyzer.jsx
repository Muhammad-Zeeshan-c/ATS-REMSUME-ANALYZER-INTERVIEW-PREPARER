import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Dropzone } from '../components/Dropzone';
import { ScoreGauge, MiniScoreBar } from '../components/ScoreGauge';
import { getPriorityClass, getIssueTypeClass } from '../utils/scoreHelpers';
import {
  FileText, RotateCcw, CheckCircle, AlertTriangle, Info,
  TrendingUp, Search, Layout, Zap, ChevronRight, Download,
  Brain, AlignLeft, ArrowRight,
} from 'lucide-react';

const ProgressBar = ({ progress, stage }) => (
  <div className="card p-8 max-w-lg mx-auto text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
      <div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">Analyzing Your Resume</h3>
    <p className="text-sm text-slate-500 mb-6">{stage}</p>
    <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
    <p className="text-xs text-slate-400 font-medium">{progress}% complete</p>
  </div>
);

const KeywordBadge = ({ keyword, priority }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getPriorityClass(priority)}`}>
    {keyword}
  </span>
);

const IssueItem = ({ issue }) => {
  const styles = getIssueTypeClass(issue.type);
  const icons = { error: AlertTriangle, warning: AlertTriangle, info: Info };
  const Icon = icons[issue.type] || Info;

  return (
    <div className={`border-l-4 pl-4 py-1 ${styles.border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Icon size={15} className={`mt-0.5 flex-shrink-0 ${styles.icon}`} />
          <div>
            <p className="text-sm font-semibold text-slate-800">{issue.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{issue.description}</p>
          </div>
        </div>
        <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-md ${styles.badge}`}>{issue.section}</span>
      </div>
    </div>
  );
};

const InterviewCTA = ({ onPrepare }) => (
  <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-navy-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center flex-shrink-0">
        <Brain size={22} className="text-emerald-400" />
      </div>
      <div>
        <p className="font-semibold text-white text-base">Ready to ace the interview?</p>
        <p className="text-sm text-slate-400 mt-0.5">Your resume data is already loaded. Jump straight into targeted interview prep.</p>
      </div>
    </div>
    <button
      onClick={onPrepare}
      className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-colors duration-200 shadow-lg"
    >
      Prepare for Interview <ArrowRight size={16} />
    </button>
  </div>
);

const ResultsDashboard = ({ result, onReset, onPrepareInterview }) => {
  const priorityGroups = {
    high: result.missingKeywords.filter((k) => k.priority === 'high'),
    medium: result.missingKeywords.filter((k) => k.priority === 'medium'),
    low: result.missingKeywords.filter((k) => k.priority === 'low'),
  };

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <FileText size={18} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">{result.fileName}</h2>
            <p className="text-xs text-slate-500">{result.pageCount} page · {result.wordCount} words · {result.hasJobDescription ? 'Matched against job description' : 'General ATS analysis'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline text-xs px-3 py-2 gap-1.5">
            <Download size={14} /> Export Report
          </button>
          <button onClick={onReset} className="btn-secondary text-xs px-3 py-2 gap-1.5">
            <RotateCcw size={14} /> New Analysis
          </button>
        </div>
      </div>

      <InterviewCTA onPrepare={onPrepareInterview} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="card p-6 flex flex-col items-center justify-center lg:col-span-1">
          <ScoreGauge score={result.overallScore} size={148} />
          {result.hasJobDescription && (
            <span className="mt-3 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-medium">
              vs. Job Description
            </span>
          )}
        </div>

        <div className="card p-6 lg:col-span-3">
          <h3 className="text-sm font-semibold text-slate-700 mb-5">Score Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <MiniScoreBar label="Keyword Match Rate" score={result.scores.keywordMatch} delay={200} />
            <MiniScoreBar label="Formatting Compliance" score={result.scores.formatting} delay={350} />
            <MiniScoreBar label="Impact & Metrics" score={result.scores.impact} delay={500} />
            <MiniScoreBar label="Readability Score" score={result.scores.readability} delay={650} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <Search size={16} className="text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Missing Keywords</h3>
            <span className="ml-auto text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md font-medium">
              {result.missingKeywords.length} missing
            </span>
          </div>

          {Object.entries(priorityGroups).map(([priority, keywords]) => keywords.length > 0 && (
            <div key={priority} className="mb-4 last:mb-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 capitalize">{priority} Priority</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => <KeywordBadge key={k.keyword} keyword={k.keyword} priority={k.priority} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle size={16} className="text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-700">Strong Points</h3>
          </div>
          <ul className="space-y-3">
            {result.strongPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                <ChevronRight size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Layout size={16} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Formatting & Compliance Issues</h3>
          <span className="ml-auto text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
            {result.formattingIssues.length} issues
          </span>
        </div>
        <div className="space-y-4">
          {result.formattingIssues.map((issue) => <IssueItem key={issue.title} issue={issue} />)}
        </div>
      </div>
    </div>
  );
};

const UploadForm = ({ jobDescription, onJobDescriptionChange }) => (
  <div className="space-y-4 max-w-xl animate-slide-up">
    <Dropzone />

    <div className="card p-5">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
        <AlignLeft size={15} className="text-emerald-600" />
        Job Description
        <span className="ml-auto text-xs font-normal text-slate-400">Optional but recommended</span>
      </label>
      <textarea
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        placeholder="Paste the job description here to get a tailored keyword match score and see exactly how well your resume aligns with this specific role..."
        rows={6}
        className="input-field resize-none text-sm leading-relaxed"
      />
      {jobDescription.trim().length > 0 && jobDescription.trim().length < 50 && (
        <p className="text-xs text-amber-600 mt-2">Add more detail for a meaningful match score (minimum ~50 characters).</p>
      )}
    </div>

    <div className="card p-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">What We Analyze</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Search, label: 'Keyword density & match' },
          { icon: Layout, label: 'Formatting & structure' },
          { icon: TrendingUp, label: 'Achievement impact score' },
          { icon: Zap, label: 'ATS parser compatibility' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-slate-600">
            <Icon size={14} className="text-emerald-500 flex-shrink-0" />
            {label}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ATSAnalyzer = () => {
  const navigate = useNavigate();
  const { analysisState, resetAnalysis, initiateInterviewFromATS, jobDescription, setJobDescription } = useApp();
  const { status, progress, stage, result } = analysisState;

  const handlePrepareInterview = () => {
    initiateInterviewFromATS();
    navigate('/interview');
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">ATS Resume Analyzer</h1>
          <p className="text-slate-500">Upload your resume and optionally paste a job description to get a precise compatibility report.</p>
        </div>

        {status === 'idle' && (
          <UploadForm
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
          />
        )}

        {status === 'analyzing' && (
          <ProgressBar progress={progress} stage={stage} />
        )}

        {status === 'complete' && result && (
          <ResultsDashboard
            result={result}
            onReset={resetAnalysis}
            onPrepareInterview={handlePrepareInterview}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
