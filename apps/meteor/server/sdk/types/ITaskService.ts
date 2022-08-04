import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { AtLeastOne, IAchievable, PartialBy } from '@rocket.chat/core-typings/src/gso';
import { Cursor } from 'mongodb';

export type ITaskLean = Omit<IAchievable, '_id' | '_updatedAt'>;

export type ITaskCreateParams = PartialBy<Omit<IAchievable, '_id' | '_updatedAt' | 'startDate' | 'assignedBy' | 'assignedTo'>, 'sortOrder'>;

export type ITaskUpdateParams = AtLeastOne<ITaskLean>;

export interface ITaskService {
	create(params: ITaskCreateParams): Promise<IAchievable>;
	createMany(tasks: ITaskCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IAchievable>): Cursor<IAchievable>;
	update(taskId: IAchievable['_id'], params: ITaskUpdateParams): Promise<IAchievable>;
	delete(taskId: IAchievable['_id']): Promise<void>;
	getTask(taskId: IAchievable['_id']): Promise<IAchievable>;
}
