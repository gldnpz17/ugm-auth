import { Form, Select, InputNumber, Switch, Slider, Button, Steps, Step, Card, Input, Row, Col, Spin } from 'antd'

// Custom DatePicker that uses Day.js instead of Moment.js
import DatePicker from '../components/DatePicker'

import { CheckCircleOutlined, CodeOutlined, HomeFilled, LoadingOutlined, LockOutlined, SafetyCertificateOutlined, SmileFilled } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'

const ClientInfoStep = () => {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Form.Item
        label="Application Name"
        name="applicationName"
        rules={[{ required: true, message: `Application name can't be empty.` }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="applicationDescription"
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
          <Button type='primary' htmlType='submit'>Next</Button>
        </Col>
      </Row>
    </Form>
  )
}

const EmailInputForm = () => {
  return (
    <Form
      style={{ width: '100%' }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Email Address"
        name="email"
        rules={[{ required: true, message: `Email can't be empty.` }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type='primary' htmlType='submit'>Send Email</Button>
      </Form.Item>
    </Form>
  )
}

const WaitEmailVerification = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <p style={{ marginBottom: '2rem' }}>Waiting for email to be verified...</p>
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: '10rem', marginBottom: '2rem' }} />} />
      <Button>Resend Email</Button>
    </div>
  )
}

const EmailVerificationStep = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <WaitEmailVerification />
    </div>
  )
}

const CompleteStep = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <CheckCircleOutlined style={{ fontSize: '6rem', color: 'green', marginBottom: '1rem' }} />
      <p style={{ marginBottom: '2rem', textAlign: 'center' }}>Application created successfully!</p>
      <p><b>Client ID:</b> ab1c23d45e</p>
      <p><b>Client Secret:</b> J4Ng4nD1s3b4R</p>
      <p><b>Redirect URL:</b> https://example.com/accounts/ugm-link/handle-redirect</p>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '40rem', maxWidth: '80vw' }}>
        <h1 style={{ textAlign: 'center' }}>Unofficial UGM Auth</h1>
        <p style={{ textAlign: 'center' }}>
          This unofficial UGM authentication system allows 3rd party applications to verify the identity of UGM students. 
          Start by registering your application by filling in the form below.
        </p>
        <Steps style={{ marginBottom: '1rem' }}>
          <Steps.Step status='finish' title='Application' icon={<CodeOutlined />} />
          <Steps.Step status='wait' title='Verification' icon={<SafetyCertificateOutlined />} />
          <Steps.Step status='wait' title='Complete' icon={<CheckCircleOutlined />} />
        </Steps>
        <Card style={{ marginBottom: '1rem', height: '24rem' }}>
          <ClientInfoStep />
        </Card>
        <p style={{ textAlign: 'center' }}>
          Already registered your application? Visit our <a href='/docs'>docs</a>!
        </p>
      </div>
    </div>
  )
}
