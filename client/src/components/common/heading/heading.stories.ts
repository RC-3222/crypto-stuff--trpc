import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from './heading'

const meta = {
    title: 'Custom/Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        dataTestId: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const H2: Story = {
    args: {
        variant: 'h2',
        children: 'Heading',
    },
}

export const H3: Story = {
    args: {
        variant: 'h3',
        children: 'Heading',
    },
}

export const H4: Story = {
    args: {
        variant: 'h4',
        children: 'Heading',
    },
}