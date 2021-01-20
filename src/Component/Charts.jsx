import React, { useState, useEffect } from "react"
import { Bar } from 'react-chartjs-2';

function Charts(props) {
    const [labels, setLabels] = useState(props.labels);
    const [dataGraph, setdataGraph] = useState(props.dataGraph);
    // const createDataGraph = () => {
    //     let risk = props.riskPrediction;
    //     if (risk<2) {
    //         risk = (risk-1)*100;
    //         setdataGraph([risk, 100-risk, 0]);
    //     }else if(risk < 3){
    //         risk = (risk-2)*100;
    //         setdataGraph([0, risk, 100-risk]);
    //     }else{
    //         setdataGraph([0, 0, 100]);
    //     }
    // }

    useEffect(() => {
        console.log(props.dataGraph);
    }, [])
    // useEffect(() => {
    //     console.log(props);
    //     setInterval(() => {
    //         console.log(props)
    //         setLabels(props)
    //     }, 500);
        
    // }, []);

    // useEffect(() => {
    //     if(labels !=[] ){
    //         clearInterval();
    //     }
    // }, [labels])
    return (

        <div className="mx-4 mt-3">
            <Bar
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: [
                            'rgba(17, 171, 17, 0.2)',
                            'rgba(245, 193, 22, 0.2)',
                            'rgba(226, 19, 19, 0.2)'
                        ],
                        data: dataGraph
                    }]
                }}
                height={300}

                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    )
}
export default Charts