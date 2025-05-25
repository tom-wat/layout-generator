import React, { useState } from 'react';
import { Download, Plus, Trash2, Eye, Code, ChevronLeft, ChevronRight } from 'lucide-react';

// Type definitions
interface SwitcherConfig {
  threshold: string;
  space: string;
  limit: number | null;
  className: string;
}

interface SwitcherItem {
  id: number;
  content: string;
  tag: string;
}

interface JSONOutput {
  component: string;
  props: Record<string, unknown>;
  items: Array<{
    id: number;
    tag: string;
    content: string;
  }>;
}

const SwitcherLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [switcherConfig, setSwitcherConfig] = useState<SwitcherConfig>({
    threshold: '30rem',
    space: '1rem',
    limit: null,
    className: 'switcher'
  });
  
  const [items, setItems] = useState<SwitcherItem[]>([
    { id: 1, content: 'Card 1\n\nThis is the first card content. It can contain text, images, or other elements.', tag: 'div' },
    { id: 2, content: 'Card 2\n\nThis is the second card content. When the container is wide enough, these will be side by side.', tag: 'div' },
    { id: 3, content: 'Card 3\n\nThis is the third card content. On narrow screens, all cards stack vertically.', tag: 'div' }
  ]);
  
  const [activeTab, setActiveTab] = useState<string>('visual');
  
  // Generate CSS for Switcher component
  const generateCSS = (): string => {
    const { threshold, space, limit, className } = switcherConfig;
    
    let css = `:root {
  --switcher-threshold: ${threshold};
  --switcher-space: ${space};
}

.${className} {
  display: flex;
  flex-wrap: wrap;
  gap: var(--switcher-space);
}

.${className} > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-threshold) - 100%) * 999);
}`;

    if (limit !== null && limit > 0) {
      css += `

.${className} > :nth-last-child(n+${limit + 1}),
.${className} > :nth-last-child(n+${limit + 1}) ~ * {
  flex-basis: 100%;
}`;
    }

    // Add responsive behavior
    css += `

/* Additional responsive behavior */
@media (max-width: 480px) {
  .${className} {
    gap: calc(var(--switcher-space) * 0.75);
  }
  
  .${className} > * {
    flex-basis: 100% !important;
  }
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = (): JSONOutput => {
    return {
      component: 'Switcher',
      props: {
        threshold: switcherConfig.threshold,
        space: switcherConfig.space,
        limit: switcherConfig.limit,
        className: switcherConfig.className
      },
      items: items.map(item => ({
        id: item.id,
        tag: item.tag,
        content: item.content
      }))
    };
  };

  // Add new item
  const addItem = (): void => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems([...items, {
      id: newId,
      content: `Card ${newId}\n\nThis is card ${newId} content. Add your content here.`,
      tag: 'div'
    }]);
  };

  // Remove item
  const removeItem = (id: number): void => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id: number, field: keyof SwitcherItem, value: string): void => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, [field]: value }
        : item
    ));
  };

  // Download functions
  const downloadJSON = (): void => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'switcher-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = (): void => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'switcher-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render preview items
  const renderPreviewItems = (): React.ReactElement[] => {
    return items.map((item) => {
      const tagName = item.tag as keyof React.JSX.IntrinsicElements;
      return React.createElement(
        tagName,
        {
          key: item.id,
          className: "p-4 bg-gray-700 border border-gray-600 rounded text-white text-sm min-h-[120px]",
          style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' }
        },
        React.createElement('div', { style: { whiteSpace: 'pre-wrap' } }, item.content)
      );
    });
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Switcher Layout Generator</h2>
              <p className="text-gray-300">Every Layout Switcher コンポーネント生成ツール</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                showSettings 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
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
            
            {/* Switcher Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Switcher 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Threshold (切り替え閾値)
                </label>
                <input
                  type="text"
                  value={switcherConfig.threshold}
                  onChange={(e) => setSwitcherConfig({...switcherConfig, threshold: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="30rem"
                />
                <p className="text-xs text-gray-400 mt-1">
                  水平レイアウトに切り替わる閾値。例: 30rem, 480px, 50ch
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space (間隔)
                </label>
                <input
                  type="text"
                  value={switcherConfig.space}
                  onChange={(e) => setSwitcherConfig({...switcherConfig, space: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="1rem"
                />
                <p className="text-xs text-gray-400 mt-1">
                  アイテム間の間隔。例: 1rem, 16px, 1.5em
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Limit (制限値)
                </label>
                <input
                  type="number"
                  value={switcherConfig.limit || ''}
                  onChange={(e) => setSwitcherConfig({...switcherConfig, limit: e.target.value ? parseInt(e.target.value) : null})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="空白で無制限"
                  min="1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  1行に表示する最大アイテム数。超過分は次の行に折り返し
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={switcherConfig.className}
                  onChange={(e) => setSwitcherConfig({...switcherConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Items Configuration */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">アイテム</h3>
                <button
                  onClick={addItem}
                  className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  追加
                </button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="space-y-2 p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center space-x-2">
                      <select
                        value={item.tag}
                        onChange={(e) => updateItem(item.id, 'tag', e.target.value)}
                        className="px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                      >
                        <option value="div">div</option>
                        <option value="article">article</option>
                        <option value="section">section</option>
                        <option value="aside">aside</option>
                        <option value="header">header</option>
                        <option value="footer">footer</option>
                      </select>
                      
                      <span className="text-xs text-gray-400">Card {item.id}</span>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-600 hover:text-red-800 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <textarea
                      value={item.content}
                      onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                      placeholder="Item content"
                      rows={3}
                    />
                  </div>
                ))}
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
                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
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
                  activeTab === 'visual' ? 'bg-emerald-900/50 text-emerald-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-emerald-900/50 text-emerald-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg min-h-96">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                
                {/* Container to show switching effect */}
                <div style={{ width: '100%', backgroundColor: '#1f2937', padding: '1rem', border: '1px solid #374151', borderRadius: '0.5rem' }}>
                  <div className="text-xs text-gray-400 mb-4">
                    Switcher Container (Threshold: {switcherConfig.threshold})
                  </div>
                  
                  <div className={switcherConfig.className}>
                    {renderPreviewItems()}
                  </div>
                  
                  {/* Info panel */}
                  <div className="mt-4 p-3 bg-gray-800 rounded text-xs text-gray-300">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Threshold: {switcherConfig.threshold}</div>
                      <div>Items: {items.length}</div>
                      <div>Space: {switcherConfig.space}</div>
                      <div>Limit: {switcherConfig.limit || 'None'}</div>
                    </div>
                    <div className="mt-2 text-gray-400">
                      💡 ブラウザの幅を変更してレイアウトの切り替えを確認してください
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
                    <code className="text-emerald-400">{JSON.stringify(generateJSON(), null, 2)}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">HTML使用例</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-blue-400">{`<div class="${switcherConfig.className}">
${items.map(item => `  <${item.tag}>
    ${item.content.split('\n')[0]}
  </${item.tag}>`).join('\n')}
</div>`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">使用方法</h4>
                  <div className="bg-gray-900 p-4 rounded-lg text-xs text-gray-300">
                    <p className="mb-2">• <strong>Threshold</strong>: アイテムが水平に並ぶ最小幅</p>
                    <p className="mb-2">• <strong>Space</strong>: アイテム間の間隔</p>
                    <p className="mb-2">• <strong>Limit</strong>: 1行の最大アイテム数（指定時）</p>
                    <p>• 画面幅がThreshold未満の場合、アイテムは垂直に積み重なります</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitcherLayoutGenerator;