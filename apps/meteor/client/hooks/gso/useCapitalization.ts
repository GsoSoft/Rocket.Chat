import { useCallback } from 'react';

export const useCapitalizeAndJoin = (): ((word: string) => string) =>
	useCallback((word) => {
		const capitalize = word.charAt(0).toUpperCase() + word.slice(1);
		return capitalize.replace(/-/g, ' ');
	}, []);
