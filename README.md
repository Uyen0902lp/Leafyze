# Tomato Leaf Disease Detection System

This project implements a web-based system to detect diseases in tomato leaves using deep learning techniques. The system leverages pre-trained Convolutional Neural Network (CNN) models for accurate disease classification and provides an intuitive interface for users to upload leaf images and receive predictions.

---

## Features
- **Disease Detection**: Supports the identification of 11 different tomato leaf conditions, including common diseases like early blight, late blight, and healthy leaves.
- **Web Application**: A responsive user interface that allows users to upload leaf images and get predictions in real-time.
- **Database Integration**: Stores prediction history and disease information in a structured format.
- **Deep Learning Models**: Utilizes DenseNet121 for disease classification.

---

## System Architecture
The system consists of:
1. **Frontend**: Developed with **Next.js**, a modern framework to handle user interactions and display results.
2. **Backend**: Built using **Express.js**, which communicates with FastAPI to process predictions and integrate with the database.
3. **Database**: A **MySQL database** for storing user data, prediction history, and disease information.
4. **Model**: **DenseNet121** called via **FastAPI**, fine-tuned on the tomato leaf dataset for classification.
5. **Dataset**: [Tomato Leaves Dataset](https://www.kaggle.com/datasets/ashishmotwani/tomato).

---

## Technology Stack
- **Frontend**: Next.js
- **Backend**: Express.js with FastAPI for model integration
- **Database**: MySQL
- **Deep Learning Framework**: TensorFlow, Keras
- **Model**: DenseNet121

---

## Acknowledgments
Special thanks to:
- **Advisors**: TS. Phạm Mạnh Linh and TS. Lê Nguyễn Tuấn Thành.
- **University**: Đại học Quốc gia Hà Nội, Trường Đại học Công nghệ.
