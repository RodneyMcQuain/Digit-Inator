import React, { useEffect, useState } from 'react';
import { getViewportWidth } from '../../services/dimensions';
import { LIGHT_WHITE, SECONDARY_ACCENT } from '../../styles/utilities/colors.module.scss';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from 'react-vis';
import styles from '../../styles/components/Drawing/PredictionsGraph.module.scss';
import { useTransitionIn } from '../../services/useTransitionIn';

interface PredictionsGraphProps {
    predictions: number[];
}

const AXIS_STYLE = {
    line: { stroke: LIGHT_WHITE },
    ticks: { stroke: LIGHT_WHITE },
    text: { stroke: 'none', fill: LIGHT_WHITE },
};

const getGraphSize = (): number => getViewportWidth() < 400 ? (getViewportWidth() - 50) : 300;

const PredictionsGraph = ({ predictions }: PredictionsGraphProps) => {
    const [graphSize, setGraphSize] = useState<number>(0);
    useEffect(() => {
        const updateGraphSize = () => setGraphSize(getGraphSize());
        updateGraphSize();
        window.addEventListener('resize', updateGraphSize);
        return () => window.removeEventListener('resize', updateGraphSize);
    });
    const graphData = Array.from(predictions).map((p, i) => ({ x: i, y: p * 100 }));
    const predictionGraphWithTransition = useTransitionIn(styles.appear, styles['predictions-graph']);

    return (
        <XYPlot 
            height={graphSize} 
            width={graphSize} 
            xType="ordinal" 
            yDomain={[0, 100]} 
            colorType="literal" 
            className={predictionGraphWithTransition}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis style={AXIS_STYLE} />
            <YAxis style={AXIS_STYLE} />
            <VerticalBarSeries color={SECONDARY_ACCENT} barWidth={0.5} data={graphData} />
        </XYPlot>
    );
};

export default PredictionsGraph;