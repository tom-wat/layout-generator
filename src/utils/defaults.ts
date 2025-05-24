import type { LayoutComponentType } from '../types';

// デフォルトプロップス取得
export const getDefaultProps = (componentType: LayoutComponentType): Record<string, unknown> => {
  switch (componentType) {
    case 'STACK':
      return { space: '1rem', recursive: false };
    case 'GRID':
      return { minWidth: '250px', gap: '1rem', autoFit: true };
    case 'CLUSTER':
      return { space: '1rem', justify: 'flex-start', align: 'flex-start' };
    case 'BOX':
      return { padding: '1rem', border: 'none' };
    case 'CONTAINER':
      return { maxWidth: '1200px', paddingX: '1rem' };
    case 'SIDEBAR':
      return { sidebarWidth: '20rem', contentMinWidth: '50%', space: '1rem', side: 'left' };
    case 'SWITCHER':
      return { threshold: '30rem', space: '1rem' };
    case 'CENTER':
      return { maxWidth: '600px', gutters: '1rem' };
    case 'COVER':
      return { minHeight: '100vh', space: '1rem' };
    default:
      return {};
  }
};

// デフォルトセマンティック要素取得
export const getDefaultSemanticElement = (componentType: LayoutComponentType): string => {
  switch (componentType) {
    case 'CONTAINER':
      return 'div';
    case 'STACK':
      return 'div';
    case 'GRID':
      return 'div';
    case 'CLUSTER':
      return 'div';
    default:
      return 'div';
  }
};

// デフォルトデザインシステム
export const getDefaultDesignSystem = () => ({
  colors: {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#F59E0B',
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      500: '#6B7280',
      900: '#111827'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  typography: {
    fontFamilies: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Playfair Display, serif' // cspell:disable-line
    },
    fontSizes: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    }
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  }
});

// 初期セクションデータ
export const getInitialSections = () => [
  {
    id: 'header-1',
    name: 'ヘッダー',
    component: 'CONTAINER' as LayoutComponentType,
    semanticElement: 'header',
    props: {
      maxWidth: '1200px',
      paddingY: { mobile: '1rem', desktop: '1.5rem' }
    },
    children: [
      {
        id: 'nav-1',
        component: 'CLUSTER' as LayoutComponentType,
        semanticElement: 'nav',
        props: {
          justify: 'space-between',
          align: 'center',
          space: '1rem'
        },
        content: 'ロゴ | ナビゲーション | CTA'
      }
    ]
  }
];
