import React from 'react';
import { useDesignSystem } from './DesignSystemProvider';

const ModularSystemPreview: React.FC = () => {
  const { designSystem } = useDesignSystem();

  // モジュラーシステムが有効な場合は生成されたサイズを使用、そうでなければデフォルト
  const useModularSystem = !!(designSystem.modularSystem && designSystem.generatedSizes);
  const fontSizes = useModularSystem
    ? designSystem.generatedSizes!.fontSizes 
    : designSystem.typography.fontSizes;
  
  const spacing = useModularSystem
    ? designSystem.generatedSizes!.spacing 
    : designSystem.spacing;

  return (
    <div className="bg-white min-h-screen">
      {/* CSS変数を適用するためのスタイル */}
      <style>{`
        .preview-container {
          ${Object.entries({
            ...Object.fromEntries(Object.entries(fontSizes).map(([key, value]) => [`--text-${key}`, value])),
            ...Object.fromEntries(Object.entries(spacing).map(([key, value]) => [`--space-${key}`, value])),
            '--color-primary': designSystem.colors.primary,
            '--color-secondary': designSystem.colors.secondary,
            '--color-accent': designSystem.colors.accent,
          }).map(([key, value]) => `${key}: ${value};`).join('\n')}
        }
        
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
        
        .space-xs { --space: var(--space-xs); }
        .space-xs-plus { --space: var(--space-xs-plus); }
        .space-sm { --space: var(--space-sm); }
        .space-sm-plus { --space: var(--space-sm-plus); }
        .space-md { --space: var(--space-md); }
        .space-md-plus { --space: var(--space-md-plus); }
        .space-lg { --space: var(--space-lg); }
        .space-xl { --space: var(--space-xl); }
        .space-2xl { --space: var(--space-2xl); }
        
        .layout-stack {
          display: flex;
          flex-direction: column;
        }
        
        .layout-stack > * + * {
          margin-top: var(--stack-space, var(--space-md));
        }
        
        .layout-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: var(--cluster-space, var(--space-md));
          justify-content: var(--cluster-justify, flex-start);
          align-items: var(--cluster-align, center);
        }
        
        .layout-container {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding-left: var(--space-lg);
          padding-right: var(--space-lg);
        }
      `}</style>

      <div className="preview-container">
        {/* ヘッダーセクション */}
        <header 
          className="layout-container"
          style={{ 
            backgroundColor: designSystem.colors.primary,
            paddingTop: 'var(--space-xl)',
            paddingBottom: 'var(--space-xl)'
          }}
        >
          <div className="layout-cluster" style={{ '--cluster-justify': 'space-between' } as React.CSSProperties}>
            <div>
              <h1 className="text-2xl" style={{ color: 'white', fontWeight: 'bold' }}>
                {useModularSystem ? 'モジュラーシステム' : 'デフォルトシステム'}
              </h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {useModularSystem 
                  ? `${designSystem.modularSystem?.fontScale.name || ''} フォントスケール使用`
                  : '静的なフォントサイズ使用'
                }
              </p>
            </div>
            <nav className="layout-cluster">
              <a href="#" className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>ホーム</a>
              <a href="#" className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>サービス</a>
              <a href="#" className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>お問い合わせ</a>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="layout-container" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
          <div className="layout-stack" style={{ '--stack-space': 'var(--space-xl)' } as React.CSSProperties}>
            
            {/* ヒーローセクション */}
            <section className="layout-stack" style={{ '--stack-space': 'var(--space-lg)' } as React.CSSProperties}>
              <h2 className="text-4xl" style={{ fontWeight: 'bold', color: designSystem.colors.secondary }}>
                タイポグラフィスケール
              </h2>
              <p className="text-lg" style={{ color: '#6B7280', lineHeight: '1.6' }}>
                このページはモジュラーシステムで生成されたフォントサイズとスペーシングを使用しています。
                設定を変更すると、このプレビューもリアルタイムで更新されます。
              </p>
            </section>

            {/* フォントサイズの例 */}
            <section className="layout-stack" style={{ '--stack-space': 'var(--space-md)' } as React.CSSProperties}>
              <h3 className="text-2xl" style={{ fontWeight: 'semibold', color: designSystem.colors.secondary }}>
                フォントサイズの例
              </h3>
              
              <div className="layout-stack" style={{ '--stack-space': 'var(--space-sm)' } as React.CSSProperties}>
                <div className="text-5xl" style={{ fontWeight: 'bold' }}>見出し 1 (5xl)</div>
                <div className="text-4xl" style={{ fontWeight: 'bold' }}>見出し 2 (4xl)</div>
                <div className="text-3xl" style={{ fontWeight: 'semibold' }}>見出し 3 (3xl)</div>
                <div className="text-2xl" style={{ fontWeight: 'semibold' }}>見出し 4 (2xl)</div>
                <div className="text-xl" style={{ fontWeight: 'medium' }}>見出し 5 (xl)</div>
                <div className="text-lg" style={{ fontWeight: 'medium' }}>見出し 6 (lg)</div>
                <div className="text-base-plus">大きな本文 (base-plus)</div>
                <div className="text-base">通常の本文 (base)</div>
                <div className="text-sm-plus">少し小さな本文 (sm-plus)</div>
                <div className="text-sm">小さな本文 (sm)</div>
                <div className="text-xs-plus">小さなキャプション (xs-plus)</div>
                <div className="text-xs">キャプション (xs)</div>
                <div className="text-xxs">最小サイズ (xxs)</div>
              </div>
            </section>

            {/* スペーシングの例 */}
            <section className="layout-stack" style={{ '--stack-space': 'var(--space-md)' } as React.CSSProperties}>
              <h3 className="text-2xl" style={{ fontWeight: 'semibold', color: designSystem.colors.secondary }}>
                スペーシングの例
              </h3>
              
              <div className="layout-stack" style={{ '--stack-space': 'var(--space-sm)' } as React.CSSProperties}>
                {Object.entries(spacing).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span className="text-sm" style={{ minWidth: '60px', color: '#6B7280' }}>{key}:</span>
                    <div 
                      style={{ 
                        width: value, 
                        height: '20px', 
                        backgroundColor: designSystem.colors.accent,
                        borderRadius: '4px'
                      }}
                    />
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* レイアウトの例 */}
            <section className="layout-stack" style={{ '--stack-space': 'var(--space-md)' } as React.CSSProperties}>
              <h3 className="text-2xl" style={{ fontWeight: 'semibold', color: designSystem.colors.secondary }}>
                レイアウトプリミティブの例
              </h3>
              
              <div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                
                {/* Stack例 */}
                <div style={{ padding: 'var(--space-md)', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                  <h4 className="text-lg" style={{ fontWeight: 'medium', marginBottom: 'var(--space-sm)' }}>Stack Layout</h4>
                  <div className="layout-stack" style={{ '--stack-space': 'var(--space-sm)' } as React.CSSProperties}>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#EBF8FF', borderRadius: '4px' }}>アイテム 1</div>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#EBF8FF', borderRadius: '4px' }}>アイテム 2</div>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#EBF8FF', borderRadius: '4px' }}>アイテム 3</div>
                  </div>
                </div>

                {/* Cluster例 */}
                <div style={{ padding: 'var(--space-md)', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                  <h4 className="text-lg" style={{ fontWeight: 'medium', marginBottom: 'var(--space-sm)' }}>Cluster Layout</h4>
                  <div className="layout-cluster" style={{ '--cluster-space': 'var(--space-sm)' } as React.CSSProperties}>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#F0FDF4', borderRadius: '4px' }}>タグ 1</div>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#F0FDF4', borderRadius: '4px' }}>タグ 2</div>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#F0FDF4', borderRadius: '4px' }}>タグ 3</div>
                    <div style={{ padding: 'var(--space-sm)', backgroundColor: '#F0FDF4', borderRadius: '4px' }}>タグ 4</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 設定情報 */}
            <section 
              style={{ 
                padding: 'var(--space-lg)', 
                backgroundColor: '#F9FAFB', 
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}
            >
              <h3 className="text-xl" style={{ fontWeight: 'semibold', marginBottom: 'var(--space-md)', color: designSystem.colors.secondary }}>
                現在の設定
              </h3>
              
              <div style={{ display: 'grid', gap: 'var(--space-md)', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {useModularSystem && designSystem.modularSystem ? (
                  <>
                    <div>
                      <h4 className="text-sm" style={{ fontWeight: 'medium', color: '#374151' }}>フォントシステム</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        ベース: {designSystem.modularSystem.baseFontSize}px<br/>
                        比率: {designSystem.modularSystem.fontScale.ratio} ({designSystem.modularSystem.fontScale.name})
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm" style={{ fontWeight: 'medium', color: '#374151' }}>スペーシングシステム</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        ベース: {designSystem.modularSystem.baseSpacing}px<br/>
                        比率: {designSystem.modularSystem.spacingScale.ratio} ({designSystem.modularSystem.spacingScale.name})
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h4 className="text-sm" style={{ fontWeight: 'medium', color: '#374151' }}>静的システム</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      モジュラーシステムが無効になっています。<br/>
                      固定のフォントサイズとスペーシングを使用中。
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>

        {/* フッター */}
        <footer 
          className="layout-container"
          style={{ 
            backgroundColor: designSystem.colors.secondary,
            paddingTop: 'var(--space-lg)',
            paddingBottom: 'var(--space-lg)',
            marginTop: 'var(--space-2xl)'
          }}
        >
          <div className="layout-cluster" style={{ '--cluster-justify': 'center' } as React.CSSProperties}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              モジュラーシステムによる一貫性のあるデザイン
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModularSystemPreview;