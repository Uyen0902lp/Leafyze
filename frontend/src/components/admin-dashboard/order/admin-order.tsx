"use client";
import React, { useState } from "react";
import { Table, Button, Select, notification } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useShowAllOrdersQuery, useUpdateOrderMutation } from "@/redux/api/orderApiSlice";
import AppCard from "../component/app-card";
import dayjs from "dayjs";
import SalesChart from "./admin-order-chart";
import OrderStatus from "./piechart/OrderStatus";

const { Option } = Select;

const OrderTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<any>>({});

  // Lấy danh sách Orders từ Redux
  const { data, isLoading, isError } = useShowAllOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  const orders = data?.data.orders || [];

  const openNotification = (type: "success" | "error", message: string, description?: string) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleEdit = (record: any) => {
    setEditingRow(record.id);
    setFormData({ ...record });
  };

  const handleSave = async () => {
    if (!editingRow) return;

    try {
      await updateOrder({ id: editingRow, data: formData }).unwrap();
      openNotification("success", "Order updated successfully!");
      setEditingRow(null);
    } catch (error) {
      console.error("Failed to update order:", error);
      openNotification("error", "Failed to update order", "Please try again.");
    }
  };

  const handleChange = (key: keyof any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const columns: ColumnsType<any> = [
    {
      title: "Index",
      key: "index",
      fixed: "left",
      width: 80,
      render: (_: any, __: any, index: number) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
      width: 150,
    },
    {
      title: "Customer",
      dataIndex: "username",
      key: "username",
      width: 150,
      render: (text, record) =>
        editingRow === record.id ? (
          <input
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Product",
      children: [
        {
          title: "Product Name",
          dataIndex: "products",
          key: "product-name",
          width: 350,
          render: (products: string | object) => {
            const productList = typeof products === "string" ? JSON.parse(products) : products;
            return (
              <ul className="product-name-list">
                {productList.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="product-name-cell"
                    style={{
                      borderBottom: productList.length > 1 && index < productList.length - 1 ? "1px solid #d9d9d9" : "none",
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            );
          },
        },
        {
          title: "Quantity",
          dataIndex: "products",
          key: "product-quantity",
          width: 100,
          render: (products: string | object) => {
            const productList = typeof products === "string" ? JSON.parse(products) : products;
            return (
              <ul className="product-quantity-list">
                {productList.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="product-quantity-cell"
                    style={{
                      borderBottom: productList.length > 1 && index < productList.length - 1 ? "1px solid #d9d9d9" : "none",
                      textAlign: "center",
                    }}
                  >
                    {item.orderQuantity}
                  </li>
                ))}
              </ul>
            );
          },
        },
      ],
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
    },
    {
      title: "Address",
      children: [
        {
          title: "Street",
          dataIndex: "address",
          key: "address",
          width: 200,
          render: (text, record) =>
            editingRow === record.id ? (
              <input
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                style={{ width: "100%" }}
              />
            ) : (
              text
            ),
        },
        {
          title: "City",
          dataIndex: "city",
          key: "city",
          width: 100,
          render: (text, record) =>
            editingRow === record.id ? (
              <input
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                style={{ width: "100%" }}
              />
            ) : (
              text
            ),
        },
        {
          title: "State",
          dataIndex: "state",
          key: "state",
          width: 100,
          render: (text, record) =>
            editingRow === record.id ? (
              <input
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                style={{ width: "100%" }}
              />
            ) : (
              text
            ),
        },
        {
          title: "Country",
          dataIndex: "country",
          key: "country",
          width: 100,
          render: (text, record) =>
            editingRow === record.id ? (
              <input
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                style={{ width: "100%" }}
              />
            ) : (
              text
            ),
        },
      ],
    },
    {
      title: "Create Date",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (text) => (
        <span>{dayjs(text).format("DD/MM/YYYY HH:mm:ss")}</span>
      ),
    },
    {
      title: "Update Date",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
      render: (text) => (
        <span>{dayjs(text).format("DD/MM/YYYY HH:mm:ss")}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 120,
      render: (text, record) =>
        editingRow === record.id ? (
          <input
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      render: (text, record) =>
        editingRow === record.id ? (
          <input
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Order Note",
      dataIndex: "order_note",
      key: "order_note",
      width: 200,
      render: (text, record) =>
        editingRow === record.id ? (
          <textarea
            value={formData.order_note}
            onChange={(e) => handleChange("order_note", e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Ship Cost",
      dataIndex: "shipCost",
      key: "shipCost",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text, record) =>
        editingRow === record.id ? (
          <Select
            value={formData.status}
            onChange={(value) => handleChange("status", value)}
            style={{ width: 150 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (_, record) =>
        editingRow === record.id ? (
          <Button
            shape="circle"
            icon={<SaveOutlined />}
            onClick={handleSave}
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

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error fetching orders.</p>;

  return (
    <div
      className="mt-30 mb-20 pl-25 pr-25 pt-30 pb-30 custom-order-table"
      style={{ backgroundColor: "#f2edf7", borderRadius: "8px" }}
    >
      <div className="row g-4 mb-25 animation-u">
        <div className="col-xl-9 col-lg-8">
          <AppCard title="Order Report Overview">
            <SalesChart />
          </AppCard>
        </div>
        <div className="col-xl-3 col-lg-4">
          <AppCard title="Order Status Overview">
            <OrderStatus />
          </AppCard>
        </div>
      </div>


      <AppCard title="Orders List">
        <Table
          columns={columns}
          dataSource={orders}
          bordered
          rowKey="id"
          scroll={{
            x: 1400,
            y: 600,
          }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.data.countAll,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </AppCard>
    </div>
  );
};

export default OrderTable;

