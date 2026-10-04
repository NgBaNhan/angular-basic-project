import { createAction, props } from "@ngrx/store";
import { ProductItem } from "../../shared/types/productItem";

export const setBlogList = createAction(
    '[Blog] SetBlogList', props<{ blogs: ProductItem[] }>());

