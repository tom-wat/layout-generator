import { useState, useEffect } from 'react';
import { Download, Eye, Code, RotateCcw, Grid3X3, AlertCircle } from 'lucide-react';

interface GridAreaContent {
  name: string;
  content: string;
  tag: string;
}

const GridAreaLayoutGenerator = () => {
  const [gridAreaConfig, setGridAreaConfig] = useState({
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `"header header header"
"sidebar main aside"
"footer footer footer"`,
    gap: '1rem',
    className: 'grid-area-layout'
  });
  
  const [areaContents, setAreaContents] = useState<GridAreaContent[]>([
    { name: 'header', content: 'Header Content', tag: 'header' },
    { name: 'sidebar', content: 'Sidebar Content', tag: 'aside' },
    { name: 'main', content: 'Main Content', tag: 'main' },
    { name: 'aside', content: 'Aside Content', tag: 'aside' },
    { name: 'footer', content: 'Footer Content', tag: 'footer' }
  ]);
  
  const [activeTab, setActiveTab] = useState('visual');
  const [parseError, setParseError] = useState<string>('');
  
  // Parse grid-template-areas to extract area names
  const parseGridAreas = (templateAreas: string): string[] => {
    try {
      const lines = templateAreas.trim().split('\n');
      const areaNames = new Set<string>();
      
      lines.forEach(line => {
        const areas = line.trim().replace(/['"]/g, '').split(/\s+/);
        areas.forEach(area => {
          if (area !== '.' && area !== '') {
            areaNames.add(area);
          }
        });
      });
      
      setParseError('');
      return Array.from(areaNames).sort();
    } catch {
      setParseError('Grid template areas の解析に失敗しました');
      return [];
    }
  };
  
  // Sync area contents with parsed areas
  useEffect(() => {
    const parsedAreas = parseGridAreas(gridAreaConfig.gridTemplateAreas);
    
    // Add new areas that don't exist in current contents
    setAreaContents(prevContents => {
      const newContents = [...prevContents];
      parsedAreas.forEach(areaName => {
        if (!newContents.find(content => content.name === areaName)) {
          newContents.push({
            name: areaName,
            content: `${areaName.charAt(0).toUpperCase() + areaName.slice(1)} Content`,
            tag: getDefaultTag(areaName)
          });
        }
      });
      
      // Remove areas that no longer exist in template
      const filteredContents = newContents.filter(content => 
        parsedAreas.includes(content.name)
      );
      
      return filteredContents;
    });
  }, [gridAreaConfig.gridTemplateAreas]);
  
  // Get default HTML tag based on area name
  const getDefaultTag = (areaName: string): string => {
    const tagMap: { [key: string]: string } = {
      'header': 'header',
      'nav': 'nav',
      'main': 'main',
      'aside': 'aside',
      'sidebar': 'aside',
      'footer': 'footer',
      'section': 'section',
      'article': 'article'
    };
    
    return tagMap[areaName.toLowerCase()] || 'div';
  };
  
  // Generate CSS for GridArea component
  const generateCSS = () => {
    const { 
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      gap,
      className 
    } = gridAreaConfig;
    
    let css = `:root {
  --grid-template-columns: ${gridTemplateColumns};
  --grid-template-rows: ${gridTemplateRows};
  --grid-gap: ${gap};
}

.${className} {
  display: grid;
  grid-template-columns: var(--grid-template-columns);
  grid-template-rows: var(--grid-template-rows);
  grid-template-areas: ${gridTemplateAreas.split('\n').map(line => line.trim()).join(' ')};
  gap: var(--grid-gap);
  min-height: 100vh;
}`;

    // Add grid area assignments for each area
    areaContents.forEach(area => {
      css += `

.${className} .area-${area.name} {
  grid-area: ${area.name};
}`;
    });

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'GridArea',
      props: {
        gridTemplateColumns: gridAreaConfig.gridTemplateColumns,
        gridTemplateRows: gridAreaConfig.gridTemplateRows,
        gridTemplateAreas: gridAreaConfig.gridTemplateAreas,
        gap: gridAreaConfig.gap,
        className: gridAreaConfig.className
      },
      areas: areaContents
    };
  };

  // Update area content
  const updateAreaContent = (name: string, field: keyof Omit<GridAreaContent, 'name'>, value: string) => {
    setAreaContents(areaContents.map(area =>
      area.name === name ? { ...area, [field]: value } : area
    ));
  };

  // Reset to default layout
  const resetToDefault = () => {
    setGridAreaConfig({
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `"header header header"
"sidebar main aside"
"footer footer footer"`,
      gap: '1rem',
      className: 'grid-area-layout'
    });
  };

  // Load preset layouts
  const loadPreset = (preset: string) => {
    const presets = {
      'basic': {
        gridTemplateColumns: '1fr 2fr 1fr',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateAreas: `"header header header"
"sidebar main aside"
"footer footer footer"`
      },
      'blog': {
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateAreas: `"header header"
"sidebar main"
"footer footer"`
      },
      'dashboard': {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto 1fr 1fr auto',
        gridTemplateAreas: `"header header header header"
"sidebar chart chart stats"
"sidebar table table stats"
"footer footer footer footer"`
      },
      'magazine': {
        gridTemplateColumns: '2fr 1fr 2fr',
        gridTemplateRows: 'auto auto 1fr auto',
        gridTemplateAreas: `"header header header"
"hero hero sidebar"
"article1 article2 sidebar"
"footer footer footer"`
      }
    };
    
    if (presets[preset as keyof typeof presets]) {
      setGridAreaConfig({
        ...gridAreaConfig,
        ...presets[preset as keyof typeof presets]
      });
    }
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-area-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-area-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Grid Area Layout Generator</h2>
          <p className="text-gray-300">CSS Grid Template Areas を使用したレイアウト生成ツール</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">設定</h2>
            
            {/* Grid Area Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Grid Area 設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grid Template Columns
                </label>
                <input
                  type="text"
                  value={gridAreaConfig.gridTemplateColumns}
                  onChange={(e) => setGridAreaConfig({...gridAreaConfig, gridTemplateColumns: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="1fr 2fr 1fr"
                />
                <p className="text-xs text-gray-400 mt-1">
                  例: 1fr 2fr 1fr, 200px 1fr, repeat(3, 1fr)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grid Template Rows
                </label>
                <input
                  type="text"
                  value={gridAreaConfig.gridTemplateRows}
                  onChange={(e) => setGridAreaConfig({...gridAreaConfig, gridTemplateRows: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="auto 1fr auto"
                />
                <p className="text-xs text-gray-400 mt-1">
                  例: auto 1fr auto, 100px 200px 1fr, repeat(3, 1fr)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grid Template Areas
                </label>
                <textarea
                  value={gridAreaConfig.gridTemplateAreas}
                  onChange={(e) => setGridAreaConfig({...gridAreaConfig, gridTemplateAreas: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
                  rows={6}
                  placeholder={`"header header header"
"sidebar main aside"
"footer footer footer"`}
                />
                {parseError && (
                  <div className="flex items-center mt-2 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {parseError}
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  各行をクォートで囲み、エリア名をスペースで区切ってください
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gap
                  </label>
                  <input
                    type="text"
                    value={gridAreaConfig.gap}
                    onChange={(e) => setGridAreaConfig({...gridAreaConfig, gap: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="1rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={gridAreaConfig.className}
                    onChange={(e) => setGridAreaConfig({...gridAreaConfig, className: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Preset Layouts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">プリセットレイアウト</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset('basic')}
                  className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
                >
                  基本レイアウト
                </button>
                <button
                  onClick={() => loadPreset('blog')}
                  className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
                >
                  ブログレイアウト
                </button>
                <button
                  onClick={() => loadPreset('dashboard')}
                  className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
                >
                  ダッシュボード
                </button>
                <button
                  onClick={() => loadPreset('magazine')}
                  className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
                >
                  マガジン
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

            {/* Area Contents Configuration */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">
                エリアコンテンツ ({areaContents.length}個)
              </h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {areaContents.map((area) => (
                  <div key={area.name} className="p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center text-teal-400 min-w-0">
                        <Grid3X3 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm font-mono font-medium">{area.name}</span>
                      </div>
                      
                      <select
                        value={area.tag}
                        onChange={(e) => updateAreaContent(area.name, 'tag', e.target.value)}
                        className="px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                      >
                        <option value="div">div</option>
                        <option value="header">header</option>
                        <option value="nav">nav</option>
                        <option value="main">main</option>
                        <option value="section">section</option>
                        <option value="article">article</option>
                        <option value="aside">aside</option>
                        <option value="footer">footer</option>
                      </select>
                    </div>
                    
                    <textarea
                      value={area.content}
                      onChange={(e) => updateAreaContent(area.name, 'content', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                      rows={2}
                      placeholder="コンテンツ"
                    />
                  </div>
                ))}
              </div>
              
              {areaContents.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  Grid Template Areas を設定すると、エリアが自動的に追加されます
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
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
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
                  activeTab === 'visual' ? 'bg-teal-900/50 text-teal-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-teal-900/50 text-teal-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="border-2 border-dashed border-gray-600 rounded-lg overflow-hidden">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={gridAreaConfig.className} style={{ minHeight: '500px' }}>
                  {areaContents.map((area) => {
                    const TagName = area.tag as keyof React.JSX.IntrinsicElements;
                    return (
                      <TagName
                        key={area.name}
                        className={`area-${area.name} p-4 bg-gray-700 border border-gray-600 rounded text-white`}
                      >
                        <div className="text-xs text-teal-400 mb-2 font-mono">
                          {area.name}
                        </div>
                        <div className="text-sm">
                          {area.content}
                        </div>
                      </TagName>
                    );
                  })}
                </div>
                
                <div className="p-4 text-xs text-gray-400 text-center border-t border-gray-600">
                  Grid Template Areas による名前付きエリアレイアウト
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
                    <code className="text-teal-400">{JSON.stringify(generateJSON(), null, 2)}</code>
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

export default GridAreaLayoutGenerator;