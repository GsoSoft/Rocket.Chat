import type { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import type { AtLeastOne, IAchievable, PartialBy } from '@rocket.chat/core-typings/dist/gso';

export type ITaskLean = Omit<IAchievable, '_id' | '_updatedAt'>;

export type ITaskCreateParams = PartialBy<Omit<IAchievable, '_id' | '_updatedAt' | 'startDate' | 'assignedBy' | 'assignedTo'>, 'sortOrder'>;

export type ITaskUpdateParams = AtLeastOne<ITaskLean>;

export interface IAchievableService {
	create(params: ITaskCreateParams): Promise<IAchievable>;
	createMany(tasks: ITaskCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IAchievable>): Promise<IAchievable[]>;
	update(taskId: IAchievable['_id'], params: ITaskUpdateParams): Promise<IAchievable>;
	delete(taskId: IAchievable['_id']): Promise<void>;
	getTask(taskId: IAchievable['_id']): Promise<IAchievable>;
}
