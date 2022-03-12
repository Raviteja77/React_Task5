import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import userReducer from '../../../store/user/reducer';
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
const mockUserState = {
	user: {
		userDetails: {
			successful: true,
			result: 'token',
			user: {
				email: 'react@123.com',
				name: 'Test name',
			},
		},
		error: '',
		role: 'user',
	},
};
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));
const store = createStore(userReducer, mockUserState);

describe('Header', () => {
	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...mockUserState });
		});
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Header />
				</Provider>
			</BrowserRouter>
		);
	});
	afterEach(() => {
		useSelector.mockClear();
	});
	test('should load logo initially', () => {
		const logoElement = screen.queryByAltText('logo');
		expect(logoElement).toBeInTheDocument();
	});
	test('should display user name once user logged in', () => {
		const userName = screen.getByTestId('username');
		expect(userName.textContent).toBe('Test name');
	});
});
