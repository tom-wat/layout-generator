import type { Section, DesignSystem } from '../types';

// JSON生成
export const generateJSON = (sections: Section[], designSystem: DesignSystem) => {
  return {
    meta: {
      title: 'Generated Website',
      description: 'Website generated with layout builder',
      language: 'ja'
    },
    designSystem,
    layout: {
      structure: sections.map(section => ({
        id: section.id,
        component: section.component,
        semanticElement: section.semanticElement,
        props: section.props,
        content: section.children.length > 0 ? section.children : section.content || `${section.name}のコンテンツ`,
        accessibility: {
          ariaLabel: section.semanticElement === 'header' ? 'サイトヘッダー' : 
                    section.semanticElement === 'footer' ? 'サイトフッター' : 
                    section.name
        }
      }))
    },
    content: {
      sections: sections.reduce((acc, section) => {
        acc[section.id] = {
          title: section.name,
          content: section.content || `${section.name}のコンテンツがここに入ります。`
        };
        return acc;
      }, {} as Record<string, { title: string; content: string }>)
    }
  };
};

// CSS生成
export const generateCSS = (designSystem: DesignSystem) => {
  const { colors, spacing, typography } = designSystem;
  
  return `:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-neutral-50: ${colors.neutral[50]};
  --color-neutral-100: ${colors.neutral[100]};
  --color-neutral-500: ${colors.neutral[500]};
  --color-neutral-900: ${colors.neutral[900]};
  
  /* Spacing */
  --space-xs: ${spacing.xs};
  --space-sm: ${spacing.sm};
  --space-md: ${spacing.md};
  --space-lg: ${spacing.lg};
  --space-xl: ${spacing.xl};
  --space-2xl: ${spacing['2xl']};
  
  /* Typography */
  --font-sans: ${typography.fontFamilies.sans};
  --font-serif: ${typography.fontFamilies.serif};
  --text-sm: ${typography.fontSizes.sm};
  --text-base: ${typography.fontSizes.base};
  --text-lg: ${typography.fontSizes.lg};
  --text-xl: ${typography.fontSizes.xl};
  --text-2xl: ${typography.fontSizes['2xl']};
  --text-3xl: ${typography.fontSizes['3xl']};
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  color: var(--color-neutral-900);
}

.layout-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding-x, 1rem);
  padding-right: var(--container-padding-x, 1rem);
}

.layout-stack {
  display: flex;
  flex-direction: column;
}

.layout-stack > * + * {
  margin-top: var(--stack-space, 1rem);
}

.layout-grid {
  display: grid;
  gap: var(--grid-gap, 1rem);
  grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-width, 250px), 1fr));
}

.layout-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space, 1rem);
  justify-content: var(--cluster-justify, flex-start);
  align-items: var(--cluster-align, flex-start);
}`;
};

// ダウンロード機能
interface WebsiteData {
  meta: {
    title: string;
    description: string;
    language: string;
  };
  designSystem: DesignSystem;
  layout: {
    structure: Array<{
      id: string;
      component: string;
      semanticElement: string;
      props: Record<string, unknown>;
      content: unknown;
      accessibility: {
        ariaLabel: string;
      };
    }>;
  };
  content: {
    sections: Record<string, { title: string; content: string }>;
  };
}

export const downloadJSON = (data: WebsiteData, filename = 'website-structure.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadCSS = (css: string, filename = 'website-styles.css') => {
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
