from fastapi import FastAPI, Request, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
import uvicorn
import numpy as np
import tensorflow as tf
from PIL import Image
import io

app = FastAPI()

# Allow CORS
origins = [
    "http://localhost:3000",  # Frontend
    "http://localhost:5000",  # Backend
]

# Add middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"], 
)

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

class MaxSizeLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get('content-length')
        
        if content_length and int(content_length) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail="File size exceeds the maximum limit of 20MB")
        
        response = await call_next(request)
        return response

app.add_middleware(MaxSizeLimitMiddleware)

MODEL = tf.keras.models.load_model("models/Tomato_DenseNet121.h5")
MODEL.compile()

CLASS_NAMES = [
    'Bacterial Spot',
    'Early Blight',
    'Late Blight',
    'Leaf Mold',
    'Septoria Leaf Spot',
    'Target Spot',
    'Tomato Yellow Leaf Curl Virus',
    'Tomato Mosaic Virus',
    'Healthy',
    'Powdery Mildew',
    'Two-Spotted Spider Mites'
]

CLASS_NAMES_VI = [
    'Bệnh đốm lá vi khuẩn',                 # Bacterial Spot
    'Bệnh úa sớm',                          # Early Blight
    'Bệnh sương mai',                       # Late Blight
    'Bệnh mốc lá',                          # Leaf Mold
    'Bệnh đốm lá do nấm Septoria',          # Septoria Leaf Spot
    'Bệnh đốm lá',                          # Target Spot
    'Bệnh do virus xoăn vàng lá cà chua',   # Tomato Yellow Leaf Curl Virus
    'Bệnh do virus khảm cà chua',           # Tomato Mosaic Virus
    'Lá khỏe mạnh',                         # Healthy
    'Bệnh phấn trắng',                      # Powdery Mildew
    'Bệnh do nhện đỏ hai chấm'              # Spotted Spider Mite
]

def read_and_resize(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    image = image.resize((224, 224))  # Resize for the model
    image = np.array(image) / 255.0   # Normalize
    return image

@app.get("/")
async def root():
    return {"message": "Welcome to the Plant Disease Detection API"}

@app.post("/api/v1/predict")
async def predict(file: UploadFile = File(...)):
    # Read and preprocess the image
    image = read_and_resize(await file.read())
    img_batch = np.expand_dims(image, 0)  # Create batch
    
    # Perform prediction
    predictions = MODEL.predict(img_batch)
    predicted_index = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES[predicted_index]  
    predicted_class_vi = CLASS_NAMES_VI[predicted_index]
    confidence = np.max(predictions[0])
    
    combined_name = f"{predicted_class_vi} ({predicted_class})"
    
    return {
        # 'class': combined_name,
        'class': predicted_class,
        'confidence': float(confidence)
    }


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)