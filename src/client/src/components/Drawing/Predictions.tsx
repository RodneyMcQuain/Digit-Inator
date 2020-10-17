import React from 'react';

interface PredictionsProp {
    predictions: number[];
}

const ShowPredictions = ({predictions} : PredictionsProp) => {
    return (
        <div>
            <br />
            <br />
            <p> Your Prediction is ... {predictions.indexOf(Math.max(...predictions))}</p>
        </div>
    );

}
export default ShowPredictions;