import { useState } from 'react';
import { Download, Plus, Trash2, Eye, Code, ChevronRight, ChevronDown, Indent } from 'lucide-react';

const StackLayoutGenerator = () => {
  const [stackConfig, setStackConfig] = useState({
    space: '1rem',
    recursive: false,
    splitAfter: null,
    className: 'stack'
  });
  
  const [elements, setElements] = useState([
    { 
      id: 1, 
      content: 'First item', 
      tag: 'div', 
      level: 0,
      isStack: false,
      stackConfig: { space: '0.5rem', recursive: false },
      children: [],
      collapsed: false
    },
    { 
      id: 2, 
      content: 'Second item', 
      tag: 'div', 
      level: 0,
      isStack: false,
      stackConfig: { space: '0.5rem', recursive: false },
      children: [],
      collapsed: false
    },
    { 
      id: 3, 
      content: 'Third item', 
      tag: 'div', 
      level: 0,
      isStack: false,
      stackConfig: { space: '0.5rem', recursive: false },
      children: [],
      collapsed: false
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('visual');
  
  // Generate CSS for nested stacks
  const generateCSS = () => {
    const { space, recursive, splitAfter, className } = stackConfig;
    
    let css = `.${className} {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.${className} > * {
  margin-block: 0;
}

.${className} > * + * {
  margin-block-start: ${space};
}`;

    if (recursive) {
      css += `

.${className} * {
  margin-block: 0;
}

.${className} * + * {
  margin-block-start: ${space};
}`;
    }

    if (splitAfter !== null && splitAfter > 0) {
      css += `

.${className} > :nth-child(${splitAfter}) {
  margin-block-end: auto;
}`;
    }

    // Generate CSS for nested stacks
    const generateNestedStackCSS = (elements, level = 0) => {
      let nestedCSS = '';
      elements.forEach(element => {
        if (element.isStack) {
          const nestedClassName = `${className}-nested-${element.id}`;
          nestedCSS += `

.${nestedClassName} {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5rem;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  background-color: #374151;
}

.${nestedClassName} > * {
  margin-block: 0;
}

.${nestedClassName} > * + * {
  margin-block-start: ${element.stackConfig.space};
}`;

          if (element.stackConfig.recursive) {
            nestedCSS += `

.${nestedClassName} * {
  margin-block: 0;
}

.${nestedClassName} * + * {
  margin-block-start: ${element.stackConfig.space};
}`;
          }
        }
        if (element.children && element.children.length > 0) {
          nestedCSS += generateNestedStackCSS(element.children, level + 1);
        }
      });
      return nestedCSS;
    };

    css += generateNestedStackCSS(elements);
    return css;
  };

  // Generate JSON with nested structure
  const generateJSON = () => {
    const convertElementsToJSON = (elements) => {
      return elements.map(element => {
        const baseElement = {
          id: element.id,
          tag: element.tag,
          content: element.content,
          level: element.level
        };

        if (element.isStack) {
          return {
            ...baseElement,
            component: 'Stack',
            props: {
              space: element.stackConfig.space,
              recursive: element.stackConfig.recursive,
              className: `${stackConfig.className}-nested-${element.id}`
            },
            children: convertElementsToJSON(element.children)
          };
        } else {
          return {
            ...baseElement,
            children: element.children.length > 0 ? convertElementsToJSON(element.children) : undefined
          };
        }
      });
    };

    return {
      component: 'Stack',
      props: {
        space: stackConfig.space,
        recursive: stackConfig.recursive,
        splitAfter: stackConfig.splitAfter,
        className: stackConfig.className
      },
      children: convertElementsToJSON(elements)
    };
  };

  // Add element
  const addElement = (targetId = null, level = 0, addAsChild = false) => {
    const newId = Math.max(...getAllIds(elements)) + 1;
    const newElement = {
      id: newId,
      content: `Item ${newId}`,
      tag: 'div',
      level: level,
      isStack: false,
      stackConfig: { space: '0.5rem', recursive: false },
      children: [],
      collapsed: false
    };

    if (targetId === null) {
      // Add to root level
      setElements([...elements, newElement]);
    } else if (addAsChild) {
      // Add as child of target element
      setElements(updateElementsRecursively(elements, targetId, (element) => ({
        ...element,
        children: [...element.children, newElement]
      })));
    } else {
      // Add as sibling of target element
      const addSibling = (elements, parentPath = []) => {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i].id === targetId) {
            // Found the target, add sibling
            const newElements = [...elements];
            newElements.splice(i + 1, 0, newElement);
            return newElements;
          }
          
          if (elements[i].children && elements[i].children.length > 0) {
            const updatedChildren = addSibling(elements[i].children, [...parentPath, i]);
            if (updatedChildren !== elements[i].children) {
              // Children were modified, update this element
              const newElements = [...elements];
              newElements[i] = { ...elements[i], children: updatedChildren };
              return newElements;
            }
          }
        }
        return elements;
      };
      
      setElements(addSibling(elements));
    }
  };

  // Add child element specifically
  const addChildElement = (parentId, level) => {
    addElement(parentId, level, true);
  };

  // Get all IDs recursively
  const getAllIds = (elements) => {
    let ids = [];
    elements.forEach(element => {
      ids.push(element.id);
      if (element.children && element.children.length > 0) {
        ids = ids.concat(getAllIds(element.children));
      }
    });
    return ids.length > 0 ? ids : [0];
  };

  // Update elements recursively
  const updateElementsRecursively = (elements, targetId, updateFn) => {
    return elements.map(element => {
      if (element.id === targetId) {
        return updateFn(element);
      }
      if (element.children && element.children.length > 0) {
        return {
          ...element,
          children: updateElementsRecursively(element.children, targetId, updateFn)
        };
      }
      return element;
    });
  };

  // Remove element
  const removeElement = (id) => {
    const removeFromElements = (elements) => {
      return elements.filter(element => element.id !== id).map(element => ({
        ...element,
        children: element.children ? removeFromElements(element.children) : []
      }));
    };
    setElements(removeFromElements(elements));
  };

  // Update element
  const updateElement = (id, field, value) => {
    setElements(updateElementsRecursively(elements, id, (element) => ({
      ...element,
      [field]: value
    })));
  };

  // Update stack config for element
  const updateElementStackConfig = (id, field, value) => {
    setElements(updateElementsRecursively(elements, id, (element) => ({
      ...element,
      stackConfig: {
        ...element.stackConfig,
        [field]: value
      }
    })));
  };

  // Toggle element collapse
  const toggleCollapse = (id) => {
    setElements(updateElementsRecursively(elements, id, (element) => ({
      ...element,
      collapsed: !element.collapsed
    })));
  };

  // Convert element to stack
  const convertToStack = (id) => {
    setElements(updateElementsRecursively(elements, id, (element) => ({
      ...element,
      isStack: !element.isStack,
      content: element.isStack ? element.content : 'Stack Container'
    })));
  };

  // Render elements tree
  const renderElementsTree = (elements, level = 0) => {
    return elements.map((element) => (
      <div key={element.id} className="mb-2">
        <div className={`flex items-center space-x-2 p-3 rounded-md ${
          element.isStack ? 'bg-blue-900/20 border border-blue-700' : 'bg-gray-700'
        }`} style={{ marginLeft: `${level * 20}px` }}>
          
          {/* Collapse/Expand button */}
          {(element.children.length > 0 || element.isStack) && (
            <button
              onClick={() => toggleCollapse(element.id)}
              className="p-1 hover:bg-gray-600 rounded text-gray-300"
            >
              {element.collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* Level indicator */}
          {level > 0 && <Indent className="w-4 h-4 text-gray-400" />}
          
          {/* Element controls */}
          <select
            value={element.tag}
            onChange={(e) => updateElement(element.id, 'tag', e.target.value)}
            className="px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
          >
            <option value="div">div</option>
            <option value="p">p</option>
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
            <option value="section">section</option>
            <option value="article">article</option>
          </select>
          
          <input
            type="text"
            value={element.content}
            onChange={(e) => updateElement(element.id, 'content', e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
          />
          
          {/* Stack toggle */}
          <button
            onClick={() => convertToStack(element.id)}
            className={`px-2 py-1 text-xs rounded ${
              element.isStack 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Stack
          </button>
          
          {/* Add sibling button */}
          <button
            onClick={() => addElement(element.id, level, false)}
            className="p-1 text-green-600 hover:text-green-800"
            title="兄弟要素を追加"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          {/* Add child button */}
          <button
            onClick={() => addChildElement(element.id, level + 1)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="子要素を追加"
          >
            <Indent className="w-4 h-4" />
          </button>
          
          {/* Remove button */}
          <button
            onClick={() => removeElement(element.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Stack configuration */}
        {element.isStack && !element.collapsed && (
          <div className="ml-6 mt-2 p-3 bg-blue-900/10 border border-blue-800 rounded">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Space</label>
                <input
                  type="text"
                  value={element.stackConfig.space}
                  onChange={(e) => updateElementStackConfig(element.id, 'space', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`recursive-${element.id}`}
                  checked={element.stackConfig.recursive}
                  onChange={(e) => updateElementStackConfig(element.id, 'recursive', e.target.checked)}
                  className="mr-2 bg-gray-800 border-gray-600"
                />
                <label htmlFor={`recursive-${element.id}`} className="text-xs font-medium text-gray-300">
                  Recursive
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Render children */}
        {!element.collapsed && element.children.length > 0 && (
          <div className="ml-4 mt-2">
            {renderElementsTree(element.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  // Render preview recursively
  const renderPreview = (elements = stackConfig.className) => {
    return elements.map((element) => {
      const Tag = element.tag;
      
      if (element.isStack) {
        const nestedClassName = `${stackConfig.className}-nested-${element.id}`;
        return (
          <div key={element.id} className={nestedClassName}>
            <div className="text-xs text-gray-400 mb-2">Stack: {element.content}</div>
            {element.children.length > 0 && renderPreview(element.children, nestedClassName)}
          </div>
        );
      } else {
        return (
          <Tag key={element.id} className="p-3 bg-gray-700 border border-gray-600 rounded text-white">
            {element.content}
            {element.children.length > 0 && (
              <div className="mt-2 pl-4 border-l-2 border-gray-600">
                {renderPreview(element.children)}
              </div>
            )}
          </Tag>
        );
      }
    });
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nested-stack-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nested-stack-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Nested Stack Layout Generator</h2>
          <p className="text-gray-300">入れ子構造対応の Stack コンポーネント生成ツール</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">設定</h2>
            
            {/* Root Stack Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">ルート Stack 設定</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space (間隔)
                </label>
                <input
                  type="text"
                  value={stackConfig.space}
                  onChange={(e) => setStackConfig({...stackConfig, space: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={stackConfig.className}
                  onChange={(e) => setStackConfig({...stackConfig, className: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="recursive"
                  checked={stackConfig.recursive}
                  onChange={(e) => setStackConfig({...stackConfig, recursive: e.target.checked})}
                  className="mr-2 bg-gray-700 border-gray-600"
                />
                <label htmlFor="recursive" className="text-sm font-medium text-gray-300">
                  Recursive（ネストした要素にも適用）
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Split After
                </label>
                <input
                  type="number"
                  value={stackConfig.splitAfter || ''}
                  onChange={(e) => setStackConfig({...stackConfig, splitAfter: e.target.value ? parseInt(e.target.value) : null})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="空白で無効"
                />
              </div>
            </div>

            {/* Elements Tree */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">要素ツリー</h3>
                <button
                  onClick={() => addElement()}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  ルート要素追加
                </button>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {renderElementsTree(elements)}
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
                  activeTab === 'visual' ? 'bg-blue-900/50 text-blue-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code' ? 'bg-blue-900/50 text-blue-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>

            {activeTab === 'visual' && (
              <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className={stackConfig.className}>
                  {renderPreview(elements)}
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
                    <code className="text-blue-400">{JSON.stringify(generateJSON(), null, 2)}</code>
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

export default StackLayoutGenerator;