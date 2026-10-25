import React, { useState, useRef } from 'react';

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emerald' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // tilt degrees
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsPressed(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          face: 'bg-gradient-to-b from-sky-500 via-sky-600 to-sky-700 text-white border-t border-sky-300/40 shadow-sky-500/30',
          base: 'bg-sky-900',
          glare: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
        };
      case 'emerald':
        return {
          face: 'bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 text-white border-t border-emerald-300/40 shadow-emerald-500/30',
          base: 'bg-emerald-950',
          glare: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
        };
      case 'amber':
        return {
          face: 'bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-white border-t border-amber-300/40 shadow-amber-500/30',
          base: 'bg-amber-950',
          glare: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
        };
      case 'secondary':
      default:
        return {
          face: 'bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 text-slate-100 border-t border-slate-700/60 shadow-black/40',
          base: 'bg-slate-950',
          glare: 'bg-gradient-to-r from-transparent via-slate-400/10 to-transparent',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-3.5 py-1.5 gap-1.5';
      case 'lg':
        return 'text-base px-6 py-3 gap-2.5';
      case 'md':
      default:
        return 'text-sm px-4.5 py-2 gap-2';
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      style={{ perspective: '800px' }}
      className="inline-block select-none"
    >
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => !disabled && setIsPressed(true)}
        onMouseUp={() => !disabled && setIsPressed(false)}
        onClick={onClick}
        disabled={disabled}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isPressed ? 'translateZ(1px)' : 'translateZ(8px)'
          }`,
          transformStyle: 'preserve-3d',
          transition: isPressed
            ? 'transform 0.05s ease-out'
            : 'transform 0.25s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
        className={`relative group font-bold tracking-wide rounded-xl outline-none focus:ring-2 focus:ring-sky-500/50 disabled:opacity-40 disabled:pointer-events-none ${className}`}
        {...props}
      >
        {/* 3D Drop Extrusion Shadow (depth base) */}
        <span
          className={`absolute inset-0 rounded-xl translate-y-1.5 ${styles.base} shadow-xl`}
          style={{ transform: 'translateZ(-6px) translateY(4px)' }}
          aria-hidden="true"
        />

        {/* 3D Button Face */}
        <span
          className={`relative flex items-center justify-center rounded-xl font-semibold shadow-lg transition-transform ${
            styles.face
          } ${getSizeStyles()} ${isPressed ? 'translate-y-1' : 'translate-y-0'}`}
        >
          {/* Specular Glare / Light Reflection */}
          <span
            className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${styles.glare}`}
          />

          {icon && <span className="shrink-0">{icon}</span>}
          <span className="relative z-10">{children}</span>
        </span>
      </button>
    </div>
  );
};
