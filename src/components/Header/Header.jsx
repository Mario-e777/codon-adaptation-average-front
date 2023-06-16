import { useContext } from 'react';
import { ChartsContext } from '../contexts/charts';

import './Header.css';

export default function Header({ chartTitle, isAverageChart }) {

  const { handleChangeMeasurementType, handlePickedFile, handleChartAverageType, averageType } = useContext(ChartsContext);
  
  return (
    <div className='header-container' >
      <h1>Codon Adaptation Average</h1>
      {(isAverageChart && chartTitle) && <div style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }} >
        <p style={{ fontSize: '1.2rem' }} >{chartTitle}</p>
        <div style={{ fontSize: '0.777rem' }} >
          <p>Promedio por:</p>
          <button className={averageType === 0 && 'selecetdType'} style={{ marginRight: '0.333rem' }} onClick={e => handleChartAverageType(e.target.innerText)}>Letra</button>
          <button className={averageType === 1 && 'selecetdType'} onClick={e => handleChartAverageType(e.target.innerText)}>Numero</button>
        </div>
      </div>}
      {(!isAverageChart && chartTitle) && <h2>Specific Activity</h2>}
      <div>
        {chartTitle && <button style={{ marginRight: '1rem' }} onClick={handleChangeMeasurementType}>Switch Chart</button>}
        <input type="file" name="file" onChange={(e) => handlePickedFile(e.target.files[0])} />
      </div>
    </div>
  )
}
