import React from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Settings, 
  Move,
  Copy,
  Package
} from 'lucide-react';
import type { SectionSidebarProps } from '../types';
import { LAYOUT_COMPONENTS } from '../types';

const SectionSidebar: React.FC<SectionSidebarProps> = ({
  sections,
  selectedSection,
  selectedChild,
  onSectionSelect,
  onChildSelect,
  onAddSection,
  onRemoveSection,
  onMoveSection,
  onDuplicateSection,
  onAddChildComponent,
  onRemoveChildComponent,
  onUpdateChildComponent
}) => {
  return (
    <div className="w-96 bg-gray-900 border-r border-gray-700 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">ページ構造</h2>
        
        {/* セクション一覧 */}
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isExpanded = selectedSection?.id === section.id;
            const currentSection = sections.find(s => s.id === section.id) || section;
            
            return (
              <div key={section.id} className="bg-gray-700 rounded-lg border border-gray-600">
                {/* セクションヘッダー */}
                <div
                  className={`p-3 cursor-pointer transition-all ${
                    isExpanded
                      ? 'bg-blue-900/20 border-b border-gray-600'
                      : 'hover:bg-gray-600'
                  }`}
                  onClick={() => onSectionSelect(isExpanded ? null : section)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0">
                      <Move className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-white font-medium truncate">{section.name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateSection(section.id);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        title="複製"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveSection(section.id, 'up');
                        }}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        title="上へ移動"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveSection(section.id, 'down');
                        }}
                        disabled={index === sections.length - 1}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        title="下へ移動"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSection(section.id);
                        }}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="削除"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
                    <span>{section.component} • {section.children.length} 要素</span>
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronUp className="w-3 h-3" />
                    )}
                  </div>
                </div>

                {/* 子要素管理エリア（展開時） */}
                {isExpanded && (
                  <div className="p-3 bg-gray-800/50">
                    {/* 要素追加ボタン群 */}
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-gray-300 mb-2">要素追加</h4>
                      <div className="grid grid-cols-3 gap-1">
                        {Object.keys(LAYOUT_COMPONENTS).map(componentKey => {
                          const componentType = componentKey as keyof typeof LAYOUT_COMPONENTS;
                          const displayName = LAYOUT_COMPONENTS[componentType];
                          return (
                            <button
                              key={componentType}
                              onClick={() => onAddChildComponent(section.id, componentType)}
                              className="px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors border border-gray-600"
                              title={`${displayName}を追加`}
                            >
                              {displayName}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 子要素一覧 */}
                    <div>
                      <h4 className="text-xs font-medium text-gray-300 mb-2">要素一覧</h4>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {currentSection.children.map((child, childIndex) => {
                          const isChildSelected = selectedChild?.id === child.id;
                          
                          return (
                            <div key={child.id} className={`border rounded transition-all ${
                              isChildSelected 
                                ? 'border-blue-400 bg-blue-900/20' 
                                : 'border-gray-600 bg-gray-700'
                            }`}>
                              {/* 子要素基本情報 */}
                              <div className="p-2">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center space-x-2 min-w-0">
                                    <span className="text-xs text-gray-400 font-mono">#{childIndex + 1}</span>
                                    <span className="text-xs text-white font-medium truncate">
                                      {child.component}
                                    </span>
                                    <span className="text-xs text-gray-400">({child.semanticElement})</span>
                                  </div>
                                  <div className="flex items-center space-x-1 flex-shrink-0">
                                    <button
                                      onClick={() => onChildSelect(isChildSelected ? null : child)}
                                      className={`p-1 transition-colors ${
                                        isChildSelected 
                                          ? 'text-blue-400 hover:text-blue-300' 
                                          : 'text-gray-400 hover:text-blue-400'
                                      }`}
                                      title={isChildSelected ? '詳細設定を閉じる' : '詳細設定を開く'}
                                    >
                                      <Settings className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => onRemoveChildComponent(section.id, child.id)}
                                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                      title="削除"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* コンテンツ編集 */}
                                <input
                                  type="text"
                                  value={child.content}
                                  onChange={(e) => {
                                    onUpdateChildComponent(section.id, child.id, { content: e.target.value });
                                  }}
                                  className="w-full px-2 py-1 text-xs bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  placeholder="コンテンツ"
                                />
                                
                                {/* 簡略情報 */}
                                {isChildSelected && (
                                  <div className="mt-2 p-2 bg-blue-900/10 border border-blue-700/30 rounded text-xs text-blue-300">
                                    <div className="flex items-center justify-center space-x-2">
                                      <Settings className="w-3 h-3" />
                                      <span>詳細設定は右パネルで編集できます</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {currentSection.children.length === 0 && (
                          <div className="text-center text-gray-500 py-4 border-2 border-dashed border-gray-600 rounded">
                            <Package className="w-6 h-6 mx-auto mb-1 opacity-50" />
                            <p className="text-xs">要素がありません</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          <button
            onClick={() => onAddSection()}
            className="w-full p-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            セクション追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionSidebar;
