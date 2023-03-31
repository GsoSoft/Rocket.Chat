import type { IProduct } from '@rocket.chat/core-typings';
import { Products } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';


import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IProductService, IProductCreateParams, IProductUpdateParams } from '@rocket.chat/core-services';
import { FindCursor } from 'mongodb';

export class ProductService extends ServiceClassInternal implements IProductService {
	protected name = 'product';

	async create(params: IProductCreateParams): Promise<IProduct> {
		const createData: InsertionModel<IProduct> = {
			createdAt: new Date(),
			...params,
			...(params.ranking ? { ranking: params.ranking } : { ranking: 0 }),
		};
		const result = await Products.insertOne(createData);
		const product = await Products.findOneById(result.insertedId);
		if (!product) throw new Error('product-does-not-exist');
		return product;
	}

	async createMany(products: IProductCreateParams[]): Promise<void> {
		const data: InsertionModel<IProduct>[] = products.map((product) => ({
			...product,
			createdAt: new Date(),
			...(product.ranking ? { ranking: product.ranking } : { ranking: 0 }),
		}));
		await Products.insertMany(data);
	}

	async delete(productId: string): Promise<void> {
		await this.getProduct(productId);
		await Products.removeById(productId);
	}

	async getProduct(productId: string): Promise<IProduct> {
		const product = await Products.findOneById(productId);
		if (!product) {
			throw new Error('product-does-not-exist');
		}
		return product;
	}

	async update(productId: string, params: IProductUpdateParams): Promise<IProduct> {
		await this.getProduct(productId);
		const query = {
			_id: productId,
		};
		const updateData = {
			...params,
		};
		const result = await Products.updateOne(query, { $set: updateData });
		const product = await Products.findOneById(result.upsertedId._id.toHexString());
		if (!product) throw new Error('product-does-not-exist');
		return product;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IProduct> = { sort: {} },
	): FindCursor<IProduct> {
		return Products.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
