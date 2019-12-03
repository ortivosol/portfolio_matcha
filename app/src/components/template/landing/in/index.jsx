import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_isLogin, auth_landingStatus } from '../../../../actions';

import axios from 'axios';

import Alert from '../../../util/alert';

import '../index.css';

const In = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		console.log('Signin > _handleForm');
		e.preventDefault();

		const data = {
			email: document.signin.email.value,
			password: document.signin.password.value,
		};

		axios.get('/users/signin', data)
		.then(res => {
			if(res.data === 1) {
				console.log('signin success');
				dispatch(auth_landingStatus(0));
				dispatch(auth_isLogin(true));
			} else if(res.data === 2) {
				Alert(0, 'email is invalid', 'Okay', null, null);
			} else if(res.data === 3) {
				Alert(0, 'password is invalid', 'Okay', null, null);
			} else if(res.data === 4) {
				Alert(1, 'non-verifying is invalid', 'Okay', 'Request resend email', _handleResendVerifyingEmail);
			}
		});
	}

	const _handleResendVerifyingEmail = () => {
		console.log('Signin > _handleResendVerifyingEmail');

		const data = {
			email: document.signin.email.value
		};

		axios.post('/user/resend', {
			data
		})
		.then(res => {
			if(res.data) {
				Alert(0, 'email has been sent', 'Okay', null, null);
			} else {
				Alert(0, 'email is invalid', 'Okay', null, null);
			}
		});
	}

	return (
		<form name='signin' onSubmit={_handleForm}>
			<div className='landing-in-title'>Hello, Welcome to M@TCH@!</div>
			<div className='landing-in-description'>What was the person thinking when they discovered cow’s milk was fine for human consumption… and why did they do it in the first place!?</div>
			<label className='landing-in-label'>
				<span>Email</span>
				<input className='landing-in-input' type='email' name='email' required />
			</label>
			<label className='landing-in-label'>
				<span>Password</span>
				<input className='landing-in-input' type='password' name='password' required />
			</label>
			<input className='landing-in-submit' type='submit' value='SUBMIT' />
			<input className='landing-in-button' type='button' value='SIGNUP' onClick={ () => dispatch(auth_landingStatus(2)) } />
			<input className='landing-in-button' type='button' value='FORGOT PASSWORD' onClick={ () => dispatch(auth_landingStatus(3)) } />
		</form>
	);
}

export default In;