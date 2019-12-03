import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { auth_isLogin, ui_color } from '../../actions';

import axios from 'axios';
import cookie from 'react-cookies'

import Core from '../template/core';
import Landing from '../template/landing';
import Loading from '../template/loading';

import Wrapper from 'react-div-100vh';

import './index.css';

const App = () => {
	const auth = useSelector(state => state.auth);
	const ui = useSelector(state => state.ui);
	const map = useSelector(state => state.map);
	const dispatch = useDispatch();
	
	if(!auth.isLogin) {
		console.log('App > userCheck');
		axios.get('/users/check')
		.then((res) => {
			if(res.data) {
				dispatch(auth_isLogin(true));
			}
		});
	}

	const getColor = cookie.load('theme-color');

	if(getColor !== undefined && getColor !== ui.color) {
		dispatch(ui_color(getColor));
	}

	return (
		<Wrapper className='app no-drag'>
			<style>{`
				:root {
					--color-100: ${ui.color + 'ff'};
					--color-90: ${ui.color + 'e6'};
					--color-80: ${ui.color + 'cc'};
					--color-70: ${ui.color + 'b3'};
					--color-60: ${ui.color + '99'};
					--color-50: ${ui.color + '80'};
					--color-40: ${ui.color + '66'};
					--color-30: ${ui.color + '4d'};
					--color-20: ${ui.color + '33'};
					--color-10: ${ui.color + '1a'};
				}
			`}</style>
			{ 
				auth.isLogin 
				? 
				map.address !== '' ? <Core /> : <Loading />
				:
				<Landing /> 
			}
		</Wrapper>
	);
}

export default App;
