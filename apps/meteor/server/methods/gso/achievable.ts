import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Tasks } from '@rocket.chat/models';

import { sampleTasks, TaskService } from '../../services/gso';
import { ITaskCreateParams } from '../../sdk/types/ITaskService';

Meteor.methods({
	async seed() {
		const result = await Tasks.insertMany(sampleTasks);
		return result.ops;
	},

	async addTask(params) {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				description: String,
				type: Match.OneOf('daily', 'longterm', 'achievements'),
				status: Match.OneOf(-1, 0, 1),
				reward: Number,
				sortOrder: Match.Optional(Number),
				endDate: Date,
			}),
		);

		const Tasks = new TaskService();

		const task = await Tasks.create(params);

		return task;
	},

	async createManyTasks(tasks: ITaskCreateParams[]): Promise<void> {
		const Tasks = new TaskService();
		await Tasks.createMany(tasks);
	},

	async deleteTask(taskId) {
		check(taskId, String);

		const Tasks = new TaskService();

		await Tasks.delete(taskId);

		return true;
	},

	async getOneTask(taskId) {
		check(taskId, String);

		const Tasks = new TaskService();

		const task = await Tasks.getTask(taskId);

		return task;
	},

	/**
	 * The main feature of this module. Tasks are composed of 2 part
	 * 1/ List of daily task @ITask
	 * 2/ List of weekly task
	 * 3/ List of monthly task
	 * 4/ list of trophy/achievement/longterm
	 * This function
	 * 1/ clear expired/finished tasks
	 * 2/ create new tasks
	 * 3/ return
	 *
	 * @param paginationOptions
	 * @param queryOptions
	 */
	async syncAchievables(paginationOptions, queryOptions) {
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

		// const Tasks = new TaskService();

		const results = ''; // await Tasks.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	/**
	 * get
	 * @param paginationOptions
	 * @param queryOptions
	 */
	async getTasks(paginationOptions, queryOptions) {
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

		// const Tasks = new TaskService();

		const results = ''; // await Tasks.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateTask(taskId, params) {
		check(taskId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				description: Match.Optional(String),
				type: Match.Optional(Match.OneOf('daily', 'longterm', 'achievements')),
				status: Match.Optional(Match.OneOf(-1, 0, 1)),
				reward: Number,
				sortOrder: Match.Optional(Number),
				endDate: Match.Optional(Date),
				assignedTo: Match.Optional(String),
			}),
		);

		const Tasks = new TaskService();

		const task = await Tasks.update(taskId, params);

		return task;
	},
});
