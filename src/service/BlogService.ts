import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlogItem, ProductItem } from "../app/shared/types/productItem";
import { ResponseData } from "../app/shared/types/responseData";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(private http: HttpClient) { }
    getBlogs(): Observable<ResponseData<ProductItem[]>> {
        return this.http.get<any>('https://ninedev-api.vercel.app/blogs');
    }
    detailBlog(id: number): Observable<ResponseData<ProductItem>> {
        return this.http.get<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }
    postBlog(blog: BlogItem): Observable<ResponseData<BlogItem>> {
        return this.http.post<any>('https://ninedev-api.vercel.app/blogs', blog);
    }
    deleteBlog(id: number): Observable<ResponseData<BlogItem>> {
        return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }
}  