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
    // 下方向と上方向のサイズを生成（より幅広い範囲）
    const downSteps = Math.ceil(steps / 2) + 3; // 下方向により多くのステップ
    const upSteps = steps + 3; // 上方向にも十分なステップ
    
    for (let i = -downSteps; i <= upSteps; i++) {
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
    fontSizes: [
      'xxs', 'xs', 'xs-plus', 'sm', 'sm-plus', 'base', 'base-plus', 'lg', 'xl', 
      '2xl', '3xl', '4xl', '5xl', '6xl'
    ],
    spacing: [
      'xxs', 'xs', 'xs-plus', 'sm', 'sm-plus', 'md', 'md-plus', 'lg', 'xl', 
      '2xl', '3xl', '4xl', '5xl', '6xl'
    ]
  };

  // 十分な数のサイズを生成（ラベル数より多く生成）
  const fontSteps = Math.max(config.steps, sizeLabels.fontSizes.length + 3);
  const spacingSteps = Math.max(config.steps, sizeLabels.spacing.length + 3);
  
  const fontSizes = generateModularScale(config.baseFontSize, config.fontScale.ratio, fontSteps, 'both');
  const spacingSizes = generateModularScale(config.baseSpacing, config.spacingScale.ratio, spacingSteps, 'both');

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

  // フォントサイズをオブジェクトに変換（baseが基準値になるように調整）
  const baseIndex = sizeLabels.fontSizes.indexOf('base'); // 5
  // 生成された配列での基準値の位置を找す（基準サイズに最も近い値）
  let fontBaseArrayIndex = 0;
  let minDiff = Math.abs(fontSizes[0] - config.baseFontSize);
  for (let i = 1; i < fontSizes.length; i++) {
    const diff = Math.abs(fontSizes[i] - config.baseFontSize);
    if (diff < minDiff) {
      minDiff = diff;
      fontBaseArrayIndex = i;
    }
  }
  
  sizeLabels.fontSizes.forEach((label, index) => {
    const arrayIndex = fontBaseArrayIndex + (index - baseIndex);
    if (arrayIndex >= 0 && arrayIndex < fontSizes.length) {
      fontSizeObject[label] = formatValue(fontSizes[arrayIndex], config.fontUnit, config.baseFontSize);
    }
  });

  // スペーシングをオブジェクトに変換（mdが基準値になるように調整）
  const mdIndex = sizeLabels.spacing.indexOf('md'); // 4
  // 生成された配列での基準値の位置を找す（基準サイズに最も近い値）
  let spacingBaseArrayIndex = 0;
  let minSpacingDiff = Math.abs(spacingSizes[0] - config.baseSpacing);
  for (let i = 1; i < spacingSizes.length; i++) {
    const diff = Math.abs(spacingSizes[i] - config.baseSpacing);
    if (diff < minSpacingDiff) {
      minSpacingDiff = diff;
      spacingBaseArrayIndex = i;
    }
  }
  
  sizeLabels.spacing.forEach((label, index) => {
    const arrayIndex = spacingBaseArrayIndex + (index - mdIndex);
    if (arrayIndex >= 0 && arrayIndex < spacingSizes.length) {
      spacingObject[label] = formatValue(spacingSizes[arrayIndex], config.spacingUnit, config.baseSpacing);
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

// CSS変数を計算式で生成（基準値と比率を使用）
export const generateCalculatedCSSVariables = (
  config: ModularSystemConfig,
  generatedSizes: GeneratedSizes
): { fontVariables: string; spacingVariables: string } => {
  const baseFontSizeVar = `--base-font-size: ${config.baseFontSize}px;`;
  const fontRatioVar = `--font-ratio: ${config.fontScale.ratio};`;
  const baseSpacingVar = `--base-spacing: ${config.baseSpacing}px;`;
  const spacingRatioVar = `--spacing-ratio: ${config.spacingScale.ratio};`;

  // フォントサイズの計算式を生成
  const fontCalculations: string[] = [baseFontSizeVar, fontRatioVar];
  const spacingCalculations: string[] = [baseSpacingVar, spacingRatioVar];

  // フォントサイズのステップと計算式
  const fontSteps = {
    'xxs': -6,
    'xs': -5,
    'xs-plus': -4,
    'sm': -3,
    'sm-plus': -2,
    'base': 0,
    'base-plus': 1,
    'lg': 2,
    'xl': 3,
    '2xl': 4,
    '3xl': 5,
    '4xl': 6,
    '5xl': 7,
    '6xl': 8
  };

  // スペーシングのステップと計算式
  const spacingSteps = {
    'xxs': -6,
    'xs': -5,
    'xs-plus': -4,
    'sm': -3,
    'sm-plus': -2,
    'md': 0,
    'md-plus': 1,
    'lg': 2,
    'xl': 3,
    '2xl': 4,
    '3xl': 5,
    '4xl': 6,
    '5xl': 7,
    '6xl': 8
  };

  // フォントサイズの計算式を生成
  Object.entries(fontSteps).forEach(([key, step]) => {
    const variableName = `--text-${key}`;
    if (step === 0) {
      fontCalculations.push(`${variableName}: var(--base-font-size); /* ${generatedSizes.fontSizes[key] || 'N/A'} */`);
    } else if (step === 1) {
      fontCalculations.push(`${variableName}: calc(var(--base-font-size) * var(--font-ratio)); /* ${generatedSizes.fontSizes[key] || 'N/A'} */`);
    } else if (step === -1) {
      fontCalculations.push(`${variableName}: calc(var(--base-font-size) / var(--font-ratio)); /* ${generatedSizes.fontSizes[key] || 'N/A'} */`);
    } else if (step > 1) {
      // 複数ステップの場合はpow関数を使用
      let calculation = 'calc(var(--base-font-size)';
      for (let i = 0; i < step; i++) {
        calculation += ' * var(--font-ratio)';
      }
      calculation += ')';
      fontCalculations.push(`${variableName}: ${calculation}; /* ${generatedSizes.fontSizes[key] || 'N/A'} */`);
    } else {
      // 負のステップの場合
      let calculation = 'calc(var(--base-font-size)';
      for (let i = 0; i < Math.abs(step); i++) {
        calculation += ' / var(--font-ratio)';
      }
      calculation += ')';
      fontCalculations.push(`${variableName}: ${calculation}; /* ${generatedSizes.fontSizes[key] || 'N/A'} */`);
    }
  });

  // スペーシングの計算式を生成
  Object.entries(spacingSteps).forEach(([key, step]) => {
    const variableName = `--space-${key}`;
    if (step === 0) {
      spacingCalculations.push(`${variableName}: var(--base-spacing); /* ${generatedSizes.spacing[key] || 'N/A'} */`);
    } else if (step === 1) {
      spacingCalculations.push(`${variableName}: calc(var(--base-spacing) * var(--spacing-ratio)); /* ${generatedSizes.spacing[key] || 'N/A'} */`);
    } else if (step === -1) {
      spacingCalculations.push(`${variableName}: calc(var(--base-spacing) / var(--spacing-ratio)); /* ${generatedSizes.spacing[key] || 'N/A'} */`);
    } else if (step > 1) {
      // 複数ステップの場合
      let calculation = 'calc(var(--base-spacing)';
      for (let i = 0; i < step; i++) {
        calculation += ' * var(--spacing-ratio)';
      }
      calculation += ')';
      spacingCalculations.push(`${variableName}: ${calculation}; /* ${generatedSizes.spacing[key] || 'N/A'} */`);
    } else {
      // 負のステップの場合
      let calculation = 'calc(var(--base-spacing)';
      for (let i = 0; i < Math.abs(step); i++) {
        calculation += ' / var(--spacing-ratio)';
      }
      calculation += ')';
      spacingCalculations.push(`${variableName}: ${calculation}; /* ${generatedSizes.spacing[key] || 'N/A'} */`);
    }
  });

  return {
    fontVariables: fontCalculations.join('\n'),
    spacingVariables: spacingCalculations.join('\n')
  };
};

// 現在の固定値から計算式への変換関数
export const analyzeAndGenerateFormula = (fontSizes: Record<string, string>) => {
  // 現在の値からベースサイズと比率を解析
  const baseValue = parseFloat(fontSizes.base || '16');
  
  // 隣接するサイズから比率を計算
  const ratios: number[] = [];
  const keys = Object.keys(fontSizes);
  
  for (let i = 1; i < keys.length; i++) {
    const current = parseFloat(fontSizes[keys[i]]);
    const previous = parseFloat(fontSizes[keys[i-1]]);
    if (current && previous) {
      ratios.push(current / previous);
    }
  }
  
  // 平均比率を計算
  const averageRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
  
  return {
    baseFontSize: baseValue,
    ratio: Math.round(averageRatio * 1000) / 1000,
    analysis: {
      detectedRatios: ratios,
      averageRatio,
      consistency: ratios.every(r => Math.abs(r - averageRatio) < 0.1)
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
  
  /* Typography */
  --font-sans: ${typography.fontFamilies.sans || 'Inter, system-ui, sans-serif'};
  --font-serif: ${typography.fontFamilies.serif || 'Playfair Display, serif'};
  
  /* Spacing Scale */
${Object.entries(spacing).map(([key, value]) => `  --space-${key}: ${value};`).join('\n')}
  
  /* Typography Scale */
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
/* Typography Utilities */
.text-xxs { font-size: var(--text-xxs); }
.text-xs { font-size: var(--text-xs); }
.text-xs-plus { font-size: var(--text-xs-plus); }
.text-sm { font-size: var(--text-sm); }
.text-sm-plus { font-size: var(--text-sm-plus); }
.text-base { font-size: var(--text-base); }
.text-base-plus { font-size: var(--text-base-plus); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }
.text-5xl { font-size: var(--text-5xl); }
.text-6xl { font-size: var(--text-6xl); }

/* Spacing Utilities */
.space-xxs { --space: var(--space-xxs); }
.space-xs { --space: var(--space-xs); }
.space-xs-plus { --space: var(--space-xs-plus); }
.space-sm { --space: var(--space-sm); }
.space-sm-plus { --space: var(--space-sm-plus); }
.space-md { --space: var(--space-md); }
.space-md-plus { --space: var(--space-md-plus); }
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

// ===== ページ構造特化型の出力関数 =====

// ページ構造のみのJSON生成（デザインシステム設定を除外）
export const generatePageStructureJSON = (sections: Section[]) => {
  return {
    meta: {
      title: 'Generated Page Structure',
      description: 'Page structure generated with layout builder',
      language: 'ja',
      generatedAt: new Date().toISOString()
    },
    pageStructure: {
      sections: sections.map(section => ({
        id: section.id,
        name: section.name,
        component: section.component,
        semanticElement: section.semanticElement,
        props: section.props,
        children: section.children.map(child => ({
          id: child.id,
          component: child.component,
          semanticElement: child.semanticElement,
          props: child.props,
          content: child.content
        })),
        content: section.content || `${section.name}のコンテンツ`,
        accessibility: {
          ariaLabel: section.semanticElement === 'header' ? 'サイトヘッダー' : 
                    section.semanticElement === 'footer' ? 'サイトフッター' : 
                    section.semanticElement === 'nav' ? 'ナビゲーション' :
                    section.semanticElement === 'main' ? 'メインコンテンツ' :
                    section.name,
          role: section.semanticElement === 'section' ? 'region' : undefined
        }
      }))
    },
    // ページ全体の構造情報
    structure: {
      totalSections: sections.length,
      hasHeader: sections.some(s => s.semanticElement === 'header'),
      hasFooter: sections.some(s => s.semanticElement === 'footer'),
      hasNav: sections.some(s => s.semanticElement === 'nav'),
      hasMain: sections.some(s => s.semanticElement === 'main'),
      componentTypes: [...new Set(sections.map(s => s.component))],
      semanticElements: [...new Set(sections.map(s => s.semanticElement))]
    }
  };
};

// ページ構造のみのCSS生成（レイアウトプリミティブのみ）
export const generatePageStructureCSS = (sections: Section[]) => {
  // 使用されているコンポーネントを特定
  const usedComponents = new Set(sections.map(s => s.component));
  sections.forEach(section => {
    section.children.forEach(child => {
      usedComponents.add(child.component);
    });
  });

  // 基本リセットとレイアウトプリミティブ
  const baseCSS = `/* ===== Page Structure CSS ===== */
/* Generated on: ${new Date().toISOString()} */

/* Reset & Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

/* Page Layout Structure */
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Layout Primitives (Used Components Only) */`;

  // 使用されているコンポーネントのCSSのみを生成
  const componentCSS: string[] = [];

  if (usedComponents.has('CONTAINER')) {
    componentCSS.push(`
.layout-container {
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding-x, 1rem);
  padding-right: var(--container-padding-x, 1rem);
}`);
  }

  if (usedComponents.has('STACK')) {
    componentCSS.push(`
.layout-stack {
  display: flex;
  flex-direction: column;
}

.layout-stack > * + * {
  margin-top: var(--stack-space, 1rem);
}`);
  }

  if (usedComponents.has('GRID')) {
    componentCSS.push(`
.layout-grid {
  display: grid;
  gap: var(--grid-gap, 1rem);
  grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-width, 250px), 1fr));
}`);
  }

  if (usedComponents.has('CLUSTER')) {
    componentCSS.push(`
.layout-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space, 1rem);
  justify-content: var(--cluster-justify, flex-start);
  align-items: var(--cluster-align, flex-start);
}`);
  }

  if (usedComponents.has('SIDEBAR')) {
    componentCSS.push(`
.layout-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-space, 1rem);
}

.layout-sidebar > :first-child {
  flex-basis: var(--sidebar-width, 20rem);
  flex-grow: 1;
}

.layout-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: var(--sidebar-content-min-width, 50%);
}`);
  }

  if (usedComponents.has('SWITCHER')) {
    componentCSS.push(`
.layout-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--switcher-space, 1rem);
}

.layout-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-threshold, 30rem) - 100%) * 999);
}`);
  }

  if (usedComponents.has('CENTER')) {
    componentCSS.push(`
.layout-center {
  box-sizing: content-box;
  max-width: var(--center-max-width, 60ch);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--center-gutters, 1rem);
  padding-right: var(--center-gutters, 1rem);
}`);
  }

  if (usedComponents.has('COVER')) {
    componentCSS.push(`
.layout-cover {
  display: flex;
  flex-direction: column;
  min-height: var(--cover-min-height, 100vh);
  padding: var(--cover-space, 1rem);
}

.layout-cover > * {
  margin-top: var(--cover-space, 1rem);
  margin-bottom: var(--cover-space, 1rem);
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
}`);
  }

  if (usedComponents.has('BOX')) {
    componentCSS.push(`
.layout-box {
  padding: var(--box-padding, 1rem);
  border: var(--box-border, none);
  border-radius: var(--box-border-radius, 0);
  background: var(--box-background, transparent);
}`);
  }

  // セクション固有のCSS生成
  const sectionCSS = sections.map(section => {
    const cssVariables: string[] = [];
    
    // プロップスからCSS変数を生成
    if (section.props) {
      Object.entries(section.props).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          cssVariables.push(`  --${section.component.toLowerCase()}-${key}: ${value};`);
        } else if (typeof value === 'object' && value !== null) {
          // レスポンシブ値の処理
          Object.entries(value as Record<string, unknown>).forEach(([breakpoint, breakpointValue]) => {
            if (typeof breakpointValue === 'string' || typeof breakpointValue === 'number') {
              cssVariables.push(`  --${section.component.toLowerCase()}-${key}-${breakpoint}: ${breakpointValue};`);
            }
          });
        }
      });
    }

    if (cssVariables.length > 0) {
      return `
/* Section: ${section.name} (${section.id}) */
.section-${section.id} {
${cssVariables.join('\n')}
}`;
    }
    return '';
  }).filter(css => css.trim() !== '');

  // 基本的なレスポンシブ設定
  const responsiveCSS = `
/* Basic Responsive Utilities */
@media (max-width: 768px) {
  .layout-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .layout-sidebar {
    flex-direction: column;
  }
  
  .layout-cluster {
    justify-content: center;
  }
}

/* Component State Classes */
.is-hidden { display: none; }
.is-visible { display: block; }
.is-centered { margin-left: auto; margin-right: auto; }`;

  return [baseCSS, ...componentCSS, ...sectionCSS, responsiveCSS].join('\n');
};

// ページ構造用のダウンロード関数
export const downloadPageStructureJSON = (sections: Section[], filename = 'page-structure.json') => {
  const data = generatePageStructureJSON(sections);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadPageStructureCSS = (sections: Section[], filename = 'page-structure.css') => {
  const css = generatePageStructureCSS(sections);
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
