import { Button, Drawer, Form, Input, InputNumber, Switch } from "antd"
import { useEffect } from "react"
import { BaseUrl } from "../api"
import { urls } from "../utils/urls"

function ProductsDrawer({
  open,
  setOpen,
  editingData,
  getProducts,
  setEditingData,
}) {
  let [form] = Form.useForm()

  const onClose = () => {
    setOpen(false)
    form.resetFields()
    getProducts()
  }

  const onFinish = (values) => {
    if (!!editingData) {
      BaseUrl.patch(urls.products.edit(editingData.id), values).then((res) => {
        if (res.status === 200 || res.status === 201) {
          setEditingData(null)
        }
      })
    } else {
      BaseUrl.post(urls.products.post, values)
    }
    onClose()
  }

  useEffect(() => {
    form.setFieldsValue(editingData)
  }, [editingData])

  return (
    <Drawer
      title="Basic Drawer"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={open}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="image"
          rules={[
            { required: true, message: "Please input product image URL!" },
            { type: "url" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Old Price"
          name="old_price"
          rules={[{ required: true, message: "Please input old price!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Is Popular" name="is_popular" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            {!editingData ? "Add" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ProductsDrawer
