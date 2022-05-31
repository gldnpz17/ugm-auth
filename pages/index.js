import { Form, Select, InputNumber, Switch, Slider, Button, Steps, Step, Card, Input, Row, Col, Spin } from 'antd'
import { CheckCircleOutlined, CodeOutlined, HomeFilled, LoadingOutlined, LockOutlined, SafetyCertificateOutlined, SmileFilled } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { useMutation } from 'react-query'
import { createClient } from '../api-requests/clients'
import { useState } from 'react'

const ClientInfoStep = ({ nextStep }) => {
  const { mutateAsync } = useMutation(createClient, {
    onSuccess: (data) => {
      nextStep(data)
    }
  })
  
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Application Name"
        name="name"
        rules={[{ required: true, message: `Application name can't be empty.` }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ max: 100, message: `Description can't be longer than 100 characters.` }]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label="Redirect URL"
        name="redirectUrl"
        rules={[
          { required: true, message: `Redirect URL can't be empty.` },
          { 
            pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            message: 'Must be a valid HTTP/HTTPS URL.'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Row style={{ flexGrow: 1 }}></Row>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Col>
      </Row>
    </Form>
  )
}

const CompleteStep = ({ data: { clientId, clientSecret, redirectUrl } }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <CheckCircleOutlined style={{ fontSize: '6rem', color: 'green', marginBottom: '1rem' }} />
      <p style={{ marginBottom: '2rem', textAlign: 'center' }}>Application created successfully!</p>
      <p><b>Client ID:</b> {clientId}</p>
      <p style={{ lineBreak: "anywhere" }}><b>Client Secret:</b> {clientSecret}</p>
      <p><b>Redirect URL:</b> {redirectUrl}</p>
    </div>
  )
}

export default function Home() {
  const [clientData, setClientData] = useState(null)
  
  const nextStep = (data) => {
    setClientData(data)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '40rem', maxWidth: '80vw' }}>
        <h1 style={{ textAlign: 'center' }}>Unofficial UGM Auth</h1>
        <p style={{ textAlign: 'center' }}>
          This unofficial UGM authentication system allows 3rd party applications to verify the identity of UGM students. 
          Start by registering your application by filling in the form below.
        </p>
        <Card style={{ marginBottom: '1rem', height: '28rem' }}>
          {clientData
            ? <CompleteStep data={clientData} />
            : <ClientInfoStep nextStep={nextStep} />
          }
        </Card>
        <p style={{ textAlign: 'center' }}>
          Already registered your application? Visit our <a href='https://github.com/gldnpz17/ugm-auth/wiki'>docs</a>!
        </p>
      </div>
    </div>
  )
}
