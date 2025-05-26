import { useState, useEffect } from 'react';
import { Download, Eye, Code, RotateCcw, Layers, X, Info, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

const ImposterLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [imposterConfig, setImposterConfig] = useState({
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '999',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'none',
    className: 'imposter'
  });

  const [imposterContent, setImposterContent] = useState({
    type: 'modal',
    title: 'Modal Title',
    content: 'This is a modal content. You can put any content here.',
    showCloseButton: true,
    contentBackground: '#ffffff',
    contentPadding: '2rem',
    contentBorderRadius: '8px',
    contentMaxWidth: '500px',
    contentMaxHeight: '80vh'
  });

  const [activeTab, setActiveTab] = useState('visual');
  const [showPreview, setShowPreview] = useState(false);

  // Handle escape key to close preview
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showPreview) {
        setShowPreview(false);
      }
    };

    if (showPreview) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent background scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore background scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [showPreview]);

  // Generate CSS for Imposter component
  const generateCSS = () => {
    const { 
      position,
      top,
      right,
      bottom,
      left,
      zIndex,
      backgroundColor,
      display,
      alignItems,
      justifyContent,
      backdropFilter,
      className 
    } = imposterConfig;

    const {
      contentBackground,
      contentPadding,
      contentBorderRadius,
      contentMaxWidth,
      contentMaxHeight
    } = imposterContent;

    const css = `:root {
  --imposter-position: ${position};
  --imposter-top: ${top};
  --imposter-right: ${right};
  --imposter-bottom: ${bottom};
  --imposter-left: ${left};
  --imposter-z-index: ${zIndex};
  --imposter-bg-color: ${backgroundColor};
  --imposter-display: ${display};
  --imposter-align-items: ${alignItems};
  --imposter-justify-content: ${justifyContent};
  --imposter-backdrop-filter: ${backdropFilter};
  --imposter-content-bg: ${contentBackground};
  --imposter-content-padding: ${contentPadding};
  --imposter-content-border-radius: ${contentBorderRadius};
  --imposter-content-max-width: ${contentMaxWidth};
  --imposter-content-max-height: ${contentMaxHeight};
}

.${className} {
  position: var(--imposter-position);
  top: var(--imposter-top);
  right: var(--imposter-right);
  bottom: var(--imposter-bottom);
  left: var(--imposter-left);
  z-index: var(--imposter-z-index);
  background-color: var(--imposter-bg-color);
  display: var(--imposter-display);
  align-items: var(--imposter-align-items);
  justify-content: var(--imposter-justify-content);
  backdrop-filter: var(--imposter-backdrop-filter);
}

.${className}-content {
  background: var(--imposter-content-bg);
  padding: var(--imposter-content-padding);
  border-radius: var(--imposter-content-border-radius);
  max-width: var(--imposter-content-max-width);
  max-height: var(--imposter-content-max-height);
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.${className}-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.${className}-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Animation */
.${className} {
  animation: fadeIn 0.3s ease-out;
}

.${className}-content {
  animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to { 
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Hide scrollbar for content */
.${className}-content::-webkit-scrollbar {
  width: 6px;
}

.${className}-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.${className}-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.${className}-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Imposter',
      props: {
        position: imposterConfig.position,
        top: imposterConfig.top,
        right: imposterConfig.right,
        bottom: imposterConfig.bottom,
        left: imposterConfig.left,
        zIndex: imposterConfig.zIndex,
        backgroundColor: imposterConfig.backgroundColor,
        display: imposterConfig.display,
        alignItems: imposterConfig.alignItems,
        justifyContent: imposterConfig.justifyContent,
        backdropFilter: imposterConfig.backdropFilter,
        className: imposterConfig.className
      },
      content: imposterContent
    };
  };

  // Load preset configurations
  const loadPreset = (preset: string) => {
    const presets = {
      'modal': {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '999',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)'
      },
      'notification': {
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        bottom: 'auto',
        left: 'auto',
        zIndex: '1000',
        backgroundColor: 'transparent',
        display: 'block',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backdropFilter: 'none'
      },
      'sidebar': {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: 'auto',
        zIndex: '998',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(2px)'
      },
      'fullscreen': {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '9999',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)'
      }
    };

    const contentPresets = {
      'modal': {
        type: 'modal',
        title: 'Modal Dialog',
        content: 'This is a modal dialog with overlay background.',
        showCloseButton: true,
        contentBackground: '#ffffff',
        contentPadding: '2rem',
        contentBorderRadius: '8px',
        contentMaxWidth: '500px',
        contentMaxHeight: '80vh'
      },
      'notification': {
        type: 'notification',
        title: 'Notification',
        content: 'This is a notification message.',
        showCloseButton: true,
        contentBackground: '#ffffff',
        contentPadding: '1rem',
        contentBorderRadius: '6px',
        contentMaxWidth: '350px',
        contentMaxHeight: 'auto'
      },
      'sidebar': {
        type: 'sidebar',
        title: 'Sidebar Panel',
        content: 'This is a sidebar panel that slides in from the right.',
        showCloseButton: true,
        contentBackground: '#ffffff',
        contentPadding: '2rem',
        contentBorderRadius: '0',
        contentMaxWidth: '400px',
        contentMaxHeight: '100%'
      },
      'fullscreen': {
        type: 'fullscreen',
        title: 'Fullscreen Overlay',
        content: 'This is a fullscreen overlay that covers the entire viewport.',
        showCloseButton: true,
        contentBackground: 'rgba(255, 255, 255, 0.9)',
        contentPadding: '3rem',
        contentBorderRadius: '12px',
        contentMaxWidth: '800px',
        contentMaxHeight: '90vh'
      }
    };

    if (presets[preset as keyof typeof presets]) {
      setImposterConfig({
        ...imposterConfig,
        ...presets[preset as keyof typeof presets]
      });
      setImposterContent({
        ...imposterContent,
        ...contentPresets[preset as keyof typeof contentPresets]
      });
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setImposterConfig({
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '999',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'none',
      className: 'imposter'
    });
    setImposterContent({
      type: 'modal',
      title: 'Modal Title',
      content: 'This is a modal content. You can put any content here.',
      showCloseButton: true,
      contentBackground: '#ffffff',
      contentPadding: '2rem',
      contentBorderRadius: '8px',
      contentMaxWidth: '500px',
      contentMaxHeight: '80vh'
    });
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imposter-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imposter-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderPreviewContent = () => {
    const iconMap = {
      modal: <Info className="w-6 h-6" />,
      notification: <CheckCircle className="w-6 h-6" />,
      sidebar: <Layers className="w-6 h-6" />,
      fullscreen: <AlertTriangle className="w-6 h-6" />
    };

    return (
      <div className={`${imposterConfig.className}-content`} style={{ color: '#333' }}>
        {imposterContent.showCloseButton && (
          <button 
            className={`${imposterConfig.className}-close`}
            onClick={() => setShowPreview(false)}
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">
            {iconMap[imposterContent.type as keyof typeof iconMap]}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{imposterContent.title}</h3>
            <p className="text-gray-700 leading-relaxed">{imposterContent.content}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Imposter Layout Generator</h2>
              <p className="text-gray-300">Every Layout Imposter コンポーネント生成ツール - 絶対位置配置によるオーバーレイレイアウト</p>
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
            
            {/* Imposter Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Imposter 設定</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position
                  </label>
                  <select
                    value={imposterConfig.position}
                    onChange={(e) => setImposterConfig({...imposterConfig, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="absolute">Absolute</option>
                    <option value="relative">Relative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Z-Index
                  </label>
                  <input
                    type="text"
                    value={imposterConfig.zIndex}
                    onChange={(e) => setImposterConfig({...imposterConfig, zIndex: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Top
                  </label>
                  <input
                    type="text"
                    value={imposterConfig.top}
                    onChange={(e) => setImposterConfig({...imposterConfig, top: e.target.value})}
                    className="w-full px-2 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Right
                  </label>
                  <input
                    type="text"
                    value={imposterConfig.right}
                    onChange={(e) => setImposterConfig({...imposterConfig, right: e.target.value})}
                    className="w-full px-2 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bottom
                  </label>
                  <input
                    type="text"
                    value={imposterConfig.bottom}
                    onChange={(e) => setImposterConfig({...imposterConfig, bottom: e.target.value})}
                    className="w-full px-2 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Left
                  </label>
                  <input
                    type="text"
                    value={imposterConfig.left}
                    onChange={(e) => setImposterConfig({...imposterConfig, left: e.target.value})}
                    className="w-full px-2 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Background Color
                </label>
                <input
                  type="text"
                  value={imposterConfig.backgroundColor}
                  onChange={(e) => setImposterConfig({...imposterConfig, backgroundColor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="rgba(0, 0, 0, 0.5)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Align Items
                  </label>
                  <select
                    value={imposterConfig.alignItems}
                    onChange={(e) => setImposterConfig({...imposterConfig, alignItems: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="flex-start">Flex Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">Flex End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Justify Content
                  </label>
                  <select
                    value={imposterConfig.justifyContent}
                    onChange={(e) => setImposterConfig({...imposterConfig, justifyContent: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="flex-start">Flex Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">Flex End</option>
                    <option value="space-between">Space Between</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Backdrop Filter
                </label>
                <select
                  value={imposterConfig.backdropFilter}
                  onChange={(e) => setImposterConfig({...imposterConfig, backdropFilter: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="none">None</option>
                  <option value="blur(2px)">Blur 2px</option>
                  <option value="blur(4px)">Blur 4px</option>
                  <option value="blur(8px)">Blur 8px</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={imposterConfig.className}
                  onChange={(e) => setImposterConfig({...imposterConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Content Configuration */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">コンテンツ設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content Type
                </label>
                <select
                  value={imposterContent.type}
                  onChange={(e) => setImposterContent({...imposterContent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="modal">Modal</option>
                  <option value="notification">Notification</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="fullscreen">Fullscreen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={imposterContent.title}
                  onChange={(e) => setImposterContent({...imposterContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Modal Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={imposterContent.content}
                  onChange={(e) => setImposterContent({...imposterContent, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Enter your content here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content Background
                  </label>
                  <input
                    type="text"
                    value={imposterContent.contentBackground}
                    onChange={(e) => setImposterContent({...imposterContent, contentBackground: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="#ffffff"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content Padding
                  </label>
                  <input
                    type="text"
                    value={imposterContent.contentPadding}
                    onChange={(e) => setImposterContent({...imposterContent, contentPadding: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="2rem"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={imposterContent.showCloseButton}
                    onChange={(e) => setImposterContent({...imposterContent, showCloseButton: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Show Close Button</span>
                </label>
              </div>
            </div>

            {/* Preset Layouts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">プリセット</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset('modal')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Info className="w-4 h-4 mr-1" />
                  Modal
                </button>
                <button
                  onClick={() => loadPreset('notification')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Notification
                </button>
                <button
                  onClick={() => loadPreset('sidebar')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Layers className="w-4 h-4 mr-1" />
                  Sidebar
                </button>
                <button
                  onClick={() => loadPreset('fullscreen')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Fullscreen
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
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 p-4 rounded-lg bg-gray-700 relative min-h-64">
                  <div className="text-gray-400 text-sm text-center mb-4">
                    Base Layer Content
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                  
                  <button
                    onClick={() => setShowPreview(true)}
                    className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Show Imposter
                  </button>
                </div>
                
                <div className="text-xs text-gray-400 text-center">
                  Position: {imposterConfig.position} | Z-Index: {imposterConfig.zIndex} | Background: {imposterConfig.backgroundColor}
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
                <div>
                  <h4 className="font-medium mb-2 text-white">HTML使用例</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-blue-400">{(() => {
                      const { className } = imposterConfig;
                      const { title, content, showCloseButton } = imposterContent;
                      
                      const closeButtonHtml = showCloseButton 
                        ? `\n    <button class="${className}-close" aria-label="Close">\n      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n        <line x1="18" y1="6" x2="6" y2="18"></line>\n        <line x1="6" y1="6" x2="18" y2="18"></line>\n      </svg>\n    </button>`
                        : '';
                      
                      return `<div class="${className}">
  <div class="${className}-content">${closeButtonHtml}
    <h3>${title}</h3>
    <p>${content}</p>
  </div>
</div>`;
                    })()}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">JavaScript使用例</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-yellow-400">{(() => {
                      const { className } = imposterConfig;
                      
                      return `// Show Imposter
function showImposter() {
  const imposter = document.querySelector('.${className}');
  imposter.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Hide Imposter
function hideImposter() {
  const imposter = document.querySelector('.${className}');
  imposter.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore background scroll
}

// Close on background click
document.querySelector('.${className}').addEventListener('click', function(e) {
  if (e.target === this) {
    hideImposter();
  }
});

// Close on close button click
document.querySelector('.${className}-close')?.addEventListener('click', hideImposter);

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    hideImposter();
  }
});`;
                    })()}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview Overlay */}
        {showPreview && (
          <>
            <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
            <div 
              className={imposterConfig.className}
              onClick={(e) => {
                // Close modal when clicking the background (not the content)
                if (e.target === e.currentTarget) {
                  setShowPreview(false);
                }
              }}
            >
              {renderPreviewContent()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImposterLayoutGenerator;