import React, { useEffect, useState } from 'react';
import AppCard from '../../component/app-card';
import AppScrollbar from '../../component/app-scrollbar';
import AppRowContainer from '../../component/app-row-container';
import { Col, Form, Input, InputNumber, Select, Switch } from 'antd';
import StyledFormWrapper from './index.style';
import { ICategory, ICategoryDT } from '../../../../types/category-d-t';
import { useGetAllCategoriesQuery } from '../../../../redux/api/categoryApiSlice';
import { useGetAllBrandsQuery } from '../../../../redux/api/brandApiSlice';

const { Option } = Select;

interface FormValues {
  sku: string;
  slug: string;
  stock: number;
  price: number;
  discount: number;
  final_price: number;
  category_id: number | null;
  parent_category_id: number | null;
  brand_id: number | null;
}

interface SidebarProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

const Sidebar: React.FC<SidebarProps> = ({ formValues, setFormValues }) => {
  const { data: categoryData, isLoading: isCategoryLoading, isError: isCategoryError } = useGetAllCategoriesQuery();
  const { data: brandData, isLoading: isBrandLoading, isError: isBrandError } = useGetAllBrandsQuery();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ICategory['subcategories']>([]);

  useEffect(() => {
    if (categoryData?.data) {
      const transformedCategories = categoryData.data.map((cat: ICategoryDT) => ({
        id: cat.id,
        image: cat.image,
        title: cat.title,
        slug: '',
        productCount: 0,
        subcategories: cat.subcategories.map((sub) => ({
          id: sub.id,
          title: sub.title,
          productCount: 0,
        })),
      }));
      setCategories(transformedCategories);
    }
  }, [categoryData]);

  useEffect(() => {
    if (formValues.parent_category_id) {
      const selectedCategory = categories.find((category) => category.id === formValues.parent_category_id);
      setSubcategories(selectedCategory?.subcategories || []);
    } else {
      setSubcategories([]);
    }
  }, [formValues.parent_category_id, categories]);

  const handleChange = (key: keyof FormValues, value: any) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [key]: value };

      if (key === 'parent_category_id') {
        // Reset subcategory and set parent category ID
        console.log('Selected Parent Category ID:', value);
        updatedValues.category_id = null; // Reset subcategory
        const selectedCategory = categories.find((category) => category.id === value);
        setSubcategories(selectedCategory?.subcategories || []);
      }

      if (key === 'category_id') {
        // Update both subcategory and parent category
        const selectedSubcategory = subcategories.find((subcategory) => subcategory.id === value);
        if (selectedSubcategory) {
          const parentCategory = categories.find((category) =>
            category.subcategories.some((sub) => sub.id === value)
          );
          updatedValues.parent_category_id = parentCategory ? parentCategory.id : null;
        }
      }

      if (key === 'price' || key === 'discount') {
        const calculatedFinalPrice = updatedValues.price - (updatedValues.price * updatedValues.discount) / 100;
        updatedValues.final_price = Math.max(calculatedFinalPrice, 0);
      }

      return updatedValues;
    });
  };

  if (isCategoryLoading || isBrandLoading) {
    return <div>Loading...</div>;
  }

  if (isCategoryError || isBrandError) {
    return <div>Failed to load categories or brands</div>;
  }

  return (
    <Col>
      <AppScrollbar>
        <StyledFormWrapper>
          <AppCard title="Product Details">
            <AppRowContainer>
              <Form.Item label="In Stock" valuePropName="checked" style={{ width: '100%' }}>
                <Switch checked={formValues.stock > 0} onChange={(checked) => handleChange('stock', checked ? 1 : 0)} />
              </Form.Item>
              <Form.Item label="Product SKU" style={{ width: '100%' }}>
                <Input
                  placeholder="Enter SKU"
                  value={formValues.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Slug" style={{ width: '100%' }}>
                <Input
                  placeholder="Enter Slug"
                  value={formValues.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Brand" style={{ width: '100%' }}>
                <Select
                  placeholder="Select Brand"
                  value={formValues.brand_id}
                  onChange={(value) => handleChange('brand_id', value)}
                >
                  {brandData?.data.map((brand) => (
                    <Option key={brand.id} value={brand.id}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Parent Category" style={{ width: '100%' }}>
                <Select
                  placeholder="Select Parent Category"
                  value={formValues.parent_category_id}
                  onChange={(value) => handleChange('parent_category_id', value)}
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Subcategory" style={{ width: '100%' }}>
                <Select
                  placeholder="Select Subcategory"
                  value={formValues.category_id || undefined}
                  disabled={!formValues.parent_category_id}
                  onChange={(value) => handleChange('category_id', value)}
                >
                  {subcategories.map((subcategory) => (
                    <Option key={subcategory.id} value={subcategory.id}>
                      {subcategory.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Stock Quantity" style={{ width: '100%' }}>
                <InputNumber
                  value={formValues.stock}
                  onChange={(value) => handleChange('stock', value ?? 0)}
                  placeholder="Enter stock quantity"
                />
              </Form.Item>
            </AppRowContainer>
          </AppCard>

          <AppCard title="Product Pricing">
            <AppRowContainer>
              <Form.Item label="Price" style={{ width: '100%' }}>
                <InputNumber
                  value={formValues.price || undefined}
                  onChange={(value) => handleChange('price', value ?? 0)}
                  placeholder="Enter price"
                />
              </Form.Item>
              <Form.Item label="Discount %" style={{ width: '100%' }}>
                <InputNumber
                  value={formValues.discount || undefined}
                  onChange={(value) => handleChange('discount', value ?? 0)}
                  placeholder="Enter discount"
                />
              </Form.Item>
              <Form.Item label="Final Price" style={{ width: '100%' }}>
                <Input
                  value={formValues.final_price || ''}
                  readOnly
                  placeholder="Final price after discount"
                />
              </Form.Item>
            </AppRowContainer>
          </AppCard>
        </StyledFormWrapper>
      </AppScrollbar>
    </Col>
  );
};

export default Sidebar;
