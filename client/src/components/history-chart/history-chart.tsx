import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Area,
} from 'recharts'
import { HistoryItem } from '../../types/history'

type HistoryChartProps = {
    data: HistoryItem[]
    testing?: boolean
}

const formatXAxis = (tickItem: number) => {
    return new Date(tickItem).toLocaleDateString()
}

export const HistoryChart = ({ data, testing = false }: HistoryChartProps) => {
    return testing ? (
        <AreaChart
            width={660}
            height={460}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            data-testid="history-chart"
            role="chart"
        >
            <XAxis dataKey="time" tickFormatter={formatXAxis} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Area
                type="monotone"
                dataKey="priceUsd"
                stroke="#8884d8"
                fill="#8884d8"
            />
        </AreaChart>
    ) : (
        <ResponsiveContainer width="95%" height={460}>
            <AreaChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="time" tickFormatter={formatXAxis} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Area
                    type="monotone"
                    dataKey="priceUsd"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
