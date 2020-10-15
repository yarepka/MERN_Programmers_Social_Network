import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// for Date formating
import Moment from 'react-moment';
import { deleteExperience } from '../../redux/actions/profileActions';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const onDeleteExperienceHandler = (experienceId) => {
    console.log('Delete Experience: ', experienceId);
    dispatch(deleteExperience(experienceId));
  };

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => onDeleteExperienceHandler(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>

        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
