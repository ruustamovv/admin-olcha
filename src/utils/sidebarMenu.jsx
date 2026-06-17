import {
  DashboardOutlined,
  PicRightOutlined,
  PlayCircleOutlined,
  ProductOutlined,
} from "@ant-design/icons"
import { Link } from "react-router"

export const SidebarMenu = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <ProductOutlined />,
    label: <Link to="/products">Products</Link>,
  },
  {
    key: "3",
    icon: <PicRightOutlined />,
    label: <Link to="/banner">Banner</Link>,
  },
  {
    key: "4",
    icon: <PlayCircleOutlined />,
    label: <Link to="/category">Category</Link>,
  },
]
