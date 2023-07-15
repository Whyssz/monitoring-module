import { Reducer } from '@reduxjs/toolkit';
import {
	ReduxStoreWithManager,
	useAppDispatch,
} from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { ReactNode, useEffect, type FC } from 'react';
import { useStore } from 'react-redux';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
	children: ReactNode;
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<
	DynamicModuleLoaderProps
> = props => {
	const { children, reducers, removeAfterUnmount } = props;

	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useAppDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(
			([name, reducer]: ReducersListEntry) => {
				store.reducerManager.add(name, reducer);
				dispatch({ type: `@INIT ${name} reducer` });
			}
		);

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(
					([name, reducer]: ReducersListEntry) => {
						store.reducerManager.remove(name);
						dispatch({ type: `@DESTROY ${name} reducer` });
					}
				);
			}
		};
		// eslint-disable-next-line
	}, []);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>{children}</>
	);
};
