import { useState } from 'react';
import { Download, Eye, Code, ChevronLeft, ChevronRight } from 'lucide-react';

// Type definitions
interface CenterConfig {
  maxWidth: string;
  padding: string;
  gutters: string;
  intrinsic: boolean;
  className: string;
}

interface JSONOutput {
  component: string;
  props: Record<string, unknown>;
  content: string;
}

const CenterLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [centerConfig, setCenterConfig] = useState<CenterConfig>({
    maxWidth: '60ch',
    padding: '0',
    gutters: '1rem',
    intrinsic: false,
    className: 'center'
  });
  
  const [centerContent, setCenterContent] = useState<string>('Centered content here');
  
  const [activeTab, setActiveTab] = useState<string>('visual');
  
  // Generate CSS for Center component
  const generateCSS = (): string => {
    const { maxWidth, padding, gutters, intrinsic, className } = centerConfig;
    
    let css = `:root {
  --center-max-width: ${maxWidth};
  --center-padding: ${padding};
  --center-gutters: ${gutters};
}

.${className} {
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--center-max-width);
  padding-left: var(--center-gutters);
  padding-right: var(--center-gutters);
}`;

    if (padding !== '0' && padding !== '') {
      css += `

.${className} {
  padding-top: var(--center-padding);
  padding-bottom: var(--center-padding);
}`;
    }

    if (intrinsic) {
      css += `

.${className} {
  display: flex;
  flex-direction: column;
  align-items: center;
}`;
    }

    return css;
  };

  // Generate JSON structure
  const generateJSON = (): JSONOutput => {
    return {
      component: 'Center',
      props: {
        maxWidth: centerConfig.maxWidth,
        padding: centerConfig.padding,
        gutters: centerConfig.gutters,
        intrinsic: centerConfig.intrinsic,
        className: centerConfig.className
      },
      content: centerContent
    };
  };

  // Download functions
  const downloadJSON = (): void => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'center-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = (): void => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'center-component.css';
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
              <h2 className="text-2xl font-bold text-white mb-2">Center Layout Generator</h2>
              <p className="text-gray-300">Every Layout Center コンポーネント生成ツール</p>
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
            
            {/* Center Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Center 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={centerContent}
                  onChange={(e) => setCenterContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Centered content here"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Width
                </label>
                <input
                  type="text"
                  value={centerConfig.maxWidth}
                  onChange={(e) => setCenterConfig({...centerConfig, maxWidth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="60ch"
                />
                <p className="text-xs text-gray-400 mt-1">
                  例: 60ch, 800px, 80rem, 90%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Padding (上下)
                  </label>
                  <input
                    type="text"
                    value={centerConfig.padding}
                    onChange={(e) => setCenterConfig({...centerConfig, padding: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gutters (左右)
                  </label>
                  <input
                    type="text"
                    value={centerConfig.gutters}
                    onChange={(e) => setCenterConfig({...centerConfig, gutters: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="1rem"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={centerConfig.className}
                  onChange={(e) => setCenterConfig({...centerConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="intrinsic"
                  checked={centerConfig.intrinsic}
                  onChange={(e) => setCenterConfig({...centerConfig, intrinsic: e.target.checked})}
                  className="mr-2 bg-gray-700 border-gray-600"
                />
                <label htmlFor="intrinsic" className="text-sm font-medium text-gray-300">
                  Intrinsic Centering
                </label>
                <div className="ml-2 group relative">
                  <span className="text-gray-400 cursor-help">?</span>
                  <div className="invisible group-hover:visible absolute left-6 bottom-0 w-64 p-2 bg-gray-700 border border-gray-600 rounded text-xs text-gray-300 z-10">
                    要素をコンテナ内で中央配置します（Flexboxベース）
                  </div>
                </div>
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
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg min-h-96">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                
                {/* Container to show centering effect */}
                <div style={{ width: '100%', minHeight: '300px', backgroundColor: '#1f2937', padding: '1rem', border: '1px solid #374151' }}>
                  <div className="text-xs text-gray-400 mb-4">
                    Container (画面幅をシミュレート)
                  </div>
                  
                  <div className={centerConfig.className} style={{ backgroundColor: '#374151', border: '1px solid #4b5563', minHeight: '200px', position: 'relative' }}>
                    <div style={{ whiteSpace: 'pre-wrap', color: 'white', padding: '1rem' }}>
                      {centerContent}
                    </div>
                    
                    {/* Visual indicators */}
                    <div className="absolute top-2 right-2 text-xs text-orange-400">
                      Center Component
                    </div>
                  </div>
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
                <div>
                  <h4 className="font-medium mb-2 text-white">HTML使用例</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-blue-400">{`<div class="${centerConfig.className}">
  ${centerContent}
</div>`}</code>
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

export default CenterLayoutGenerator;