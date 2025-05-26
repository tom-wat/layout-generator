import { useState } from 'react';
import { Download, Eye, Code, RotateCcw, Film, Image, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const ReelLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  
  const [reelConfig, setReelConfig] = useState({
    itemWidth: '250px',
    gap: '1rem',
    height: 'auto',
    padding: '1rem',
    scrollSnapType: 'x mandatory',
    scrollSnapAlign: 'start',
    overflowX: 'auto',
    overflowY: 'hidden',
    className: 'reel'
  });

  const [reelItems, setReelItems] = useState([
    { id: 1, type: 'image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300', title: 'Item 1' },
    { id: 2, type: 'image', content: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300', title: 'Item 2' },
    { id: 3, type: 'image', content: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300', title: 'Item 3' },
    { id: 4, type: 'image', content: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300', title: 'Item 4' },
    { id: 5, type: 'image', content: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300', title: 'Item 5' }
  ]);

  const [activeTab, setActiveTab] = useState('visual');

  // Generate CSS for Reel component
  const generateCSS = () => {
    const { 
      itemWidth,
      gap,
      height,
      padding,
      scrollSnapType,
      scrollSnapAlign,
      overflowX,
      overflowY,
      className 
    } = reelConfig;

    const css = `:root {
  --reel-item-width: ${itemWidth};
  --reel-gap: ${gap};
  --reel-height: ${height};
  --reel-padding: ${padding};
  --reel-scroll-snap-type: ${scrollSnapType};
  --reel-scroll-snap-align: ${scrollSnapAlign};
  --reel-overflow-x: ${overflowX};
  --reel-overflow-y: ${overflowY};
}

.${className} {
  display: flex;
  gap: var(--reel-gap);
  height: var(--reel-height);
  padding: var(--reel-padding);
  overflow-x: var(--reel-overflow-x);
  overflow-y: var(--reel-overflow-y);
  scroll-snap-type: var(--reel-scroll-snap-type);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.${className} > * {
  flex: 0 0 var(--reel-item-width);
  scroll-snap-align: var(--reel-scroll-snap-align);
}

/* Hide scrollbar */
.${className}::-webkit-scrollbar {
  display: none;
}

.${className} {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .${className} {
    --reel-item-width: 200px;
    --reel-gap: 0.75rem;
    --reel-padding: 0.75rem;
  }
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Reel',
      props: {
        itemWidth: reelConfig.itemWidth,
        gap: reelConfig.gap,
        height: reelConfig.height,
        padding: reelConfig.padding,
        scrollSnapType: reelConfig.scrollSnapType,
        scrollSnapAlign: reelConfig.scrollSnapAlign,
        overflowX: reelConfig.overflowX,
        overflowY: reelConfig.overflowY,
        className: reelConfig.className
      },
      items: reelItems
    };
  };

  // Add new item
  const addItem = () => {
    const newId = Math.max(...reelItems.map(item => item.id)) + 1;
    setReelItems([...reelItems, {
      id: newId,
      type: 'image',
      content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
      title: `Item ${newId}`
    }]);
  };

  // Remove item
  const removeItem = (id: number) => {
    setReelItems(reelItems.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id: number, field: string, value: string) => {
    setReelItems(reelItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Load preset configurations
  const loadPreset = (preset: string) => {
    const presets = {
      'gallery': {
        itemWidth: '300px',
        gap: '1.5rem',
        height: '400px',
        padding: '1.5rem',
        scrollSnapType: 'x mandatory',
        scrollSnapAlign: 'center'
      },
      'cards': {
        itemWidth: '280px',
        gap: '1rem',
        height: '350px',
        padding: '1rem',
        scrollSnapType: 'x mandatory',
        scrollSnapAlign: 'start'
      },
      'thumbnails': {
        itemWidth: '150px',
        gap: '0.75rem',
        height: '120px',
        padding: '0.75rem',
        scrollSnapType: 'none',
        scrollSnapAlign: 'start'
      },
      'timeline': {
        itemWidth: '200px',
        gap: '2rem',
        height: 'auto',
        padding: '2rem',
        scrollSnapType: 'x proximity',
        scrollSnapAlign: 'center'
      }
    };

    if (presets[preset as keyof typeof presets]) {
      setReelConfig({
        ...reelConfig,
        ...presets[preset as keyof typeof presets]
      });
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setReelConfig({
      itemWidth: '250px',
      gap: '1rem',
      height: 'auto',
      padding: '1rem',
      scrollSnapType: 'x mandatory',
      scrollSnapAlign: 'start',
      overflowX: 'auto',
      overflowY: 'hidden',
      className: 'reel'
    });
    setReelItems([
      { id: 1, type: 'image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300', title: 'Item 1' },
      { id: 2, type: 'image', content: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300', title: 'Item 2' },
      { id: 3, type: 'image', content: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300', title: 'Item 3' },
      { id: 4, type: 'image', content: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300', title: 'Item 4' },
      { id: 5, type: 'image', content: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300', title: 'Item 5' }
    ]);
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reel-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reel-component.css';
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
              <h2 className="text-2xl font-bold text-white mb-2">Reel Layout Generator</h2>
              <p className="text-gray-300">Every Layout Reel コンポーネント生成ツール - 水平スクロール可能なレイアウト</p>
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
            
            {/* Reel Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Reel 設定</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Item Width (アイテム幅)
                  </label>
                  <input
                    type="text"
                    value={reelConfig.itemWidth}
                    onChange={(e) => setReelConfig({...reelConfig, itemWidth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="250px"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gap (アイテム間隔)
                  </label>
                  <input
                    type="text"
                    value={reelConfig.gap}
                    onChange={(e) => setReelConfig({...reelConfig, gap: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="1rem"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Height (高さ)
                  </label>
                  <input
                    type="text"
                    value={reelConfig.height}
                    onChange={(e) => setReelConfig({...reelConfig, height: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="auto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Padding (パディング)
                  </label>
                  <input
                    type="text"
                    value={reelConfig.padding}
                    onChange={(e) => setReelConfig({...reelConfig, padding: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="1rem"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scroll Snap Type
                  </label>
                  <select
                    value={reelConfig.scrollSnapType}
                    onChange={(e) => setReelConfig({...reelConfig, scrollSnapType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="none">None</option>
                    <option value="x mandatory">X Mandatory</option>
                    <option value="x proximity">X Proximity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scroll Snap Align
                  </label>
                  <select
                    value={reelConfig.scrollSnapAlign}
                    onChange={(e) => setReelConfig({...reelConfig, scrollSnapAlign: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={reelConfig.className}
                  onChange={(e) => setReelConfig({...reelConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Preset Layouts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">プリセット</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset('gallery')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Image className="w-4 h-4 mr-1" />
                  Gallery
                </button>
                <button
                  onClick={() => loadPreset('cards')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Film className="w-4 h-4 mr-1" />
                  Cards
                </button>
                <button
                  onClick={() => loadPreset('thumbnails')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Thumbnails
                </button>
                <button
                  onClick={() => loadPreset('timeline')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Timeline
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

            {/* Items Management */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">アイテム管理</h3>
              
              <button
                onClick={addItem}
                className="w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                アイテムを追加
              </button>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {reelItems.map((item) => (
                  <div key={item.id} className="bg-gray-700 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">Item {item.id}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        削除
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Content URL"
                      />
                    </div>
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
              <div className="border-2 border-dashed border-gray-600 p-2 rounded-lg">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={reelConfig.className}>
                  {reelItems.map((item) => (
                    <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden">
                      {item.type === 'image' ? (
                        <div>
                          <img 
                            src={item.content} 
                            alt={item.title}
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNEI1NTYzIi8+CjxwYXRoIGQ9Ik0xOTcuNSAxMjBMMjIwIDEzNUwyMjAgMTY1SDE3NUwxOTcuNSAxMjBaIiBmaWxsPSIjOUM5Q0E1Ii8+CjxjaXJjbGUgY3g9IjE3NSIgY3k9IjEzNSIgcj0iMTAiIGZpbGw9IiM5QzlDQTUiLz4KPHRleHQgeD0iMjAwIiB5PSIxODAiIGZpbGw9IiM5QzlDQTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                            }}
                          />
                          <div className="p-3">
                            <h3 className="text-white text-sm font-medium">{item.title}</h3>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 text-center">
                          <div className="text-white">{item.content}</div>
                          <div className="text-gray-400 text-sm mt-2">{item.title}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-xs text-gray-400 text-center">
                  アイテム幅: {reelConfig.itemWidth} | ギャップ: {reelConfig.gap} | スクロールスナップ: {reelConfig.scrollSnapType}
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
                      const { className } = reelConfig;
                      const itemsHtml = reelItems.map(item => {
                        if (item.type === 'image') {
                          return `  <div class="reel-item">
    <img src="${item.content}" alt="${item.title}" />
    <h3>${item.title}</h3>
  </div>`;
                        } else {
                          return `  <div class="reel-item">
    <div class="content">${item.content}</div>
    <h3>${item.title}</h3>
  </div>`;
                        }
                      }).join('\n');
                      
                      return `<div class="${className}">
${itemsHtml}
</div>`;
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

export default ReelLayoutGenerator;