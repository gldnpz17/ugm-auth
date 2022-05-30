import { Button, Card, Form, Input } from "antd";
import { useMutation } from "react-query";
import { adminLogin } from "../../api-requests/auth";

export default function LoginPage() {
  const { mutateAsync: login } = useMutation(adminLogin, {
    onSuccess: () => {
      window.location.href = "/admin/manage-attributes";
    }
  })

  const handleSubmit = async ({ password }) => {
    await login({ password })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Card>
        <h1 style={{ textAlign: 'center' }}>Admin Login</h1>
        <Form
          style={{ width: '100%' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: `Password can't be empty.` }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type='primary' htmlType='submit'>Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}