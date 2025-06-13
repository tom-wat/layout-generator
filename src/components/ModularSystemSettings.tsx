import React, { useState, useEffect } from 'react';
import {
Settings,
Type,
Ruler,
Download,
RotateCcw,
Copy,
Calculator
} from 'lucide-react';
import { useDesignSystem } from './DesignSystemProvider';
import { 
  generateSizesFromModularSystem,
  generateCalculatedCSSVariables
} from '../utils/generators';
import type { ModularScale, ModularSystemConfig, GeneratedSizes, SizeUnit } from '../types';

// 一般的なモジュラースケール比率
const MODULAR_SCALES: ModularScale[] = [
  { name: 'Minor Second', ratio: 1.067},
  { name: 'Major Second', ratio: 1.125},
  { name: 'Minor Third', ratio: 1.200},
  { name: 'Major Third', ratio: 1.250},
  { name: 'Perfect Fourth', ratio: 1.333},
  { name: 'Augmented Fourth', ratio: 1.414},
  { name: 'Perfect Fifth', ratio: 1.500},
  { name: 'Golden Ratio', ratio: 1.618},
  { name: 'Major Sixth', ratio: 1.667},
  { name: 'Minor Seventh', ratio: 1.778},
  { name: 'Major Seventh', ratio: 1.875},
  { name: 'Octave', ratio: 2.000}
];

interface ModularSystemSettingsProps {
  className?: string;
}

