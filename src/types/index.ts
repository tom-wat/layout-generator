// レイアウトコンポーネントタイプ
export const LAYOUT_COMPONENTS = {
  CONTAINER: 'Container',
  STACK: 'Stack',
  GRID: 'Grid',
  CLUSTER: 'Cluster',
  SIDEBAR: 'Sidebar',
  SWITCHER: 'Switcher',
  BOX: 'Box',
  CENTER: 'Center',
  COVER: 'Cover'
} as const;

export type LayoutComponentType = keyof typeof LAYOUT_COMPONENTS;

// セクション型定義
export interface Section {
  id: string;
  name: string;
  component: LayoutComponentType;
  semanticElement: string;
  props: Record<string, unknown>;
  children: ComponentChild[];
  content?: string;
}

export interface ComponentChild {
  id: string;
  component: LayoutComponentType;
  semanticElement: string;
  props: Record<string, unknown>;
  content: string;
  children?: ComponentChild[];
}

export interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: Record<string, string>;
  };
  spacing: Record<string, string>;
  typography: {
    fontFamilies: Record<string, string>;
    fontSizes: Record<string, string>;
  };
  breakpoints: Record<string, string>;
}

export type TabType = 'builder' | 'preview' | 'code';
export type PreviewMode = 'desktop' | 'tablet' | 'mobile';

// コンポーネントプロップス型
export interface SectionSidebarProps {
  sections: Section[];
  selectedSection: Section | null;
  selectedChild: ComponentChild | null;
  onSectionSelect: (section: Section | null) => void;
  onChildSelect: (child: ComponentChild | null) => void;
  onAddSection: (afterIndex?: number) => void;
  onRemoveSection: (sectionId: string) => void;
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void;
  onDuplicateSection: (sectionId: string) => void;
  onAddChildComponent: (sectionId: string, componentType: LayoutComponentType) => void;
  onRemoveChildComponent: (sectionId: string, childId: string) => void;
  onUpdateChildComponent: (sectionId: string, childId: string, updates: Partial<ComponentChild>) => void;
}

export interface SectionSettingsProps {
  selectedSection: Section;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  onClose: () => void;
}

export interface ChildSettingsProps {
  selectedChild: ComponentChild;
  selectedSection: Section;
  onUpdateChildComponent: (sectionId: string, childId: string, updates: Partial<ComponentChild>) => void;
  onRemoveChildComponent: (sectionId: string, childId: string) => void;
  onClose: () => void;
}

export interface MainContentProps {
  activeTab: TabType;
  previewMode: PreviewMode;
  sections: Section[];
  designSystem: DesignSystem;
  onDownloadJSON: () => void;
  onDownloadCSS: () => void;
}
