import React from 'react';
import { Button, Space } from 'antd';

interface ActionButtonsProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel, onSubmit, isEdit = false, isLoading }) => {
  return (
    <Space style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
      <Button
        style={{
          minWidth: 100,
        }}
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>

      <Button
        style={{
          minWidth: 100,
        }}
        type="primary"
        onClick={onSubmit}
        loading={isLoading}
      >
        {isEdit ? 'Edit' : 'Add'} Product
      </Button>
    </Space>
  );
};

export default ActionButtons;
