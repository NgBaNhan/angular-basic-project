import {ActionReducerMap} from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { AppState } from './app.state';
import { blogsReducer } from './BlogStore/blog.reducer';
export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer,
    blogs: blogsReducer,
};