import React, { useState } from "react";
import { Button, Input, notification } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { IDiseaseInfo } from "@/types/disease-d-t";
import { useUpdateDiseaseMutation } from "../../../redux/api/diseaseApiSlice";

const { TextArea } = Input;

type DiseaseTableProps = {
  diseaseData: IDiseaseInfo[];
  showActions?: boolean;
};

const DiseaseTable: React.FC<DiseaseTableProps> = ({ diseaseData, showActions = true }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<IDiseaseInfo>>({});
  const [updateDisease, { isLoading }] = useUpdateDiseaseMutation();

  const handleEdit = (index: number, disease: IDiseaseInfo) => {
    setEditingRow(index);
    setEditedData({ ...disease });
  };

  const handleSave = async (diseaseId: string | number) => {
    try {
      await updateDisease({ id: diseaseId.toString(), data: editedData }).unwrap();
      notification.success({
        message: "Update Successful",
        description: "Disease information updated successfully!",
      });
      setEditingRow(null);
      setEditedData({});
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: "An error occurred while updating disease information.",
      });
      console.error("Update failed:", error);
    }
  };

  const handleInputChange = (field: keyof IDiseaseInfo, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <table className="diseases-listing__table">
      <thead>
        <tr>
          <th className="table-header">Disease Name</th>
          <th className="table-header">Pathogen</th>
          <th className="table-header">Symptoms</th>
          <th className="table-header">Conditions</th>
          <th className="table-header">Prevention</th>
          {showActions && <th className="table-header">Action</th>}
        </tr>
      </thead>
      <tbody>
        {diseaseData.map((disease, index) => (
          <tr key={index}>
            <td className="table-cell">
              <strong>{disease.name}</strong>
            </td>
            {["pathogen", "symptoms", "conditions", "prevention"].map(
              (field) => (
                <td className="table-cell" key={field}>
                  {editingRow === index ? (
                    <Input.TextArea
                      value={editedData[field as keyof IDiseaseInfo]?.toString() || ""}
                      onChange={(e) =>
                        handleInputChange(field as keyof IDiseaseInfo, e.target.value)
                      }
                      style={{ resize: "vertical" }}
                    />
                  ) : (
                    disease[field as keyof IDiseaseInfo]
                  )}
                </td>
              )
            )}
            {showActions && (
              <td className="table-cell last-column">
                {editingRow === index ? (
                  <Button
                    shape="circle"
                    icon={<SaveOutlined />}
                    onClick={() => handleSave(disease.id)}
                    type="primary"
                    loading={isLoading}
                  />
                ) : (
                  <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(index, disease)}
                    type="default"
                  />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiseaseTable;
