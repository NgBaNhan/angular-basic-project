import { createReducer, on } from "@ngrx/store";
import { initialState } from "../app.state";
import { setBlogList } from "./blog.action";
import { ProductItem } from "../../shared/types/productItem";

export const blogsReducer = createReducer(
    initialState.blogs,
    on(setBlogList, (state: ProductItem[], action) => {
        return action.blogs;
    }),
);