import { ProductItem } from "../shared/types/productItem";

export interface AppState {
    counter: number;
    blogs: ProductItem[];

};

export const initialState: AppState = {
    counter: 10,
    blogs: [],
};