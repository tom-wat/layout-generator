import { useState, useRef } from 'react';
import { 
  Layers, Package, Target, Grid as GridIcon, PanelLeft, ToggleLeft, 
  RectangleVertical, Grid3X3, Layout, Network, Frame, Film, Eye, 
  Sparkles, Container, Globe, Settings, Ruler
} from 'lucide-react';

import FileIcon from './components/FileIcon';
import Stack from './components/Stack';
import Box from './components/Box';
import Center from './components/Center';
import Cluster from './components/Cluster';
import Sidebar from './components/Sidebar';
import Switcher from './components/Switcher';
import Cover from './components/Cover';
import GridLayout from './components/Grid';
import GridAreaLayout from './components/GridArea';
import SubgridLayout from './components/Subgrid';
import FrameLayout from './components/Frame';
import ReelLayout from './components/Reel';
import ImposterLayout from './components/Imposter';
import IconLayout from './components/Icon';
import ContainerLayout from './components/Container';

// 新しいページビルダーコンポーネントをインポート
import WebsitePageBuilder from './components/WebsitePageBuilder';
import ModularSystemSettings from './components/ModularSystemSettings';
import DesignSystemProvider from './components/DesignSystemProvider';

// アプリケーションモード定義
const APP_MODES = {
  PAGE_BUILDER: 'page-builder',
  COMPONENT_EDITOR: 'component-editor',
  DESIGN_SYSTEM: 'design-system'
} as const;

type AppMode = typeof APP_MODES[keyof typeof APP_MODES];

function App() {
  const [appMode, setAppMode] = useState<AppMode>(APP_MODES.COMPONENT_EDITOR);
  const [activeGenerator, setActiveGenerator] = useState('stack');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const componentNavRef = useRef<HTMLElement>(null);

  // ドラッグスクロール処理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!componentNavRef.current) return;
    
    // ボタンクリックの場合はドラッグを開始しない
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX, 
      scrollLeft: componentNavRef.current.scrollLeft 
    });
    
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !componentNavRef.current) return;
    
    e.preventDefault();
    const deltaX = e.clientX - dragStart.x;
    componentNavRef.current.scrollLeft = dragStart.scrollLeft - deltaX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <DesignSystemProvider>
      <div className="min-h-screen bg-gray-900">
      {/* Updated Navigation Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* App Title */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <FileIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-white whitespace-nowrap hidden md:block">
                Layout Component Generator
              </h1>
            </div>
            
            {/* Mode Switcher */}
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setAppMode(APP_MODES.PAGE_BUILDER)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  appMode === APP_MODES.PAGE_BUILDER
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                ページビルダー
              </button>
              <button
                onClick={() => setAppMode(APP_MODES.COMPONENT_EDITOR)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  appMode === APP_MODES.COMPONENT_EDITOR
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                コンポーネント設定
              </button>
              <button
                onClick={() => setAppMode(APP_MODES.DESIGN_SYSTEM)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  appMode === APP_MODES.DESIGN_SYSTEM
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                <Ruler className="w-4 h-4 mr-2" />
                デザインシステム
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Editor Navigation (only show when in component editor mode) */}
      {appMode === APP_MODES.COMPONENT_EDITOR && (
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <nav 
              ref={componentNavRef}
              className={`flex space-x-4 overflow-x-auto min-w-0 flex-1 custom-scrollbar ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveGenerator('stack')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'stack'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Layers className="w-4 h-4 mr-2" />
                Stack
              </button>
              
              <button
                onClick={() => setActiveGenerator('box')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'box'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Box
              </button>

              <button
                onClick={() => setActiveGenerator('center')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'center'
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Target className="w-4 h-4 mr-2" />
                Center
              </button>

              <button
                onClick={() => setActiveGenerator('cluster')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'cluster'
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <GridIcon className="w-4 h-4 mr-2" />
                Cluster
              </button>

              <button
                onClick={() => setActiveGenerator('sidebar')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'sidebar'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <PanelLeft className="w-4 h-4 mr-2" />
                Sidebar
              </button>

              <button
                onClick={() => setActiveGenerator('switcher')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'switcher'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <ToggleLeft className="w-4 h-4 mr-2" />
                Switcher
              </button>

              <button
                onClick={() => setActiveGenerator('cover')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'cover'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <RectangleVertical className="w-4 h-4 mr-2" />
                Cover
              </button>

              <button
                onClick={() => setActiveGenerator('grid')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'grid'
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </button>

              <button
                onClick={() => setActiveGenerator('gridarea')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'gridarea'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Layout className="w-4 h-4 mr-2" />
                Grid Area
              </button>

              <button
                onClick={() => setActiveGenerator('subgrid')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'subgrid'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Network className="w-4 h-4 mr-2" />
                Subgrid
              </button>

              <button
                onClick={() => setActiveGenerator('frame')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'frame'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Frame className="w-4 h-4 mr-2" />
                Frame
              </button>

              <button
                onClick={() => setActiveGenerator('reel')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'reel'
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Film className="w-4 h-4 mr-2" />
                Reel
              </button>

              <button
                onClick={() => setActiveGenerator('imposter')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'imposter'
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Imposter
              </button>

              <button
                onClick={() => setActiveGenerator('icon')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'icon'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Icon
              </button>

              <button
                onClick={() => setActiveGenerator('container')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                  activeGenerator === 'container'
                    ? 'bg-slate-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Container className="w-4 h-4 mr-2" />
                Container
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-0">
        {appMode === APP_MODES.PAGE_BUILDER ? (
          <WebsitePageBuilder />
        ) : appMode === APP_MODES.DESIGN_SYSTEM ? (
          <ModularSystemSettings />
        ) : (
          <>
            {activeGenerator === 'stack' && <Stack />}
            {activeGenerator === 'box' && <Box />}
            {activeGenerator === 'center' && <Center />}
            {activeGenerator === 'cluster' && <Cluster />}
            {activeGenerator === 'sidebar' && <Sidebar />}
            {activeGenerator === 'switcher' && <Switcher />}
            {activeGenerator === 'cover' && <Cover />}
            {activeGenerator === 'grid' && <GridLayout />}
            {activeGenerator === 'gridarea' && <GridAreaLayout />}
            {activeGenerator === 'subgrid' && <SubgridLayout />}
            {activeGenerator === 'frame' && <FrameLayout />}
            {activeGenerator === 'reel' && <ReelLayout />}
            {activeGenerator === 'imposter' && <ImposterLayout />}
            {activeGenerator === 'icon' && <IconLayout />}
            {activeGenerator === 'container' && <ContainerLayout />}
          </>
        )}
      </div>
      </div>
    </DesignSystemProvider>
  );
}

export default App;