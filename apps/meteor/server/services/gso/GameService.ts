import { Cursor } from 'mongodb';
import { IGame } from '@rocket.chat/core-typings/dist/gso';
import { Games } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import { IGameService, IGameCreateParams, IGameUpdateParams } from '../../sdk/types/IGameService';

export class GameService extends ServiceClassInternal implements IGameService {
	protected name = 'game';

	async create(params: IGameCreateParams): Promise<IGame> {
		const createData: InsertionModel<IGame> = {
			createdAt: new Date(),
			...params,
			...(params.tags ? { tags: params.tags } : { tags: [] }),
			...(params.ranking ? { ranking: params.ranking } : { ranking: 0 }),
		};
		const result = await Games.insertOne(createData);
		const game = await Games.findOneById(result.insertedId);
		if (!game) throw new Error('game-does-not-exist');
		return game;
	}

	async createMany(games: IGameCreateParams[]): Promise<void> {
		const data: InsertionModel<IGame>[] = games.map((game) => ({
			...game,
			createdAt: new Date(),
			...(game.tags ? { tags: game.tags } : { tags: [] }),
			...(game.ranking ? { ranking: game.ranking } : { ranking: 0 }),
		}));
		await Games.insertMany(data);
	}

	async delete(gameId: string): Promise<void> {
		await this.getGame(gameId);
		await Games.removeById(gameId);
	}

	async getGame(gameId: string): Promise<IGame> {
		const game = await Games.findOneById(gameId);
		if (!game) {
			throw new Error('game-does-not-exist');
		}
		return game;
	}

	async update(gameId: string, params: IGameUpdateParams): Promise<IGame> {
		await this.getGame(gameId);
		const query = {
			_id: gameId,
		};
		const updateData = {
			...params,
		};
		const result = await Games.updateOne(query, { $set: updateData });
		const game = await Games.findOneById(result.upsertedId._id.toHexString());
		if (!game) throw new Error('game-does-not-exist');
		return game;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IGame> = { sort: {} },
	): Cursor<IGame> {
		return Games.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
