import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import courseReducer from '../../../store/courses/reducer';
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

const mockCourseState = {
	user: {
		userDetails: {
			successful: true,
			result: 'token',
			user: {
				email: 'react@123.com',
				name: 'Test name',
			},
		},
		role: 'admin',
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
	courseAuthor: {
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

const mockCourseStateWithEmptyCourses = {
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
		courses: [],
		error: '',
	},
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
	useDispatch: jest.fn(),
}));
const store = createStore(courseReducer, mockCourseState);

describe('When Courses available', () => {
	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...mockCourseState });
		});
		useDispatch.mockImplementation(() => () => {
			return;
		});
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Courses />
				</Provider>
			</BrowserRouter>
		);
	});
	afterEach(() => {
		useSelector.mockClear();
	});
	test('should display amount of CourseCard equal length of courses array', () => {
		expect(screen.getAllByTestId('course-card').length).toBe(1);
	});
	test('should show the correct link of courseForm page', () => {
		expect(screen.getByTestId('link')).toHaveAttribute('href', '/courses/add');
	});
	test('should navigate to courseForm page', () => {
		const button = screen.getByText('Add new course');
		fireEvent.click(
			button,
			render(
				<BrowserRouter>
					<Provider store={store}>
						<CourseForm />
					</Provider>
				</BrowserRouter>
			)
		);
		expect(screen.queryByText('Create course')).toBeInTheDocument();
	});
});

describe('When Courses not available', () => {
	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...mockCourseStateWithEmptyCourses });
		});
		useDispatch.mockImplementation(() => () => {
			return;
		});
	});
	afterEach(() => {
		useSelector.mockClear();
	});
	test('should display Empty container if courses array length is 0', () => {
		const newStore = createStore(
			courseReducer,
			mockCourseStateWithEmptyCourses
		);
		render(
			<BrowserRouter>
				<Provider store={newStore}>
					<Courses />
				</Provider>
			</BrowserRouter>
		);
		expect(screen.queryAllByTestId('course-card').length).toBe(0);
	});
});
