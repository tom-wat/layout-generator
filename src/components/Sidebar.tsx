import { useState } from 'react';
import { Download, Eye, Code } from 'lucide-react';

// Type definitions
interface SidebarConfig {
  sidebarWidth: string;
  contentMinWidth: string;
  space: string;
  side: 'left' | 'right';
  noStretch: boolean;
  className: string;
}

interface JSONOutput {
  component: string;
  props: Record<string, unknown>;
  sidebarContent: string;
  mainContent: string;
}

const SidebarLayoutGenerator = () => {
  const [sidebarConfig, setSidebarConfig] = useState<SidebarConfig>({
    sidebarWidth: '20rem',
    contentMinWidth: '50%',
    space: '1rem',
    side: 'left',
    noStretch: false,
    className: 'sidebar'
  });
  
  const [sidebarContent, setSidebarContent] = useState<string>('Sidebar content\n\n• Navigation item 1\n• Navigation item 2\n• Navigation item 3\n• Navigation item 4');
  const [mainContent, setMainContent] = useState<string>('Main content area\n\nThis is the primary content area where the main information, articles, or application content would be displayed. It should take up the remaining space and be responsive to different screen sizes.');
  
  const [activeTab, setActiveTab] = useState<string>('visual');
  
  // Generate CSS for Sidebar component
  const generateCSS = (): string => {
    const { sidebarWidth, contentMinWidth, space, side, noStretch, className } = sidebarConfig;
    
    let css = `:root {
  --sidebar-width: ${sidebarWidth};
  --sidebar-content-min-width: ${contentMinWidth};
  --sidebar-space: ${space};
}

.${className} {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-space);
}`;

    if (side === 'left') {
      css += `

.${className} > :first-child {
  flex-basis: var(--sidebar-width);
  flex-grow: 1;
}

.${className} > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: var(--sidebar-content-min-width);
}`;
    } else {
      css += `

.${className} > :first-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: var(--sidebar-content-min-width);
}

.${className} > :last-child {
  flex-basis: var(--sidebar-width);
  flex-grow: 1;
}`;
    }

    if (noStretch) {
      css += `

.${className} {
  align-items: flex-start;
}`;
    }

    // Add responsive behavior
    css += `

/* Responsive behavior for smaller screens */
@media (max-width: 768px) {
  .${className} {
    flex-direction: column;
  }
  
  .${className} > * {
    flex-basis: auto !important;
    min-width: 0 !important;
  }
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = (): JSONOutput => {
    return {
      component: 'Sidebar',
      props: {
        sidebarWidth: sidebarConfig.sidebarWidth,
        contentMinWidth: sidebarConfig.contentMinWidth,
        space: sidebarConfig.space,
        side: sidebarConfig.side,
        noStretch: sidebarConfig.noStretch,
        className: sidebarConfig.className
      },
      sidebarContent: sidebarContent,
      mainContent: mainContent
    };
  };

  // Download functions
  const downloadJSON = (): void => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sidebar-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = (): void => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sidebar-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Sidebar Layout Generator</h2>
          <p className="text-gray-300">Every Layout Sidebar コンポーネント生成ツール</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">設定</h2>
            
            {/* Sidebar Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Sidebar 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sidebar Width
                </label>
                <input
                  type="text"
                  value={sidebarConfig.sidebarWidth}
                  onChange={(e) => setSidebarConfig({...sidebarConfig, sidebarWidth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="20rem"
                />
                <p className="text-xs text-gray-400 mt-1">
                  例: 20rem, 300px, 25ch
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content Minimum Width
                </label>
                <input
                  type="text"
                  value={sidebarConfig.contentMinWidth}
                  onChange={(e) => setSidebarConfig({...sidebarConfig, contentMinWidth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="50%"
                />
                <p className="text-xs text-gray-400 mt-1">
                  メインコンテンツの最小幅。例: 50%, 400px, 30rem
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space (間隔)
                </label>
                <input
                  type="text"
                  value={sidebarConfig.space}
                  onChange={(e) => setSidebarConfig({...sidebarConfig, space: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="1rem"
                />
                <p className="text-xs text-gray-400 mt-1">
                  サイドバーとメインコンテンツ間の間隔
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sidebar Position
                </label>
                <select
                  value={sidebarConfig.side}
                  onChange={(e) => setSidebarConfig({...sidebarConfig, side: e.target.value as 'left' | 'right'})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="left">Left (左側)</option>
                  <option value="right">Right (右側)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={sidebarConfig.className}
                  onChange={(e) => setSidebarConfig({...sidebarConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="noStretch"
                  checked={sidebarConfig.noStretch}
                  onChange={(e) => setSidebarConfig({...sidebarConfig, noStretch: e.target.checked})}
                  className="mr-2 bg-gray-700 border-gray-600"
                />
                <label htmlFor="noStretch" className="text-sm font-medium text-gray-300">
                  No Stretch
                </label>
                <div className="ml-2 group relative">
                  <span className="text-gray-400 cursor-help">?</span>
                  <div className="invisible group-hover:visible absolute left-6 bottom-0 w-64 p-2 bg-gray-700 border border-gray-600 rounded text-xs text-gray-300 z-10">
                    サイドバーとメインコンテンツの高さを独立させます
                  </div>
                </div>
              </div>
            </div>

            {/* Content Configuration */}
            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">コンテンツ</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sidebar Content
                </label>
                <textarea
                  value={sidebarContent}
                  onChange={(e) => setSidebarContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Sidebar content here"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Content
                </label>
                <textarea
                  value={mainContent}
                  onChange={(e) => setMainContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Main content here"
                  rows={4}
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
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg min-h-96">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                
                {/* Container to show sidebar effect */}
                <div style={{ width: '100%', backgroundColor: '#1f2937', padding: '1rem', border: '1px solid #374151', borderRadius: '0.5rem' }}>
                  <div className="text-xs text-gray-400 mb-4">
                    Sidebar Container ({sidebarConfig.side} side)
                  </div>
                  
                  <div className={sidebarConfig.className}>
                    {sidebarConfig.side === 'left' ? (
                      <>
                        {/* Sidebar */}
                        <div className="p-4 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                          <div className="text-xs text-indigo-400 mb-2 font-semibold">Sidebar</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {sidebarContent}
                          </div>
                        </div>
                        
                        {/* Main Content */}
                        <div className="p-4 bg-gray-600 border border-gray-500 rounded text-white text-sm">
                          <div className="text-xs text-indigo-400 mb-2 font-semibold">Main Content</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {mainContent}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Main Content */}
                        <div className="p-4 bg-gray-600 border border-gray-500 rounded text-white text-sm">
                          <div className="text-xs text-indigo-400 mb-2 font-semibold">Main Content</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {mainContent}
                          </div>
                        </div>
                        
                        {/* Sidebar */}
                        <div className="p-4 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                          <div className="text-xs text-indigo-400 mb-2 font-semibold">Sidebar</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {sidebarContent}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Info panel */}
                  <div className="mt-4 p-3 bg-gray-800 rounded text-xs text-gray-300">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Sidebar Width: {sidebarConfig.sidebarWidth}</div>
                      <div>Position: {sidebarConfig.side}</div>
                      <div>Content Min Width: {sidebarConfig.contentMinWidth}</div>
                      <div>Space: {sidebarConfig.space}</div>
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
                    <code className="text-indigo-400">{JSON.stringify(generateJSON(), null, 2)}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">HTML使用例</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-blue-400">{`<div class="${sidebarConfig.className}">
${sidebarConfig.side === 'left' 
  ? `  <aside><!-- Sidebar content --></aside>
  <main><!-- Main content --></main>`
  : `  <main><!-- Main content --></main>
  <aside><!-- Sidebar content --></aside>`
}
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

export default SidebarLayoutGenerator;