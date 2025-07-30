import { useEffect, useState } from 'react';

const ProgressCircle = ({ percentage, size = 'md', strokeWidth = 8, showLabel = true, animated = true }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);


  const sizeConfig = {
    sm: { diameter: 80, text: 'text-lg', strokeWidth: 6 },
    md: { diameter: 120, text: 'text-2xl', strokeWidth: 8 },
    lg: { diameter: 160, text: 'text-3xl', strokeWidth: 10 },
    xl: { diameter: 200, text: 'text-4xl', strokeWidth: 12 }
  };

  const config = sizeConfig[size] || sizeConfig.md;
  const diameter = config.diameter;
  const radius = (diameter - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  // Animate percentage on mount
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, animated]);

  // Get color and gradient based on percentage
  const getColorConfig = () => {
    if (animatedPercentage >= 80) {
      return {
        color: '#10b981',
        gradient: 'from-emerald-400 to-green-600',
        bgGradient: 'from-emerald-50 to-green-50',
        textColor: 'text-green-700',
        glowColor: 'shadow-green-200',
        label: 'Excellent',
        icon: '🎯'
      };
    }
    if (animatedPercentage >= 60) {
      return {
        color: '#f59e0b',
        gradient: 'from-yellow-400 to-orange-500',
        bgGradient: 'from-yellow-50 to-orange-50',
        textColor: 'text-orange-700',
        glowColor: 'shadow-orange-200',
        label: 'Good',
        icon: '👍'
      };
    }
    if (animatedPercentage >= 40) {
      return {
        color: '#f97316',
        gradient: 'from-orange-400 to-red-500',
        bgGradient: 'from-orange-50 to-red-50',
        textColor: 'text-orange-700',
        glowColor: 'shadow-orange-200',
        label: 'Fair',
        icon: '⚠️'
      };
    }
    return {
      color: '#ef4444',
      gradient: 'from-red-400 to-red-600',
      bgGradient: 'from-red-50 to-red-50',
      textColor: 'text-red-700',
      glowColor: 'shadow-red-200',
      label: 'Needs Work',
      icon: '📈'
    };
  };

  const colorConfig = getColorConfig();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`relative flex items-center justify-center p-6 rounded-full bg-gradient-to-br ${colorConfig.bgGradient} ${colorConfig.glowColor} shadow-lg`}>
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        
        <svg
          width={diameter}
          height={diameter}
          className="transform -rotate-90 drop-shadow-sm"
        >
          {/* Background circle */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={config.strokeWidth}
            fill="transparent"
            className="opacity-30"
          />
          
          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id={`gradient-${percentage}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorConfig.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colorConfig.color} stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={`url(#gradient-${percentage})`}
            strokeWidth={config.strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-2000 ease-out filter drop-shadow-sm"
            style={{
              filter: `drop-shadow(0 0 6px ${colorConfig.color}40)`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${config.text} font-bold ${colorConfig.textColor} leading-none`}>
            {Math.round(animatedPercentage)}%
          </div>
          {showLabel && (
            <div className="flex items-center space-x-1 mt-1">
              <span className="text-xs">{colorConfig.icon}</span>
              <span className={`text-xs font-medium ${colorConfig.textColor} opacity-80`}>
                {colorConfig.label}
              </span>
            </div>
          )}
        </div>
        
        {/* Pulse animation for excellent scores */}
        {animatedPercentage >= 80 && (
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
        )}
      </div>
      
      {/* Score interpretation */}
      {showLabel && (
        <div className="text-center max-w-xs">
          <p className={`text-sm ${colorConfig.textColor} font-medium`}>
            {animatedPercentage >= 80 && "Outstanding match! Your profile aligns excellently with the requirements."}
            {animatedPercentage >= 60 && animatedPercentage < 80 && "Good match! Your profile fits well with most requirements."}
            {animatedPercentage >= 40 && animatedPercentage < 60 && "Moderate match. Consider highlighting relevant skills."}
            {animatedPercentage < 40 && "Room for improvement. Focus on developing key skills."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;