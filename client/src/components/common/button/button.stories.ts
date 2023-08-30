import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
    title: 'Custom/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
        dataTestid: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Green: Story = {
    args: {
        variant: 'green',
        children: 'Button',
    },
}

export const Red: Story = {
    args: {
        variant: 'red',
        children: 'Button',
    },
}
