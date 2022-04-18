import { Template } from 'meteor/templating';

import { fireGlobalEvent } from '../../../../../client/lib/utils/fireGlobalEvent';
import HomeButton from '../../../../../client/components/HomeButton/HomeButton';
import BlogButton from '../../../../../client/components/BlogButton/BlogButton';
import GameButton from '../../../../../client/components/GameButton/GameButton';
import ProductButton from '../../../../../client/components/ProductButton/ProductButton';
import MessagesButton from '../../../../../client/components/MessagesButton/MessagesButton';

import './header.html';

Template.header.helpers({
	back() {
		return Template.instance().data.back;
	},
	buttons() {
		console.log('asdasd');
	},
	HomeButton() {
		return HomeButton;
	},
	BlogButton() {
		return BlogButton;
	},
	GameButton() {
		return GameButton;
	},
	ProductButton() {
		return ProductButton;
	},
	MessagesButton() {
		return MessagesButton;
	},
});

Template.header.events({
	'click .iframe-toolbar .js-iframe-action'(e) {
		fireGlobalEvent('click-toolbar-button', { id: this.id });
		e.currentTarget.querySelector('button').blur();
		return false;
	},
});
