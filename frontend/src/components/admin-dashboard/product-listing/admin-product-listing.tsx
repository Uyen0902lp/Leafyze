"use client";
import React, { useState, useEffect } from "react";
import { Table, Input, Button, notification, Spin, Select, InputNumber } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useGetAllProductsQuery, useUpdateProductMutation } from "../../../redux/api/productApiSlice";
import { useGetAllBrandsQuery } from "../../../redux/api/brandApiSlice";
import { IProduct } from "@/types/product-d-t";
import { IBrand } from "@/types/brand-type";
import AppCard from "../component/app-card";
import StateCard from "../component/state-card";

const { Option } = Select;

const ProductTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError, refetch } = useGetAllProductsQuery({
    categoryId: null,
    limit: pageSize,
    page: currentPage,
  });

  const { data: allData, isLoading: isAllDataLoading } = useGetAllProductsQuery({
    categoryId: null,
    limit: 1000,
    page: 1,
  });

  const { data: brandData, isLoading: isBrandLoading } = useGetAllBrandsQuery();

  const [updateProduct] = useUpdateProductMutation();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<IProduct>>({});
  // State card
  const [totalProductsAll, setTotalProductsAll] = useState(0);
  const [outOfStockAll, setOutOfStockAll] = useState(0);
  const [potentialRevenueAll, setPotentialRevenueAll] = useState(0);
  const [discountedProductsAll, setDiscountedProductsAll] = useState(0);

  const openNotification = (type: "success" | "error", message: string, description?: string) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data.data.products);
    }
  }, [data]);

  useEffect(() => {
    if (allData?.data?.products) {
      const allProducts = allData.data.products;

      setTotalProductsAll(allProducts.length);

      setOutOfStockAll(allProducts.filter((product: IProduct) => product.stock === 0).length);

      setPotentialRevenueAll(
        allProducts.reduce((acc: number, product: IProduct) => acc + product.price * product.stock, 0)
      );

      setDiscountedProductsAll(allProducts.filter((product: IProduct) => product.discount > 0).length);
    }
  }, [allData]);

  const getBrandName = (brand_id: number | null): string => {
    const brand = brandData?.data.find((brand: IBrand) => brand.id === brand_id);
    return brand?.name || "Unknown Brand";
  };

  const handleEdit = (record: IProduct) => {
    setEditingRow(record.id);
    setFormData({ ...record });
  };

  const handleSave = async () => {
    if (!editingRow) return;

    try {
      const cleanedData = {
        title: formData.title || "",
        price: formData.price || 0,
        stock: formData.stock || 0,
        description: formData.description || "",
        sku: formData.sku || "",
        image: formData.image || "",
        brand_id: formData.brand_id ?? undefined,
      };

      await updateProduct({ id: editingRow, product: cleanedData }).unwrap();
      openNotification("success", "Product updated successfully!");

      refetch();
      setEditingRow(null);
    } catch (error) {
      console.error("Failed to update product:", error);
      openNotification("error", "Failed to update product", "Please check your inputs and try again.");
    }
  };

  const handleChange = (key: keyof IProduct, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Index",
      key: "index",
      fixed: "left",
      width: 60,
      render: (_: any, __: IProduct, index: number) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image: string, record: IProduct) =>
        editingRow === record.id ? (
          <Input.TextArea
            value={formData.image ?? ""}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="Enter image URL"
            rows={2}
          />
        ) : (
          <img
            src={image}
            alt="Product"
            style={{
              width: 75,
              height: 75,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      width: 120,
      render: (text: string, record: IProduct) =>
        editingRow === record.id ? (
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 80,
      render: (text: number, record: IProduct) =>
        editingRow === record.id ? (
          <InputNumber
            value={formData.price}
            onChange={(value) => handleChange("price", value ?? 0)}
            min={0}
            placeholder="Enter price"
          />
        ) : (
          `$${text}`
        ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 80,
      render: (text: number, record: IProduct) =>
        editingRow === record.id ? (
          <InputNumber
            value={formData.stock}
            onChange={(value) => handleChange("stock", value ?? 0)}
            min={0}
            placeholder="Enter stock quantity"
          />
        ) : (
          text
        ),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      width: 100,
    },
    {
      title: "Brand",
      dataIndex: "brand_id",
      key: "brand_id",
      width: 80,
      render: (brand_id: number, record: IProduct) =>
        editingRow === record.id ? (
          <Select
            value={formData.brand_id}
            onChange={(value) => handleChange("brand_id", value)}
            style={{ width: 150 }}
          >
            {brandData?.data.map((brand: IBrand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        ) : (
          getBrandName(brand_id)
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 450,
      render: (text: string, record: IProduct) =>
        editingRow === record.id ? (
          <Input.TextArea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={2}
          />
        ) : (
          text || "N/A"
        ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 60,
      render: (_: any, record: IProduct) =>
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

  if (isLoading || isBrandLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <div className="mt-30 mb-20 pl-25 pr-25 pt-30 pb-30" style={{ backgroundColor: "#E7EEE7", borderRadius: "8px", padding: "20px" }}>
      <div className="row state-summary-section mt-20 mb-20">
        <div className="col-md-3 mb-20 animation-u">
          <StateCard
            data={{
              title: "Total Products",
              value: totalProductsAll,
              growth: 0,
              icon: "total-products",
              color: "#455139",
            }}
          />
        </div>

        <div className="col-md-3 mb-20 animation-d">
          <StateCard
            data={{
              title: "Out of Stock",
              value: outOfStockAll,
              growth: 0,
              icon: "out-of-stock",
              color: "#9BBD73",
            }}
          />
        </div>

        <div className="col-md-3 mb-20 animation-u">
          <StateCard
            data={{
              title: "Potential Revenue",
              value: potentialRevenueAll,
              growth: 0,
              icon: "potential-revenue",
              color: "#AD99B4",
              format: "currency",
            }}
          />
        </div>

        <div className="col-md-3 mb-20 animation-d">
          <StateCard
            data={{
              title: "Discounted Products",
              value: discountedProductsAll,
              growth: 0,
              icon: "discounted-products",
              color: "#cbb8d3",
            }}
          />
        </div>
      </div>

      <AppCard title="Product List">
        <Table<IProduct>
          className="custom-table"
          columns={columns}
          dataSource={products}
          bordered
          rowKey="id"
          scroll={{
            x: 1400,
            y: 600,
          }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.data.totalCount,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            onShowSizeChange: (current, size) => setPageSize(size),
          }}
          onChange={handleTableChange}
        />
      </AppCard>
    </div>
  );
};

export default ProductTable;
