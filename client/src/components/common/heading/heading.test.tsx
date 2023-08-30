
import { render, screen } from '@testing-library/react'
import { Heading } from './heading'
import styles from './header.module.scss'

describe('heading variants work correctly', () => {
    test('h2', () => {
        render(<Heading variant="h2">Heading</Heading>)

        const hElement = screen.getByText(/Heading/i)

        expect(hElement).toBeInTheDocument()
        expect(hElement).toHaveClass(styles.h2)
    })
    test('h3', () => {
        render(<Heading variant="h3">Heading</Heading>)

        const hElement = screen.getByText(/Heading/i)

        expect(hElement).toBeInTheDocument()
        expect(hElement).toHaveClass(styles.h3)
    })
    test('h4', () => {
        render(<Heading variant="h4">Heading</Heading>)

        const hElement = screen.getByText(/Heading/i)

        expect(hElement).toBeInTheDocument()
        expect(hElement).toHaveClass(styles.h4)
    })
    test('default', () => {
        render(<Heading>Heading</Heading>)

        const hElement = screen.getByText(/Heading/i)

        expect(hElement).toBeInTheDocument()
        expect(hElement).toHaveClass(styles.h2)
    })
})