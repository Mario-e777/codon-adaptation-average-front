import { createContext, useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const DEFAULT_STATE = { };
const ChartsContext = createContext(DEFAULT_STATE);

export default function ChartsProvider({ children }) {
    const [selectedFile, setSelectedFile] = useState();
    const [selectedMeasurementType, handleChangeMeasurementType] = useState('average');
    const [chartsData, setChartsData] = useState();
    const [chartData, setChartData] = useState();
    const [chartTimes, setChartTimes] = useState();
    const [totalCharts, setTotalCharts] = useState(0);
    const [selectedChart, setSelectedChart] = useState(0);
    const [otherCharts, setOtherCharts] = useState();
    const [chartTitles, setChartTitles] = useState([]);
    const [selectedChartTitle, setSelectedChartTitle] = useState('');
    const [averageType, setAverageType] = useState(0);
    const [specificActivity, setSpecificActivity] = useState();

    function handleChartAverageType(type) {
        const OTHER_CHARTS_AUX = [...chartsData];
        if (type === 'Letra' && averageType !== 0) {
            setChartData(otherCharts[selectedChart]);
            setChartsData(otherCharts);
            setTotalCharts(otherCharts.length);
            setOtherCharts([OTHER_CHARTS_AUX]);
            setAverageType(0);
        } else if (type === 'Numero' && averageType !== 1) {
            setChartData(otherCharts[0][selectedChart]);
            setChartsData(otherCharts[0]);
            setTotalCharts(otherCharts[0].length);
            setOtherCharts(OTHER_CHARTS_AUX);
            setAverageType(1);
        }
    };

    function handleChangeChart(changeTo) {
        if (changeTo === 'past') {
          if (selectedChart - 1 === -1) {
            setChartData(chartsData[totalCharts - 1])
            setSelectedChart(totalCharts - 1);
            setSelectedChartTitle(chartTitles[totalCharts - 1]);
          } else {
            setChartData(chartsData[selectedChart - 1])
            setSelectedChart(selectedChart - 1);
            setSelectedChartTitle(chartTitles[selectedChart - 1]);
          }
        } else if (changeTo === 'next') {
          if (selectedChart + 1 === totalCharts) {
            setChartData(chartsData[0])
            setSelectedChart(0);
            setSelectedChartTitle(chartTitles[0]);
          } else {
            setChartData(chartsData[selectedChart + 1])
            setSelectedChart(selectedChart + 1);
            setSelectedChartTitle(chartTitles[selectedChart + 1]);
          }
        }
      }

    function handleMeasurementTypeChange() {
        selectedMeasurementType === 'average' ?
            handleChangeMeasurementType('specificActivity') :
            handleChangeMeasurementType('average');
    }

    function handlePickedFile(pickedFile) {
        if (pickedFile.type !== 'text/plain') {
            alert('Invalid File');
            return;
        }

        setSelectedFile(pickedFile);
    }

    useEffect(() => {
        if (!selectedFile) return;
        const data = new FormData()
        data.append('file', selectedFile);
        axios.post(
            "http://localhost:3001/",
            data
        ).then(response => {
            setChartTimes(response.data.data[0]);
            setSpecificActivity(response.data.data[1]);
            setTotalCharts(response.data.data[2][0].length);
            setChartsData(response.data.data[2][0]);
            setChartData(response.data.data[2][0][0]);
            setOtherCharts(response.data.data[2].filter((_, index) => index !== 0));
            setSelectedChart(0);
        });

        axios.get("http://localhost:3001/time-frame-titles",
        ).then(response => {
            setChartTitles(response.data);
            setSelectedChartTitle(response.data[0]);
        });

    }, [selectedFile]);

    useEffect(() => {
        if (!chartData) return;
        const ctx = document.getElementById('myChart');
        let canvasChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartTimes,
            datasets: chartData
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    size: 16
                  }
                }
              }
            }
          }
        });
        return () => {
          canvasChart.destroy();
        }
      }, [chartData]);

    const PROVIDER_VALUE = {
        selectedMeasurementType,
        handleChangeMeasurementType: handleMeasurementTypeChange,
        handlePickedFile,
        handleChartAverageType,
        selectedChartTitle,
        handleChangeChart,
        averageType,
        specificActivity
    };

    return (
        <ChartsContext.Provider value={PROVIDER_VALUE}>
            {children}
        </ChartsContext.Provider>
    )
};

export { ChartsContext };
