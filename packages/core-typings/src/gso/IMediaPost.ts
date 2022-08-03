import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IComment } from './IComment';

export interface IMediaPost extends IRocketChatRecord {
	caption: string;
	images: {
		url: string;
		id: string;
	}[];
	createdBy?: string;
	createdAt: Date;
	likes: number;
	comments?: IComment[];
}
