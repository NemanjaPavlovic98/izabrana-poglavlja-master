import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AuthState } from '../reducers';

// feautre selector - ts trick to write typesafe selector
export const selectAuthState = createFeatureSelector<AuthState>("auth")

//function has memory - mapping function which keeps in memory results of previous execusions in cache memory
export const isLoggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth.user
);