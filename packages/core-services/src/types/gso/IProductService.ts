import type { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import type { AtLeastOne, IProduct, PartialBy } from '@rocket.chat/core-typings/dist/gso';
import type { FindCursor } from 'mongodb';

export type IProductWithoutID = PartialBy<Omit<IProduct, '_id'>, 'ranking'>;

export type IProductLean = Omit<IProduct, 'createdAt' | '_updatedAt' | '_id'>;

export type IProductCreateParams = PartialBy<IProductLean, 'ranking'>;

export type IProductUpdateParams = AtLeastOne<IProductLean>;

export type IProductUpdateBody = IProductUpdateParams & { _updatedAt: IProduct['_updatedAt'] };

export interface IProductService {
	create(params: IProductCreateParams): Promise<IProduct>;
	createMany(products: IProductCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IProduct>): FindCursor<IProduct>;
	update(productId: string, params: IProductUpdateParams): Promise<IProduct>;
	delete(productId: string): Promise<void>;
	getProduct(productId: string): Promise<IProduct>;
}
