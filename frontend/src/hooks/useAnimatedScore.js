import { useState, useEffect } from 'react';

export const useAnimatedScore = (targetScore, duration = 1200, delay = 300) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!targetScore) return;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(eased * targetScore));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [targetScore, duration, delay]);

  return displayScore;
};
