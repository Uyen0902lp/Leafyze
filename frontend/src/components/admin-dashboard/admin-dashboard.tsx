"use client";
import React, { useState } from 'react';
import { Tabs } from 'antd';
import ProductListing from './product-listing/admin-product-listing';
import AddProduct from './add-product/admin-add-product';
import Customers from './customers/admin-customer';
import Orders from './order/admin-order';
import DiseasesListing from './diseases/diseases';

const AdminTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('productListing');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabItems = [
    {
      label: 'Product',
      key: 'productListing',
      children: <ProductListing />,
    },
    {
      label: 'Add Product',
      key: 'addProduct',
      children: <AddProduct />,
    },
    {
      label: 'Customers',
      key: 'customers',
      children: <Customers />,
    },
    {
      label: 'Orders',
      key: 'orders',
      children: <Orders />,
    },
    {
      label: 'Diseases',
      key: 'iseases',
      children: <DiseasesListing />,
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        centered
        tabBarGutter={80}
        className="custom-tabs"
        items={tabItems}
      />
    </div>
  );
};

export default AdminTabs;
