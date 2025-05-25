import React, { useState } from 'react';
import { Download, Plus, Trash2, Eye, Code, ChevronLeft, ChevronRight } from 'lucide-react';

// Type definitions
interface ClusterConfig {
  space: string;
  justify: string;
  align: string;
  className: string;
}

interface ClusterItem {
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

const ClusterLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [clusterConfig, setClusterConfig] = useState<ClusterConfig>({
    space: '1rem',
    justify: 'flex-start',
    align: 'flex-start',
    className: 'cluster'
  });
  
  const [items, setItems] = useState<ClusterItem[]>([
    { id: 1, content: 'Item 1', tag: 'div' },
    { id: 2, content: 'Item 2', tag: 'div' },
    { id: 3, content: 'Item 3', tag: 'div' },
    { id: 4, content: 'Item 4', tag: 'div' },
    { id: 5, content: 'Item 5', tag: 'div' }
  ]);
  
  const [activeTab, setActiveTab] = useState<string>('visual');
  
  // Generate CSS for Cluster component
  const generateCSS = (): string => {
    const { space, justify, align, className } = clusterConfig;
    
    let css = `:root {
  --cluster-space: ${space};
  --cluster-justify: ${justify};
  --cluster-align: ${align};
}

.${className} {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space);
  justify-content: var(--cluster-justify);
  align-items: var(--cluster-align);
}`;

    // Add responsive behavior
    css += `

/* Responsive behavior for smaller screens */
@media (max-width: 768px) {
  .${className} {
    gap: calc(var(--cluster-space) * 0.75);
  }
}

@media (max-width: 480px) {
  .${className} {
    gap: calc(var(--cluster-space) * 0.5);
  }
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = (): JSONOutput => {
    return {
      component: 'Cluster',
      props: {
        space: clusterConfig.space,
        justify: clusterConfig.justify,
        align: clusterConfig.align,
        className: clusterConfig.className
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
      content: `Item ${newId}`,
      tag: 'div'
    }]);
  };

  // Remove item
  const removeItem = (id: number): void => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id: number, field: keyof ClusterItem, value: string): void => {
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
    a.download = 'cluster-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = (): void => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cluster-component.css';
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
          className: "px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm whitespace-nowrap"
        },
        item.content
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
              <h2 className="text-2xl font-bold text-white mb-2">Cluster Layout Generator</h2>
              <p className="text-gray-300">Every Layout Cluster コンポーネント生成ツール</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                showSettings 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-cyan-600 text-white hover:bg-cyan-700'
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
            
            {/* Cluster Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Cluster 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space (間隔)
                </label>
                <input
                  type="text"
                  value={clusterConfig.space}
                  onChange={(e) => setClusterConfig({...clusterConfig, space: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="1rem"
                />
                <p className="text-xs text-gray-400 mt-1">
                  例: 1rem, 16px, 1.5em
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Justify Content (水平配置)
                </label>
                <select
                  value={clusterConfig.justify}
                  onChange={(e) => setClusterConfig({...clusterConfig, justify: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="flex-start">Start (左寄せ)</option>
                  <option value="center">Center (中央寄せ)</option>
                  <option value="flex-end">End (右寄せ)</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Align Items (垂直配置)
                </label>
                <select
                  value={clusterConfig.align}
                  onChange={(e) => setClusterConfig({...clusterConfig, align: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="flex-start">Start (上寄せ)</option>
                  <option value="center">Center (中央寄せ)</option>
                  <option value="flex-end">End (下寄せ)</option>
                  <option value="stretch">Stretch (伸縮)</option>
                  <option value="baseline">Baseline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={clusterConfig.className}
                  onChange={(e) => setClusterConfig({...clusterConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Items Configuration */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">アイテム</h3>
                <button
                  onClick={addItem}
                  className="flex items-center px-3 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  追加
                </button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 p-3 bg-gray-700 rounded-md">
                    <select
                      value={item.tag}
                      onChange={(e) => updateItem(item.id, 'tag', e.target.value)}
                      className="px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                    >
                      <option value="div">div</option>
                      <option value="span">span</option>
                      <option value="button">button</option>
                      <option value="a">a</option>
                      <option value="p">p</option>
                      <option value="h3">h3</option>
                      <option value="h4">h4</option>
                    </select>
                    
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                      placeholder="Item content"
                    />
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
                className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
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
                  activeTab === 'visual' ? 'bg-cyan-900/50 text-cyan-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-cyan-900/50 text-cyan-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg min-h-96">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                
                {/* Container to show clustering effect */}
                <div style={{ width: '100%', backgroundColor: '#1f2937', padding: '1rem', border: '1px solid #374151', borderRadius: '0.5rem' }}>
                  <div className="text-xs text-gray-400 mb-4">
                    Cluster Container
                  </div>
                  
                  <div className={clusterConfig.className}>
                    {renderPreviewItems()}
                  </div>
                  
                  {/* Info panel */}
                  <div className="mt-4 p-3 bg-gray-800 rounded text-xs text-gray-300">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Space: {clusterConfig.space}</div>
                      <div>Items: {items.length}</div>
                      <div>Justify: {clusterConfig.justify}</div>
                      <div>Align: {clusterConfig.align}</div>
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
                    <code className="text-cyan-400">{JSON.stringify(generateJSON(), null, 2)}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">HTML使用例</h4>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-blue-400">{`<div class="${clusterConfig.className}">
${items.map(item => `  <${item.tag}>${item.content}</${item.tag}>`).join('\n')}
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

export default ClusterLayoutGenerator;