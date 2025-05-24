import { useState } from 'react';
import { Download, Eye, Code, Plus, Trash2, RotateCcw, Grid3X3, Info } from 'lucide-react';

interface GridItem {
  id: number;
  content: string;
  tag: string;
  isSubgrid: boolean;
  subgridConfig?: {
    subgridColumns: boolean;
    subgridRows: boolean;
    columnSpan: number;
    rowSpan: number;
    items: SubgridItem[];
  };
}

interface SubgridItem {
  id: number;
  content: string;
  tag: string;
}

const SubgridLayoutGenerator = () => {
  const [parentGridConfig, setParentGridConfig] = useState({
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '1rem',
    className: 'parent-grid'
  });
  
  const [gridItems, setGridItems] = useState<GridItem[]>([
    { id: 1, content: 'Regular Grid Item 1', tag: 'div', isSubgrid: false },
    { 
      id: 2, 
      content: 'Subgrid Container', 
      tag: 'div', 
      isSubgrid: true,
      subgridConfig: {
        subgridColumns: true,
        subgridRows: false,
        columnSpan: 2,
        rowSpan: 1,
        items: [
          { id: 21, content: 'Subgrid Item 1', tag: 'div' },
          { id: 22, content: 'Subgrid Item 2', tag: 'div' },
          { id: 23, content: 'Subgrid Item 3', tag: 'div' }
        ]
      }
    },
    { id: 3, content: 'Regular Grid Item 3', tag: 'div', isSubgrid: false },
    { id: 4, content: 'Regular Grid Item 4', tag: 'div', isSubgrid: false }
  ]);
  
  const [activeTab, setActiveTab] = useState('visual');
  
  // Generate CSS for Subgrid component
  const generateCSS = () => {
    const { 
      gridTemplateColumns,
      gridTemplateRows,
      gap,
      className 
    } = parentGridConfig;
    
    let css = `:root {
  --parent-grid-columns: ${gridTemplateColumns};
  --parent-grid-rows: ${gridTemplateRows};
  --parent-grid-gap: ${gap};
}

/* Parent Grid */
.${className} {
  display: grid;
  grid-template-columns: var(--parent-grid-columns);
  grid-template-rows: var(--parent-grid-rows);
  gap: var(--parent-grid-gap);
  min-height: 400px;
  border: 2px solid #4b5563;
  padding: 1rem;
}

/* Regular Grid Items */
.${className} .grid-item {
  background-color: #374151;
  border: 1px solid #6b7280;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}`;

    // Add subgrid styles
    gridItems.forEach(item => {
      if (item.isSubgrid && item.subgridConfig) {
        const { subgridColumns, subgridRows, columnSpan, rowSpan } = item.subgridConfig;
        
        css += `

/* Subgrid Container ${item.id} */
.${className} .subgrid-${item.id} {
  display: grid;`;
        
        if (subgridColumns) {
          css += `
  grid-template-columns: subgrid;`;
        } else {
          css += `
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));`;
        }
        
        if (subgridRows) {
          css += `
  grid-template-rows: subgrid;`;
        } else {
          css += `
  grid-template-rows: auto;`;
        }
        
        css += `
  gap: calc(var(--parent-grid-gap) / 2);
  background-color: #1f2937;
  border: 2px dashed #059669;
  padding: 0.5rem;
  grid-column: span ${columnSpan};
  grid-row: span ${rowSpan};
}

.${className} .subgrid-${item.id} .subgrid-item {
  background-color: #065f46;
  border: 1px solid #059669;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.875rem;
}`;
      }
    });

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Subgrid',
      props: {
        parentGridConfig,
        className: parentGridConfig.className
      },
      items: gridItems
    };
  };

  // Add new grid item
  const addGridItem = () => {
    const newId = Math.max(...gridItems.map(item => item.id), 0) + 1;
    const newItem: GridItem = {
      id: newId,
      content: `Grid Item ${newId}`,
      tag: 'div',
      isSubgrid: false
    };
    setGridItems([...gridItems, newItem]);
  };

  // Remove grid item
  const removeGridItem = (id: number) => {
    setGridItems(gridItems.filter(item => item.id !== id));
  };

  // Update grid item
  const updateGridItem = (id: number, field: keyof Omit<GridItem, 'id' | 'subgridConfig'>, value: string | boolean) => {
    setGridItems(gridItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // If converting to subgrid, add default subgrid config
        if (field === 'isSubgrid' && value === true && !item.subgridConfig) {
          updatedItem.subgridConfig = {
            subgridColumns: true,
            subgridRows: false,
            columnSpan: 2,
            rowSpan: 1,
            items: [
              { id: id * 10 + 1, content: 'Subgrid Item 1', tag: 'div' },
              { id: id * 10 + 2, content: 'Subgrid Item 2', tag: 'div' }
            ]
          };
          updatedItem.content = 'Subgrid Container';
        }
        
        // If converting from subgrid, remove subgrid config
        if (field === 'isSubgrid' && value === false) {
          delete updatedItem.subgridConfig;
          updatedItem.content = `Grid Item ${id}`;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  // Update subgrid configuration
  const updateSubgridConfig = (
    itemId: number, 
    field: keyof NonNullable<GridItem['subgridConfig']>, 
    value: boolean | number | SubgridItem[]
  ) => {
    setGridItems(gridItems.map(item => {
      if (item.id === itemId && item.subgridConfig) {
        return {
          ...item,
          subgridConfig: {
            ...item.subgridConfig,
            [field]: value
          }
        };
      }
      return item;
    }));
  };

  // Add subgrid item
  const addSubgridItem = (parentId: number) => {
    setGridItems(gridItems.map(item => {
      if (item.id === parentId && item.subgridConfig) {
        const newSubId = Math.max(...item.subgridConfig.items.map(sub => sub.id), parentId * 10) + 1;
        const newSubItem: SubgridItem = {
          id: newSubId,
          content: `Subgrid Item ${item.subgridConfig.items.length + 1}`,
          tag: 'div'
        };
        
        return {
          ...item,
          subgridConfig: {
            ...item.subgridConfig,
            items: [...item.subgridConfig.items, newSubItem]
          }
        };
      }
      return item;
    }));
  };

  // Remove subgrid item
  const removeSubgridItem = (parentId: number, subId: number) => {
    setGridItems(gridItems.map(item => {
      if (item.id === parentId && item.subgridConfig) {
        return {
          ...item,
          subgridConfig: {
            ...item.subgridConfig,
            items: item.subgridConfig.items.filter(sub => sub.id !== subId)
          }
        };
      }
      return item;
    }));
  };

  // Update subgrid item
  const updateSubgridItem = (parentId: number, subId: number, field: keyof Omit<SubgridItem, 'id'>, value: string) => {
    setGridItems(gridItems.map(item => {
      if (item.id === parentId && item.subgridConfig) {
        return {
          ...item,
          subgridConfig: {
            ...item.subgridConfig,
            items: item.subgridConfig.items.map(sub =>
              sub.id === subId ? { ...sub, [field]: value } : sub
            )
          }
        };
      }
      return item;
    }));
  };

  // Reset to default
  const resetToDefault = () => {
    setParentGridConfig({
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gap: '1rem',
      className: 'parent-grid'
    });
    setGridItems([
      { id: 1, content: 'Regular Grid Item 1', tag: 'div', isSubgrid: false },
      { 
        id: 2, 
        content: 'Subgrid Container', 
        tag: 'div', 
        isSubgrid: true,
        subgridConfig: {
          subgridColumns: true,
          subgridRows: false,
          columnSpan: 2,
          rowSpan: 1,
          items: [
            { id: 21, content: 'Subgrid Item 1', tag: 'div' },
            { id: 22, content: 'Subgrid Item 2', tag: 'div' },
            { id: 23, content: 'Subgrid Item 3', tag: 'div' }
          ]
        }
      },
      { id: 3, content: 'Regular Grid Item 3', tag: 'div', isSubgrid: false },
      { id: 4, content: 'Regular Grid Item 4', tag: 'div', isSubgrid: false }
    ]);
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subgrid-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subgrid-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Subgrid Layout Generator</h2>
          <p className="text-gray-300">CSS Subgrid を使用した親子グリッドレイアウト生成ツール</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">設定</h2>
            
            {/* Parent Grid Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">親グリッド設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grid Template Columns
                </label>
                <input
                  type="text"
                  value={parentGridConfig.gridTemplateColumns}
                  onChange={(e) => setParentGridConfig({...parentGridConfig, gridTemplateColumns: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="repeat(4, 1fr)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grid Template Rows
                </label>
                <input
                  type="text"
                  value={parentGridConfig.gridTemplateRows}
                  onChange={(e) => setParentGridConfig({...parentGridConfig, gridTemplateRows: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="repeat(3, 1fr)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gap
                  </label>
                  <input
                    type="text"
                    value={parentGridConfig.gap}
                    onChange={(e) => setParentGridConfig({...parentGridConfig, gap: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="1rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={parentGridConfig.className}
                    onChange={(e) => setParentGridConfig({...parentGridConfig, className: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Grid Items Configuration */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">グリッドアイテム</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={addGridItem}
                    className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    追加
                  </button>
                  <button
                    onClick={resetToDefault}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    リセット
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {gridItems.map((item, index) => (
                  <div key={item.id} className={`p-4 rounded-md ${item.isSubgrid ? 'bg-emerald-900/20 border border-emerald-700' : 'bg-gray-700'}`}>
                    {/* Main Item Controls */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center text-gray-400 min-w-0">
                        <Grid3X3 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm font-mono">#{index + 1}</span>
                      </div>
                      
                      <select
                        value={item.tag}
                        onChange={(e) => updateGridItem(item.id, 'tag', e.target.value)}
                        className="px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                      >
                        <option value="div">div</option>
                        <option value="section">section</option>
                        <option value="article">article</option>
                        <option value="aside">aside</option>
                      </select>
                      
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => updateGridItem(item.id, 'content', e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                        disabled={item.isSubgrid}
                      />
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`subgrid-${item.id}`}
                          checked={item.isSubgrid}
                          onChange={(e) => updateGridItem(item.id, 'isSubgrid', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={`subgrid-${item.id}`} className="text-xs text-emerald-400">
                          Subgrid
                        </label>
                      </div>
                      
                      <button
                        onClick={() => removeGridItem(item.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                        disabled={gridItems.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subgrid Configuration */}
                    {item.isSubgrid && item.subgridConfig && (
                      <div className="ml-6 space-y-3 border-l-2 border-emerald-600 pl-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`subgrid-cols-${item.id}`}
                              checked={item.subgridConfig.subgridColumns}
                              onChange={(e) => updateSubgridConfig(item.id, 'subgridColumns', e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`subgrid-cols-${item.id}`} className="text-xs text-emerald-300">
                              Subgrid Columns
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`subgrid-rows-${item.id}`}
                              checked={item.subgridConfig.subgridRows}
                              onChange={(e) => updateSubgridConfig(item.id, 'subgridRows', e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`subgrid-rows-${item.id}`} className="text-xs text-emerald-300">
                              Subgrid Rows
                            </label>
                          </div>
                        </div>
                        
                        {/* Grid Span Controls */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-emerald-300 mb-1">
                              Column Span
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="12"
                              value={item.subgridConfig.columnSpan}
                              onChange={(e) => updateSubgridConfig(item.id, 'columnSpan', parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-emerald-300 mb-1">
                              Row Span
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="12"
                              value={item.subgridConfig.rowSpan}
                              onChange={(e) => updateSubgridConfig(item.id, 'rowSpan', parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                            />
                          </div>
                        </div>

                        {/* Subgrid Items */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-emerald-400">サブグリッドアイテム</span>
                            <button
                              onClick={() => addSubgridItem(item.id)}
                              className="px-2 py-1 bg-emerald-700 text-white rounded text-xs hover:bg-emerald-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {item.subgridConfig.items.map((subItem) => (
                            <div key={subItem.id} className="flex items-center space-x-2">
                              <select
                                value={subItem.tag}
                                onChange={(e) => updateSubgridItem(item.id, subItem.id, 'tag', e.target.value)}
                                className="px-1 py-1 border border-gray-600 bg-gray-800 text-white rounded text-xs"
                              >
                                <option value="div">div</option>
                                <option value="p">p</option>
                                <option value="span">span</option>
                              </select>
                              
                              <input
                                type="text"
                                value={subItem.content}
                                onChange={(e) => updateSubgridItem(item.id, subItem.id, 'content', e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-xs"
                              />
                              
                              <button
                                onClick={() => removeSubgridItem(item.id, subItem.id)}
                                className="p-1 text-red-400 hover:text-red-600"
                                disabled={item.subgridConfig!.items.length <= 1}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
              <div className="border-2 border-dashed border-gray-600 rounded-lg overflow-hidden">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={parentGridConfig.className}>
                  {gridItems.map((item) => {
                    const TagName = item.tag as keyof React.JSX.IntrinsicElements;
                    
                    if (item.isSubgrid && item.subgridConfig) {
                      return (
                        <TagName
                          key={item.id}
                          className={`subgrid-${item.id}`}
                        >
                          <div className="text-xs text-emerald-300 mb-2 col-span-full">
                            {item.content} 
                            <span className="ml-2 text-emerald-500">
                              (span: {item.subgridConfig.columnSpan}×{item.subgridConfig.rowSpan}, 
                               cols: {item.subgridConfig.subgridColumns ? 'subgrid' : 'auto'}, 
                               rows: {item.subgridConfig.subgridRows ? 'subgrid' : 'auto'})
                            </span>
                          </div>
                          {item.subgridConfig.items.map((subItem) => {
                            const SubTagName = subItem.tag as keyof React.JSX.IntrinsicElements;
                            return (
                              <SubTagName
                                key={subItem.id}
                                className="subgrid-item"
                              >
                                {subItem.content}
                              </SubTagName>
                            );
                          })}
                        </TagName>
                      );
                    } else {
                      return (
                        <TagName
                          key={item.id}
                          className="grid-item"
                        >
                          {item.content}
                        </TagName>
                      );
                    }
                  })}
                </div>
                
                <div className="p-4 text-xs text-gray-400 text-center border-t border-gray-600">
                  <div className="flex items-center justify-center mb-2">
                    <Info className="w-4 h-4 mr-1" />
                    Subgrid レイアウト
                  </div>
                  <div>CSS Subgrid による親子グリッドの線継承レイアウト</div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubgridLayoutGenerator;