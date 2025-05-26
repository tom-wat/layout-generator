import { useState } from 'react';
import { Download, Eye, Code, Plus, Trash2, Move, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface GridItem {
  id: number;
  content: string;
  tag: string;
}

const GridLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState(true);
  
  const [gridConfig, setGridConfig] = useState({
    minWidth: '250px',
    gap: '1rem',
    autoFit: true, // true = auto-fit, false = auto-fill
    justifyItems: 'stretch',
    alignItems: 'stretch',
    className: 'grid-layout'
  });
  
  const [gridItems, setGridItems] = useState<GridItem[]>([
    { id: 1, content: 'Grid item 1', tag: 'div' },
    { id: 2, content: 'Grid item 2', tag: 'div' },
    { id: 3, content: 'Grid item 3', tag: 'div' },
    { id: 4, content: 'Grid item 4', tag: 'div' },
    { id: 5, content: 'Grid item 5', tag: 'div' },
    { id: 6, content: 'Grid item 6', tag: 'div' }
  ]);
  
  const [activeTab, setActiveTab] = useState('visual');
  
  // Generate CSS for Grid component
  const generateCSS = () => {
    const { 
      minWidth, 
      gap, 
      autoFit,
      justifyItems,
      alignItems,
      className 
    } = gridConfig;
    
    const autoFitFill = autoFit ? 'auto-fit' : 'auto-fill';
    
    const css = `:root {
  --grid-min-width: ${minWidth};
  --grid-gap: ${gap};
  --grid-justify-items: ${justifyItems};
  --grid-align-items: ${alignItems};
}

.${className} {
  display: grid;
  grid-template-columns: repeat(${autoFitFill}, minmax(var(--grid-min-width), 1fr));
  gap: var(--grid-gap);
  justify-items: var(--grid-justify-items);
  align-items: var(--grid-align-items);
}

/* Optional: Add some basic styling for grid items */
.${className} > * {
  box-sizing: border-box;
}`;

    return css;
  };

  // Generate HTML structure
  const generateHTML = () => {
    const itemsHTML = gridItems.map((item) => {
      return `  <${item.tag}>${item.content}</${item.tag}>`;
    }).join('\n');
    
    return `<div class="${gridConfig.className}">\n${itemsHTML}\n</div>`;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Grid',
      props: {
        minWidth: gridConfig.minWidth,
        gap: gridConfig.gap,
        autoFit: gridConfig.autoFit,
        justifyItems: gridConfig.justifyItems,
        alignItems: gridConfig.alignItems,
        className: gridConfig.className
      },
      items: gridItems
    };
  };

  // Add new grid item
  const addGridItem = () => {
    const newId = Math.max(...gridItems.map(item => item.id), 0) + 1;
    const newItem: GridItem = {
      id: newId,
      content: `Grid item ${newId}`,
      tag: 'div'
    };
    setGridItems([...gridItems, newItem]);
  };

  // Remove grid item
  const removeGridItem = (id: number) => {
    setGridItems(gridItems.filter(item => item.id !== id));
  };

  // Update grid item
  const updateGridItem = (id: number, field: keyof Omit<GridItem, 'id'>, value: string) => {
    setGridItems(gridItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Reset to default items
  const resetGridItems = () => {
    setGridItems([
      { id: 1, content: 'Grid item 1', tag: 'div' },
      { id: 2, content: 'Grid item 2', tag: 'div' },
      { id: 3, content: 'Grid item 3', tag: 'div' },
      { id: 4, content: 'Grid item 4', tag: 'div' },
      { id: 5, content: 'Grid item 5', tag: 'div' },
      { id: 6, content: 'Grid item 6', tag: 'div' }
    ]);
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-component.css';
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
              <h2 className="text-2xl font-bold text-white mb-2">Grid Layout Generator</h2>
              <p className="text-gray-300">Every Layout Grid コンポーネント生成ツール</p>
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
            
            {/* Grid Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Grid 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Width (各アイテムの最小幅)
                </label>
                <input
                  type="text"
                  value={gridConfig.minWidth}
                  onChange={(e) => setGridConfig({...gridConfig, minWidth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="250px"
                />
                <p className="text-xs text-gray-400 mt-1">
                  各グリッドアイテムの最小幅（例: 250px, 15rem, 20ch）
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gap (アイテム間隔)
                </label>
                <input
                  type="text"
                  value={gridConfig.gap}
                  onChange={(e) => setGridConfig({...gridConfig, gap: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="1rem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Auto Behavior
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="auto-fit"
                      name="autoFitFill"
                      checked={gridConfig.autoFit}
                      onChange={() => setGridConfig({...gridConfig, autoFit: true})}
                      className="mr-2 text-cyan-600"
                    />
                    <label htmlFor="auto-fit" className="text-sm text-gray-300">
                      <span className="font-medium">auto-fit</span> - アイテムが利用可能スペースを埋める
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="auto-fill"
                      name="autoFitFill"
                      checked={!gridConfig.autoFit}
                      onChange={() => setGridConfig({...gridConfig, autoFit: false})}
                      className="mr-2 text-cyan-600"
                    />
                    <label htmlFor="auto-fill" className="text-sm text-gray-300">
                      <span className="font-medium">auto-fill</span> - 空のカラムを維持
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Justify Items
                  </label>
                  <select
                    value={gridConfig.justifyItems}
                    onChange={(e) => setGridConfig({...gridConfig, justifyItems: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="stretch">Stretch</option>
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="center">Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Align Items
                  </label>
                  <select
                    value={gridConfig.alignItems}
                    onChange={(e) => setGridConfig({...gridConfig, alignItems: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="stretch">Stretch</option>
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="center">Center</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={gridConfig.className}
                  onChange={(e) => setGridConfig({...gridConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Grid Items Configuration */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">グリッドアイテム</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={addGridItem}
                    className="flex items-center px-3 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    追加
                  </button>
                  <button
                    onClick={resetGridItems}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    リセット
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {gridItems.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2 p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center text-gray-400 min-w-0">
                      <Move className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm font-mono">#{index + 1}</span>
                    </div>
                    
                    <select
                      value={item.tag}
                      onChange={(e) => updateGridItem(item.id, 'tag', e.target.value)}
                      className="px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm min-w-0"
                    >
                      <option value="div">div</option>
                      <option value="article">article</option>
                      <option value="section">section</option>
                      <option value="aside">aside</option>
                      <option value="p">p</option>
                      <option value="h3">h3</option>
                    </select>
                    
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => updateGridItem(item.id, 'content', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm min-w-0"
                      placeholder="コンテンツ"
                    />
                    
                    <button
                      onClick={() => removeGridItem(item.id)}
                      className="p-1 text-red-400 hover:text-red-600 flex-shrink-0"
                      disabled={gridItems.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-400">
                アイテム数: {gridItems.length} / 最小幅: {gridConfig.minWidth} / 
                動作: {gridConfig.autoFit ? 'auto-fit' : 'auto-fill'}
              </p>
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
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={gridConfig.className}>
                  {gridItems.map((item) => {
                    const TagName = item.tag as keyof React.JSX.IntrinsicElements;
                    return (
                      <TagName
                        key={item.id}
                        className="p-4 bg-gray-700 border border-gray-600 rounded text-white text-center min-h-[80px] flex items-center justify-center"
                      >
                        {item.content}
                      </TagName>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-xs text-gray-400 text-center">
                  リサイズしてレスポンシブ動作を確認してください
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
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto max-h-64 overflow-y-auto">
                    <code className="text-orange-400">{generateHTML()}</code>
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

export default GridLayoutGenerator;