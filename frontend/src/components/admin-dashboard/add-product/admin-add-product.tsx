import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/sidebar';
import ProductContent from './content/content';
import AppScrollbar from '../component/app-scrollbar';
import ActionButtons from './button/button';
import { notification } from 'antd';
import { useCreateProductMutation } from '../../../redux/api/productApiSlice';
import DOMPurify from 'dompurify';

interface FormValues {
  sku: string;
  slug: string;
  stock: number;
  price: number;
  discount: number;
  final_price: number;
  category_id: number | null; // Subcategory ID
  parent_category_id: number | null; // Parent category ID
  brand_id: number | null;
}

const AddProduct: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    sku: '',
    slug: '',
    stock: 0,
    price: 0,
    discount: 0,
    final_price: 0,
    category_id: null,
    parent_category_id: null,
    brand_id: null,
  });

  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [imageLink, setImageLink] = useState<string>('');

  const [createProduct, { isLoading }] = useCreateProductMutation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      notification.error({
        message: 'Unauthorized',
        description: 'You need to log in to access this feature.',
      });
    }
  }, []);

  const resetForm = () => {
    setFormValues({
      sku: '',
      slug: '',
      stock: 0,
      price: 0,
      discount: 0,
      final_price: 0,
      category_id: null,
      parent_category_id: null,
      brand_id: null,
    });

    setTitle('');
    setDescription('');
    setImageLink('');
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      notification.error({
        message: 'Unauthorized',
        description: 'You need to log in to access this feature.',
      });
      return;
    }

    // Sanitize the description before saving to database
    const sanitizedDescription = DOMPurify.sanitize(description, {
      ALLOWED_TAGS: [],
    });

    const sanitizedPayload = {
      ...formValues,
      description: sanitizedDescription,
      title,
      image: imageLink,
      category_id: formValues.category_id ?? undefined, // Ensure it's not null
      parent_category_id: formValues.parent_category_id ?? undefined, // Ensure it's not null
      brand_id: formValues.brand_id ?? undefined, // Ensure it's not null
    };
    console.log('Payload being sent to the server:', sanitizedPayload);

    try {
      await createProduct(sanitizedPayload).unwrap();
      notification.success({
        message: 'Success',
        description: 'Product added successfully.',
      });
      resetForm();
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.data?.message || 'Failed to add product.',
      });
    }
  };

  return (
    <div
      className="row g-0 mt-30 mb-20 pl-25 pr-25 pt-30 pb-30"
      style={{ background: '#f3f9f2', borderRadius: '8px', padding: '20px' }}
    >
      <h4>Add a new product</h4>
      <div className="col-xl-9 col-lg-8 mt-5 content">
        <ProductContent
          title={title}
          setTitle={setTitle}
          imageLink={imageLink}
          setImageLink={setImageLink}
          description={description}
          setDescription={setDescription}
        />
      </div>
      <div className="col-xl-3 col-lg-4 sidebar-wrapper">
        <AppScrollbar>
          <Sidebar formValues={formValues} setFormValues={setFormValues} />
        </AppScrollbar>
      </div>
      <div>
        <ActionButtons
          onCancel={resetForm}
          onSubmit={handleSubmit}
          isEdit={false}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AddProduct;
