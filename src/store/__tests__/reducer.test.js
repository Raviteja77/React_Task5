import courseReducer from '../courses/reducer';
import * as action from '../courses/actionTypes';

const courseList = [
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
];

const initialState = {
	courses: courseList,
	error: '',
};

describe('courses', () => {
	test('should have initial details', () => {
		expect(
			courseReducer([], {
				type: action.DEFAULT,
				payload: '',
			})
		).toEqual([]);
	});
	test('should handle a course being added to list', () => {
		const course = {
			title: 'Angular',
			description: 'Angular testing',
			duration: 45,
			creationDate: '04/03/2022',
			id: 'thisisafakeid',
			authors: [
				'9870c529-3479-4113-a68d-f44710a87e99',
				'a49ecbe9-ad6d-4c26-bdeb-3bcc4bc9e5dc',
			],
		};
		const newState = courseReducer(initialState, {
			type: action.ADD_COURSE_SUCCESS,
			payload: course,
		});
		expect(newState.courses[1]).toEqual(course);
	});
	test('should handle a course being added to list', () => {
		const newState = courseReducer(initialState, {
			type: action.FETCH_COURSES_SUCCESS,
			payload: initialState.courses,
		});
		expect(newState.courses).toEqual(courseList);
	});
});
