# 🧠 AI Sound Classifier Web App

A beginner-friendly web application that uses deep learning to classify environmental sounds through spectrogram analysis. Built for educational purposes, with an emphasis on transparency and explanation for non-experts.

---

## 🚀 Features

- 🎧 **Upload audio files** to get real-time sound predictions
- 📊 **Visualize waveforms and spectrograms** to understand audio data
- 🤖 **AI-powered predictions** using a Convolutional Neural Network (CNN)
- 🧪 **Try sample audio** to test without needing your own `.wav` file
- 🧠 **Learn AI concepts** via interactive, glossary-linked sections
- 💬 **Chatbot assistant** to help users explore concepts further
- 🔍 **Confidence score** and guided interpretation of predictions
- 📚 **Glossary with expandable terms** to aid understanding

---

## 🏗️ Project Structure

noise-analysis-demo/
├── backend/                # Flask API backend
│   ├── app.py              # Main Flask server
│   └── model/              # Trained CNN model + label map
│       └── audio_classifier.h5
│       └── label_map.txt
│
├── frontend/               # React frontend
│   ├── public/
│   │   └── samples/        # Sample audio files
│   └── src/
│       ├── components/     # Reusable UI components (Navbar, GlossaryTerm, etc.)
│       ├── pages/          # Main views (Home, TryIt, Learn, etc.)
│       ├── data/           # Central glossary definitions
│       └── App.jsx         # App routing and layout
│
├── .gitignore
├── README.md
├── requirements.txt        # Python dependencies
├── package.json            # Frontend dependencies
└── prepare_esc10.py        # Script to set up training dataset



---

## 🧠 Technologies Used

- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Flask, TensorFlow, Librosa
- **AI Model:** CNN trained on ESC-10 (subset of ESC-50 dataset)
- **Deployment:** Render (for backend), GitHub Pages (optional for frontend)

---

## 📝 How It Works

1. Audio is uploaded (or a sample is used)
2. It's converted into a spectrogram (image of sound over time)
3. A CNN analyzes this spectrogram to classify the sound
4. The result is displayed along with visual explanations

---

## 🧪 Try It Yourself

- Head to the **Try It** page
- Upload a `.wav` file (e.g., knock, dog bark)
- See the **prediction**, **confidence score**, and **spectrogram**
- Use **sample audio** if you don’t have a file

---

🧠 Model Info

This app is powered by a custom-built Convolutional Neural Network (CNN) trained on a subset of the ESC-50 dataset called ESC-10, which contains 10 classes of environmental sounds (e.g., speech, clapping, dog bark, etc.).

🔍 Architecture
A 2D CNN trained on Mel spectrograms (visual representations of sound)
Input shape: 128x128x3 spectrogram images
Layers: Conv2D → MaxPooling → Conv2D → MaxPooling → Dense → Output
The model treats each sound as an image, learning patterns of pitch and intensity over time.

🧠 Training Details
Framework: TensorFlow/Keras
Input: .wav audio → converted to Mel spectrograms
Output: One of 10 sound classes
Trained locally using GPU on ESC-10 subset
📈 Performance
The model performs well on clean recordings but may struggle with overlapping or noisy sounds
Confidence scores are shown with predictions to reflect the model's certainty
⚠️ Limitations
May misclassify unfamiliar or mixed sounds
Only recognizes ESC-10 sound categories
Limited generalization to real-world noisy environments

---


## 📚 Based On

This project is inspired by concepts from Chapter 12 of *Practical Deep Learning for Coders* by Jeremy Howard and Sylvain Gugger  
🔗 [Read the chapter (PDF)](https://nostarch.com/download/PracticalDeepLearning2e_Chapter12.pdf)

---

## 🙋 Who's It For?

- Students learning AI and deep learning
- Educators looking to demo how audio classification works
- Anyone curious how machines "hear" and understand sound!

---

## 🧼 Notes

- `.wav` format only
- Browser-based, no backend login or user storage
- Grad-CAM visual explanation is represented with static image for now

---

## 🛠️ Future Improvements

- Deploy full model to cloud backend
- Support for more audio types (mp3, m4a, etc.)
- In-app tutorials and step-by-step walkthroughs
- More AI model explainability (live Grad-CAM, guided overlays)

---

## 👨‍💻 Author

**Patrick Walsh**  
Dissertation Project · Newcastle University
GitHub: [@PWalsh14](https://github.com/PWalsh14)

