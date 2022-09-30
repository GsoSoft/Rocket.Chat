import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { AchievableService } from '../services/gso';

if (Meteor.isServer) {
	const Tasks = new AchievableService();

	Meteor.publish('tasks.getList', function (paginationOptions, queryOptions) {
		check(
			paginationOptions,
			Match.ObjectIncluding({
				offset: Match.Optional(Number),
				count: Match.Optional(Number),
			}),
		);
		check(
			queryOptions,
			Match.ObjectIncluding({
				sort: Match.Optional(Object),
				query: Match.Optional(Object),
			}),
		);

		return Tasks.list(paginationOptions, queryOptions);
	});
}
