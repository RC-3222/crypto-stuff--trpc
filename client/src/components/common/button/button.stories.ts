import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Custom/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            table: {
                disable: true
            }
        },
        type: {
            table: {
                disable: true
            }
        }
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Green: Story = {
    args: {
        variant: 'green',
        children: 'Button'
    },

};

export const Red: Story = {
    args: {
        variant: 'red',
        children: 'Button'
    },
};

export const Generic = {
    args: {
        children: 'Button'
    },
};