import React from 'react';
import { Edit3, ChevronUp, Trash2 } from 'lucide-react';
import type { ChildSettingsProps } from '../types';
import { LAYOUT_COMPONENTS } from '../types';
import { getDefaultProps, getDefaultSemanticElement } from '../utils/defaults';

const ChildSettings: React.FC<ChildSettingsProps> = ({
  selectedChild,
  selectedSection,
  onUpdateChildComponent,
  onRemoveChildComponent,
  onClose
}) => {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            <Edit3 className="w-5 h-5 inline mr-2" />
            子要素設定
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="閉じる"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
        
        {/* 子要素詳細設定 */}
        <div className="space-y-4">
          {/* 基本情報 */}
          <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
            <h3 className="text-sm font-medium text-gray-300 mb-2">基本情報</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <div>ID: {selectedChild.id}</div>
              <div>親セクション: {selectedSection?.name}</div>
            </div>
          </div>

          {/* コンテンツ編集 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              コンテンツ
            </label>
            <textarea
              value={selectedChild.content}
              onChange={(e) => {
                onUpdateChildComponent(selectedSection.id, selectedChild.id, { content: e.target.value });
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              placeholder="子要素のコンテンツ"
            />
          </div>

          {/* コンポーネントタイプ */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">コンポーネント</label>
              <select
                value={selectedChild.component}
                onChange={(e) => {
                  const newComponentType = e.target.value as keyof typeof LAYOUT_COMPONENTS;
                  onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                    component: newComponentType,
                    semanticElement: getDefaultSemanticElement(newComponentType),
                    props: getDefaultProps(newComponentType)
                  });
                }}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(LAYOUT_COMPONENTS).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">HTML要素</label>
              <select
                value={selectedChild.semanticElement}
                onChange={(e) => {
                  onUpdateChildComponent(selectedSection.id, selectedChild.id, { semanticElement: e.target.value });
                }}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="div">div</option>
                <option value="section">section</option>
                <option value="article">article</option>
                <option value="aside">aside</option>
                <option value="header">header</option>
                <option value="footer">footer</option>
                <option value="nav">nav</option>
                <option value="main">main</option>
                <option value="p">p</option>
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
              </select>
            </div>
          </div>
          
          {/* コンポーネント固有プロパティ */}
          {selectedChild.component === 'STACK' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Stack 設定
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Space</label>
                <input
                  type="text"
                  value={String(selectedChild.props?.space ?? '1rem')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, space: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`recursive-child-${selectedChild.id}`}
                  checked={Boolean(selectedChild.props?.recursive)}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, recursive: e.target.checked } 
                    });
                  }}
                  className="mr-2"
                />
                <label htmlFor={`recursive-child-${selectedChild.id}`} className="text-sm text-gray-300">
                  Recursive
                </label>
              </div>
            </div>
          )}
          
          {selectedChild.component === 'GRID' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Grid 設定
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Min Width</label>
                <input
                  type="text"
                  value={String(selectedChild.props?.minWidth ?? '250px')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, minWidth: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="250px"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gap</label>
                <input
                  type="text"
                  value={String(selectedChild.props?.gap ?? '1rem')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, gap: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`autoFit-child-${selectedChild.id}`}
                  checked={Boolean(selectedChild.props?.autoFit ?? true)}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, autoFit: e.target.checked } 
                    });
                  }}
                  className="mr-2"
                />
                <label htmlFor={`autoFit-child-${selectedChild.id}`} className="text-sm text-gray-300">
                  Auto Fit
                </label>
              </div>
            </div>
          )}
          
          {selectedChild.component === 'CLUSTER' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Cluster 設定
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Space</label>
                <input
                  type="text"
                  value={String(selectedChild.props?.space ?? '1rem')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, space: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Justify</label>
                <select
                  value={String(selectedChild.props?.justify ?? 'flex-start')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, justify: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="space-between">Between</option>
                  <option value="space-around">Around</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Align</label>
                <select
                  value={String(selectedChild.props?.align ?? 'flex-start')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, align: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>
            </div>
          )}

          {selectedChild.component === 'BOX' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Box 設定
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Padding</label>
                <input
                  type="text"
                  value={String(selectedChild.props?.padding ?? '1rem')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, padding: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Border</label>
                <input
                  type="text"
                  value={String(selectedChild.props?.border ?? 'none')}
                  onChange={(e) => {
                    onUpdateChildComponent(selectedSection.id, selectedChild.id, { 
                      props: { ...selectedChild.props, border: e.target.value } 
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="none"
                />
              </div>
            </div>
          )}

          {/* 削除ボタン */}
          <div className="pt-4 border-t border-gray-600">
            <button
              onClick={() => {
                onRemoveChildComponent(selectedSection.id, selectedChild.id);
              }}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              子要素を削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildSettings;
