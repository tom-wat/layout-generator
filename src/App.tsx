import { useState } from 'react';
import { Layers, Package, Target, Grid as GridIcon, PanelLeft, ToggleLeft, RectangleVertical, Grid3X3, Layout, Network } from 'lucide-react';
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

function App() {
  const [activeGenerator, setActiveGenerator] = useState('stack');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-8 min-w-0">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <FileIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-white whitespace-nowrap hidden md:block">Layout Component Generator</h1>
            </div>
            
            <nav className="flex space-x-4 overflow-x-auto min-w-0 flex-1">
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
            </nav>
          </div>
        </div>
      </div>

      {/* Generator Content */}
      <div className="pt-0">
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
      </div>
    </div>
  );
}

export default App;
