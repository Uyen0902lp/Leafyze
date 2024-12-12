import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Input, notification } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllUsersQuery, useUpdateUserMutation } from '@/redux/api/authApi';
import { IUserExtended, IUpdateUser } from '@/types/user-d-t';
import AppCard from "../component/app-card";

const { Option } = Select;

const UserTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const [users, setUsers] = useState<IUserExtended[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<IUserExtended>>({});

  const openNotification = (type: 'success' | 'error', message: string, description?: string) => {
    notification[type]({
      message,
      description,
      placement: 'topRight',
    });
  };

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, [data]);

  const handleEdit = (record: IUserExtended) => {
    setEditingRow(record.id);
    setFormData({ ...record });
  };

  const handleSave = async (useRefetch: boolean = false) => {
    if (!editingRow) return;

    try {
      const cleanedData: IUpdateUser = {
        username: formData.username || '',
        email: formData.email || '',
        role: formData.role || 'user',
        phone: formData.phone || '',
        address: formData.address || '',
        bio: formData.bio || '',
      };

      await updateUser({ id: editingRow, user: cleanedData }).unwrap();
      openNotification('success', 'User updated successfully!');

      if (useRefetch) {
        refetch();
      } else {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingRow ? { ...user, ...cleanedData } : user
          )
        );
      }

      setEditingRow(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      openNotification('error', 'Failed to update user', 'Please check your inputs and try again.');
    }
  };

  const handleChange = (key: keyof IUserExtended, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns: ColumnsType<IUserExtended> = [
    {
      title: "Index",
      key: "index",
      fixed: "left",
      width: 60,
      render: (_: any, __: IUserExtended, index: number) => 
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 100,
      render: (text, record) =>
        editingRow === record.id ? (
          <Input
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        ) : (
          text
        ),
      fixed: "left",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 220,
      render: (text, record) =>
        editingRow === record.id ? (
          <Input
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 80,
      render: (text, record) =>
        editingRow === record.id ? (
          <Select
            value={formData.role}
            onChange={(value) => handleChange('role', value)}
            style={{ width: 120 }}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      render: (text, record) =>
        editingRow === record.id ? (
          <Input
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 170,
      render: (text, record) =>
        editingRow === record.id ? (
          <Input
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Join Date',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 100,
      render: (text) =>
        text
          ? new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).format(new Date(text))
          : 'N/A',
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      width: 300,
      render: (text, record) =>
        editingRow === record.id ? (
          <Input.TextArea
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={2}
          />
        ) : (
          text || 'N/A'
        ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 70,
      render: (_, record) =>
        editingRow === record.id ? (
          <Button
            shape="circle"
            icon={<SaveOutlined />}
            onClick={() => handleSave(false)}
            type="primary"
          />
        ) : (
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="default"
          />
        ),
    },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users.</p>;

  return (
    <div
      className="mt-30 mb-20 pl-25 pr-25 pt-30 pb-30"
      style={{ backgroundColor: '#DDD0E9', borderRadius: '8px' }}
    >
      <AppCard title="Customer List">
        <Table<IUserExtended>
          className="custom-table"
          columns={columns}
          dataSource={users}
          bordered
          rowKey="id"
          scroll={{
            x: 1400,
            y: 600,
          }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: users.length,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            onShowSizeChange: (current, size) => setPageSize(size),
          }}
          onChange={handleTableChange}
        />
      </AppCard>
    </div>
  );
};

export default UserTable;
