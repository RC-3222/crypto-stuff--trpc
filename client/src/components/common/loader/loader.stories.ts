import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './loader'

const meta = {
    title: 'Custom/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Generic: Story = {}
