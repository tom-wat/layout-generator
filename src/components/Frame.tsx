import { useState } from 'react';
import { Download, Eye, Code, RotateCcw, Frame, Image, Video, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';

const FrameLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [frameConfig, setFrameConfig] = useState({
    aspectRatio: '16 / 9',
    customWidth: '16',
    customHeight: '9',
    selectedRatio: '16 / 9', // 選択されている比率を追跡
    objectFit: 'cover',
    objectPosition: 'center',
    overflow: 'hidden',
    borderRadius: '0',
    className: 'frame'
  });
  
  const [frameContent, setFrameContent] = useState({
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
    alt: 'Sample image',
    content: 'Frame content here'
  });
  
  const [activeTab, setActiveTab] = useState('visual');
  
  // Generate CSS for Frame component
  const generateCSS = () => {
    const { 
      aspectRatio,
      objectFit,
      objectPosition,
      overflow,
      borderRadius,
      className 
    } = frameConfig;
    
    const css = `:root {
  --frame-aspect-ratio: ${aspectRatio};
  --frame-object-fit: ${objectFit};
  --frame-object-position: ${objectPosition};
  --frame-overflow: ${overflow};
  --frame-border-radius: ${borderRadius};
}

.${className} {
  aspect-ratio: var(--frame-aspect-ratio);
  overflow: var(--frame-overflow);
  border-radius: var(--frame-border-radius);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.${className} > img,
.${className} > video,
.${className} > iframe {
  width: 100%;
  height: 100%;
  object-fit: var(--frame-object-fit);
  object-position: var(--frame-object-position);
  border: none;
}

.${className} > *:not(img):not(video):not(iframe) {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Frame',
      props: {
        aspectRatio: frameConfig.aspectRatio,
        objectFit: frameConfig.objectFit,
        objectPosition: frameConfig.objectPosition,
        overflow: frameConfig.overflow,
        borderRadius: frameConfig.borderRadius,
        className: frameConfig.className
      },
      content: frameContent
    };
  };

  // Handle aspect ratio change
  const handleAspectRatioChange = (ratio: string) => {
    if (ratio === 'custom') {
      setFrameConfig({
        ...frameConfig,
        selectedRatio: 'custom',
        aspectRatio: `${frameConfig.customWidth} / ${frameConfig.customHeight}`
      });
    } else {
      setFrameConfig({
        ...frameConfig, 
        selectedRatio: ratio,
        aspectRatio: ratio
      });
    }
  };

  // Handle custom aspect ratio change
  const handleCustomRatioChange = (width: string, height: string) => {
    const newConfig = {
      ...frameConfig,
      customWidth: width,
      customHeight: height
    };
    
    // カスタムが選択されている場合のみアスペクト比を更新
    if (frameConfig.selectedRatio === 'custom') {
      newConfig.aspectRatio = `${width} / ${height}`;
    }
    
    setFrameConfig(newConfig);
  };

  // Load preset configurations
  const loadPreset = (preset: string) => {
    const presets = {
      'video': {
        aspectRatio: '16 / 9',
        selectedRatio: '16 / 9',
        objectFit: 'cover',
        objectPosition: 'center',
        overflow: 'hidden',
        borderRadius: '8px'
      },
      'photo': {
        aspectRatio: '4 / 3',
        selectedRatio: '4 / 3',
        objectFit: 'cover',
        objectPosition: 'center',
        overflow: 'hidden',
        borderRadius: '4px'
      },
      'square': {
        aspectRatio: '1 / 1',
        selectedRatio: '1 / 1',
        objectFit: 'cover',
        objectPosition: 'center',
        overflow: 'hidden',
        borderRadius: '8px'
      },
      'wide': {
        aspectRatio: '21 / 9',
        selectedRatio: '21 / 9',
        objectFit: 'cover',
        objectPosition: 'center',
        overflow: 'hidden',
        borderRadius: '12px'
      }
    };
    
    if (presets[preset as keyof typeof presets]) {
      setFrameConfig({
        ...frameConfig,
        ...presets[preset as keyof typeof presets]
      });
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setFrameConfig({
      aspectRatio: '16 / 9',
      customWidth: '16',
      customHeight: '9',
      selectedRatio: '16 / 9',
      objectFit: 'cover',
      objectPosition: 'center',
      overflow: 'hidden',
      borderRadius: '0',
      className: 'frame'
    });
    setFrameContent({
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
      alt: 'Sample image',
      content: 'Frame content here'
    });
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'frame-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'frame-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Frame Layout Generator</h2>
              <p className="text-gray-300">Every Layout Frame コンポーネント生成ツール</p>
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
            
            {/* Frame Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Frame 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aspect Ratio (アスペクト比)
                </label>
                <div className="space-y-3">
                  <select
                  value={frameConfig.selectedRatio}
                  onChange={(e) => handleAspectRatioChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="16 / 9">16:9 (Video)</option>
                    <option value="4 / 3">4:3 (Photo)</option>
                    <option value="1 / 1">1:1 (Square)</option>
                    <option value="3 / 2">3:2 (Classic Photo)</option>
                    <option value="21 / 9">21:9 (Ultra Wide)</option>
                    <option value="9 / 16">9:16 (Vertical Video)</option>
                    <option value="custom">Custom</option>
                  </select>
                  
                  {frameConfig.selectedRatio === 'custom' && (
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <input
                        type="number"
                        min="1"
                        value={frameConfig.customWidth}
                        onChange={(e) => handleCustomRatioChange(e.target.value, frameConfig.customHeight)}
                        className="px-2 py-1 border border-gray-600 bg-gray-700 text-white rounded text-sm"
                        placeholder="Width"
                      />
                      <span className="text-center text-gray-400 text-sm">:</span>
                      <input
                        type="number"
                        min="1"
                        value={frameConfig.customHeight}
                        onChange={(e) => handleCustomRatioChange(frameConfig.customWidth, e.target.value)}
                        className="px-2 py-1 border border-gray-600 bg-gray-700 text-white rounded text-sm"
                        placeholder="Height"
                      />
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400">
                    現在のアスペクト比: {frameConfig.aspectRatio}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Object Fit
                  </label>
                  <select
                    value={frameConfig.objectFit}
                    onChange={(e) => setFrameConfig({...frameConfig, objectFit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="fill">Fill</option>
                    <option value="scale-down">Scale Down</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Object Position
                  </label>
                  <select
                    value={frameConfig.objectPosition}
                    onChange={(e) => setFrameConfig({...frameConfig, objectPosition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top left">Top Left</option>
                    <option value="top right">Top Right</option>
                    <option value="bottom left">Bottom Left</option>
                    <option value="bottom right">Bottom Right</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Overflow
                  </label>
                  <select
                    value={frameConfig.overflow}
                    onChange={(e) => setFrameConfig({...frameConfig, overflow: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="hidden">Hidden</option>
                    <option value="visible">Visible</option>
                    <option value="auto">Auto</option>
                    <option value="scroll">Scroll</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Border Radius
                  </label>
                  <input
                    type="text"
                    value={frameConfig.borderRadius}
                    onChange={(e) => setFrameConfig({...frameConfig, borderRadius: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={frameConfig.className}
                  onChange={(e) => setFrameConfig({...frameConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Preset Layouts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">プリセット</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset('video')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Video className="w-4 h-4 mr-1" />
                  Video
                </button>
                <button
                  onClick={() => loadPreset('photo')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Image className="w-4 h-4 mr-1" />
                  Photo
                </button>
                <button
                  onClick={() => loadPreset('square')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Frame className="w-4 h-4 mr-1" />
                  Square
                </button>
                <button
                  onClick={() => loadPreset('wide')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Ultra Wide
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

            {/* Content Configuration */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">コンテンツ設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content Type
                </label>
                <select
                  value={frameContent.type}
                  onChange={(e) => setFrameContent({...frameContent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="iframe">Iframe</option>
                  <option value="text">Text Content</option>
                </select>
              </div>

              {(frameContent.type === 'image' || frameContent.type === 'video' || frameContent.type === 'iframe') && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Source URL
                  </label>
                  <input
                    type="text"
                    value={frameContent.src}
                    onChange={(e) => setFrameContent({...frameContent, src: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}

              {frameContent.type === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={frameContent.alt}
                    onChange={(e) => setFrameContent({...frameContent, alt: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Image description"
                  />
                </div>
              )}

              {frameContent.type === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Text Content
                  </label>
                  <textarea
                    value={frameContent.content}
                    onChange={(e) => setFrameContent({...frameContent, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Enter your text content here..."
                  />
                </div>
              )}
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
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={frameConfig.className}>
                  {frameContent.type === 'image' && (
                    <img 
                      src={frameContent.src} 
                      alt={frameContent.alt}
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNEI1NTYzIi8+CjxwYXRoIGQ9Ik0xOTcuNSAxMjBMMjIwIDEzNUwyMjAgMTY1SDE3NUwxOTcuNSAxMjBaIiBmaWxsPSIjOUM5Q0E1Ii8+CjxjaXJjbGUgY3g9IjE3NSIgY3k9IjEzNSIgcj0iMTAiIGZpbGw9IiM5QzlDQTUiLz4KPHRleHQgeD0iMjAwIiB5PSIxODAiIGZpbGw9IiM5QzlDQTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  )}
                  
                  {frameContent.type === 'video' && (
                    <video controls>
                      <source src={frameContent.src} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  
                  {frameContent.type === 'iframe' && (
                    <iframe 
                      src={frameContent.src}
                      title="Frame content"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  )}
                  
                  {frameContent.type === 'text' && (
                    <div className="bg-gray-100 text-gray-800 text-center">
                      {frameContent.content}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-xs text-gray-400 text-center">
                  アスペクト比: {frameConfig.aspectRatio} | Object Fit: {frameConfig.objectFit}
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
                      const { className } = frameConfig;
                      const { type, src, alt, content } = frameContent;
                      
                      switch (type) {
                        case 'image':
                          return `<div class="${className}">
  <img src="${src}" alt="${alt}" />
</div>`;
                        case 'video':
                          return `<div class="${className}">
  <video controls>
    <source src="${src}" />
    Your browser does not support the video tag.
  </video>
</div>`;
                        case 'iframe':
                          return `<div class="${className}">
  <iframe src="${src}" title="Frame content"></iframe>
</div>`;
                        case 'text':
                        default:
                          return `<div class="${className}">
  <div>${content}</div>
</div>`;
                      }
                    })()}</code>
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

export default FrameLayoutGenerator;