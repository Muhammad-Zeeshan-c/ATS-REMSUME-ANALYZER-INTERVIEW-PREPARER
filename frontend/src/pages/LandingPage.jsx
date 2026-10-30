import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart2, MessageSquare, Target, Zap, Shield, TrendingUp, Star } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';

const features = [
  {
    icon: BarChart2,
    title: 'ATS Score Breakdown',
    description: 'Get a detailed score across keyword match rate, formatting compliance, and impact metrics — all in one clear dashboard.',
    color: 'emerald',
  },
  {
    icon: Target,
    title: 'Missing Keyword Detection',
    description: 'Identify exactly which high-value keywords are absent from your resume and categorized by priority level.',
    color: 'blue',
  },
  {
    icon: MessageSquare,
    title: 'Interview Question Bank',
    description: 'Access role-specific behavioral, technical, and situational questions tailored to your target position.',
    color: 'violet',
  },
  {
    icon: Zap,
    title: 'Instant Actionable Fixes',
    description: 'Get clear, prioritized recommendations — not vague advice — so you know exactly what to change and why.',
    color: 'amber',
  },
  {
    icon: Shield,
    title: 'Formatting Compliance',
    description: 'Ensure your resume parses correctly across all major ATS systems with our structural validation engine.',
    color: 'red',
  },
  {
    icon: TrendingUp,
    title: 'Impact Score Analysis',
    description: 'Measure the strength of your achievement statements and learn how to quantify them for maximum recruiter impact.',
    color: 'teal',
  },
];

const stats = [
  { value: '94%', label: 'of users improved ATS score' },
  { value: '3.2x', label: 'more interview callbacks' },
  { value: '15k+', label: 'resumes analyzed' },
  { value: '200+', label: 'interview questions' },
];

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Drop your PDF or Word document — our parser handles the rest.' },
  { step: '02', title: 'Review Your ATS Score', desc: 'Get an instant breakdown across keywords, formatting, and impact.' },
  { step: '03', title: 'Fix & Optimize', desc: 'Apply our prioritized recommendations to boost your score.' },
  { step: '04', title: 'Practice Interviews', desc: 'Prepare with role-specific questions and structured model answers.' },
];

const iconColorMap = {
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  violet: 'bg-violet-50 text-violet-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  teal: 'bg-teal-50 text-teal-600',
};

const SampleResumeCard = () => (
  <div className="card-elevated p-5 max-w-xs mx-auto">
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="h-3 bg-slate-800 rounded w-24 mb-1.5" />
        <div className="h-2.5 bg-slate-300 rounded w-36" />
      </div>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        <span className="text-white text-xs font-bold">JD</span>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-2 bg-slate-100 rounded w-full" />
      <div className="h-2 bg-slate-100 rounded w-5/6" />
      <div className="h-2 bg-slate-100 rounded w-4/6" />
    </div>
    <div className="border-t border-slate-100 pt-3 mb-3">
      <div className="h-2.5 bg-slate-700 rounded w-20 mb-2" />
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <div className="h-2 bg-slate-100 rounded flex-1" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <div className="h-2 bg-slate-100 rounded flex-1 w-5/6" />
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
      <span className="text-xs font-medium text-emerald-700">ATS Score</span>
      <div className="flex items-center gap-1.5">
        <div className="w-16 h-1.5 bg-emerald-200 rounded-full overflow-hidden">
          <div className="w-[74%] h-full bg-emerald-500 rounded-full" />
        </div>
        <span className="text-sm font-bold text-emerald-700">74</span>
      </div>
    </div>
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="relative bg-mesh overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="section-label mb-6">
                <Star size={12} />
                Free ATS Resume Analyzer
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
                Get Past the{' '}
                <span className="text-gradient">ATS Filter</span>{' '}
                Before Humans Ever See You
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
                75% of resumes are rejected by Applicant Tracking Systems before a recruiter reads them. ATSPro analyzes your resume, identifies critical gaps, and prepares you for every interview round.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <button onClick={() => navigate('/analyzer')} className="btn-primary text-base px-7 py-3.5">
                  Analyze My Resume <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/interview')} className="btn-outline text-base px-7 py-3.5">
                  Practice Interviews
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                {['No signup required', 'Instant results', 'Free forever'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 animate-fade-in">
              <SampleResumeCard />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#0f2040', '#1a3560', '#065f46', '#7c3aed'].map((bg, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: bg }}>
                      {['JD', 'SR', 'MK', 'TP'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-500">Trusted by 15,000+ professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4">Everything You Need</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Built for Serious Job Seekers
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Every feature is designed around a single goal: getting you into more interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card p-6 hover:shadow-md transition-shadow duration-300 group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconColorMap[feature.color]}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base mb-2 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4">How It Works</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From Upload to Offer in 4 Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-slate-200 z-0" style={{ width: 'calc(100% - 2rem)' }} />
                )}
                <div className="card p-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-display font-bold text-sm mb-4">{s.step}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get More Interviews?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Upload your resume now and get your ATS score in under 30 seconds.
          </p>
          <button
            onClick={() => navigate('/analyzer')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-500 transition-colors duration-200 shadow-lg hover:shadow-emerald-500/25"
          >
            Analyze My Resume Free <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </MainLayout>
  );
};
