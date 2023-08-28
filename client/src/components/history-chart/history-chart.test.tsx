import { render, screen } from '@testing-library/react'
import { HistoryChart } from './history-chart'
import { historyData } from '../../mocks'

describe('testing chart', () => {
    test('renders correctly', () => {
        render(<HistoryChart testing={true} data={historyData} />)
        const svgElement = screen.getByRole('chart')
        expect(svgElement).toBeInTheDocument()
    })
})
