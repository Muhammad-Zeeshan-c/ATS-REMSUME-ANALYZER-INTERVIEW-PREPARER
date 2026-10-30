import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { generateQuestionSet, roles } from '../services/mockData';
import { getDifficultyClass } from '../utils/scoreHelpers';
import {
  Upload, AlertCircle,
  Play, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2,
  Mic, Keyboard, Brain, Briefcase, Code, MessageCircle,
  Lightbulb, BookOpen, Filter, Trophy, Clock, BarChart3,
  ChevronUp, ChevronDown, Minus,
} from 'lucide-react';

const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const categoryIcons = {
  'Introduction': Brain,
  'Time Management': Clock,
  'Teamwork': MessageCircle,
  'Initiative': Lightbulb,
  'Self-Awareness': BookOpen,
  'Prioritization': Filter,
  'Learning Agility': BookOpen,
  'Career Goals': Trophy,
  'Communication': MessageCircle,
  'Crisis Management': AlertCircle,
  'Problem Solving': Lightbulb,
  'React': Code,
  'React Core': Code,
  'Performance': Lightbulb,
  'JavaScript Core': Code,
  'CSS': Code,
  'Browser APIs': Code,
  'Architecture': Briefcase,
};

const modeOptions = [
  { value: 'hr', label: 'HR / Behavioral', desc: 'Situational, behavioral & culture-fit questions' },
  { value: 'technical', label: 'Technical', desc: 'Role-specific technical depth questions' },
  { value: 'both', label: 'Both (Mixed)', desc: 'Balanced mix of HR and technical questions' },
];

