import { render, screen } from '@testing-library/react'
import { Loader } from './loader'

import styles from './loader.module.scss'

describe('testing loader animated color', ()=> {
    test('animated color enabled', () => {
        render(<Loader hasAnimatedColor={true} />)
        const loader = screen.getByTestId('loader')
    
        expect(loader).toBeInTheDocument()
        expect(loader).toHaveClass(styles.animatedColor)
    })
    test('animated color disabled', () => {
        render(<Loader />)
        const loader = screen.getByTestId('loader')
    
        expect(loader).toBeInTheDocument()
        expect(loader).toHaveClass(styles.notAnimatedColor)
    })
    test('default (disabled)', () => {
        render(<Loader />)
        const loader = screen.getByTestId('loader')
    
        expect(loader).toBeInTheDocument()
        expect(loader).toHaveClass(styles.notAnimatedColor)
    })
})
