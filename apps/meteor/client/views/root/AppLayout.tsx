import type { ReactElement } from 'react';
import React, {useContext, useState, useEffect, useMemo, Suspense } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useAnalytics } from '../../../app/analytics/client/loadScript';
import { DailyTasksContext, DispatchDailyTasksContext } from '../../contexts/DailyTasksContext/GlobalState';
import { appLayout } from '../../lib/appLayout';
import PageLoading from './PageLoading';
import { useEscapeKeyStroke } from './hooks/useEscapeKeyStroke';
import { useGoogleTagManager } from './hooks/useGoogleTagManager';
import { useMessageLinkClicks } from './hooks/useMessageLinkClicks';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppLayout = (): ReactElement => {
	useEffect(() => {
		document.body.classList.add('color-primary-font-color', 'rcx-content--main');

		return () => {
			document.body.classList.add('color-primary-font-color', 'rcx-content--main');
		};
	}, []);

	useMessageLinkClicks();
	useGoogleTagManager();
	useAnalytics();
	useEscapeKeyStroke();

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

	return (
		<>
			<Suspense fallback={<PageLoading />}>{layout}</Suspense>
		</>
	);
};

export default AppLayout;
