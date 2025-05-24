import { useState } from 'react';
import { Layers, Package, Target, Grid } from 'lucide-react';
import FileIcon from './components/FileIcon';
import Stack from './components/Stack';
import Box from './components/Box';
import Center from './components/Center';
import Cluster from './components/Cluster';

function App() {
  const [activeGenerator, setActiveGenerator] = useState('stack');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <FileIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-white">Layout Component Generator</h1>
            </div>
            
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveGenerator('stack')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeGenerator === 'center'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Target className="w-4 h-4 mr-2" />
                Center
              </button>

              <button
                onClick={() => setActiveGenerator('cluster')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeGenerator === 'cluster'
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4 mr-2" />
                Cluster
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
      </div>
    </div>
  );
}

export default App;
