import {
  BannerPage,
  CategoryPage,
  DashboardPage,
  NotFoundPage,
  ProductsPage,
} from "../pages"

export const routes = [
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/banner",
    element: <BannerPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]
