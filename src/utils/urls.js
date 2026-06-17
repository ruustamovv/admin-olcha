export const urls = {
  products: {
    get: "/products",
    post: "/products",
    delete: (id) => `/products/${id}`,
    edit: (id) => `/products/${id}`,
  },
  banners: {
    get: "/banners",
  },
  login: "/auth",
}
