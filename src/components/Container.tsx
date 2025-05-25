import { useState } from 'react';
import { Download, Eye, Code, RotateCcw, Container, Smartphone, Tablet, Monitor, Maximize2, AlignCenter, ChevronLeft, ChevronRight } from 'lucide-react';

const ContainerLayoutGenerator = () => {
  const [showSettings, setShowSettings] = useState(true);
  
  const [containerConfig, setContainerConfig] = useState({
    maxWidth: '1200px',
    paddingX: '1rem',
    paddingY: '0',
    marginX: 'auto',
    marginY: '0',
    minHeight: 'auto',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    className: 'container'
  });

  const [responsiveConfig, setResponsiveConfig] = useState({
    enableResponsive: true,
    mobile: {
      maxWidth: '100%',
      paddingX: '1rem'
    },
    tablet: {
      maxWidth: '768px',
      paddingX: '1.5rem'
    },
    desktop: {
      maxWidth: '1200px',
      paddingX: '2rem'
    }
  });

  const [containerContent, setContainerContent] = useState({
    showSampleContent: true,
    sampleType: 'text',
    customContent: 'Your content goes here...'
  });

  const [activeTab, setActiveTab] = useState('visual');

  // Generate CSS for Container component
  const generateCSS = () => {
    const { 
      maxWidth,
      paddingX,
      paddingY,
      marginX,
      marginY,
      minHeight,
      backgroundColor,
      border,
      borderRadius,
      boxShadow,
      className 
    } = containerConfig;

    const { enableResponsive, mobile, tablet, desktop } = responsiveConfig;

    const css = `:root {
  --container-max-width: ${maxWidth};
  --container-padding-x: ${paddingX};
  --container-padding-y: ${paddingY};
  --container-margin-x: ${marginX};
  --container-margin-y: ${marginY};
  --container-min-height: ${minHeight};
  --container-bg-color: ${backgroundColor};
  --container-border: ${border};
  --container-border-radius: ${borderRadius};
  --container-box-shadow: ${boxShadow};
}

.${className} {
  max-width: var(--container-max-width);
  padding-left: var(--container-padding-x);
  padding-right: var(--container-padding-x);
  padding-top: var(--container-padding-y);
  padding-bottom: var(--container-padding-y);
  margin-left: var(--container-margin-x);
  margin-right: var(--container-margin-x);
  margin-top: var(--container-margin-y);
  margin-bottom: var(--container-margin-y);
  min-height: var(--container-min-height);
  background-color: var(--container-bg-color);
  border: var(--container-border);
  border-radius: var(--container-border-radius);
  box-shadow: var(--container-box-shadow);
  width: 100%;
  box-sizing: border-box;
}

${enableResponsive ? `
/* Mobile First Approach */
@media (max-width: 767px) {
  .${className} {
    max-width: ${mobile.maxWidth};
    padding-left: ${mobile.paddingX};
    padding-right: ${mobile.paddingX};
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .${className} {
    max-width: ${tablet.maxWidth};
    padding-left: ${tablet.paddingX};
    padding-right: ${tablet.paddingX};
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .${className} {
    max-width: ${desktop.maxWidth};
    padding-left: ${desktop.paddingX};
    padding-right: ${desktop.paddingX};
  }
}
` : ''}

/* Container variations */
.${className}-fluid {
  max-width: none;
  width: 100%;
}

.${className}-narrow {
  max-width: 768px;
}

.${className}-wide {
  max-width: 1440px;
}

/* Utility classes */
.${className}-center {
  margin-left: auto;
  margin-right: auto;
}

.${className}-left {
  margin-left: 0;
  margin-right: auto;
}

.${className}-right {
  margin-left: auto;
  margin-right: 0;
}`;

    return css;
  };

  // Generate JSON structure
  const generateJSON = () => {
    return {
      component: 'Container',
      props: {
        maxWidth: containerConfig.maxWidth,
        paddingX: containerConfig.paddingX,
        paddingY: containerConfig.paddingY,
        marginX: containerConfig.marginX,
        marginY: containerConfig.marginY,
        minHeight: containerConfig.minHeight,
        backgroundColor: containerConfig.backgroundColor,
        border: containerConfig.border,
        borderRadius: containerConfig.borderRadius,
        boxShadow: containerConfig.boxShadow,
        className: containerConfig.className
      },
      responsive: responsiveConfig,
      content: containerContent
    };
  };

  // Load preset configurations
  const loadPreset = (preset: string) => {
    const presets = {
      'mobile': {
        maxWidth: '100%',
        paddingX: '1rem',
        paddingY: '1rem'
      },
      'tablet': {
        maxWidth: '768px',
        paddingX: '1.5rem',
        paddingY: '1.5rem'
      },
      'desktop': {
        maxWidth: '1200px',
        paddingX: '2rem',
        paddingY: '2rem'
      },
      'wide': {
        maxWidth: '1440px',
        paddingX: '3rem',
        paddingY: '2rem'
      },
      'narrow': {
        maxWidth: '768px',
        paddingX: '1rem',
        paddingY: '2rem'
      },
      'full': {
        maxWidth: '100%',
        paddingX: '0',
        paddingY: '0'
      },
      'card': {
        maxWidth: '600px',
        paddingX: '2rem',
        paddingY: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      'section': {
        maxWidth: '1200px',
        paddingX: '2rem',
        paddingY: '4rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0'
      }
    };

    if (presets[preset as keyof typeof presets]) {
      setContainerConfig({
        ...containerConfig,
        ...presets[preset as keyof typeof presets]
      });
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setContainerConfig({
      maxWidth: '1200px',
      paddingX: '1rem',
      paddingY: '0',
      marginX: 'auto',
      marginY: '0',
      minHeight: 'auto',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0',
      boxShadow: 'none',
      className: 'container'
    });
    setResponsiveConfig({
      enableResponsive: true,
      mobile: {
        maxWidth: '100%',
        paddingX: '1rem'
      },
      tablet: {
        maxWidth: '768px',
        paddingX: '1.5rem'
      },
      desktop: {
        maxWidth: '1200px',
        paddingX: '2rem'
      }
    });
    setContainerContent({
      showSampleContent: true,
      sampleType: 'text',
      customContent: 'Your content goes here...'
    });
  };

  // Download functions
  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'container-component.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'container-component.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSampleContent = () => {
    if (!containerContent.showSampleContent) {
      return <div className="text-gray-600">{containerContent.customContent}</div>;
    }

    switch (containerContent.sampleType) {
      case 'text':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Sample Heading</h2>
            <p className="text-gray-600 leading-relaxed">
              This is a sample paragraph demonstrating how content looks within the container. 
              The container provides proper spacing and maximum width constraints to ensure 
              optimal readability across different screen sizes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </p>
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Card {i}</h3>
                <p className="text-gray-600 text-sm">Sample card content</p>
              </div>
            ))}
          </div>
        );
      case 'hero':
        return (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Hero Section</h1>
            <p className="text-xl text-gray-600 mb-8">
              This is a sample hero section within a container
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Call to Action
            </button>
          </div>
        );
      default:
        return <div className="text-gray-600">{containerContent.customContent}</div>;
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Container Layout Generator</h2>
              <p className="text-gray-300">Every Layout Container コンポーネント生成ツール - レスポンシブ対応のコンテナレイアウト</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                showSettings 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-slate-600 text-white hover:bg-slate-700'
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
            
            {/* Container Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">Container 設定</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Width
                  </label>
                  <input
                    type="text"
                    value={containerConfig.maxWidth}
                    onChange={(e) => setContainerConfig({...containerConfig, maxWidth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="1200px"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Min Height
                  </label>
                  <input
                    type="text"
                    value={containerConfig.minHeight}
                    onChange={(e) => setContainerConfig({...containerConfig, minHeight: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="auto"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Padding X (水平)
                  </label>
                  <input
                    type="text"
                    value={containerConfig.paddingX}
                    onChange={(e) => setContainerConfig({...containerConfig, paddingX: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="1rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Padding Y (垂直)
                  </label>
                  <input
                    type="text"
                    value={containerConfig.paddingY}
                    onChange={(e) => setContainerConfig({...containerConfig, paddingY: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Margin Y (垂直)
                  </label>
                  <input
                    type="text"
                    value={containerConfig.marginY}
                    onChange={(e) => setContainerConfig({...containerConfig, marginY: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={containerConfig.className}
                    onChange={(e) => setContainerConfig({...containerConfig, className: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Visual Properties */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">ビジュアル設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Background Color
                </label>
                <input
                  type="text"
                  value={containerConfig.backgroundColor}
                  onChange={(e) => setContainerConfig({...containerConfig, backgroundColor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Border
                  </label>
                  <input
                    type="text"
                    value={containerConfig.border}
                    onChange={(e) => setContainerConfig({...containerConfig, border: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Border Radius
                  </label>
                  <input
                    type="text"
                    value={containerConfig.borderRadius}
                    onChange={(e) => setContainerConfig({...containerConfig, borderRadius: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Box Shadow
                </label>
                <select
                  value={containerConfig.boxShadow}
                  onChange={(e) => setContainerConfig({...containerConfig, boxShadow: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="none">None</option>
                  <option value="0 1px 3px rgba(0, 0, 0, 0.1)">Small</option>
                  <option value="0 4px 6px rgba(0, 0, 0, 0.1)">Medium</option>
                  <option value="0 10px 15px rgba(0, 0, 0, 0.1)">Large</option>
                  <option value="0 25px 50px rgba(0, 0, 0, 0.25)">Extra Large</option>
                </select>
              </div>
            </div>

            {/* Responsive Configuration */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">レスポンシブ設定</h3>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={responsiveConfig.enableResponsive}
                  onChange={(e) => setResponsiveConfig({...responsiveConfig, enableResponsive: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-300">Enable Responsive Breakpoints</span>
              </label>

              {responsiveConfig.enableResponsive && (
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Mobile (&lt; 768px)
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={responsiveConfig.mobile.maxWidth}
                        onChange={(e) => setResponsiveConfig({
                          ...responsiveConfig,
                          mobile: { ...responsiveConfig.mobile, maxWidth: e.target.value }
                        })}
                        className="px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Max Width"
                      />
                      <input
                        type="text"
                        value={responsiveConfig.mobile.paddingX}
                        onChange={(e) => setResponsiveConfig({
                          ...responsiveConfig,
                          mobile: { ...responsiveConfig.mobile, paddingX: e.target.value }
                        })}
                        className="px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Padding X"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <Tablet className="w-4 h-4 mr-2" />
                      Tablet (768px - 1023px)
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={responsiveConfig.tablet.maxWidth}
                        onChange={(e) => setResponsiveConfig({
                          ...responsiveConfig,
                          tablet: { ...responsiveConfig.tablet, maxWidth: e.target.value }
                        })}
                        className="px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Max Width"
                      />
                      <input
                        type="text"
                        value={responsiveConfig.tablet.paddingX}
                        onChange={(e) => setResponsiveConfig({
                          ...responsiveConfig,
                          tablet: { ...responsiveConfig.tablet, paddingX: e.target.value }
                        })}
                        className="px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Padding X"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <Monitor className="w-4 h-4 mr-2" />
                      Desktop (≥ 1024px)
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={responsiveConfig.desktop.maxWidth}
                        onChange={(e) => setResponsiveConfig({
                          ...responsiveConfig,
                          desktop: { ...responsiveConfig.desktop, maxWidth: e.target.value }
                        })}
                        className="px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Max Width"
                      />
                      <input
                        type="text"
                        value={responsiveConfig.desktop.paddingX}
                        onChange={(e) => setResponsiveConfig({
                          ...responsiveConfig,
                          desktop: { ...responsiveConfig.desktop, paddingX: e.target.value }
                        })}
                        className="px-2 py-1 border border-gray-600 bg-gray-600 text-white rounded text-sm"
                        placeholder="Padding X"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Configuration */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">サンプルコンテンツ</h3>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={containerContent.showSampleContent}
                  onChange={(e) => setContainerContent({...containerContent, showSampleContent: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-300">Show Sample Content</span>
              </label>

              {containerContent.showSampleContent && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sample Type
                  </label>
                  <select
                    value={containerContent.sampleType}
                    onChange={(e) => setContainerContent({...containerContent, sampleType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="text">Text Content</option>
                    <option value="grid">Grid Layout</option>
                    <option value="hero">Hero Section</option>
                  </select>
                </div>
              )}

              {!containerContent.showSampleContent && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Content
                  </label>
                  <textarea
                    value={containerContent.customContent}
                    onChange={(e) => setContainerContent({...containerContent, customContent: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Enter your custom content..."
                  />
                </div>
              )}
            </div>

            {/* Preset Layouts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium border-b border-gray-600 pb-2 text-white">プリセット</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset('mobile')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Smartphone className="w-4 h-4 mr-1" />
                  Mobile
                </button>
                <button
                  onClick={() => loadPreset('tablet')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Tablet className="w-4 h-4 mr-1" />
                  Tablet
                </button>
                <button
                  onClick={() => loadPreset('desktop')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Desktop
                </button>
                <button
                  onClick={() => loadPreset('wide')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Maximize2 className="w-4 h-4 mr-1" />
                  Wide
                </button>
                <button
                  onClick={() => loadPreset('narrow')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <AlignCenter className="w-4 h-4 mr-1" />
                  Narrow
                </button>
                <button
                  onClick={() => loadPreset('card')}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  <Container className="w-4 h-4 mr-1" />
                  Card
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
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 p-2 rounded-lg bg-gray-100 overflow-hidden">
                  <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                  <div className={containerConfig.className}>
                    {renderSampleContent()}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 text-center">
                  Max Width: {containerConfig.maxWidth} | Padding: {containerConfig.paddingX} | Responsive: {responsiveConfig.enableResponsive ? 'Enabled' : 'Disabled'}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerLayoutGenerator;