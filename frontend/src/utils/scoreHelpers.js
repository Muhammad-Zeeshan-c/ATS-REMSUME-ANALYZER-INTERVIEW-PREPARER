export const getScoreColor = (score) => {
  if (score >= 80) return 'emerald';
  if (score >= 60) return 'amber';
  return 'red';
};

export const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Needs Work';
  return 'Poor';
};

export const getScoreRingClass = (score) => {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
};

export const getScoreBgClass = (score) => {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
};

export const getPriorityClass = (priority) => {
  const map = {
    high: 'bg-red-50 text-red-700 border border-red-200',
    medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    low: 'bg-slate-50 text-slate-600 border border-slate-200',
  };
  return map[priority] || map.low;
};

export const getIssueTypeClass = (type) => {
  const map = {
    error: { badge: 'bg-red-100 text-red-700', icon: 'text-red-500', border: 'border-l-red-400' },
    warning: { badge: 'bg-amber-100 text-amber-700', icon: 'text-amber-500', border: 'border-l-amber-400' },
    info: { badge: 'bg-blue-100 text-blue-700', icon: 'text-blue-500', border: 'border-l-blue-400' },
  };
  return map[type] || map.info;
};

export const getDifficultyClass = (difficulty) => {
  const map = {
    easy: 'bg-emerald-50 text-emerald-700',
    medium: 'bg-amber-50 text-amber-700',
    hard: 'bg-red-50 text-red-700',
  };
  return map[difficulty] || map.medium;
};

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

export const clampScore = (score) => Math.min(100, Math.max(0, score));

export const getCircleProps = (score, radius = 54) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return { circumference, strokeDashoffset };
};
