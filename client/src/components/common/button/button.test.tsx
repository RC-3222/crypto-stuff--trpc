import { render, screen } from '@testing-library/react';
import { Button } from './button';

import styles from './button.module.scss'

test('supports inner text', () => {
    render(<Button>Button</Button>);

    const btnElement = screen.getByText(/Button/i);

    expect(btnElement).toBeInTheDocument();
});


test('is clickable', () => {
    let i = 0;
    render(<Button onClick={() => i += 5}>Button</Button>);

    screen.getByText(/Button/i).click();

    expect(i).toEqual(5);
});


describe('variants work correctly', () => {
    test('red variant', () => {
        render(<Button variant='red'>Button</Button>);
        const btnElement = screen.getByText(/Button/i);

        expect(btnElement).toBeInTheDocument();
        expect(btnElement).toHaveClass(styles['red']);
    })
    test('green variant', () => {
        render(<Button variant='green'>Button</Button>);
        const btnElement = screen.getByText(/Button/i);

        expect(btnElement).toBeInTheDocument();
        expect(btnElement).toHaveClass(styles['green']);
    })
    test('default variant', () => {
        render(<Button>Button</Button>);
        const btnElement = screen.getByText(/Button/i);

        expect(btnElement).toBeInTheDocument();
        expect(btnElement).toHaveClass(styles['green']);
    })
});