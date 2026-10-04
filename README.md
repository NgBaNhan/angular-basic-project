# Angular Basic Project

Dự án tự học Angular 19, thực hành các khái niệm cốt lõi từ Component đến NgRx Store. API sử dụng: `https://ninedev-api.vercel.app/blogs`.

---

## Tech Stack

| Công nghệ | Phiên bản |
|---|---|
| Angular | 19.2 |
| NgRx Store | 19.2 |
| RxJS | 7.8 |
| Angular SSR | 19.2 |
| TypeScript | 5.7 |

---

## Cấu trúc dự án

```
src/
├── app/
│   ├── home/           # Trang danh sách blog (list, delete)
│   ├── detail/         # Trang chi tiết blog (dynamic route)
│   ├── create/         # Trang tạo blog mới (reactive form)
│   ├── shared/
│   │   ├── header-layout/   # Layout component dùng chung
│   │   ├── product-item/    # Component hiển thị từng item
│   │   ├── pipes/           # Custom pipes
│   │   └── types/           # TypeScript types
│   └── store/
│       ├── counter.*        # Counter state (increment/decrement/reset)
│       └── BlogStore/       # Blog state (setBlogList)
└── service/
    └── BlogService.ts       # HTTP service gọi API
```

---

## Những gì đã thực hành

### Component
- Standalone components với `imports` trực tiếp
- Lifecycle hooks: `OnInit`, `OnDestroy`
- Property binding, event binding, two-way binding (`[(ngModel)]`)
- `@Input` truyền dữ liệu từ parent xuống child (`ProductItemComponent`)
- `@Output` / `EventEmitter` để emit event xóa từ child lên parent

### Routing
- Cấu hình routes với `app.routes.ts`
- Lazy loading component với `loadComponent`
- Dynamic route với param (`detail/:id`)
- `ActivatedRoute` để đọc route param
- `Router.navigate()` để điều hướng sau khi submit form

```ts
{ path: 'detail/:id', loadComponent: () =>
    import('./detail/detail.component').then(m => m.DetailComponent) }
```

### Service & Dependency Injection
- `@Injectable({ providedIn: 'root' })` 
- Inject `HttpClient` vào service
- Inject service vào component qua constructor

### HTTP / API
- `provideHttpClient(withFetch())` cấu hình trong `app.config.ts`
- Gọi GET, POST, DELETE với `HttpClient`
- Generic typing với `ResponseData<T>` cho response

```ts
getBlogs(): Observable<ResponseData<ProductItem[]>>
detailBlog(id: number): Observable<ResponseData<ProductItem>>
postBlog(blog: BlogItem): Observable<ResponseData<BlogItem>>
deleteBlog(id: number): Observable<ResponseData<BlogItem>>
```

### RxJS
- `Observable` + `subscribe` cơ bản
- `map` để transform data từ API
- `filter` để lọc kết quả (ví dụ: `price > 100000`)
- `pipe` kết hợp nhiều operators
- `take(1)` lấy một lần rồi tự complete
- `Subscription` + `unsubscribe` trong `ngOnDestroy` để tránh memory leak

### Forms
- Reactive Forms với `FormGroup`, `FormControl`
- Validation với `Validators.required`
- Getter shorthand để truy cập control
- Hiển thị lỗi validation trong template với `*ngIf`

```ts
product = new FormGroup({
  name: new FormControl('', Validators.required),
  price: new FormControl('', Validators.required),
});
```

### CRUD
| Thao tác | Route | HTTP |
|---|---|---|
| Read list | `/` | GET |
| Read detail | `/detail/:id` | GET |
| Create | `/create` | POST |
| Delete | `/` (inline) | DELETE |

### NgRx
- Cấu hình store với `provideStore(reducers)` trong `app.config.ts`
- **AppState** gồm 2 slice: `counter` và `blogs`
- **Actions**: `increment`, `decrement`, `reset`, `setBlogList`
- **Reducers**: `counterReducer`, `blogsReducer`
- `store.dispatch()` để cập nhật state
- `store.select()` để đọc state dạng Observable
- Kết hợp `take(1)` + `dispatch` để xử lý delete an toàn

```ts
// Đọc state
this.blogs$ = this.store.select(state => state.blogs);

// Dispatch action
this.store.dispatch(setBlogList({ blogs: updatedBlogs }));
```

### Custom Pipes
- `CurrencyPipe`: Format số tiền sang VND dùng `Intl.NumberFormat`
- `UpperCasePipe`: Tự viết custom pipe standalone

---

## Chạy dự án

```bash
# Cài dependencies
npm install

# Chạy dev server
npm start
# → http://localhost:4200

# Build production
npm run build

# Chạy SSR server
npm run serve:ssr:angular-basic-project
```

---

## API

Base URL: `https://ninedev-api.vercel.app`

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/blogs` | Lấy danh sách blog |
| GET | `/blogs/:id` | Lấy chi tiết blog |
| POST | `/blogs` | Tạo blog mới |
| DELETE | `/blogs/:id` | Xóa blog |
