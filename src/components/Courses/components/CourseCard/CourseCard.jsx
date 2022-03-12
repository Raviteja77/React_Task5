import React from 'react';
import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import { constantVariables } from '../../../../constants';
import { Link } from 'react-router-dom';
import { convertMinsToHrsMins } from '../../../../helpers/pipeDuration';
import useAuthorsIdToGetName from '../../../../customHooks/useAuthorsIdToGetName';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseFromAllCourses } from '../../../../store/courses/thunk';
import { getRole, getUserDetails } from '../../../../helpers/selectors';

library.add(faPencil, faTrash);

function CourseCard({ value }) {
	const dispatch = useDispatch();
	const role = useSelector(getRole);
	const userData = useSelector(getUserDetails);

	return (
		<section data-testid='course-card' className='course'>
			<div className='row'>
				<div className='col-8'>
					<h3 data-testid='title'>{value.title}</h3>
					<p data-testid='description'>{value.description}</p>
				</div>
				<div className='col-4'>
					<div className='authors'>
						<strong>Authors</strong>:{' '}
						<span data-testid='authors'>
							{useAuthorsIdToGetName(value.authors).join(', ')}
						</span>
					</div>
					<div>
						<strong>Duration</strong>:{' '}
						<span data-testid='duration'>
							{convertMinsToHrsMins(value.duration)}
						</span>
					</div>
					<div>
						<strong>Created</strong>:{' '}
						<span data-testid='creation-date'>{value.creationDate}</span>
					</div>
					<div className='course_buttons'>
						<Link to={`/courses/${value.id}`}>
							<Button
								buttonText={constantVariables.SHOW_COURSE}
								className='btn btn-outline-success'
							/>
						</Link>
						{role && role.toLowerCase() === 'admin' ? (
							<>
								<Link to={`/courses/update/${value.id}`}>
									<Button
										iconName={faPencil}
										className='btn btn-outline-info m-4'
									/>
								</Link>
								<Button
									iconName={faTrash}
									className='btn btn-outline-danger'
									clickHandler={() =>
										dispatch(
											deleteCourseFromAllCourses(value.id, userData.result)
										)
									}
								/>
							</>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default CourseCard;
