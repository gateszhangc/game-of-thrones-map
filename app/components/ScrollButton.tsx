'use client';

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScrollButton({ targetId, children, className = '' }: ScrollButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
