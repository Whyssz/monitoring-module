import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginLoading.test', () => {
	test('should return error value', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: { isLoading: true },
		};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
	});
});
