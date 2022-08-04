import { Meteor } from 'meteor/meteor';
import React, { FC, Fragment, Suspense, useContext, useState, useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { DailyTasksContext, DispatchDailyTasksContext } from '../../contexts/DailyTasksContext/GlobalState';
import { appLayout } from '../../lib/appLayout';
import { blazePortals } from '../../lib/portals/blazePortals';
import PageLoading from './PageLoading';
import { useTooltipHandling } from './useTooltipHandling';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Layout of front end
 * @constructor
 */
const AppLayout: FC = () => {
	useTooltipHandling();

	const { currentLocation } = useContext(DailyTasksContext);
	const { dispatch } = useContext(DispatchDailyTasksContext);
	const [tasks, setTasks] = useState<Record<string, any>[]>([]);

	/* eslint-disable-next-line */
	const sortTasks = useMemo(() => {
		if (tasks.length) {
			const newUpComingTasks: any = [];
			const newExpiringTasks: any = [];
			const newCompletedTasks: any = [];

			tasks.map((task, index) => {
				if (index === tasks.length - 1) {
					dispatch({
						type: 'ADD_TASKS',
						payload: { expiringTasks: newExpiringTasks, upcomingTasks: newUpComingTasks, completedTasks: newCompletedTasks },
					});
				}

				if (task.status === -1) {
					newUpComingTasks.push(task);
				} else if (task.status === 0) {
					newExpiringTasks.push(task);
				} else if (task.status === 1) {
					newCompletedTasks.push(task);
				}
				return null;
			});
		}
		return null;
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [tasks]);

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') {
			if (currentLocation === 'tasksPage') {
				// Refetch tasks when a user switches tabs.
				Meteor.call('getTasks', { offset: 1, count: 10 }, {}, (error, result) => {
					if (result.length) {
						setTasks(result);
					}

					if (error) {
						console.log(error, 'error');
					}
				});
			}
		}
	});
	const layout = useSyncExternalStore(appLayout.subscribe, appLayout.getSnapshot);
	const portals = useSyncExternalStore(blazePortals.subscribe, blazePortals.getSnapshot);
	return (
		<>
			<Suspense fallback={<PageLoading />}>{layout}</Suspense>
			{portals.map(({ key, node }) => (
				<Fragment key={key} children={node} />
			))}
		</>
	);
};

export default AppLayout;
