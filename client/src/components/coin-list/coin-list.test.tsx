import { render, screen } from '@testing-library/react';
import { CoinInfo } from '../../types';
import { CoinList } from './coin-list';
import { CoinsData } from '../../mocks';

jest.mock('./coin', () => ({ Coin:({item}:{item:CoinInfo}) => <div data-testid="li-mock">{item.name}</div> }));

describe('coin list tests', () => {
    test('renders a correct amount of items', () => {
        render(<CoinList items={CoinsData} />)

        const items = screen.getAllByTestId("li-mock")
        expect(items).toHaveLength(CoinsData.length)
    })
})