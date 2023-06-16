import { useContext } from 'react';
import { ChartsContext } from './components/contexts/charts';
import BackgroundImage from './codon-space-background.png';
import { Header, Charts } from './components';

import './App.css';

function App() {

  const { selectedChartTitle, selectedMeasurementType} = useContext(ChartsContext);

  return (
    <div className="App">
      <Header
       chartTitle={selectedChartTitle}
       isAverageChart={selectedMeasurementType === 'average'}
      />
      {selectedChartTitle && <Charts />}
      <img className='background-image' src={BackgroundImage} alt='Space background' width='100' height='100' />
    </div >
  );
}

export default App;
