// usePrerender.js
import { useEffect } from 'react';

export const usePrerender = (isReady = true) => {
	useEffect(() => {
		if (isReady) {
			const timer = setTimeout(() => {
				window.prerenderReady = true;
			}, 1000);
			return () => clearTimeout(timer);
		} else {
			window.prerenderReady = false;
		}
	}, [isReady]);
};
