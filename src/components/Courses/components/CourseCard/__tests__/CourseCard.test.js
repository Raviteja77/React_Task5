import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import courseReducer from '../../../../../store/courses/reducer';
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
import CourseCard from '../CourseCard';
const mockCourseState = {
	user: {
		role: 'user',
	},
	authors: {
		authors: [
			{
				name: 'Ravi Teja',
				id: '9870c529-3479-4113-a68d-f44710a87e99',
			},
			{
				name: 'Rajesh',
				id: 'a49ecbe9-ad6d-4c26-bdeb-3bcc4bc9e5dc',
			},
		],
	},
	courses: {
		courses: [
			{
				title: 'React',
				description: 'React testing',
				duration: 45,
				creationDate: '04/03/2022',
				id: 'thisisafakeid',
				authors: [
					'9870c529-3479-4113-a68d-f44710a87e99',
					'a49ecbe9-ad6d-4c26-bdeb-3bcc4bc9e5dc',
				],
			},
		],
		error: '',
	},
};
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));
const store = createStore(courseReducer, mockCourseState);

describe('Course card', () => {
	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...mockCourseState });
		});
		render(
			<BrowserRouter>
				<Provider store={store}>
					<CourseCard
						key={mockCourseState.courses.courses[0].id}
						value={mockCourseState.courses.courses[0]}
					/>
				</Provider>
			</BrowserRouter>
		);
	});
	afterEach(() => {
		useSelector.mockClear();
	});
	test('should display course title', () => {
		const title = screen.getByTestId('title');
		expect(title.textContent).toBe('React');
	});
	test('should display course description', () => {
		const description = screen.getByTestId('description');
		expect(description.textContent).toBe('React testing');
	});
	test('should display duration in correct format', () => {
		const duration = screen.getByTestId('duration');
		expect(duration.textContent).toBe('00:45 hour');
	});
	test('should display authors list', () => {
		const authors = screen.getByTestId('authors');
		expect(authors.textContent).toBe('Ravi Teja, Rajesh');
	});
	test('should display created date in the correct format', () => {
		const creationDate = screen.getByTestId('creation-date');
		expect(creationDate.textContent).toBe('04/03/2022');
	});
});
