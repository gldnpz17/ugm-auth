import { Button, Card, Form, Input } from "antd";
import axios from "axios";

export default function LoginPage() {
  const handleLogin = async (values) => {
    const response = await axios.post('/api/auth/login', {
      ...values,
      clientId: new URLSearchParams(window.location.search).get('clientId')
    })

    window.location.href = `${response.data.redirectUrl}?authToken=${response.data.authToken}`
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Card>
        <h1 style={{ textAlign: 'center' }}>Unofficial<br />UGM Auth</h1>
        <Form
          style={{ width: '100%' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleLogin}
        >
          <Form.Item
            label="UGM ID"
            name="ugmId"
            rules={[{ required: true, message: `UGM ID can't be empty.` }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: `Password can't be empty.` }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type='primary' htmlType='submit'>Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}