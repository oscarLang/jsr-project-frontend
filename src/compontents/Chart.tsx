import React from "react";
import { CircularProgress, Typography } from "@mui/material"
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { IStock, IStockHistory } from "../utils/types";

interface IProps {
  object: IStock;
}

const Chart: React.FC<IProps> = ({object}) => {
    if (!object || !Object.keys(object).length) {
      return <CircularProgress />
    }

    let min = object.history.reduce((prev: IStockHistory, curr: IStockHistory) => prev.price < curr.price ? prev : curr);
    let max = object.history.reduce((prev: IStockHistory, curr: IStockHistory) => prev.price > curr.price ? prev : curr);
    let minDomain = Number(min.price - 20) >= 0 ? Number(min.price - 20) : 0;
    let maxDomain = Number(max.price) + 20;
    return (
        <>
            <Typography variant="h4">{object.name}</Typography>
            <ResponsiveContainer  width="99%" aspect={3}>
                <LineChart
                    data={object.history}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                <YAxis domain={[Math.round(minDomain), Math.round(maxDomain)]}>
                    <Label
                        angle={270}
                        position="left"
                        >
                        Price
                    </Label>
                </YAxis>
                <XAxis />
                <Line
                    isAnimationActive={false}
                    dataKey="price"
                    stroke="#8884d8"
                    dot={false}
                />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default Chart;