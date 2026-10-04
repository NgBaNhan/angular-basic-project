import { initialState } from './app.state';
import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './counter.action';
export const counterReducer = createReducer(initialState.counter,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, () => 0)
);
