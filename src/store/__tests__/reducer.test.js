import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
		creationDate: '28/02/2022',
		description: 'angular',
		duration: 10,
		id: '6359acf0-d79a-4080-a4bb-377de63b0489',
		title: 'Angular 2.1.2.3.4',
	},
];

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		saveCourse(state, action) {
			state.push({
				id: action.payload.id,
				title: action.payload.title,
				description: action.payload.description,
				duration: action.payload.duration,
				creationDate: action.payload.creationDate,
				authors: action.payload.authors,
			});
		},
	},
});

export const { saveCourse } = coursesSlice.actions;

describe('courses', () => {
	test('should have initial details', () => {
		expect(coursesSlice.reducer(undefined, {})).toEqual([
			{
				authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
				creationDate: '28/02/2022',
				description: 'angular',
				duration: 10,
				id: '6359acf0-d79a-4080-a4bb-377de63b0489',
				title: 'Angular 2.1.2.3.4',
			},
		]);
	});
	test('should handle a course being added to an empty list', () => {
		const previousState = [];
		expect(
			coursesSlice.reducer(
				previousState,
				saveCourse({
					authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
					creationDate: '28/02/2022',
					description: 'angular dart 2.0.1',
					duration: 10,
					id: '6359acf0-d79a-4080-a4bb-377de63b0489',
					title: 'Angular dart',
				})
			)
		).toEqual([
			{
				authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
				creationDate: '28/02/2022',
				description: 'angular dart 2.0.1',
				duration: 10,
				id: '6359acf0-d79a-4080-a4bb-377de63b0489',
				title: 'Angular dart',
			},
		]);
	});
	test('should handle a course being added to an existing list', () => {
		const previousState = [
			{
				authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
				creationDate: '28/02/2022',
				description: 'angular dart 2.0.1',
				duration: 10,
				id: '6359acf0-d79a-4080-a4bb-377de63b0489',
				title: 'Angular dart',
			},
		];
		expect(
			coursesSlice.reducer(
				previousState,
				saveCourse({
					authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
					creationDate: '28/02/2022',
					description: 'react',
					duration: 100,
					id: '6359acf0-d79a-4080-a4bb-377de63b0489',
					title: 'react',
				})
			)
		).toEqual([
			{
				authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
				creationDate: '28/02/2022',
				description: 'angular dart 2.0.1',
				duration: 10,
				id: '6359acf0-d79a-4080-a4bb-377de63b0489',
				title: 'Angular dart',
			},
			{
				authors: ['9870c529-3479-4113-a68d-f44710a87e99'],
				creationDate: '28/02/2022',
				description: 'react',
				duration: 100,
				id: '6359acf0-d79a-4080-a4bb-377de63b0489',
				title: 'react',
			},
		]);
	});
});