const ModularSystemSettings: React.FC<ModularSystemSettingsProps> = ({
  className
}) => {
  const { 
    designSystem, 
    updateModularSystem
  } = useDesignSystem();
  
  const [config, setConfig] = useState<ModularSystemConfig>(
    designSystem.modularSystem || {
      baseFontSize: 16,
      baseSpacing: 16,
      fontScale: MODULAR_SCALES[3], // Major Third
      spacingScale: MODULAR_SCALES[3], // Major Third
      steps: 10,
      fontUnit: 'rem',
      spacingUnit: 'rem'
    }
  );

  const [generatedSizes, setGeneratedSizes] = useState<GeneratedSizes>(
    designSystem.generatedSizes || {
      fontSizes: {},
      spacing: {}
    }
  );

  const [activeTab, setActiveTab] = useState<'typography' | 'spacing' | 'utilities'>('typography');
  const [calculatedVariables, setCalculatedVariables] = useState<{
    fontVariables: string;
    spacingVariables: string;
  }>({ fontVariables: '', spacingVariables: '' });

  const [utilityConfig, setUtilityConfig] = useState({
    baseMargin: 16,
    basePadding: 16,
    marginScale: MODULAR_SCALES[3], // Major Third
    paddingScale: MODULAR_SCALES[3], // Major Third
    steps: 10,
    marginUnit: 'rem' as SizeUnit,
    paddingUnit: 'rem' as SizeUnit,
    generateMargin: true,
    generatePadding: true,
    generateNegativeMargin: true
  });

  // 生成されたサイズを更新
  useEffect(() => {
    // generators.tsの関数を使用して、単位変換も含めて正しく生成
    const newGeneratedSizes = generateSizesFromModularSystem(config);
    setGeneratedSizes(newGeneratedSizes);
    
    // 計算式形式のCSS変数を生成
    const newCalculatedVariables = generateCalculatedCSSVariables(config, newGeneratedSizes);
    setCalculatedVariables(newCalculatedVariables);
    
    // コンテキストに更新を通知
    updateModularSystem(config, newGeneratedSizes);
  }, [config, updateModularSystem]);

  // 設定をリセット
  const resetConfig = () => {
    const defaultConfig = {
      baseFontSize: 16,
      baseSpacing: 16,
      fontScale: MODULAR_SCALES[3],
      spacingScale: MODULAR_SCALES[3],
      steps: 10,
      fontUnit: 'rem' as SizeUnit,
      spacingUnit: 'rem' as SizeUnit
    };
    setConfig(defaultConfig);
  };

  // JSON形式でエクスポート
  const exportConfig = () => {
    const exportData = {
      modularSystemConfig: config,
      calculatedVariables: {
        fontVariables: calculatedVariables.fontVariables.split('\n'),
        spacingVariables: calculatedVariables.spacingVariables.split('\n')
      },
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modular-system-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ユーティリティクラス専用のサイズ生成
  const generateUtilitySizes = () => {
    const marginSizes: Record<string, string> = {};
    const paddingSizes: Record<string, string> = {};
    
    // マージンサイズ生成
    if (utilityConfig.generateMargin) {
      for (let i = 0; i < utilityConfig.steps; i++) {
        const size = utilityConfig.baseMargin * Math.pow(utilityConfig.marginScale.ratio, i - Math.floor(utilityConfig.steps / 2));
        const convertedSize = convertUtilityValue(size, utilityConfig.marginUnit);
        marginSizes[i.toString()] = convertedSize;
      }
    }
    
    // パディングサイズ生成
    if (utilityConfig.generatePadding) {
      for (let i = 0; i < utilityConfig.steps; i++) {
        const size = utilityConfig.basePadding * Math.pow(utilityConfig.paddingScale.ratio, i - Math.floor(utilityConfig.steps / 2));
        const convertedSize = convertUtilityValue(size, utilityConfig.paddingUnit);
        paddingSizes[i.toString()] = convertedSize;
      }
    }
    
    return { marginSizes, paddingSizes };
  };

  // ユーティリティ値の単位変換
  const convertUtilityValue = (pxValue: number, targetUnit: SizeUnit) => {
    switch (targetUnit) {
      case 'px':
        return `${Math.round(pxValue)}px`;
      case 'rem':
        return `${(pxValue / 16).toFixed(4)}rem`;
      case 'em':
        return `${(pxValue / 16).toFixed(4)}em`;
      default:
        return `${Math.round(pxValue)}px`;
    }
  };

  // 単位を変換する関数（従来の）
  const convertValue = (value: string, targetUnit: 'px' | 'rem' | 'modular') => {
    if (targetUnit === 'modular') return value;
    
    // px値を抽出
    const pxValue = parseFloat(value.replace(/[^\d.]/g, ''));
    
    switch (targetUnit) {
      case 'px':
        return `${pxValue}px`;
      case 'rem':
        return `${(pxValue / 16).toFixed(4)}rem`;
      default:
        return value;
    }
  };

  // ユーティリティクラスを生成
  const generateUtilityClasses = () => {
    const classes: string[] = [];
    const { marginSizes, paddingSizes } = generateUtilitySizes();
    
    // マージンクラス
    if (utilityConfig.generateMargin) {
      Object.entries(marginSizes).forEach(([key, size]) => {
        classes.push(`.m-${key} { margin: ${size}; }`);
        classes.push(`.mt-${key} { margin-top: ${size}; }`);
        classes.push(`.mr-${key} { margin-right: ${size}; }`);
        classes.push(`.mb-${key} { margin-bottom: ${size}; }`);
        classes.push(`.ml-${key} { margin-left: ${size}; }`);
        classes.push(`.mx-${key} { margin-left: ${size}; margin-right: ${size}; }`);
        classes.push(`.my-${key} { margin-top: ${size}; margin-bottom: ${size}; }`);
      });
      
      // ネガティブマージン
      if (utilityConfig.generateNegativeMargin) {
        classes.push('');
        Object.entries(marginSizes).forEach(([key, size]) => {
          const negativeSize = size.replace(/^(\d)/, '-$1');
          classes.push(`.-m-${key} { margin: ${negativeSize}; }`);
          classes.push(`.-mt-${key} { margin-top: ${negativeSize}; }`);
          classes.push(`.-mr-${key} { margin-right: ${negativeSize}; }`);
          classes.push(`.-mb-${key} { margin-bottom: ${negativeSize}; }`);
          classes.push(`.-ml-${key} { margin-left: ${negativeSize}; }`);
          classes.push(`.-mx-${key} { margin-left: ${negativeSize}; margin-right: ${negativeSize}; }`);
          classes.push(`.-my-${key} { margin-top: ${negativeSize}; margin-bottom: ${negativeSize}; }`);
        });
      }
    }
    
    // パディングクラス
    if (utilityConfig.generatePadding) {
      classes.push('');
      Object.entries(paddingSizes).forEach(([key, size]) => {
        classes.push(`.p-${key} { padding: ${size}; }`);
        classes.push(`.pt-${key} { padding-top: ${size}; }`);
        classes.push(`.pr-${key} { padding-right: ${size}; }`);
        classes.push(`.pb-${key} { padding-bottom: ${size}; }`);
        classes.push(`.pl-${key} { padding-left: ${size}; }`);
        classes.push(`.px-${key} { padding-left: ${size}; padding-right: ${size}; }`);
        classes.push(`.py-${key} { padding-top: ${size}; padding-bottom: ${size}; }`);
      });
    }
    
    return classes.join('\n');
  };

  // CSS変数をクリップボードにコピー
  const copyToClipboard = () => {
    const content = activeTab === 'typography' 
      ? `:root {\n${calculatedVariables.fontVariables}\n}`
      : activeTab === 'spacing'
      ? `:root {\n${calculatedVariables.spacingVariables}\n}`
      : generateUtilityClasses();
    
    navigator.clipboard.writeText(content).then(() => {
      // 簡単な成功フィードバック（実際のアプリではトースト通知など）
      console.log('CSS変数をクリップボードにコピーしました');
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
    });
  };



  return (
    <div className={`bg-gray-900 text-white max-w-7xl mx-auto p-6 space-y-6 ${className || ''}`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold">モジュラーシステム設定</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetConfig}
            className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            リセット
          </button>
          <button
            onClick={exportConfig}
            className="flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            エクスポート
          </button>
        </div>
      </div>

      {/* タブ切替 */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('typography')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'typography'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Type className="w-4 h-4 mr-2" />
          タイポグラフィ
        </button>
        <button
          onClick={() => setActiveTab('spacing')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'spacing'
              ? 'bg-purple-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Ruler className="w-4 h-4 mr-2" />
          スペーシング
        </button>
        <button
          onClick={() => setActiveTab('utilities')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'utilities'
              ? 'bg-green-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          ユーティリティ
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 設定パネル */}
        <div className="space-y-6">
            {activeTab === 'typography' ? (
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Type className="w-5 h-5 mr-2 text-blue-400" />
                  タイポグラフィ設定
                </h3>
                
                {/* ベースフォントサイズ */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ベースフォントサイズ (px)
                  </label>
                  <input
                    type="number"
                    value={config.baseFontSize}
                    onChange={(e) => setConfig(prev => ({ ...prev, baseFontSize: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="10"
                    max="24"
                    step="1"
                  />
                </div>

                {/* フォントスケール */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    フォントスケール比率
                  </label>
                  <select
                    value={config.fontScale.name}
                    onChange={(e) => {
                      const selectedScale = MODULAR_SCALES.find(scale => scale.name === e.target.value);
                      if (selectedScale) {
                        setConfig(prev => ({ ...prev, fontScale: selectedScale }));
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {MODULAR_SCALES.map((scale) => (
                      <option key={scale.name} value={scale.name}>
                        {scale.name} ({scale.ratio})
                      </option>
                    ))}
                  </select>
                </div>

                {/* フォント単位 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    フォントサイズ単位
                  </label>
                  <div className="flex space-x-2">
                    {(['px', 'rem', 'em'] as SizeUnit[]).map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setConfig(prev => ({ ...prev, fontUnit: unit }))}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          config.fontUnit === unit
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeTab === 'spacing' ? (
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-purple-400" />
                  スペーシング設定
                </h3>
                
                {/* ベーススペーシング */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ベーススペーシング (px)
                  </label>
                  <input
                    type="number"
                    value={config.baseSpacing}
                    onChange={(e) => setConfig(prev => ({ ...prev, baseSpacing: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="4"
                    max="32"
                    step="1"
                  />
                </div>

                {/* スペーシングスケール */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    スペーシングスケール比率
                  </label>
                  <select
                    value={config.spacingScale.name}
                    onChange={(e) => {
                      const selectedScale = MODULAR_SCALES.find(scale => scale.name === e.target.value);
                      if (selectedScale) {
                        setConfig(prev => ({ ...prev, spacingScale: selectedScale }));
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {MODULAR_SCALES.map((scale) => (
                      <option key={scale.name} value={scale.name}>
                        {scale.name} ({scale.ratio})
                      </option>
                    ))}
                  </select>
                </div>

                {/* スペーシング単位 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    スペーシング単位
                  </label>
                  <div className="flex space-x-2">
                    {(['px', 'rem', 'em'] as SizeUnit[]).map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setConfig(prev => ({ ...prev, spacingUnit: unit }))}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          config.spacingUnit === unit
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-400" />
                  ユーティリティ設定
                </h3>
                
                <div className="text-sm text-gray-300 mb-4">
                  マージン・パディングのユーティリティクラス専用の設定です。
                </div>
                
                {/* ベースサイズ設定 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ベースマージン (px)
                    </label>
                    <input
                      type="number"
                      value={utilityConfig.baseMargin}
                      onChange={(e) => setUtilityConfig(prev => ({ ...prev, baseMargin: Number(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="4"
                      max="32"
                      step="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ベースパディング (px)
                    </label>
                    <input
                      type="number"
                      value={utilityConfig.basePadding}
                      onChange={(e) => setUtilityConfig(prev => ({ ...prev, basePadding: Number(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="4"
                      max="32"
                      step="1"
                    />
                  </div>
                </div>

                {/* スケール比率設定 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      マージンスケール比率
                    </label>
                    <select
                      value={utilityConfig.marginScale.name}
                      onChange={(e) => {
                        const selectedScale = MODULAR_SCALES.find(scale => scale.name === e.target.value);
                        if (selectedScale) {
                          setUtilityConfig(prev => ({ ...prev, marginScale: selectedScale }));
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500"
                    >
                      {MODULAR_SCALES.map((scale) => (
                        <option key={scale.name} value={scale.name}>
                          {scale.name} ({scale.ratio})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      パディングスケール比率
                    </label>
                    <select
                      value={utilityConfig.paddingScale.name}
                      onChange={(e) => {
                        const selectedScale = MODULAR_SCALES.find(scale => scale.name === e.target.value);
                        if (selectedScale) {
                          setUtilityConfig(prev => ({ ...prev, paddingScale: selectedScale }));
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500"
                    >
                      {MODULAR_SCALES.map((scale) => (
                        <option key={scale.name} value={scale.name}>
                          {scale.name} ({scale.ratio})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ステップ数設定 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ステップ数
                  </label>
                  <input
                    type="number"
                    value={utilityConfig.steps}
                    onChange={(e) => setUtilityConfig(prev => ({ ...prev, steps: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="5"
                    max="15"
                    step="1"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    生成するユーティリティクラスのステップ数
                  </div>
                </div>

                {/* 単位設定 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      マージン単位
                    </label>
                    <div className="flex space-x-2">
                      {(['px', 'rem', 'em'] as SizeUnit[]).map((unit) => (
                        <button
                          key={unit}
                          onClick={() => setUtilityConfig(prev => ({ ...prev, marginUnit: unit }))}
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            utilityConfig.marginUnit === unit
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      パディング単位
                    </label>
                    <div className="flex space-x-2">
                      {(['px', 'rem', 'em'] as SizeUnit[]).map((unit) => (
                        <button
                          key={unit}
                          onClick={() => setUtilityConfig(prev => ({ ...prev, paddingUnit: unit }))}
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            utilityConfig.paddingUnit === unit
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 生成オプション */}
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={utilityConfig.generateMargin}
                        onChange={(e) => setUtilityConfig(prev => ({ ...prev, generateMargin: e.target.checked }))}
                        className="rounded border-gray-600 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-300">マージンユーティリティクラスを生成</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={utilityConfig.generatePadding}
                        onChange={(e) => setUtilityConfig(prev => ({ ...prev, generatePadding: e.target.checked }))}
                        className="rounded border-gray-600 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-300">パディングユーティリティクラスを生成</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={utilityConfig.generateNegativeMargin}
                        onChange={(e) => setUtilityConfig(prev => ({ ...prev, generateNegativeMargin: e.target.checked }))}
                        className="rounded border-gray-600 text-green-600 focus:ring-green-500"
                        disabled={!utilityConfig.generateMargin}
                      />
                      <span className={`text-sm ${utilityConfig.generateMargin ? 'text-gray-300' : 'text-gray-500'}`}>ネガティブマージンクラスを生成</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 生成されたCSS変数 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">生成されたCSS変数</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    コピー
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded p-4 max-h-80 overflow-auto">
                <pre className="text-xs">
                  <code className="text-green-400">
                    {activeTab === 'typography' 
                      ? calculatedVariables.fontVariables
                      : activeTab === 'spacing'
                      ? calculatedVariables.spacingVariables
                      : generateUtilityClasses()
                    }
                  </code>
                </pre>
              </div>
            </div>
          </div>

        {/* プレビューパネル */}
        <div className="space-y-6">
          {activeTab === 'typography' ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">フォントサイズプレビュー</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {Object.entries(generatedSizes.fontSizes).map(([key, size]) => {
                  return (
                    <div key={key} className="border-b border-gray-700 pb-3 last:border-b-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <span className="text-sm text-gray-400 w-12 text-right">{key}</span>
                          <span className="text-xs text-gray-500 w-20">{size}</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div 
                            style={{ fontSize: size, lineHeight: '1.2' }} 
                            className="text-white text-right break-words max-w-full"
                          >
                            Sample
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'utilities' ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">ユーティリティクラスプレビュー</h3>
              <div className="space-y-6">
                {/* スケール比率表示 */}
                <div>
                  <h4 className="text-md font-medium mb-3 text-green-400">設定されたスケール比率</h4>
                  <div className="bg-gray-900 p-4 rounded">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-400">
                          {utilityConfig.marginScale.ratio}
                        </div>
                        <div className="text-xs text-gray-400">
                          マージン: {utilityConfig.marginScale.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">
                          {utilityConfig.paddingScale.ratio}
                        </div>
                        <div className="text-xs text-gray-400">
                          パディング: {utilityConfig.paddingScale.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* マージンクラス */}
                {utilityConfig.generateMargin && (() => {
                  const { marginSizes } = generateUtilitySizes();
                  return (
                    <div>
                      <h4 className="text-md font-medium mb-3 text-green-400">マージンクラス（全{Object.keys(marginSizes).length}個）</h4>
                      <div className="max-h-80 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                          {Object.entries(marginSizes).map(([key, size]) => (
                            <div key={key} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                              <span className="text-gray-300">.m-{key}</span>
                              <span className="text-gray-500">margin: {size};</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* パディングクラス */}
                {utilityConfig.generatePadding && (() => {
                  const { paddingSizes } = generateUtilitySizes();
                  return (
                    <div>
                      <h4 className="text-md font-medium mb-3 text-green-400">パディングクラス（全{Object.keys(paddingSizes).length}個）</h4>
                      <div className="max-h-80 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                          {Object.entries(paddingSizes).map(([key, size]) => (
                            <div key={key} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                              <span className="text-gray-300">.p-{key}</span>
                              <span className="text-gray-500">padding: {size};</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* ネガティブマージンクラス */}
                {utilityConfig.generateMargin && utilityConfig.generateNegativeMargin && (() => {
                  const { marginSizes } = generateUtilitySizes();
                  return (
                    <div>
                      <h4 className="text-md font-medium mb-3 text-red-400">ネガティブマージンクラス（全{Object.keys(marginSizes).length}個）</h4>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                          {Object.entries(marginSizes).map(([key, size]) => {
                            const negativeSize = size.replace(/^(\d)/, '-$1');
                            return (
                              <div key={key} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                                <span className="text-gray-300">.-m-{key}</span>
                                <span className="text-gray-500">margin: {negativeSize};</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">スペーシングプレビュー</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {Object.entries(generatedSizes.spacing).map(([key, size]) => (
                  <div key={key} className="border-b border-gray-700 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <span className="text-sm text-gray-400 w-12 text-right">{key}</span>
                        <span className="text-xs text-gray-500 w-20">{size}</span>
                      </div>
                      <div className="flex items-center space-x-2 flex-1 justify-end">
                        <div 
                          className="bg-purple-500 flex-shrink-0"
                          style={{ 
                            width: size, 
                            height: '12px',
                            maxWidth: '350px'
                          }}
                        />
                        <span className="text-xs text-gray-400 flex-shrink-0">width</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModularSystemSettings;
