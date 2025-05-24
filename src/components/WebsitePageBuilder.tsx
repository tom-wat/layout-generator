import React, { useState, useCallback } from 'react';
import { 
  Layout,
  Eye,
  Code,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

// 分離したコンポーネントとユーティリティをインポート
import SectionSidebar from './SectionSidebar';
import SectionSettings from './SectionSettings';
import ChildSettings from './ChildSettings';
import MainContent from './MainContent';

import type { 
  Section, 
  ComponentChild, 
  DesignSystem, 
  TabType, 
  PreviewMode,
  LayoutComponentType 
} from '../types';

import { 
  getDefaultProps, 
  getDefaultSemanticElement, 
  getDefaultDesignSystem,
  getInitialSections 
} from '../utils/defaults';

import { 
  generateJSON, 
  generateCSS, 
  downloadJSON, 
  downloadCSS 
} from '../utils/generators';

const WebsitePageBuilder: React.FC = () => {
  // 状態管理
  const [sections, setSections] = useState<Section[]>(getInitialSections());
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedChild, setSelectedChild] = useState<ComponentChild | null>(null);
  const [designSystem] = useState<DesignSystem>(getDefaultDesignSystem());
  // TODO: デザインシステム更新機能を実装する場合は setDesignSystem を使用
  // const [designSystem, setDesignSystem] = useState<DesignSystem>(getDefaultDesignSystem());
  const [activeTab, setActiveTab] = useState<TabType>('builder');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  // セクション操作関数
  const addSection = useCallback((afterIndex = -1) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      name: '新しいセクション',
      component: 'CONTAINER',
      semanticElement: 'section',
      props: {
        maxWidth: '1200px',
        paddingY: { mobile: '1.5rem', desktop: '2rem' }
      },
      children: []
    };

    setSections(prev => {
      const newSections = [...prev];
      if (afterIndex === -1) {
        newSections.push(newSection);
      } else {
        newSections.splice(afterIndex + 1, 0, newSection);
      }
      return newSections;
    });
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
    if (selectedSection?.id === sectionId) {
      setSelectedSection(null);
    }
  }, [selectedSection]);

  const moveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const currentIndex = prev.findIndex(s => s.id === sectionId);
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newSections = [...prev];
      [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];
      return newSections;
    });
  }, []);

  const duplicateSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const duplicated: Section = {
      ...section,
      id: `${section.id}-copy-${Date.now()}`,
      name: `${section.name} (コピー)`,
      children: section.children.map(child => ({
        ...child,
        id: `${child.id}-copy-${Date.now()}`
      }))
    };

    setSections(prev => {
      const index = prev.findIndex(s => s.id === sectionId);
      const newSections = [...prev];
      newSections.splice(index + 1, 0, duplicated);
      return newSections;
    });
  }, [sections]);

  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, ...updates }
          : section
      )
    );
    // 選択中のセクションも更新
    if (selectedSection?.id === sectionId) {
      setSelectedSection(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedSection]);

  // 子要素操作関数
  const addChildComponent = useCallback((sectionId: string, componentType: LayoutComponentType) => {
    const newChild: ComponentChild = {
      id: `child-${Date.now()}`,
      component: componentType,
      semanticElement: getDefaultSemanticElement(componentType),
      props: getDefaultProps(componentType),
      content: `${componentType} コンテンツ`
    };

    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, children: [...section.children, newChild] }
          : section
      )
    );
    
    // 選択中のセクションも更新
    if (selectedSection?.id === sectionId) {
      setSelectedSection(prev => prev ? {
        ...prev,
        children: [...prev.children, newChild]
      } : null);
    }
  }, [selectedSection]);

  const removeChildComponent = useCallback((sectionId: string, childId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, children: section.children.filter(child => child.id !== childId) }
          : section
      )
    );
    
    // 選択中のセクションも更新
    if (selectedSection?.id === sectionId) {
      setSelectedSection(prev => prev ? {
        ...prev,
        children: prev.children.filter(child => child.id !== childId)
      } : null);
    }
    
    // 削除された子要素が選択中だった場合、選択を解除
    if (selectedChild?.id === childId) {
      setSelectedChild(null);
    }
  }, [selectedSection, selectedChild]);

  const updateChildComponent = useCallback((sectionId: string, childId: string, updates: Partial<ComponentChild>) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
              ...section,
              children: section.children.map(child =>
                child.id === childId ? { ...child, ...updates } : child
              )
            }
          : section
      )
    );
    
    // 選択中のセクションも更新
    if (selectedSection?.id === sectionId) {
      setSelectedSection(prev => prev ? {
        ...prev,
        children: prev.children.map(child =>
          child.id === childId ? { ...child, ...updates } : child
        )
      } : null);
    }
    
    // 選択中の子要素も更新
    if (selectedChild?.id === childId) {
      setSelectedChild(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedSection, selectedChild]);

  // ダウンロード関数
  const handleDownloadJSON = useCallback(() => {
    const json = generateJSON(sections, designSystem);
    downloadJSON(json);
  }, [sections, designSystem]);

  const handleDownloadCSS = useCallback(() => {
    const css = generateCSS(designSystem);
    downloadCSS(css);
  }, [designSystem]);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* ヘッダー */}
      <div className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">Website Page Builder</h1>
            <div className="text-sm text-gray-400">
              {sections.length} セクション
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* プレビューモード切替 */}
            {activeTab === 'preview' && (
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {/* タブ切替 */}
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('builder')}
                className={`flex items-center px-3 py-2 rounded ${
                  activeTab === 'builder' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Layout className="w-4 h-4 mr-1" />
                ビルダー
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center px-3 py-2 rounded ${
                  activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                プレビュー
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-3 py-2 rounded ${
                  activeTab === 'code' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4 mr-1" />
                コード
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen max-w-7xl mx-auto">
        {/* サイドパネル - セクション管理 */}
        <SectionSidebar
          sections={sections}
          selectedSection={selectedSection}
          selectedChild={selectedChild}
          onSectionSelect={setSelectedSection}
          onChildSelect={setSelectedChild}
          onAddSection={addSection}
          onRemoveSection={removeSection}
          onMoveSection={moveSection}
          onDuplicateSection={duplicateSection}
          onAddChildComponent={addChildComponent}
          onRemoveChildComponent={removeChildComponent}
          onUpdateChildComponent={updateChildComponent}
        />

        {/* セクション設定パネル */}
        {selectedSection && !selectedChild && (
          <SectionSettings
            selectedSection={selectedSection}
            onUpdateSection={updateSection}
            onClose={() => setSelectedSection(null)}
          />
        )}

        {/* 子要素設定パネル */}
        {selectedChild && selectedSection && (
          <ChildSettings
            selectedChild={selectedChild}
            selectedSection={selectedSection}
            onUpdateChildComponent={updateChildComponent}
            onRemoveChildComponent={removeChildComponent}
            onClose={() => setSelectedChild(null)}
          />
        )}

        {/* メインコンテンツエリア */}
        <div className="flex-1 overflow-hidden">
          <MainContent
            activeTab={activeTab}
            previewMode={previewMode}
            sections={sections}
            designSystem={designSystem}
            onDownloadJSON={handleDownloadJSON}
            onDownloadCSS={handleDownloadCSS}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsitePageBuilder;
