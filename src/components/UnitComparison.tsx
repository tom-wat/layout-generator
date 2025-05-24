import React from 'react';
import { Info, Calculator } from 'lucide-react';
import type { SizeUnit } from '../types';

interface UnitComparisonProps {
  baseFontSize: number;
  baseSpacing: number;
  fontUnit: SizeUnit;
  spacingUnit: SizeUnit;
  generatedSizes: {
    fontSizes: Record<string, string>;
    spacing: Record<string, string>;
  };
}

const UnitComparison: React.FC<UnitComparisonProps> = ({
  baseFontSize,
  baseSpacing,
  fontUnit,
  spacingUnit,
  generatedSizes
}) => {
  const getUnitDescription = (unit: SizeUnit): string => {
    switch (unit) {
      case 'px':
        return 'ピクセル - 絶対値、デバイスに依存しない固定サイズ';
      case 'rem':
        return 'Root EM - ルート要素（html）のフォントサイズを基準とした相対値';
      case 'em':
        return 'EM - 親要素のフォントサイズを基準とした相対値';
      default:
        return '';
    }
  };

  const getUnitBenefits = (unit: SizeUnit): string[] => {
    switch (unit) {
      case 'px':
        return [
          '正確で予測可能なサイズ',
          'デザインツールからの値をそのまま使用可能',
          'ブラウザ間での一貫性が高い'
        ];
      case 'rem':
        return [
          'ユーザーのフォント設定を尊重',
          'アクセシビリティに優れている',
          'レスポンシブデザインに適している',
          '一貫したスケーリング'
        ];
      case 'em':
        return [
          'コンテキストに応じたサイズ調整',
          'コンポーネントの独立性',
          '入れ子構造での柔軟性'
        ];
      default:
        return [];
    }
  };

  const calculatePixelEquivalent = (value: string, unit: SizeUnit, baseSize: number): string => {
    const numValue = parseFloat(value);
    switch (unit) {
      case 'px':
        return `${numValue}px`;
      case 'rem':
        return `${Math.round(numValue * 16)}px (16px/rem基準)`;
      case 'em':
        return `${Math.round(numValue * baseSize)}px (${baseSize}px基準)`;
      default:
        return value;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Calculator className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">単位の説明と変換</h3>
      </div>

      {/* フォント単位の説明 */}
      <div className="space-y-4">
        <div>
          <h4 className="text-md font-medium text-blue-400 mb-2">
            フォントサイズ単位: {fontUnit.toUpperCase()}
          </h4>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-200 mb-2">{getUnitDescription(fontUnit)}</p>
                <ul className="text-blue-100/80 space-y-1">
                  {getUnitBenefits(fontUnit).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* スペーシング単位の説明 */}
        <div>
          <h4 className="text-md font-medium text-purple-400 mb-2">
            スペーシング単位: {spacingUnit.toUpperCase()}
          </h4>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-purple-200 mb-2">{getUnitDescription(spacingUnit)}</p>
                <ul className="text-purple-100/80 space-y-1">
                  {getUnitBenefits(spacingUnit).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 変換例 */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-300">ピクセル換算値</h4>
        
        {/* フォントサイズ変換例 */}
        <div>
          <h5 className="text-sm font-medium text-blue-400 mb-2">フォントサイズ例</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(generatedSizes.fontSizes).slice(0, 6).map(([key, value]) => (
              <div key={key} className="flex justify-between bg-gray-700 rounded px-2 py-1">
                <span className="text-gray-300">{key}: {value}</span>
                <span className="text-gray-400">
                  ≈ {calculatePixelEquivalent(value, fontUnit, baseFontSize)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* スペーシング変換例 */}
        <div>
          <h5 className="text-sm font-medium text-purple-400 mb-2">スペーシング例</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(generatedSizes.spacing).slice(0, 6).map(([key, value]) => (
              <div key={key} className="flex justify-between bg-gray-700 rounded px-2 py-1">
                <span className="text-gray-300">{key}: {value}</span>
                <span className="text-gray-400">
                  ≈ {calculatePixelEquivalent(value, spacingUnit, baseSpacing)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 推奨事項 */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-400 mb-2">💡 推奨事項</h4>
        <ul className="text-green-100/80 text-sm space-y-1">
          <li>• <strong>rem</strong>: アクセシビリティを重視するプロジェクトに最適</li>
          <li>• <strong>px</strong>: デザインの正確性が重要な場合に推奨</li>
          <li>• <strong>em</strong>: コンポーネント内での相対的なサイズ調整に便利</li>
        </ul>
      </div>
    </div>
  );
};

export default UnitComparison;