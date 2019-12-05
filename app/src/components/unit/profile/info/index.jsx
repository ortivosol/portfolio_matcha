import React from 'react';

import axios from 'axios';

// import Alert from '../../../util/alert';

import '../index.css';

const Info = () => {

	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			first_name: document.profile_info.first_name.value,
			last_name: document.profile_info.last_name.value,
			birth_year: document.profile_info.birth_year.value,
			gender: document.profile_info.gender.value,
			preference: document.profile_info.preference.value,
		};

		axios.put('/users', data)
		.then(res => {
			if(res.data) {
				// 
			} else {
				//
			}
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>User Information</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<form name='profile_info' onSubmit={_handleForm}>
					<input type='text' className='profile-input profile-input-first' name='first_name' placeholder='First Name' />
					<input type='text' className='profile-input profile-input-first' name='last_name' placeholder='Last Name' />
					<input type='text' className='profile-input profile-input-first profile-input-last' name='birth_year' placeholder='Birth Year' />
					<input type='text' className='profile-input' name='gender' placeholder='Gender' />
					<input type='text' className='profile-input' name='preference' placeholder='Preference' />
					<input type='submit' className='profile-submit' value='UPDATE' />
				</form>
			</div>
		</div>
	);
}

export default Info;