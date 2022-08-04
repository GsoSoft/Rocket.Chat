import { useCallback } from 'react';

export const useShowTooltip = (): ((item: string) => void) =>
	useCallback((item) => {
		const element = document.querySelector(`#${item}`);
		if (element) {
			if (element.classList.contains('invisible')) {
				element.classList.remove('invisible');
				element.classList.add('visible');
			} else {
				element.classList.remove('visible');
				element.classList.add('invisible');
			}
		}
	}, []);
