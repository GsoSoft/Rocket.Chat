import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IPaginationOptions, IProduct, IQueryOptions } from '@rocket.chat/core-typings';

import { ProductService } from '../../services/gso';
import type {  IProductCreateParams, IProductUpdateParams } from '@rocket.chat/core-services';

Meteor.methods({
	async createProduct(params: IProductCreateParams): Promise<IProduct> {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				description: String,
				ranking: Match.Optional(Number),
				price: Number,
			}),
		);

		const Products = new ProductService();

		const product = await Products.create(params);

		return product;
	},

	async createManyProducts(products: IProductCreateParams[]): Promise<void> {
		const Products = new ProductService();
		await Products.createMany(products);
	},

	async deleteProduct(productId: IProduct['_id']): Promise<boolean> {
		check(productId, String);

		const Products = new ProductService();

		await Products.delete(productId);

		return true;
	},

	async getOneProduct(productId: IProduct['_id']): Promise<IProduct> {
		check(productId, String);

		const Products = new ProductService();

		const product = await Products.getProduct(productId);

		return product;
	},

	async getProducts(paginationOptions: IPaginationOptions, queryOptions: IQueryOptions<IProduct>): Promise<IProduct[]> {
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

		const Products = new ProductService();

		const results = await Products.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateProduct(productId: IProduct['_id'], params: IProductUpdateParams): Promise<IProduct> {
		check(productId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				description: Match.Optional(String),
				price: Match.Optional(Number),
				ranking: Match.Optional(Number),
			}),
		);

		const Products = new ProductService();

		const product = await Products.update(productId, params);

		return product;
	},
});
