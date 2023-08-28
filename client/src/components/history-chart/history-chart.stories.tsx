import type { Meta, StoryObj } from '@storybook/react';
import { HistoryChart } from './history-chart';
import { historyData } from '../../mocks';

const meta = {
    title: 'Custom/HistoryChart',
    component: HistoryChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        testing: {
            table: {
                disable: true
            }
        }
    },
    decorators: [
        (Story) => (
            <div style={{ width: '640px', height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof HistoryChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Generic: Story = {
    args: {
        data: historyData,
    }
};