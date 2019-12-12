import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_notification, chat_current, ui_detail } from '../../../actions';

import User from './user';

import { FaBell } from 'react-icons/fa';
import './index.css';

const Sidebar = () => {
	const ui = useSelector(state => state.ui);
	const chat = useSelector(state => state.chat);
	const dispatch = useDispatch();

	const _handleNotification = () => {
		if(chat.current === -1) {
			dispatch(ui_notification(ui.notification ? false : true));
		} else {
			dispatch(chat_current(-1));
			setTimeout(() => {
				dispatch(ui_notification(ui.notification ? false : true));
			}, 500);
		}
		dispatch(ui_detail(false));
	}

	return (
		<div className='sidebar'>
			<FaBell className={ ui.notification ? 'sidebar-notification sidebar-notification-active' : 'sidebar-notification' } onClick={() => _handleNotification()} />
			{/*chat.list.map((chat, index) => 
				<User key={index} id={index} data={chat} />
			)*/}
			{chat.list.map((user, index) => 
				<User key={index} index={index} user={user}/>
			)}
			</div>
	);
}

export default Sidebar;
