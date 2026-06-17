import { useEffect, useState } from "react"
import { Card, Input, Button, message, Space } from "antd"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { BaseUrl } from "../api"
import { urls } from "../utils/urls"

function BannerPage() {
  const [banners, setBanners] = useState([])
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState("")
  const [editId, setEditId] = useState(null)

  const fetchBanners = () => {
    BaseUrl.get(urls.banners.get).then((res) => {
      setBanners(res.data || [])
    })
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const saveBanner = () => {
    const request = editId
      ? BaseUrl.patch(`/banners/${editId}`, { img: image })
      : BaseUrl.post("/banners", { img: image })
    request.then(() => {
      message.success(editId ? "Updated" : "Created")
      setOpen(false)
      setEditId(null)
      fetchBanners()
    })
  }
  const deleteBanner = (id) => {
    BaseUrl.delete(`/banners/${id}`).then(() => {
      message.success("Deleted")
      fetchBanners()
    })
  }
  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <Button
          className="flex justify-end"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true)
            setEditId(null)
          }}
        >
          Add Banner
        </Button>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {banners.map((item) => (
          <Card
            key={item.id}
            style={{ width: 300 }}
            cover={
              <img src={item.img} style={{ height: 200, objectFit: "cover" }} />
            }
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => {
                  setEditId(item.id)
                  setImage(item.img)
                  setOpen(true)
                }}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => deleteBanner(item.id)}
              />,
            ]}
          />
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl ">
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
            <Space className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  setOpen(false)
                  setEditId(null)
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={saveBanner}>
                Save
              </Button>
            </Space>
          </div>
        </div>
      )}
    </>
  )
}

export default BannerPage
