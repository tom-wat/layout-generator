import type { Section, DesignSystem, ModularSystemConfig, GeneratedSizes, SizeUnit } from '../types';

// モジュラーシステムからサイズスケールを生成
export const generateModularScale = (
  baseSize: number, 
  ratio: number, 
  steps: number, 
  direction: 'up' | 'both' = 'both'
): number[] => {
  const sizes: number[] = [];
  
  if (direction === 'both') {
    // 下方向のサイズも生成
    for (let i = -2; i <= steps; i++) {
      sizes.push(baseSize * Math.pow(ratio, i));
    }
  } else {
    // 上方向のみ
    for (let i = 0; i <= steps; i++) {
      sizes.push(baseSize * Math.pow(ratio, i));
    }
  }
  
  return sizes;
};

// モジュラーシステム設定からGeneratedSizesを生成
export const generateSizesFromModularSystem = (config: ModularSystemConfig): GeneratedSizes => {
  const sizeLabels = {
    fontSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
  };

  const fontSizes = generateModularScale(config.baseFontSize, config.fontScale.ratio, config.steps - 3, 'both');
  const spacingSizes = generateModularScale(config.baseSpacing, config.spacingScale.ratio, config.steps - 1, 'up');

  const fontSizeObject: Record<string, string> = {};
  const spacingObject: Record<string, string> = {};

  // 単位変換用のヘルパー関数
  const formatValue = (size: number, unit: SizeUnit, baseSize?: number): string => {
    switch (unit) {
      case 'px':
        return `${Math.round(size * 100) / 100}px`;
      case 'rem':
        // 16px = 1rem をベースとして計算
        return `${Math.round((size / 16) * 1000) / 1000}rem`;
      case 'em':
        // ベースサイズを参考に計算
        {const base = baseSize || 16;
        return `${Math.round((size / base) * 1000) / 1000}em`;}
      default:
        return `${Math.round(size * 100) / 100}px`;
    }
  };

  // フォントサイズをオブジェクトに変換
  fontSizes.forEach((size, index) => {
    if (index < sizeLabels.fontSizes.length) {
      fontSizeObject[sizeLabels.fontSizes[index]] = formatValue(size, config.fontUnit, config.baseFontSize);
    }
  });

  // スペーシングをオブジェクトに変換
  spacingSizes.forEach((size, index) => {
    if (index < sizeLabels.spacing.length) {
      spacingObject[sizeLabels.spacing[index]] = formatValue(size, config.spacingUnit, config.baseSpacing);
    }
  });

  return {
    fontSizes: fontSizeObject,
    spacing: spacingObject
  };
};

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

// CSS生成（モジュラーシステム対応）
export const generateCSS = (designSystem: DesignSystem) => {
  const { colors, typography, breakpoints } = designSystem;
  
  // 生成されたサイズを使用（利用可能な場合）
  let spacing = designSystem.spacing;
  let fontSizes = typography.fontSizes;
  
  if (designSystem.modularSystem && designSystem.generatedSizes) {
    spacing = designSystem.generatedSizes.spacing;
    fontSizes = designSystem.generatedSizes.fontSizes;
  }
  
  return `:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-neutral-50: ${colors.neutral[50] || '#F9FAFB'};
  --color-neutral-100: ${colors.neutral[100] || '#F3F4F6'};
  --color-neutral-500: ${colors.neutral[500] || '#6B7280'};
  --color-neutral-900: ${colors.neutral[900] || '#111827'};
  
  /* Spacing Scale */
${Object.entries(spacing).map(([key, value]) => `  --space-${key}: ${value};`).join('\n')}
  
  /* Typography Scale */
  --font-sans: ${typography.fontFamilies.sans || 'Inter, system-ui, sans-serif'};
  --font-serif: ${typography.fontFamilies.serif || 'Playfair Display, serif'};
${Object.entries(fontSizes).map(([key, value]) => `  --text-${key}: ${value};`).join('\n')}
  
  /* Breakpoints */
${Object.entries(breakpoints).map(([key, value]) => `  --breakpoint-${key}: ${value};`).join('\n')}
}

/* Reset & Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  color: var(--color-neutral-900);
  font-size: var(--text-base);
}

/* Layout Primitives */
.layout-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding-x, var(--space-md));
  padding-right: var(--container-padding-x, var(--space-md));
}

.layout-stack {
  display: flex;
  flex-direction: column;
}

.layout-stack > * + * {
  margin-top: var(--stack-space, var(--space-md));
}

.layout-grid {
  display: grid;
  gap: var(--grid-gap, var(--space-md));
  grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-width, 250px), 1fr));
}

.layout-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space, var(--space-md));
  justify-content: var(--cluster-justify, flex-start);
  align-items: var(--cluster-align, flex-start);
}

.layout-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-space, var(--space-md));
}

.layout-sidebar > :first-child {
  flex-basis: var(--sidebar-width, 20rem);
  flex-grow: 1;
}

.layout-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: var(--sidebar-content-min-width, 50%);
}

.layout-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--switcher-space, var(--space-md));
}

.layout-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-threshold, 30rem) - 100%) * 999);
}

.layout-center {
  box-sizing: content-box;
  max-width: var(--center-max-width, 60ch);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--center-gutters, var(--space-md));
  padding-right: var(--center-gutters, var(--space-md));
}

.layout-cover {
  display: flex;
  flex-direction: column;
  min-height: var(--cover-min-height, 100vh);
  padding: var(--cover-space, var(--space-md));
}

.layout-cover > * {
  margin-top: var(--cover-space, var(--space-md));
  margin-bottom: var(--cover-space, var(--space-md));
}

.layout-cover > :first-child:not(.cover-centered) {
  margin-top: 0;
}

.layout-cover > :last-child:not(.cover-centered) {
  margin-bottom: 0;
}

.layout-cover > .cover-centered {
  margin-top: auto;
  margin-bottom: auto;
}

/* Responsive Typography */
@media (min-width: var(--breakpoint-tablet)) {
  .responsive-text {
    font-size: var(--text-lg);
  }
}

@media (min-width: var(--breakpoint-desktop)) {
  .responsive-text {
    font-size: var(--text-xl);
  }
}

/* Utility Classes */
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }
.text-5xl { font-size: var(--text-5xl); }
.text-6xl { font-size: var(--text-6xl); }

.space-xs { --space: var(--space-xs); }
.space-sm { --space: var(--space-sm); }
.space-md { --space: var(--space-md); }
.space-lg { --space: var(--space-lg); }
.space-xl { --space: var(--space-xl); }
.space-2xl { --space: var(--space-2xl); }
.space-3xl { --space: var(--space-3xl); }
.space-4xl { --space: var(--space-4xl); }
.space-5xl { --space: var(--space-5xl); }
.space-6xl { --space: var(--space-6xl); }`;
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
