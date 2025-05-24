interface FileIconProps {
  className?: string;
}

const FileIcon = ({ className = "w-5 h-5" }: FileIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
      <defs>
        <linearGradient id="fileGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#e5e7eb', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#d1d5db', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="foldGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#f3f4f6', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#e5e7eb', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* File Icon */}
      {/* Main file body */}
      <path d="M8 6 L8 26 L24 26 L24 12 L20 6 Z" fill="url(#fileGradientHeader)" stroke="#9ca3af" strokeWidth="0.5"/>
      
      {/* File fold (top-right corner) */}
      <path d="M20 6 L20 10 L24 10 Z" fill="url(#foldGradientHeader)" stroke="#9ca3af" strokeWidth="0.5"/>
      
      {/* Layout elements inside file (representing content/code) */}
      {/* Header line */}
      <rect x="10" y="9" width="8" height="1" rx="0.5" fill="#6b7280" opacity="0.8"/>
      
      {/* Content blocks representing layout elements */}
      <rect x="10" y="12" width="12" height="1.5" rx="0.5" fill="#3b82f6" opacity="0.7"/>
      <rect x="10" y="15" width="10" height="1.5" rx="0.5" fill="#3b82f6" opacity="0.5"/>
      <rect x="10" y="18" width="9" height="1.5" rx="0.5" fill="#3b82f6" opacity="0.6"/>
      
      {/* Bottom section */}
      <rect x="10" y="21" width="11" height="1.5" rx="0.5" fill="#8b5cf6" opacity="0.6"/>
      <rect x="10" y="24" width="7" height="1" rx="0.5" fill="#6b7280" opacity="0.5"/>
    </svg>
  );
};

export default FileIcon;