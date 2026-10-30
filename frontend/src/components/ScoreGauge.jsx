import { useAnimatedScore } from '../hooks/useAnimatedScore';
import { getScoreLabel, getCircleProps } from '../utils/scoreHelpers';

export const ScoreGauge = ({ score, size = 140, strokeWidth = 10, label = 'Overall Score' }) => {
  const animated = useAnimatedScore(score);
  const radius = (size - strokeWidth * 2) / 2;
  const { circumference, strokeDashoffset } = getCircleProps(animated, radius);
  const center = size / 2;

  const getStrokeColor = (s) => {
    if (s >= 80) return '#10b981';
    if (s >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getTrackColor = (s) => {
    if (s >= 80) return '#d1fae5';
    if (s >= 60) return '#fef3c7';
    return '#fee2e2';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={getTrackColor(score)}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={getStrokeColor(score)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (animated / 100) * circumference}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900 font-display">{animated}</span>
          <span className="text-xs text-slate-500 font-medium">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: getStrokeColor(score) }}>
          {getScoreLabel(score)}
        </p>
      </div>
    </div>
  );
};

export const MiniScoreBar = ({ label, score, delay = 0 }) => {
  const animated = useAnimatedScore(score, 1000, delay);

  const getColor = (s) => {
    if (s >= 80) return 'bg-emerald-500';
    if (s >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getTextColor = (s) => {
    if (s >= 80) return 'text-emerald-600';
    if (s >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600 font-medium">{label}</span>
        <span className={`text-sm font-bold ${getTextColor(score)}`}>{animated}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getColor(score)}`}
          style={{ width: `${animated}%` }}
        />
      </div>
    </div>
  );
};
