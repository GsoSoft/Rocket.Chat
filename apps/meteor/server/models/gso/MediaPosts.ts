import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { MediaPostsRaw } from '../raw/gso';

registerModel('IMediaPostsModel', new MediaPostsRaw(db, trashCollection));
