import { useContext } from 'react';
import { ChartsContext } from '../contexts/charts';

import './Charts.css';

export default function SpecificActivityChart() {

    const { selectedMeasurementType, specificActivity } = useContext(ChartsContext);
    console.log(specificActivity);

    return (
        <div className='specific-activity-container' style={(selectedMeasurementType !== 'specificActivity') ? { opacity: '0', position: 'absolute', zIndex: '-9999' } : { transitionDuration: '369ms', opacity: '1' }} >
            <div style={{ display: 'grid', gridTemplateColumns: '5rem', gridAutoColumns: 'min-content', margin: '0.2rem 0' }} >
                <b></b>
                <div style={{ display: 'flex', columnGap: '0.8rem', gridColumn: '2/3' }} >
                    {Object.keys(specificActivity['Time 1']).map((dta) => {
                        return <b style={{ minWidth: '6rem' }} >{dta}</b>
                    })}
                </div>
            </div>
            {Object.keys(specificActivity).map((chart) => {
                let data = specificActivity[chart];
                return (
                    <div style={{ display: 'grid', gridTemplateColumns: '5rem', gridAutoColumns: 'min-content', margin: '0.3rem 0' }} >
                        <b style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', width: '5rem', gridColumn: '1/1', position: 'fixed', left: '1.2rem', backgroundColor: 'rgba(255, 255, 255, 0.825)', borderRadius: '0 0.222rem 0.222rem 0' }} >{chart}</b>
                        <div style={{ display: 'flex', columnGap: '0.8rem', gridColumn: '2/3' }} >
                            {Object.keys(data).map((dta) => {
                                return <p style={{ minWidth: '6rem', fontSize: '0.9rem' }} >{parseFloat(data[dta]).toFixed(3)}</p>
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
