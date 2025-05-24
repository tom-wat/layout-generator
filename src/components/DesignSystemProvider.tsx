import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { 
  DesignSystem, 
  ModularSystemConfig, 
  GeneratedSizes 
} from '../types';
import { 
  getDefaultDesignSystem, 
  getDefaultModularSystemConfig 
} from '../utils/defaults';
import { generateSizesFromModularSystem } from '../utils/generators';

interface DesignSystemContextType {
  designSystem: DesignSystem;
  updateDesignSystem: (updates: Partial<DesignSystem>) => void;
  updateModularSystem: (config: ModularSystemConfig, generatedSizes: GeneratedSizes) => void;
  resetToDefaults: () => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

interface DesignSystemProviderProps {
  children: ReactNode;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({ children }) => {
  const [designSystem, setDesignSystem] = useState<DesignSystem>(() => {
    const defaultSystem = getDefaultDesignSystem();
    const defaultModularConfig = getDefaultModularSystemConfig();
    const generatedSizes = generateSizesFromModularSystem(defaultModularConfig);
    
    return {
      ...defaultSystem,
      modularSystem: defaultModularConfig,
      generatedSizes
    };
  });

  const updateDesignSystem = useCallback((updates: Partial<DesignSystem>) => {
    setDesignSystem(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const updateModularSystem = useCallback((config: ModularSystemConfig, generatedSizes: GeneratedSizes) => {
    setDesignSystem(prev => ({
      ...prev,
      modularSystem: config,
      generatedSizes,
      typography: {
        ...prev.typography,
        fontSizes: generatedSizes.fontSizes
      },
      spacing: generatedSizes.spacing
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaultSystem = getDefaultDesignSystem();
    const defaultModularConfig = getDefaultModularSystemConfig();
    const generatedSizes = generateSizesFromModularSystem(defaultModularConfig);
    
    setDesignSystem({
      ...defaultSystem,
      modularSystem: defaultModularConfig,
      generatedSizes
    });
  }, []);

  const value: DesignSystemContextType = {
    designSystem,
    updateDesignSystem,
    updateModularSystem,
    resetToDefaults
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDesignSystem = (): DesignSystemContextType => {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};

// デザインシステムのCSS変数を生成するフック
// eslint-disable-next-line react-refresh/only-export-components
export const useDesignSystemCSS = () => {
  const { designSystem } = useDesignSystem();
  
  const getCSSVariables = useCallback(() => {
    const { typography, breakpoints } = designSystem;
    
    // 生成されたサイズを使用
    let spacing = designSystem.spacing;
    let fontSizes = typography.fontSizes;
    
    if (designSystem.modularSystem && designSystem.generatedSizes) {
      spacing = designSystem.generatedSizes.spacing;
      fontSizes = designSystem.generatedSizes.fontSizes;
    }
    
    return {
      
      // Typography
      ...Object.fromEntries(
        Object.entries(fontSizes).map(([key, value]) => [`--text-${key}`, value])
      ),
      
      // Spacing
      ...Object.fromEntries(
        Object.entries(spacing).map(([key, value]) => [`--space-${key}`, value])
      ),
      
      // Breakpoints
      ...Object.fromEntries(
        Object.entries(breakpoints).map(([key, value]) => [`--breakpoint-${key}`, value])
      )
    };
  }, [designSystem]);
  
  return { getCSSVariables };
};

export default DesignSystemProvider;