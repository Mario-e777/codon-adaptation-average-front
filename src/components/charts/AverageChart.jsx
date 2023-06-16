import { useContext } from 'react';
import { ChartsContext } from '../contexts/charts';

import './Charts.css';

export default function AverageChart() {

    const { selectedMeasurementType, handleChangeChart } = useContext(ChartsContext);

    return (
        <div className='carousel-canvas' style={(selectedMeasurementType !== 'average') ? { opacity: '0', transitionDuration: '0ms', position: 'absolute', zIndex: '-9999' } : { transitionDuration: '369ms', opacity: '1' }} >
            <>
                <div onClick={() => handleChangeChart('past')} className='carousel-control' ><p>{'←'}</p></div>
                <div className='canvas-container' >
                    <canvas id="myChart"></canvas>
                </div>
                <div onClick={() => handleChangeChart('next')} className='carousel-control' ><p>{'→'}</p></div>
            </>
        </div>
    )
}
