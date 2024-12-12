import React, { useRef, useCallback } from 'react';
import { Col, Form, Input } from 'antd';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const config = {
  readonly: false,
  toolbar: true,
  minHeight: 300,
  maxHeight: 500,
  buttons: [
    'source',
    '|',
    'bold',
    'strikethrough',
    'underline',
    'italic',
    '|',
    'ul',
    'ol',
    '|',
    'outdent',
    'indent',
    '|',
    'font',
    'fontsize',
    'paragraph',
    '|',
    'image',
    'video',
    'table',
    'link',
    '|',
    'align',
    'undo',
    'redo',
    'selectall',
    'cut',
    'copy',
    'paste',
    '|',
    'symbol',
  ],
};

interface ProductContentProps {
  title: string;
  setTitle: (value: string) => void;
  imageLink: string;
  setImageLink: (value: string) => void;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ProductContent: React.FC<ProductContentProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  imageLink,
  setImageLink,
}) => {
  const editor = useRef(null);

  // Xử lý thay đổi tiêu đề
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Xử lý thay đổi liên kết ảnh
  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLink(e.target.value);
  };

  return (
    <Col className="product-content">
      <div className="app-scrollbar">
        <div className="app-card">
          {/* Title Input */}
          <Form.Item name="title">
            <Input
              placeholder="Enter product title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Item>

          {/* Description Editor */}
          <Form.Item name="description">
            <div>
              <JoditEditor
                ref={editor}
                value={description}
                config={config}
                onBlur={(content) => setDescription(content)} // Reset đúng giá trị description
              />
            </div>
          </Form.Item>

          {/* Image Link Input */}
          <Form.Item name="imageLink">
            <Input
              placeholder="Paste image link here"
              value={imageLink}
              onChange={handleImageLinkChange}
            />
          </Form.Item>
        </div>
      </div>
    </Col>
  );
};

export default ProductContent;
