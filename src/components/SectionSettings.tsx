import React from 'react';
import { Settings, ChevronUp } from 'lucide-react';
import type { SectionSettingsProps } from '../types';
import { LAYOUT_COMPONENTS } from '../types';
import { getDefaultProps } from '../utils/defaults';

const SectionSettings: React.FC<SectionSettingsProps> = ({
  selectedSection,
  onUpdateSection,
  onClose
}) => {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            <Settings className="w-5 h-5 inline mr-2" />
            セクション設定
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="閉じる"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
        
        {/* セクション基本設定 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              セクション名
            </label>
            <input
              type="text"
              value={selectedSection.name}
              onChange={(e) => onUpdateSection(selectedSection.id, { name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="セクションの名前"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              レイアウトコンポーネント
            </label>
            <select
              value={selectedSection.component}
              onChange={(e) => {
                const newComponent = e.target.value as keyof typeof LAYOUT_COMPONENTS;
                onUpdateSection(selectedSection.id, { 
                  component: newComponent,
                  props: getDefaultProps(newComponent)
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
              HTML要素
            </label>
            <select
              value={selectedSection.semanticElement}
              onChange={(e) => onUpdateSection(selectedSection.id, { semanticElement: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="section">section</option>
              <option value="header">header</option>
              <option value="main">main</option>
              <option value="aside">aside</option>
              <option value="footer">footer</option>
              <option value="nav">nav</option>
              <option value="div">div</option>
            </select>
          </div>
          
          {/* セクションコンテンツ */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              コンテンツ
            </label>
            <textarea
              value={selectedSection.content || ''}
              onChange={(e) => onUpdateSection(selectedSection.id, { content: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              placeholder="セクションのコンテンツ（子要素がない場合に表示）"
            />
          </div>

          {/* セクション固有のプロパティ */}
          {selectedSection.component === 'CONTAINER' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Container 設定
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Max Width
                </label>
                <input
                  type="text"
                  value={String(selectedSection.props?.maxWidth ?? '1200px')}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, maxWidth: e.target.value } 
                    });
                  }}
                  className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1200px"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Padding X
                </label>
                <input
                  type="text"
                  value={String(selectedSection.props?.paddingX ?? '1rem')}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, paddingX: e.target.value } 
                    });
                  }}
                  className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
            </div>
          )}
          
          {selectedSection.component === 'STACK' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Stack 設定
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Space
                </label>
                <input
                  type="text"
                  value={String(selectedSection.props?.space ?? '1rem')}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, space: e.target.value } 
                    });
                  }}
                  className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="section-recursive"
                  checked={Boolean(selectedSection.props?.recursive)}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, recursive: e.target.checked } 
                    });
                  }}
                  className="mr-2"
                />
                <label htmlFor="section-recursive" className="text-sm text-gray-300">
                  Recursive
                </label>
              </div>
            </div>
          )}
          
          {selectedSection.component === 'GRID' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                Grid 設定
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Min Width
                </label>
                <input
                  type="text"
                  value={String(selectedSection.props?.minWidth ?? '250px')}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, minWidth: e.target.value } 
                    });
                  }}
                  className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="250px"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Gap
                </label>
                <input
                  type="text"
                  value={String(selectedSection.props?.gap ?? '1rem')}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, gap: e.target.value } 
                    });
                  }}
                  className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1rem"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="section-autoFit"
                  checked={Boolean(selectedSection.props?.autoFit ?? true)}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, { 
                      props: { ...selectedSection.props, autoFit: e.target.checked } 
                    });
                  }}
                  className="mr-2"
                />
                <label htmlFor="section-autoFit" className="text-sm text-gray-300">
                  Auto Fit
                </label>
              </div>
            </div>
          )}

          {/* 統計情報 */}
          <div className="mt-6 p-3 bg-gray-700/50 rounded border border-gray-600">
            <h3 className="text-sm font-medium text-gray-300 mb-2">統計情報</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <div>子要素数: {selectedSection.children.length}</div>
              <div>コンポーネント: {selectedSection.component}</div>
              <div>HTML要素: {selectedSection.semanticElement}</div>
            </div>
          </div>
          
          {/* ヘルプテキスト */}
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded">
            <div className="text-xs text-blue-300">
              <strong>ヒント:</strong> 子要素の詳細設定は、子要素を選択した後に右側の設定パネルで行えます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSettings;
