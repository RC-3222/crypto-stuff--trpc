import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

test('renders correctly', () => {
    render(<Loader />);
    const elem = screen.getByTestId('loader')

    expect(elem).toBeInTheDocument();
});