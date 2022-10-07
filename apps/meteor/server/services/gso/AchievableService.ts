import { Cursor } from 'mongodb';
import { ITask } from '@rocket.chat/core-typings/dist/gso';
import { Achievables } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IAchievable, IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { IAchievableService, ITaskCreateParams, ITaskUpdateParams } from '../../sdk/types/gso/IAchievableService';

export class AchievableService extends ServiceClassInternal implements IAchievableService {
	protected name = 'task';

	async create(params: ITaskCreateParams): Promise<ITask> {
		const createData: InsertionModel<ITask> = {
			...params,
			...(params.sortOrder ? { sortOrder: params.sortOrder } : { sortOrder: 0 }),
			startDate: new Date(),
			assignedBy: '',
			assignedTo: '',
		};
		const result = await Achievables.insertOne(createData);
		const task = await Achievables.findOneById(result.insertedId);
		if (!task) throw new Error('task-does-not-exist');
		return task;
	}

	async createMany(tasks: ITaskCreateParams[]): Promise<void> {
		const data: InsertionModel<IAchievable>[] = tasks.map((task) => ({
			...task,
			...(task.sortOrder ? { sortOrder: task.sortOrder } : { sortOrder: 0 }),
			startDate: new Date(),
			assignedBy: '',
			assignedTo: '',
		}));
		await Achievables.insertMany(data);
	}

	async delete(taskId: string): Promise<void> {
		await this.getTask(taskId);
		await Achievables.removeById(taskId);
	}

	async getTask(taskId: string): Promise<ITask> {
		const task = await Achievables.findOneById(taskId);
		if (!task) {
			throw new Error('task-does-not-exist');
		}
		return task;
	}

	async update(taskId: string, params: ITaskUpdateParams): Promise<ITask> {
		await this.getTask(taskId);
		const query = {
			_id: taskId,
		};
		const updateData = {
			...params,
		};
		const result = await Achievables.updateOne(query, { $set: updateData });
		const task = await Achievables.findOneById(result.upsertedId._id.toHexString());
		if (!task) throw new Error('task-does-not-exist');
		return task;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IAchievable> = { sort: { endDate: 1, sortOrder: -1 } },
	): Cursor<IAchievable> {
		// !!!broadcast an event to dedicated taskManager class such as :
		// 1. event
		// 2. daily/weekly/monthly task
		// 3. todo
		// 4. trophy
		let result: Array<IAchievable> = [];
		result = result.concat(await Achievables.findByTypes(query.types));
		// result = result.concat(this.getDailyTask());
		return Achievables.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}

	/**
	 * temp !!!
	 * create or return list of today task
	 *
	 * @private
	 */
	private getDailyTask() {


	}

	/**
	 * create or return list of today task
	 *
	 * @private
	 */
	private createTaskFromTemplates() {
		// get template from Settings

		// insert data to mongodb



	}
}
