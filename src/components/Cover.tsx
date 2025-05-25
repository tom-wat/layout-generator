import { useState } from 'react';
import { Download, Eye, Code, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CoverLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState(true);
  
  const [coverConfig, setCoverConfig] = useState({
    minHeight: '100vh',
    padding: '1rem',
    space: '1rem',
    centered: '.main-content',
    backgroundColor: '#ffffff',
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    textColor: '#374151',
    className: 'cover'
  });
  
  const [coverContent, setCoverContent] = useState({
    top: 'Header: Navigation or site branding',
    center: 'Hero Content - This is perfectly centered vertically and horizontally within the remaining space',
    bottom: 'Footer: Copyright or additional links'
  });
  
  const [activeTab, setActiveTab] = useState('visual');
  
  // Generate CSS for Cover component
  const generateCSS = () => {
    const { 
      minHeight, 
      padding, 
      space, 
      centered, 
      backgroundColor, 
      backgroundImage,
      backgroundSize,
      backgroundPosition,
      backgroundRepeat,
      textColor,
      className 
    } = coverConfig;
    
    let css = `:root {
  --cover-min-height: ${minHeight};
  --cover-padding: ${padding};
  --cover-space: ${space};
  --cover-background: ${backgroundColor};
  --cover-color: ${textColor};
  --cover-background-size: ${backgroundSize};
  --cover-background-position: ${backgroundPosition};
  --cover-background-repeat: ${backgroundRepeat};
}

.${className} {
  min-height: var(--cover-min-height);
  padding: var(--cover-padding);
  background-color: var(--cover-background);
  color: var(--cover-color);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;${backgroundImage ? `
  background-image: url(${backgroundImage});
  background-size: var(--cover-background-size);
  background-position: var(--cover-background-position);
  background-repeat: var(--cover-background-repeat);` : ''}
}

.${className} > * {
  margin-block: 0;
}

.${className} > * + * {
  margin-block-start: var(--cover-space);
}`;

    // Add centered element styling - This is the key to Cover layout
    if (centered.trim()) {
      const centeredSelectors = centered.split(',').map(s => s.trim()).join(', ');
      css += `

/* Center the specified element(s) vertically */
.${className} > ${centeredSelectors} {
  margin-block-end: auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}`;
    }

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Cover',
      props: {
        minHeight: coverConfig.minHeight,
        padding: coverConfig.padding,
        space: coverConfig.space,
        centered: coverConfig.centered,
        backgroundColor: coverConfig.backgroundColor,
        backgroundImage: coverConfig.backgroundImage,
        backgroundSize: coverConfig.backgroundSize,
        backgroundPosition: coverConfig.backgroundPosition,
        backgroundRepeat: coverConfig.backgroundRepeat,
        textColor: coverConfig.textColor,
        className: coverConfig.className
      },
      content: coverContent
    };
  };

  // Handle background image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverConfig({...coverConfig, backgroundImage: result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove background image
  const removeBackgroundImage = () => {
    setCoverConfig({...coverConfig, backgroundImage: ''});
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover-component.css';
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
              <h2 className="text-2xl font-bold text-white mb-2">Cover Layout Generator</h2>
              <p className="text-gray-300">Every Layout Cover コンポーネント生成ツール</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                showSettings 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
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
            
            {/* Cover Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Cover 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Height (最小高さ)
                </label>
                <input
                  type="text"
                  value={coverConfig.minHeight}
                  onChange={(e) => setCoverConfig({...coverConfig, minHeight: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="100vh"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Padding
                  </label>
                  <input
                    type="text"
                    value={coverConfig.padding}
                    onChange={(e) => setCoverConfig({...coverConfig, padding: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="1rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Space (要素間隔)
                  </label>
                  <input
                    type="text"
                    value={coverConfig.space}
                    onChange={(e) => setCoverConfig({...coverConfig, space: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="1rem"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Centered Element (中央に配置する要素)
                </label>
                <input
                  type="text"
                  value={coverConfig.centered}
                  onChange={(e) => setCoverConfig({...coverConfig, centered: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder=".main-content"
                />
                <p className="text-xs text-gray-400 mt-1">
                  CSSセレクター（例: .main-content, h2, :nth-child(2)）
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Background Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={coverConfig.backgroundColor}
                    onChange={(e) => setCoverConfig({...coverConfig, backgroundColor: e.target.value})}
                    className="w-12 h-10 border border-gray-600 bg-gray-700 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={coverConfig.backgroundColor}
                    onChange={(e) => setCoverConfig({...coverConfig, backgroundColor: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Text Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={coverConfig.textColor}
                    onChange={(e) => setCoverConfig({...coverConfig, textColor: e.target.value})}
                    className="w-12 h-10 border border-gray-600 bg-gray-700 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={coverConfig.textColor}
                    onChange={(e) => setCoverConfig({...coverConfig, textColor: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="#374151"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Background Image
                </label>
                {coverConfig.backgroundImage ? (
                  <div className="relative">
                    <img 
                      src={coverConfig.backgroundImage} 
                      alt="Background preview" 
                      className="w-full h-32 object-cover rounded border border-gray-600"
                    />
                    <button
                      onClick={removeBackgroundImage}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="background-upload"
                    />
                    <label
                      htmlFor="background-upload"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded cursor-pointer hover:border-gray-500"
                    >
                      <div className="text-center text-gray-400">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">画像をアップロード</p>
                      </div>
                    </label>
                  </div>
                )}
                
                {coverConfig.backgroundImage && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Background Size
                      </label>
                      <select
                        value={coverConfig.backgroundSize}
                        onChange={(e) => setCoverConfig({...coverConfig, backgroundSize: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-600 bg-gray-700 text-white rounded text-sm"
                      >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                        <option value="100% 100%">Stretch</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Background Position
                      </label>
                      <select
                        value={coverConfig.backgroundPosition}
                        onChange={(e) => setCoverConfig({...coverConfig, backgroundPosition: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-600 bg-gray-700 text-white rounded text-sm"
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
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={coverConfig.className}
                  onChange={(e) => setCoverConfig({...coverConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Content Configuration */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">コンテンツ設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Top Content (上部コンテンツ)
                </label>
                <textarea
                  value={coverContent.top}
                  onChange={(e) => setCoverContent({...coverContent, top: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Center Content (中央コンテンツ) *
                </label>
                <textarea
                  value={coverContent.center}
                  onChange={(e) => setCoverContent({...coverContent, center: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
                <p className="text-xs text-gray-400 mt-1">
                  *この部分が中央に配置されます
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bottom Content (下部コンテンツ)
                </label>
                <textarea
                  value={coverContent.bottom}
                  onChange={(e) => setCoverContent({...coverContent, bottom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={2}
                />
              </div>
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
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
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
                  activeTab === 'visual' ? 'bg-orange-900/50 text-orange-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-orange-900/50 text-orange-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="border-2 border-dashed border-gray-600 rounded-lg overflow-hidden">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={coverConfig.className} style={{ minHeight: '500px' }}>
                  {coverContent.top && (
                    <div className="top-content p-2 bg-gray-100 bg-opacity-20 rounded">
                      {coverContent.top}
                    </div>
                  )}
                  {coverContent.center && (
                    <div className="main-content p-4 text-xl font-bold text-center bg-gray-100 bg-opacity-30 rounded">
                      {coverContent.center}
                    </div>
                  )}
                  {coverContent.bottom && (
                    <div className="bottom-content p-2 bg-gray-100 bg-opacity-20 rounded">
                      {coverContent.bottom}
                    </div>
                  )}
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
                    <code className="text-orange-400">{JSON.stringify(generateJSON(), null, 2)}</code>
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

export default CoverLayoutGenerator;