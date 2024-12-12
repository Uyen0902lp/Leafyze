# Tomato Leaf Disease Detection - FastAPI Service

This FastAPI service integrates the DenseNet121 model for predicting tomato leaf diseases. It processes image inputs, resizes and normalizes them, and returns prediction results.

---

## Overview
### **Model**
- **DenseNet121**: Trained on a tomato leaf dataset, stored in the file `Tomato_DenseNet121.h5`.

### **Middleware**
- **CORS Middleware**: Allows access from frontend/backend. (You can customize it to suit your project needs.)
- **MaxSizeLimitMiddleware**: Limits uploaded file size to a maximum of 20MB.

### **Main Endpoint**
- **Main Endpoint**: `predict`
- **Method**: `POST`

---

## Input/Output
### **Input**
- **File**: Image file of tomato leaf.
- **File size**: Must not exceed 20MB.

### **Image Processing**
- Resize images to **224x224 pixels**.
- Normalize pixel values to the range `[0, 1]`.
- Add batch dimension: `np.expand_dims(image, 0)`.

### **Output**
- **Class**: Predicted disease name (in English).
- **Confidence**: Model’s confidence score (value between 0 and 1).

#### Example Response:
```json
{
  "class": "Bacterial Spot",
  "confidence": 0.92992838733
}