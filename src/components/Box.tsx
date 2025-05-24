import { useState } from 'react';
import { Download, Eye, Code } from 'lucide-react';

const BoxLayoutGenerator = () => {
  const [boxConfig, setBoxConfig] = useState({
    padding: '1rem',
    border: 'thin',
    borderWidth: '1px',
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    textColor: '#374151',
    invert: false,
    shadow: false,
    className: 'box'
  });
  
  const [boxContent, setBoxContent] = useState('Box content here');
  
  const [activeTab, setActiveTab] = useState('visual');
  
  // Generate CSS for Box component
  const generateCSS = () => {
    const { padding, border, borderWidth, borderColor, backgroundColor, textColor, invert, shadow, className } = boxConfig;
    
    let css = `:root {
  --box-padding: ${padding};
  --box-border-width: ${borderWidth};
  --box-border-color: ${borderColor};
  --box-background: ${backgroundColor};
  --box-color: ${textColor};
  --box-background-invert: #1f2937;
  --box-color-invert: #f9fafb;
  --box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.${className} {
  padding: var(--box-padding);
  border: var(--box-border-width) solid var(--box-border-color);
  background-color: var(--box-background);
  color: var(--box-color);
}`;

    if (border === 'none') {
      css += `

.${className} {
  border: none;
}`;
    } else if (border === 'thick') {
      css += `

.${className} {
  border-width: calc(var(--box-border-width) * 2);
}`;
    }

    if (invert) {
      css += `

.${className} {
  background-color: var(--box-background-invert);
  color: var(--box-color-invert);
}`;
    }

    if (shadow) {
      css += `

.${className} {
  box-shadow: var(--box-shadow);
}`;
    }

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Box',
      props: {
        padding: boxConfig.padding,
        border: boxConfig.border,
        borderWidth: boxConfig.borderWidth,
        borderColor: boxConfig.borderColor,
        backgroundColor: boxConfig.backgroundColor,
        textColor: boxConfig.textColor,
        invert: boxConfig.invert,
        shadow: boxConfig.shadow,
        className: boxConfig.className
      },
      content: boxContent
    };
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'box-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'box-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Box Layout Generator</h2>
          <p className="text-gray-300">Every Layout Box コンポーネント生成ツール</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">設定</h2>
            
            {/* Box Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Box 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <input
                  type="text"
                  value={boxContent}
                  onChange={(e) => setBoxContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Box content here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Padding
                </label>
                <input
                  type="text"
                  value={boxConfig.padding}
                  onChange={(e) => setBoxConfig({...boxConfig, padding: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="1rem"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Border Width
                  </label>
                  <input
                    type="text"
                    value={boxConfig.borderWidth}
                    onChange={(e) => setBoxConfig({...boxConfig, borderWidth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="1px"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Border Style
                  </label>
                  <select
                    value={boxConfig.border}
                    onChange={(e) => setBoxConfig({...boxConfig, border: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="none">None</option>
                    <option value="thin">Thin</option>
                    <option value="thick">Thick</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Border Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={boxConfig.borderColor}
                    onChange={(e) => setBoxConfig({...boxConfig, borderColor: e.target.value})}
                    className="w-12 h-10 border border-gray-600 bg-gray-700 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={boxConfig.borderColor}
                    onChange={(e) => setBoxConfig({...boxConfig, borderColor: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="#d1d5db"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Background Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={boxConfig.backgroundColor}
                    onChange={(e) => setBoxConfig({...boxConfig, backgroundColor: e.target.value})}
                    className="w-12 h-10 border border-gray-600 bg-gray-700 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={boxConfig.backgroundColor}
                    onChange={(e) => setBoxConfig({...boxConfig, backgroundColor: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    value={boxConfig.textColor}
                    onChange={(e) => setBoxConfig({...boxConfig, textColor: e.target.value})}
                    className="w-12 h-10 border border-gray-600 bg-gray-700 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={boxConfig.textColor}
                    onChange={(e) => setBoxConfig({...boxConfig, textColor: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="#374151"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={boxConfig.className}
                  onChange={(e) => setBoxConfig({...boxConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="invert"
                    checked={boxConfig.invert}
                    onChange={(e) => setBoxConfig({...boxConfig, invert: e.target.checked})}
                    className="mr-2 bg-gray-700 border-gray-600"
                  />
                  <label htmlFor="invert" className="text-sm font-medium text-gray-300">
                    Invert Colors
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shadow"
                    checked={boxConfig.shadow}
                    onChange={(e) => setBoxConfig({...boxConfig, shadow: e.target.checked})}
                    className="mr-2 bg-gray-700 border-gray-600"
                  />
                  <label htmlFor="shadow" className="text-sm font-medium text-gray-300">
                    Shadow
                  </label>
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
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                CSS
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('visual')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'visual' ? 'bg-purple-900/50 text-purple-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-purple-900/50 text-purple-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={boxConfig.className}>
                  {boxContent}
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
                    <code className="text-purple-400">{JSON.stringify(generateJSON(), null, 2)}</code>
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

export default BoxLayoutGenerator;