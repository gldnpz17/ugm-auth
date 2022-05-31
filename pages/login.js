import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { readClientDetails } from "../api-requests/clients";
import { useQuery } from "react-query"

export default function LoginPage() {
  const [clientId, setClientId] = useState(null)
  useEffect(() => {
    setClientId(new URLSearchParams(window.location.search).get("clientId"))
  }, [])

  const { isLoading, data: clientData } = useQuery(["client", clientId], async () => await readClientDetails({ clientId }), {
    enabled: Boolean(clientId)
  })

  const handleLogin = async (values) => {
    const response = await axios.post('/api/auth/login', {
      ...values,
      clientId
    })

    window.location.href = `${response.data.redirectUrl}?authToken=${response.data.authToken}`
  }

  if (isLoading) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Card style={{ width: "24rem" }}>
        <h1 style={{ textAlign: 'center', marginBottom: "1rem" }}>Unofficial<br />UGM Auth</h1>
        <div style={{ minWidth: "100%", maxWidth: 0, marginBottom: "0.5rem" }}>This application is requesting access to your UGM identity :</div>
        <div><b>{clientData?.name}</b></div>
        <div style={{ marginBottom: "0.5rem" }}>{clientData?.description}</div>
        <div><b>You will be redirected to :</b></div>
        <div style={{ lineBreak: "anywhere", marginBottom: "1rem" }}><a href={clientData?.redirectUrl}>{clientData?.redirectUrl}</a></div>
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