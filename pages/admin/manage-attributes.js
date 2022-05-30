import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createAttribute, deleteAttribute, readAllAttributes } from "../../api-requests/attributes";
import { readAllStudents, createStudent, upsertStudentAttribute, deleteStudent } from "../../api-requests/students";

const AddAttributeModal = ({ isOpen, addAttribute, close }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    form.resetFields()
    addAttribute(values)
    close()
  }

  const handleClose = () => {
    form.resetFields()
    close()
  }

  return (
    <Modal 
      title="Add Attribute" 
      visible={isOpen} 
      onCancel={close}
      footer={[
        <Button onClick={handleClose}>Cancel</Button>,
        <Button form="add-attribute-form" key="submit" htmlType="submit" type="primary">
          Add
        </Button>
      ]}
    >
      <Form
        form={form}
        id="add-attribute-form"
        style={{ width: '100%' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Attribute Name"
          name="name"
          rules={[{ required: true, message: `Attribute name can't be empty.` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Attribute Description"
          name="description"
          rules={[{ max: 100, message: `Attribute description can't be longer than 100 characters.` }]}
        >
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const AddStudentModal = ({ isOpen, addStudent, close }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    form.resetFields()
    addStudent(values)
    close()
  }

  const handleClose = () => {
    form.resetFields()
    close()
  }

  return (
    <Modal 
      title="Add Student" 
      visible={isOpen} 
      onCancel={close}
      footer={[
        <Button onClick={handleClose}>Cancel</Button>,
        <Button form="add-student-form" key="submit" htmlType="submit" type="primary">
          Add
        </Button>
      ]}
    >
      <Form
        form={form}
        id="add-student-form"
        style={{ width: '100%' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="NIU"
          name="niu"
          rules={[
            { required: true, message: `NIU can't be empty.` }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const useStudents = () => {
  const [students, dispatch] = useReducer((students, action) => {
    switch (action.type) {
      case 'add': {
        const { niu } = action.args

        return [...students, { niu, attributes: [] }]
      }
      case 'set-attribute': {
        const { niu, attributeId, value } = action.args

        const student = students.find(student => student.niu === niu)

        const attribute = student.attributes.find(attribute => attribute.id === attributeId)
    
        if (attribute) {
          attribute.value = value
        } else {
          student.attributes.push({ id: attributeId, value })
        }
    
        return [...students]
      }
      case 'delete': {
        return students.filter(student => student.niu !== action.args.niu)
      }
      default:
        return students
    }
  }, [])

  return {
    students,
    addStudent: ({ niu }) => dispatch({ type: 'add', args: { niu } }),
    setAttribute: ({ niu, attributeId, value }) => dispatch({ type: 'set-attribute', args: { niu, attributeId, value } }),
    removeStudent: ({ niu }) => dispatch({ type: 'delete', args: { niu } })
  }
}

export default function AdminPage() {
  const [attributeModalOpen, setAttributeModalOpen] = useState(false)
  const [studentModalOpen, setStudentModalOpen] = useState(false)

  const client = useQueryClient()

  const { isLoading: attributesLoading, data: attributes } = useQuery(["attributes"], readAllAttributes, {
    initialData: []
  })
  const { isLoading: studentsLoading, data: students } = useQuery(["students"], readAllStudents, {
    enabled: !attributesLoading,
    initialData: []
  })

  const { mutateAsync: addAttribute } = useMutation(createAttribute, {
    onSuccess: () => {
      client.invalidateQueries(["attributes"])
      client.invalidateQueries(["students"])
    }
  })

  const { mutateAsync: removeAttribute } = useMutation(deleteAttribute, {
    onSuccess: () => {
      client.invalidateQueries(["attributes"])
      client.invalidateQueries(["students"])
    }
  })

  const { mutateAsync: addStudent } = useMutation(createStudent, {
    onSuccess: () => {
      client.invalidateQueries(["students"])
    }
  })

  const { mutateAsync: setStudentAttribute } = useMutation(upsertStudentAttribute, {
    onSuccess: () => {
      client.invalidateQueries(["students"])
    }
  })

  const { mutateAsync: removeStudent } = useMutation(deleteStudent, {
    onSuccess: () => {
      client.invalidateQueries(["students"])
    }
  })

  const columns = useMemo(() => ([
    {
      title: 'NIU',
      width: 100,
      dataIndex: 'niu',
      key: 'niu',
      fixed: 'left',
    },
    ...attributes.map(({ _id, name }) => ({
      title: () => {
        return (
          <div style={{ display: 'flex' }}>
            <span style={{ flexGrow: 1 }}>{name}</span>
            <Popconfirm title={`Delete attribute ${name}?`} onConfirm={() => removeAttribute({ id: _id })}>
              <a style={{ userSelect: 'none' }}>Delete</a>
            </Popconfirm>
          </div>
        )
      },
      dataIndex: _id,
      key: _id,
      width: '8rem',
      render: (_, record) => {
        const [value, setValue] = useState(record.values.find(value => value.attribute._id === _id)?.value)
        const [isEditing, setIsEditing] = useState(false)

        const handleEdit = () => {
          setStudentAttribute({ studentId: record.key, attributeId: _id, value })
          setIsEditing(false)
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isEditing 
              ? (
                <Input style={{ flexGrow: 1 }} value={value} onChange={e => setValue(e.target.value)} />
              )
              : (
                <p
                  style={{ 
                    flexGrow: 1, 
                    marginBottom: 0, 
                    color: value === null ? 'red': 'black' 
                  }}
                >
                  { value === null ? 'Not set' : value }
                </p>
              )
            }
            <Button
              shape="circle"
              style={{ marginLeft: '1rem' }}
              icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
              onClick={isEditing ? handleEdit : () => setIsEditing(true)}
            />
          </div>
        )
      }
    })),
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Popconfirm title={`Delete student ${record.niu}?`} onConfirm={() => removeStudent({ studentId: record.key })}>
          <a style={{ userSelect: 'none' }}>Delete</a>
        </Popconfirm>
      ),
    }
  ]), [attributes])

  const data = useMemo(() => {
    return students.map(({ _id, niu, values }) => ({
      key: _id,
      niu,
      values
    }))
  }, [students])

  if (studentsLoading || attributesLoading) return null

  return (
    <div style={{ padding: '2rem' }}>
      <AddAttributeModal 
        isOpen={attributeModalOpen} 
        close={() => setAttributeModalOpen(false)}
        addAttribute={addAttribute} 
      />
      <AddStudentModal 
        isOpen={studentModalOpen}
        close={() => setStudentModalOpen(false)}
        addStudent={addStudent}
      />
      <h1 style={{ textAlign: 'center', marginBottom: 0 }}>Unofficial UGM Auth</h1>
      <h2 style={{ textAlign: 'center' }}>Manage Student Attributes</h2>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <Button type='primary' style={{ marginRight: '1rem' }} onClick={() => setAttributeModalOpen(true)}>
          Add Attribute
        </Button>
        <Button type='primary' onClick={() => setStudentModalOpen(true)}>
          Add Student
        </Button>
      </div>
      <Table 
        pagination={false} 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 1300, y: 500 }} 
        style={{ height: '60%' }}
      />
    </div>
  )
}