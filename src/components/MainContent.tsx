import React from 'react';
import { Layout, Download, FileText, Code2 } from 'lucide-react';
import type { MainContentProps, Section, PreviewMode } from '../types';
import { 
  generatePageStructureJSON, 
  generatePageStructureCSS,
  downloadPageStructureJSON,
  downloadPageStructureCSS 
} from '../utils/generators';

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
  onDownloadJSON,
  onDownloadCSS
}) => {
  // ページ構造専用のダウンロード関数
  const handleDownloadPageJSON = () => {
    downloadPageStructureJSON(sections);
  };

  const handleDownloadPageCSS = () => {
    downloadPageStructureCSS(sections);
  };
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
    const pageStructureJSON = generatePageStructureJSON(sections);
    const pageStructureCSS = generatePageStructureCSS(sections);

    return (
      <div className="h-full p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">ページ構造コード</h2>
            <p className="text-sm text-gray-400 mt-1">
              ページ構造に特化したJSON・CSSを生成（デザインシステム設定を除外）
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleDownloadPageJSON}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              ページ構造 JSON
            </button>
            <button 
              onClick={handleDownloadPageCSS}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              <Code2 className="w-4 h-4 mr-2" />
              ページ構造 CSS
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                ページ構造 JSON
              </h3>
              <div className="mb-3">
                <div className="text-xs text-gray-400 space-y-1">
                  <div>📄 セクション数: {sections.length}</div>
                  <div>🏗️ 使用コンポーネント: {[...new Set(sections.map(s => s.component))].join(', ')}</div>
                  <div>🏷️ セマンティック要素: {[...new Set(sections.map(s => s.semanticElement))].join(', ')}</div>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 rounded text-green-400 text-xs overflow-x-auto max-h-80 overflow-y-auto border border-gray-600">
                {JSON.stringify(pageStructureJSON, null, 2)}
              </pre>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <Code2 className="w-5 h-5 mr-2 text-indigo-400" />
                ページ構造 CSS
              </h3>
              <div className="mb-3">
                <div className="text-xs text-gray-400 space-y-1">
                  <div>🎨 使用されているコンポーネントのみ生成</div>
                  <div>📱 基本的なレスポンシブ対応</div>
                  <div>⚡ CSS変数を使用した柔軟な設定</div>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 rounded text-blue-400 text-xs overflow-x-auto max-h-80 overflow-y-auto border border-gray-600">
                {pageStructureCSS}
              </pre>
            </div>
          </div>
        </div>
        
        {/* 既存のフルデザインシステム出力も残す */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-white">完全版（デザインシステム含む）</h3>
              <p className="text-sm text-gray-400">
                デザインシステム設定を含む完全版のJSON・CSS
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={onDownloadJSON}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                完全版 JSON
              </button>
              <button 
                onClick={onDownloadCSS}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                完全版 CSS
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MainContent;
