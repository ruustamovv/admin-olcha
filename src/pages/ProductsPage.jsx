import { useEffect, useState } from "react"
import ProductsDrawer from "../components/ProductsDrawer"
import { Button, Flex, Image, message, Space, Table } from "antd"
import Text from "antd/es/typography/Text"
import { BaseUrl } from "../api"
import { urls } from "../utils/urls"

function ProductsPage() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [editingData, setEditingData] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const getProducts = () => {
    BaseUrl.get(urls.products.get).then((res) => {
      setProducts(res.data)
    })
  }

  useEffect(() => {
    getProducts()
  }, [{}])

  const showDrawer = () => {
    setOpen(true)
  }

  // EDIT
  const handleEdit = (element) => {
    showDrawer()
    setEditingData(element)
  }

  // DELETE
  const handleDelete = () => {
    BaseUrl.delete(urls.products.delete(selectedProduct.id)).then((res) => {
      if (res.status === 200 || res.status === 201) {
        message.success("Product deleted successfully")
        getProducts()
        setShowConfirm(false)
        setSelectedProduct(null)
      }
    })
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "img",
      render: (value) => {
        return <Image width={60} alt="img" src={value} />
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Old price",
      dataIndex: "old_price",
      key: "oldPrice",
    },
    {
      title: "Popularity",
      dataIndex: "is_popular",
      key: "popularity",

      render: (popularity) => {
        return popularity ? (
          <Text
            style={{ color: "white" }}
            className="bg-orange-400 rounded-2xl py-2 px-3 font-semibold"
          >
            Yes
          </Text>
        ) : (
          <Text
            style={{ color: "white" }}
            className="bg-gray-500 rounded-2xl py-2 px-3.5 font-semibold"
          >
            No
          </Text>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            onClick={() => handleEdit(record)}
            style={{ fontWeight: 600 }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setSelectedProduct(record)
              setShowConfirm(true)
            }}
            style={{
              fontWeight: 700,
              backgroundColor: "red",
            }}
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  columns.forEach((item) => {
    item.align = "center"

    if (item.dataIndex === "name") {
      item.width = 400
    }
  })

  return (
    <>
      <Flex justify="end" style={{ marginBottom: "16px" }}>
        <Button style={{ fontWeight: 700 }} type="primary" onClick={showDrawer}>
          Add Product
        </Button>
      </Flex>
      <Table
        style={{
          backgroundColor: "#002",
          borderRadius: "10px",
        }}
        columns={columns}
        dataSource={products}
        rowKey="id"
      />
      <ProductsDrawer
        open={open}
        setOpen={setOpen}
        editingData={editingData}
        getProducts={getProducts}
        setEditingData={setEditingData}
      />
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[320px] rounded-xl p-5 shadow-2xl">
            <h2 className="text-lg font-semibold mb-2">Delete this product?</h2>
            <p className="text-gray-500 mb-5">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false)
                  setSelectedProduct(null)
                }}
                className="cursor-pointer px-4 py-2 font-bold rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer px-4 py-2 font-bold rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductsPage
