import { useState } from 'react';
import { 
  Download, Eye, Code, RotateCcw, 
  Home, User, Mail, Phone, Search, Settings, 
  Heart, Star, ThumbsUp, MessageCircle, Share,
  ShoppingCart, CreditCard, Package, Truck,
  Calendar, Clock, Bell, AlertCircle, CheckCircle,
  X, Plus, Minus, Edit, Trash2, Save,
  Camera, Image, Video, Music, File,
  MapPin, Globe, Wifi, Bluetooth, Battery,
  Sun, Moon, Cloud, Zap, Flame,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const IconLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [iconConfig, setIconConfig] = useState({
    iconName: 'Home',
    size: '24',
    color: '#000000',
    strokeWidth: '2',
    className: 'icon',
    backgroundColor: 'transparent',
    padding: '0',
    borderRadius: '0',
    border: 'none',
    opacity: '1',
    transform: 'none',
    filter: 'none',
    text: 'アイコンテキスト',
    iconPosition: 'left',
    textSpacing: '8'
  });

  const [iconEffects, setIconEffects] = useState({
    hover: false,
    animation: 'none',
    shadow: 'none',
    gradient: false,
    gradientFrom: '#3b82f6',
    gradientTo: '#8b5cf6'
  });

  const [activeTab, setActiveTab] = useState('visual');

  // Available icons
  const availableIcons = {
    // Basic
    'Home': Home, 'User': User, 'Mail': Mail, 'Phone': Phone, 'Search': Search, 'Settings': Settings,
    // Social
    'Heart': Heart, 'Star': Star, 'ThumbsUp': ThumbsUp, 'MessageCircle': MessageCircle, 'Share': Share,
    // E-commerce
    'ShoppingCart': ShoppingCart, 'CreditCard': CreditCard, 'Package': Package, 'Truck': Truck,
    // Time & Notifications
    'Calendar': Calendar, 'Clock': Clock, 'Bell': Bell, 'AlertCircle': AlertCircle, 'CheckCircle': CheckCircle,
    // Actions
    'X': X, 'Plus': Plus, 'Minus': Minus, 'Edit': Edit, 'Trash2': Trash2, 'Save': Save,
    // Media
    'Camera': Camera, 'Image': Image, 'Video': Video, 'Music': Music, 'File': File,
    // Location & Connectivity
    'MapPin': MapPin, 'Globe': Globe, 'Wifi': Wifi, 'Bluetooth': Bluetooth, 'Battery': Battery,
    // Weather & Elements
    'Sun': Sun, 'Moon': Moon, 'Cloud': Cloud, 'Zap': Zap, 'Flame': Flame
  };

  // Generate CSS for Icon component
  const generateCSS = () => {
    const { 
      size,
      color,
      strokeWidth,
      className,
      backgroundColor,
      padding,
      borderRadius,
      border,
      opacity,
      transform,
      filter,
      iconPosition,
      textSpacing
    } = iconConfig;

    const {
      hover,
      animation,
      shadow,
      gradient,
      gradientFrom,
      gradientTo
    } = iconEffects;

    const css = `:root {
  --icon-size: ${size}px;
  --icon-color: ${gradient ? `url(#icon-gradient)` : color};
  --icon-stroke-width: ${strokeWidth};
  --icon-background: ${backgroundColor};
  --icon-padding: ${padding};
  --icon-border-radius: ${borderRadius};
  --icon-border: ${border};
  --icon-opacity: ${opacity};
  --icon-transform: ${transform};
  --icon-filter: ${filter};
  --icon-shadow: ${shadow};
  --icon-gradient-from: ${gradientFrom};
  --icon-gradient-to: ${gradientTo};
  --icon-text-spacing: ${textSpacing}px;
}

.${className}-container {
  display: inline-flex;
  align-items: center;
  gap: var(--icon-text-spacing);
  flex-direction: ${iconPosition === 'right' ? 'row-reverse' : 'row'};
  transition: all 0.3s ease;
}

.${className} {
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--icon-color);
  stroke-width: var(--icon-stroke-width);
  background: var(--icon-background);
  padding: var(--icon-padding);
  border-radius: var(--icon-border-radius);
  border: var(--icon-border);
  opacity: var(--icon-opacity);
  transform: var(--icon-transform);
  filter: var(--icon-filter);
  box-shadow: var(--icon-shadow);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.${className}-text {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  white-space: nowrap;
}

${gradient ? `
.${className} svg {
  fill: url(#icon-gradient);
}

.icon-gradient {
  --gradient-from: var(--icon-gradient-from);
  --gradient-to: var(--icon-gradient-to);
}
` : ''}

${hover ? `
.${className}-container:hover .${className} {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.${className}-container:hover .${className}-text {
  color: #1f2937;
}
` : ''}

${animation === 'spin' ? `
.${className} {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
` : ''}

${animation === 'pulse' ? `
.${className} {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
` : ''}

${animation === 'bounce' ? `
.${className} {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25%); }
}
` : ''}

${animation === 'shake' ? `
.${className} {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
` : ''}

/* Responsive */
@media (max-width: 768px) {
  .${className} {
    --icon-size: ${Math.max(16, parseInt(size) * 0.8)}px;
  }
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Icon',
      props: {
        name: iconConfig.iconName,
        size: iconConfig.size,
        color: iconConfig.color,
        strokeWidth: iconConfig.strokeWidth,
        className: iconConfig.className,
        backgroundColor: iconConfig.backgroundColor,
        padding: iconConfig.padding,
        borderRadius: iconConfig.borderRadius,
        border: iconConfig.border,
        opacity: iconConfig.opacity,
        transform: iconConfig.transform,
        filter: iconConfig.filter,
        text: iconConfig.text,
        iconPosition: iconConfig.iconPosition,
        textSpacing: iconConfig.textSpacing
      },
      effects: iconEffects
    };
  };

  // Load preset configurations
  const loadPreset = (preset: string) => {
    const presets = {
      'small': {
        size: '16',
        padding: '4px',
        strokeWidth: '2'
      },
      'medium': {
        size: '24',
        padding: '8px',
        strokeWidth: '2'
      },
      'large': {
        size: '32',
        padding: '12px',
        strokeWidth: '1.5'
      },
      'button': {
        size: '20',
        padding: '8px',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderRadius: '6px',
        strokeWidth: '2'
      },
      'badge': {
        size: '16',
        padding: '6px',
        backgroundColor: '#ef4444',
        color: '#ffffff',
        borderRadius: '50%',
        strokeWidth: '2'
      },
      'floating': {
        size: '24',
        padding: '12px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        shadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e5e7eb'
      }
    };

    const effectPresets = {
      'small': { hover: false, animation: 'none', shadow: 'none' },
      'medium': { hover: true, animation: 'none', shadow: 'none' },
      'large': { hover: true, animation: 'none', shadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
      'button': { hover: true, animation: 'none', shadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
      'badge': { hover: false, animation: 'pulse', shadow: 'none' },
      'floating': { hover: true, animation: 'none', shadow: '0 8px 25px rgba(0, 0, 0, 0.15)' }
    };

    if (presets[preset as keyof typeof presets]) {
      setIconConfig({
        ...iconConfig,
        ...presets[preset as keyof typeof presets]
      });
      setIconEffects({
        ...iconEffects,
        ...effectPresets[preset as keyof typeof effectPresets]
      });
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setIconConfig({
      iconName: 'Home',
      size: '24',
      color: '#000000',
      strokeWidth: '2',
      className: 'icon',
      backgroundColor: 'transparent',
      padding: '0',
      borderRadius: '0',
      border: 'none',
      opacity: '1',
      transform: 'none',
      filter: 'none',
      text: 'アイコンテキスト',
      iconPosition: 'left',
      textSpacing: '8'
    });
    setIconEffects({
      hover: false,
      animation: 'none',
      shadow: 'none',
      gradient: false,
      gradientFrom: '#3b82f6',
      gradientTo: '#8b5cf6'
    });
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icon-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icon-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSVG = () => {
    const svgElement = document.createElement('div');
    svgElement.innerHTML = `<svg width="${iconConfig.size}" height="${iconConfig.size}" viewBox="0 0 24 24" fill="none" stroke="${iconConfig.color}" stroke-width="${iconConfig.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"></svg>`;
    
    const blob = new Blob([svgElement.innerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconConfig.iconName.toLowerCase()}-icon.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderIconWithTextColor = (textColor?: string) => {
    const IconComponent = availableIcons[iconConfig.iconName as keyof typeof availableIcons];
    
    return (
      <div 
        className={`${iconConfig.className}-container`}
        style={{
          '--icon-size': `${iconConfig.size}px`,
          '--icon-color': iconEffects.gradient ? 'url(#icon-gradient)' : iconConfig.color,
          '--icon-stroke-width': iconConfig.strokeWidth,
          '--icon-background': iconConfig.backgroundColor,
          '--icon-padding': iconConfig.padding,
          '--icon-border-radius': iconConfig.borderRadius,
          '--icon-border': iconConfig.border,
          '--icon-opacity': iconConfig.opacity,
          '--icon-transform': iconConfig.transform,
          '--icon-filter': iconConfig.filter,
          '--icon-shadow': iconEffects.shadow,
          '--icon-text-spacing': `${iconConfig.textSpacing}px`
        } as React.CSSProperties}
      >
        {iconEffects.gradient && (
          <svg width="0" height="0">
            <defs>
              <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={iconEffects.gradientFrom} />
                <stop offset="100%" stopColor={iconEffects.gradientTo} />
              </linearGradient>
            </defs>
          </svg>
        )}
        <div className={iconConfig.className}>
          <IconComponent 
            size={iconConfig.size} 
            strokeWidth={iconConfig.strokeWidth}
            style={{
              fill: iconEffects.gradient ? 'url(#icon-gradient)' : 'none'
            }}
          />
        </div>
        <span 
          className={`${iconConfig.className}-text`}
          style={textColor ? { color: textColor } : {}}
        >
          {iconConfig.text}
        </span>
      </div>
    );
  };

  const renderIcon = () => {
    return renderIconWithTextColor();
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Icon Component Generator</h2>
              <p className="text-gray-300">アイコンコンポーネント生成ツール - カスタマイズ可能なアイコンの作成</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                showSettings 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {showSettings ? (
                <>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  設定を非表示
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-2" />
                  設定を表示
                </>
              )}
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-8 ${
          showSettings ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}>
          {/* Configuration Panel */}
          {showSettings && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">設定</h2>
            
            {/* Icon Selection */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">アイコン選択</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon Name
                </label>
                <select
                  value={iconConfig.iconName}
                  onChange={(e) => setIconConfig({...iconConfig, iconName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.keys(availableIcons).map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto">
                {Object.keys(availableIcons).map(iconName => {
                  const IconComp = availableIcons[iconName as keyof typeof availableIcons];
                  return (
                    <button
                      key={iconName}
                      onClick={() => setIconConfig({...iconConfig, iconName})}
                      className={`p-2 rounded border-2 transition-colors ${
                        iconConfig.iconName === iconName
                          ? 'border-indigo-500 bg-indigo-900/50'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      title={iconName}
                    >
                      <IconComp size={16} className="text-white" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Basic Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">基本設定</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Size (px)
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="200"
                    value={iconConfig.size}
                    onChange={(e) => setIconConfig({...iconConfig, size: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stroke Width
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={iconConfig.strokeWidth}
                    onChange={(e) => setIconConfig({...iconConfig, strokeWidth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={iconConfig.color}
                      onChange={(e) => setIconConfig({...iconConfig, color: e.target.value})}
                      className="w-12 h-10 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={iconConfig.color}
                      onChange={(e) => setIconConfig({...iconConfig, color: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="text"
                    value={iconConfig.backgroundColor}
                    onChange={(e) => setIconConfig({...iconConfig, backgroundColor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Padding
                  </label>
                  <input
                    type="text"
                    value={iconConfig.padding}
                    onChange={(e) => setIconConfig({...iconConfig, padding: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Border Radius
                  </label>
                  <input
                    type="text"
                    value={iconConfig.borderRadius}
                    onChange={(e) => setIconConfig({...iconConfig, borderRadius: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Opacity
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={iconConfig.opacity}
                    onChange={(e) => setIconConfig({...iconConfig, opacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={iconConfig.className}
                  onChange={(e) => setIconConfig({...iconConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  テキスト
                </label>
                <input
                  type="text"
                  value={iconConfig.text}
                  onChange={(e) => setIconConfig({...iconConfig, text: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="アイコンテキスト"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    アイコンの位置
                  </label>
                  <select
                    value={iconConfig.iconPosition}
                    onChange={(e) => setIconConfig({...iconConfig, iconPosition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="left">左側</option>
                    <option value="right">右側</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    テキストとの間隔 (px)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={iconConfig.textSpacing}
                    onChange={(e) => setIconConfig({...iconConfig, textSpacing: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Effects */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">エフェクト</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Animation
                  </label>
                  <select
                    value={iconEffects.animation}
                    onChange={(e) => setIconEffects({...iconEffects, animation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="none">None</option>
                    <option value="spin">Spin</option>
                    <option value="pulse">Pulse</option>
                    <option value="bounce">Bounce</option>
                    <option value="shake">Shake</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Shadow
                  </label>
                  <select
                    value={iconEffects.shadow}
                    onChange={(e) => setIconEffects({...iconEffects, shadow: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="none">None</option>
                    <option value="0 1px 3px rgba(0, 0, 0, 0.1)">Small</option>
                    <option value="0 4px 6px rgba(0, 0, 0, 0.1)">Medium</option>
                    <option value="0 10px 15px rgba(0, 0, 0, 0.1)">Large</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={iconEffects.hover}
                    onChange={(e) => setIconEffects({...iconEffects, hover: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Hover Effect</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={iconEffects.gradient}
                    onChange={(e) => setIconEffects({...iconEffects, gradient: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Gradient</span>
                </label>
              </div>

              {iconEffects.gradient && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gradient From
                    </label>
                    <input
                      type="color"
                      value={iconEffects.gradientFrom}
                      onChange={(e) => setIconEffects({...iconEffects, gradientFrom: e.target.value})}
                      className="w-full h-10 border border-gray-600 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gradient To
                    </label>
                    <input
                      type="color"
                      value={iconEffects.gradientTo}
                      onChange={(e) => setIconEffects({...iconEffects, gradientTo: e.target.value})}
                      className="w-full h-10 border border-gray-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Preset Layouts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">プリセット</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset('small')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Small
                </button>
                <button
                  onClick={() => loadPreset('medium')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Medium
                </button>
                <button
                  onClick={() => loadPreset('large')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Large
                </button>
                <button
                  onClick={() => loadPreset('button')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Button
                </button>
                <button
                  onClick={() => loadPreset('badge')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Badge
                </button>
                <button
                  onClick={() => loadPreset('floating')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Floating
                </button>
              </div>
              <button
                onClick={resetToDefault}
                className="w-full flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                デフォルトに戻す
              </button>
            </div>

            {/* Download Buttons */}
            <div className="mt-8 flex space-x-3">
              <button
                onClick={downloadJSON}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                JSON
              </button>
              <button
                onClick={downloadCSS}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Download className="w-4 h-4 mr-2" />
                CSS
              </button>
              <button
                onClick={downloadSVG}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                SVG
              </button>
            </div>
          </div>
          )}

          {/* Preview Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('visual')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'visual' ? 'bg-indigo-900/50 text-indigo-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-indigo-900/50 text-indigo-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-600 p-8 rounded-lg flex items-center justify-center bg-white">
                  <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                  {renderIcon()}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    {renderIcon()}
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg flex items-center justify-center">
                    {renderIconWithTextColor('white')}
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg flex items-center justify-center">
                    {renderIconWithTextColor('white')}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 text-center">
                  Icon: {iconConfig.iconName} | Size: {iconConfig.size}px | Color: {iconConfig.color}<br/>
                  Position: {iconConfig.iconPosition} | Spacing: {iconConfig.textSpacing}px | Text: "{iconConfig.text}"
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-white">CSS</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto max-h-64 overflow-y-auto">
                    <code className="text-green-400">{generateCSS()}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">JSON</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto max-h-64 overflow-y-auto">
                    <code className="text-indigo-400">{JSON.stringify(generateJSON(), null, 2)}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconLayoutGenerator;