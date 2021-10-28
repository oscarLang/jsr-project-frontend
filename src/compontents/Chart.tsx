import React from "react";
import { Button, ButtonGroup, CircularProgress, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Area, AreaChart, CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { IStock, IStockHistory } from "../utils/types";
import { format } from 'date-fns'

interface IProps {
  object: IStock;
}

type FilterPeriod = "HOUR" | "DAY" | "MONTH";

const Chart: React.FC<IProps> = ({object}) => {
    const [filter, setFilter] = React.useState<IStockHistory[]>([]);
    const [period, setFilterPeriod] = React.useState<FilterPeriod>("HOUR");
    const [timeForamt, setTimeFormat] = React.useState<string>("HH:mm");
    React.useEffect(() => {
        if (object && Object.keys(object).length) {
            onChangeTimeRange(period);
        }
    }, [object]);

    const onChangeTimeRange = (range: FilterPeriod): void => {
        switch (range) {
            case "HOUR":
                setFilter(object.minutly);
                setFilterPeriod("HOUR");
                setTimeFormat("HH:mm");
                break;
            case "DAY":
                setFilter(object.hourly);
                setTimeFormat("HH:mm");
                setFilterPeriod("DAY");
                break;
            case "MONTH":
                setFilter(object.daily);
                setTimeFormat("MM/dd");
                setFilterPeriod("MONTH");
                break;
            default:
                break;
        }
    };

    const formatTick = (tick: string): string => {
        return format(Date.parse(tick), timeForamt);
    };

    if (!object || !Object.keys(object).length || !filter.length) {
        return <CircularProgress />
    }

    let min = filter.reduce((prev: IStockHistory, curr: IStockHistory): IStockHistory => {
       return parseFloat(prev.price) < parseFloat(curr.price) ? prev : curr; 
    });
    
    let max = filter.reduce((prev: IStockHistory, curr: IStockHistory): IStockHistory => {
        return parseFloat(prev.price) > parseFloat(curr.price) ? prev : curr; 
    });
    let minDomain = Number(min.price) - 20 >= 0 ? Number(min.price) - 20 : 0;
    let maxDomain = Number(max.price) + 20;
    return (
        <>
            <Typography variant="h6">{object.name}</Typography>
            <ResponsiveContainer width="99%" aspect={3}>
                <AreaChart
                    data={[...filter].reverse()}
                    margin={{
                        top: 24,
                        right: 24,
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
                    <XAxis dataKey="date" tickFormatter={formatTick}/>
                    <Area
                        dataKey="price"
                        stroke="purple"
                        fill="lightblue"
                        type="monotone"
                        dot={false}
                    />
                    <Tooltip 
                        formatter={(value: string) => [`$${Number(value).toFixed(2)}`, "Price"]}
                        labelFormatter={(value: string) => format(Date.parse(value),"yyyy/MM/dd-HH:mm")}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <ToggleButtonGroup
                color="primary"
                value={period}
                exclusive
                onChange={(event, value: FilterPeriod) => onChangeTimeRange(value)}
                fullWidth
                size="small"
                >
                <ToggleButton value="HOUR">Latest hour</ToggleButton>
                <ToggleButton value="DAY">Last 24 hours</ToggleButton>
                <ToggleButton value="MONTH">Last month</ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}

export default Chart;