const ResumeFilePicker = ({ file, onFile, error }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(pdf|doc|docx)$/i)) {
      onFile(null, 'Please upload a PDF or Word document (.pdf, .doc, .docx)');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      onFile(null, 'File size exceeds 5MB limit');
      return;
    }
    onFile(f, null);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
        Resume <span className="text-red-400">*</span>
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
          file
            ? 'border-emerald-300 bg-emerald-50'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${file ? 'bg-emerald-100' : 'bg-slate-100'}`}>
          {file ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Upload size={18} className="text-slate-500" />}
        </div>
        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
              <p className="text-xs text-emerald-600">Ready for analysis</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-700">Click to upload resume</p>
              <p className="text-xs text-slate-400">PDF, DOC or DOCX · Max 5MB</p>
            </>
          )}
        </div>
        {file && (
          <button
            onClick={(e) => { e.stopPropagation(); onFile(null, null); }}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium flex-shrink-0"
          >
            Remove
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleChange} className="hidden" />
      {error && (
        <div className="flex items-center gap-1.5 mt-2">
          <AlertCircle size={13} className="text-red-500" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

const SetupDirect = ({ onStart }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [mode, setMode] = useState('both');
  const [questionCount, setQuestionCount] = useState(10);

  const handleFileChange = (file, err) => {
    setResumeFile(file);
    setResumeError(err);
  };

  const canStart = resumeFile && positionTitle.trim().length > 0;

  const handleStart = () => {
    if (!canStart) return;
    onStart({
      positionTitle: positionTitle.trim(),
      mode,
      questionCount,
      jobDesc,
      source: 'direct',
    });
  };

  return (
    <div className="animate-slide-up space-y-5 max-w-2xl">
      <ResumeFilePicker file={resumeFile} onFile={handleFileChange} error={resumeError} />

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Job Description <span className="text-slate-400 font-normal normal-case">(optional)</span>
        </label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description to get more relevant questions tailored to this specific role..."
          rows={4}
          className="input-field resize-none text-sm leading-relaxed"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Position / Job Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
          placeholder="e.g. Senior Frontend Developer"
          className="input-field"
          list="role-suggestions"
        />
        <datalist id="role-suggestions">
          {roles.map((r) => <option key={r} value={r} />)}
        </datalist>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Interview Mode</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                mode === opt.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className={`text-sm font-semibold ${mode === opt.value ? 'text-emerald-700' : 'text-slate-800'}`}>{opt.label}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Number of Questions
          <span className="ml-2 text-emerald-600 font-bold normal-case">{questionCount}</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={30}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="flex-1 h-2 rounded-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setQuestionCount((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors"
            >-</button>
            <span className="w-8 text-center text-sm font-bold text-slate-800">{questionCount}</span>
            <button
              onClick={() => setQuestionCount((q) => Math.min(30, q + 1))}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors"
            >+</button>
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>1 (quick)</span>
          <span>~{Math.ceil(questionCount * 2)} min estimated</span>
          <span>30 (comprehensive)</span>
        </div>
      </div>

      <button
        onClick={handleStart}
        disabled={!canStart}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
          canStart
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        <Play size={16} /> Start Interview Session
      </button>
      {!canStart && (
        <p className="text-center text-xs text-slate-400">Upload your resume and enter a position title to continue.</p>
      )}
    </div>
  );
};

const SetupFromATS = ({ analysisResult, onStart }) => {
  const [positionTitle, setPositionTitle] = useState('');
  const [mode, setMode] = useState('both');
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    if (!positionTitle.trim()) return;
    onStart({ positionTitle: positionTitle.trim(), mode, questionCount, source: 'ats' });
  };

  return (
    <div className="animate-slide-up space-y-5 max-w-2xl">
      <div className="flex items-start gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={20} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-800">Resume already analyzed</p>
          <p className="text-xs text-emerald-700 mt-0.5">
            {analysisResult?.fileName || 'Your resume'} · ATS Score: <strong>{analysisResult?.overallScore}/100</strong> · No re-upload needed.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Position / Job Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
          placeholder="e.g. Senior Frontend Developer"
          className="input-field"
          list="role-suggestions-ats"
        />
        <datalist id="role-suggestions-ats">
          {roles.map((r) => <option key={r} value={r} />)}
        </datalist>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Interview Mode</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                mode === opt.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className={`text-sm font-semibold ${mode === opt.value ? 'text-emerald-700' : 'text-slate-800'}`}>{opt.label}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Number of Questions
          <span className="ml-2 text-emerald-600 font-bold normal-case">{questionCount}</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={30}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="flex-1 h-2 rounded-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={() => setQuestionCount((q) => Math.max(1, q - 1))} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors">-</button>
            <span className="w-8 text-center text-sm font-bold text-slate-800">{questionCount}</span>
            <button onClick={() => setQuestionCount((q) => Math.min(30, q + 1))} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors">+</button>
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>1 (quick)</span>
          <span>~{Math.ceil(questionCount * 2)} min estimated</span>
          <span>30 (comprehensive)</span>
        </div>
      </div>

      <button
        onClick={handleStart}
        disabled={!positionTitle.trim()}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
          positionTitle.trim()
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        <Play size={16} /> Start Interview Session
      </button>
    </div>
  );
};

/* ── dummy AI score assigned per question (replace with real AI scores later) ── */
const getDummyScore = (id, skipped) => {
  if (skipped) return null;
  const map = { 1: 82, 2: 68, 3: 75, 4: 88, 5: 55, 6: 79, 7: 71, 8: 92, 9: 0, 10: 61 };
  return map[id] ?? Math.floor(50 + Math.random() * 40);
};

const scoreColor = (s) => {
  if (s >= 80) return { text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' };
  if (s >= 60) return { text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' };
  return { text: 'text-red-500', light: 'bg-red-50', border: 'border-red-200' };
};

const CompletionScreen = ({ questions, answers, config, onRestart }) => {
  const navigate = useNavigate();
  const answeredCount = Object.values(answers).filter((a) => a.trim().length > 0).length;

  /* assign dummy scores per question */
  const scored = questions.map((q, i) => {
    const skipped = !answers[q.id]?.trim();
    const score = getDummyScore(i + 1, skipped);
    return { ...q, score, skipped };
  });

  const validScores = scored.filter(q => !q.skipped).map(q => q.score);
  const overallScore = validScores.length
    ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
    : 0;

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100">
          <Trophy size={36} className="text-emerald-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Session Complete!</h2>
        <p className="text-slate-500">
          You completed <strong>{questions.length}</strong> questions for{' '}
          <strong>{config.positionTitle}</strong> ({config.mode} mode).
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Questions', value: questions.length, color: 'text-slate-800' },
          { label: 'Answered', value: answeredCount, color: 'text-emerald-600' },
          { label: 'Overall Score', value: `${overallScore}/100`, color: 'text-violet-600' },
        ].map((k, i) => (
          <div key={i} className="card p-4 text-center">
            <p className={`text-2xl font-bold font-display ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Per-question score list */}
      <div className="card p-5 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-4">Score Per Question</p>
        <div className="space-y-3">
          {scored.map((q, i) => {
            const c = q.skipped
              ? { text: 'text-slate-400', light: 'bg-slate-50', border: 'border-slate-100' }
              : scoreColor(q.score);
            return (
              <div key={q.id} className={`flex items-start gap-3 p-3 rounded-xl border ${c.border} ${c.light} animate-slide-up`} style={{ animationDelay: `${i * 40}ms` }}>
                {/* Score bubble */}
                <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 bg-white border ${c.border} shadow-sm`}>
                  {q.skipped ? (
                    <Minus size={14} className="text-slate-400" />
                  ) : (
                    <>
                      <span className={`text-sm font-bold ${c.text}`}>{q.score}</span>
                      <span className="text-[9px] text-slate-400">/100</span>
                    </>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Q{i + 1}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 text-slate-600 font-semibold border border-slate-200">{q.category}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${q.type === 'hr' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'}`}>
                      {q.type === 'hr' ? 'HR' : 'Tech'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-snug truncate">{q.question}</p>
                  <p className="text-xs mt-1">
                    {q.skipped ? (
                      <span className="text-slate-400 italic">Skipped</span>
                    ) : (
                      <span className={c.text + ' font-semibold'}>
                        {q.score >= 80 ? 'Excellent' : q.score >= 70 ? 'Good' : q.score >= 55 ? 'Fair' : 'Needs Work'}
                      </span>
                    )}
                  </p>
                </div>
                {!q.skipped && (
                  q.score >= 80 ? <ChevronUp size={16} className="text-emerald-500 flex-shrink-0 mt-1" /> :
                  q.score < 60 ? <ChevronDown size={16} className="text-red-500 flex-shrink-0 mt-1" /> :
                  <Minus size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        {/* Primary: View Results */}
        <button
          onClick={() => navigate('/interview/results')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-xl shadow-emerald-500/25"
        >
          <BarChart3 size={17} />
          View Full Analytics & Results
        </button>
        {/* Secondary: New session */}
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all"
        >
          <RotateCcw size={15} /> Start New Session
        </button>
      </div>
    </div>
  );
};

const InterviewSession = ({ questions, config, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answerMode, setAnswerMode] = useState('type');
  const [done, setDone] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const CategoryIcon = categoryIcons[question?.category] || BookOpen;
  const currentAnswer = answers[question?.id] || '';

  const saveAnswer = (text) => {
    setAnswers((prev) => ({ ...prev, [question.id]: text }));
  };

  const handleNext = () => {
    if (isLast) {
      setDone(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswerMode('type');
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setAnswerMode('type');
    }
  };

  if (done) {
    return (
      <CompletionScreen
        questions={questions}
        answers={answers}
        config={config}
        onRestart={onExit}
      />
    );
  }

  if (!question) return null;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{config.positionTitle} · {config.mode === 'both' ? 'Mixed Mode' : config.mode === 'hr' ? 'HR Mode' : 'Technical Mode'}</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        <button onClick={onExit} className="btn-outline text-xs px-3 py-2 gap-1.5">
          <RotateCcw size={13} /> Exit Session
        </button>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="card p-6 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <CategoryIcon size={15} className="text-slate-600" />
          </div>
          <span className="text-xs font-semibold text-slate-500">{question.category}</span>
          <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-lg ${getDifficultyClass(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${question.type === 'hr' ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700'}`}>
            {question.type === 'hr' ? 'HR' : 'Technical'}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed mb-5">{question.question}</h2>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-5">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">Tips</p>
          <ul className="space-y-1.5">
            {question.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-emerald-800">
                <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 mb-4 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setAnswerMode('type')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              answerMode === 'type' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Keyboard size={14} /> Type Answer
          </button>
          <button
            onClick={() => setAnswerMode('speak')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              answerMode === 'speak' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Mic size={14} /> Speak Answer
          </button>
        </div>

        {answerMode === 'type' ? (
          <textarea
            value={currentAnswer}
            onChange={(e) => saveAnswer(e.target.value)}
            placeholder="Type your answer here. Be as detailed and structured as possible — use the STAR method for behavioral questions..."
            rows={6}
            className="input-field resize-none text-sm leading-relaxed w-full"
          />
        ) : (
          <div className="border border-slate-200 rounded-xl p-6 text-center bg-slate-50">
            <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-3">
              <Mic size={24} className="text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">Voice Input</p>
            <p className="text-xs text-slate-400 mb-4">Speech-to-text will be available in a future update when connected to the backend.</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-lg">
              Coming soon
            </span>
          </div>
        )}

        {currentAnswer.trim().length > 0 && (
          <p className="text-xs text-slate-400 mt-2 text-right">{currentAnswer.trim().split(/\s+/).length} words</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn-outline text-sm px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={15} /> Previous
        </button>

        <button onClick={handleNext} className="btn-primary text-sm px-5 py-2.5">
          {isLast ? (
            <><Trophy size={15} /> Finish Session</>
          ) : (
            <>Next Question <ArrowRight size={15} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export const InterviewPrep = () => {
  const _navigate = useNavigate();
  const { interviewSource, analysisState } = useApp();
  const [sessionConfig, setSessionConfig] = useState(null);
  const [questions, setQuestions] = useState([]);

  const fromATS = interviewSource === 'ats' && analysisState.status === 'complete';

  const handleStart = (config) => {
    const generated = generateQuestionSet(config.mode, config.questionCount);
    setQuestions(generated);
    setSessionConfig(config);
  };

  const handleExit = () => {
    setSessionConfig(null);
    setQuestions([]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!sessionConfig ? (
          <>
            <div className="mb-8">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Interview Preparer</h1>
              <p className="text-slate-500">
                {fromATS
                  ? 'Your resume is already loaded. Configure your session and start practicing.'
                  : 'Upload your resume, describe the role, and get a personalized mock interview session.'}
              </p>
            </div>

            {fromATS ? (
              <SetupFromATS
                analysisResult={analysisState.result}
                onStart={handleStart}
              />
            ) : (
              <SetupDirect onStart={handleStart} />
            )}
          </>
        ) : (
          <InterviewSession
            questions={questions}
            config={sessionConfig}
            onExit={handleExit}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
