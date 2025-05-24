import React from 'react';
import { Layout, Download } from 'lucide-react';
import type { MainContentProps, Section, PreviewMode } from '../types';
import { generateJSON, generateCSS } from '../utils/generators';

// セクションプレビュー生成
const renderSectionPreview = (section: Section, previewMode: PreviewMode) => {
  const previewWidth = previewMode === 'mobile' ? '375px' : 
                      previewMode === 'tablet' ? '768px' : '100%';
  
  return (
    <div 
      key={section.id}
      className="border border-gray-300 rounded-lg mb-4 overflow-hidden bg-white shadow-sm"
      style={{ maxWidth: previewWidth }}
    >
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {section.name} ({section.component})
          </span>
          <span className="text-xs text-gray-500">
            {section.semanticElement}
          </span>
        </div>
      </div>
      <div className="p-4">
        {section.children.length > 0 ? (
          <div className="space-y-3">
            {section.children.map(child => (
              <div key={child.id} className="bg-gray-50 rounded p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">
                  {child.component} ({child.semanticElement})
                </div>
                <div className="text-sm">{child.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-200 rounded">
            {section.content || `${section.name}のコンテンツがここに表示されます`}
          </div>
        )}
      </div>
    </div>
  );
};

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  previewMode,
  sections,
  designSystem,
  onDownloadJSON,
  onDownloadCSS
}) => {
  if (activeTab === 'builder') {
    return (
      <div className="h-full p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-4">ページプレビュー</h2>
        <div className="bg-white rounded-lg p-6 min-h-96">
          {sections.length > 0 ? (
            sections.map(section => renderSectionPreview(section, previewMode))
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>セクションを追加してページを構築してください</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === 'preview') {
    return (
      <div className="h-full p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">フルプレビュー</h2>
          <div className="text-sm text-gray-400">
            {previewMode === 'mobile' && '375px (Mobile)'}
            {previewMode === 'tablet' && '768px (Tablet)'}
            {previewMode === 'desktop' && '100% (Desktop)'}
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden" style={{ 
          maxWidth: previewMode === 'mobile' ? '375px' : 
                    previewMode === 'tablet' ? '768px' : '100%',
          margin: '0 auto'
        }}>
          {sections.map(section => renderSectionPreview(section, previewMode))}
        </div>
      </div>
    );
  }

  if (activeTab === 'code') {
    const jsonData = generateJSON(sections, designSystem);
    const cssCode = generateCSS(designSystem);

    return (
      <div className="h-full p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">生成されたコード</h2>
          <div className="flex space-x-3">
            <button 
              onClick={onDownloadJSON}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              JSON
            </button>
            <button 
              onClick={onDownloadCSS}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              CSS
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">JSON構造</h3>
            <pre className="bg-gray-800 p-4 rounded-lg text-green-400 text-sm overflow-x-auto max-h-96 overflow-y-auto border border-gray-700">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-3">CSS</h3>
            <pre className="bg-gray-800 p-4 rounded-lg text-blue-400 text-sm overflow-x-auto max-h-96 overflow-y-auto border border-gray-700">
              {cssCode}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MainContent;
