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
- 🧩 **Gamified learning** with a Match-Pairs Quiz to reinforce key AI concepts
- 🔍 **Confidence score** and guided interpretation of predictions
- 📚 **Glossary with expandable terms** to aid understanding
- 🌗 **Dark mode** support for improved accessibility

---

## 🏗️ Project Structure

backend/ # Flask API backend app.py # Main server script model/ # Trained CNN model and label map audio_classifier.h5 label_map.txt

frontend/ # React frontend public/ samples/ # Sample audio files src/ components/ # Reusable components (e.g., Navbar, GlossaryTerm) pages/ # Main page views (Home, TryIt, Learn, etc.) data/ # Glossary definitions App.jsx # Main app entry point and routing

.gitignore README.md requirements.txt # Python dependencies (backend) package.json # React frontend dependencies prepare_esc10.py # Dataset preparation script

---

## 🧠 Technologies Used

- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Flask, TensorFlow, Librosa
- **AI Model:** CNN trained on ESC-10 (subset of ESC-50 dataset)

---

## 📝 How It Works

1. Audio is uploaded (or a sample is selected)
2. It's converted into a spectrogram (a visual image of sound over time)
3. A CNN analyses this spectrogram to classify the sound
4. The result is displayed along with visual explanations

---

## 🧪 Try It Yourself

- Go to the **Try It** page
- Upload a `.wav` file (e.g., dog bark, rain, clock tick)
- View the **prediction**, **confidence score**, and **spectrogram visualization**
- You can also use **example audio samples** if you don’t have a file

---

## 🧠 Model Info

The app is powered by a custom-built Convolutional Neural Network (CNN) trained on the ESC-10 dataset, which contains 10 categories of environmental sounds.

### 🔍 Model Architecture

- Input: 128×128×3 mel spectrogram images
- Layers: Conv2D → BatchNorm → MaxPooling → Conv2D → BatchNorm → MaxPooling → Dense → Output (Softmax)

### 🧠 Training Details

- Framework: TensorFlow/Keras
- Input pipeline: .wav audio ➔ mel spectrogram conversion (Librosa)
- 80/20 train-validation split
- Optimizer: Adam
- Loss: Sparse categorical crossentropy

### 📈 Performance

- Final validation accuracy: ~80%
- Strong performance on clean, in-distribution recordings
- Confidence scores included with predictions
- Potential misclassification for noisy or unfamiliar real-world audio

### ⚠️ Known Limitations

- Only recognises ESC-10 sound categories
- Struggles with overlapping or noisy environments
- Overconfident outputs (common in softmax-based classifiers)

---

## 📚 Based On

This project is inspired by concepts from Chapter 12 of *Practical Deep Learning for Coders* by Jeremy Howard and Sylvain Gugger.  
🔗 [Read the chapter (PDF)](https://nostarch.com/download/PracticalDeepLearning2e_Chapter12.pdf)

---

## 🙋 Who's It For?

- Students learning AI and deep learning fundamentals
- Educators who want a live demonstration of how audio classification works
- Anyone curious about how machines "hear" and analyse sounds

---

## 🧼 Notes

- `.wav` format only (current version)
- Browser-based, no user login or data storage
- Static spectrogram previews; Grad-CAM or other live explainability tools are potential future upgrades

---

## 🛠️ Future Improvements

- Expand training to ESC-50 and UrbanSound8K datasets
- Add support for real-time microphone input
- Implement more AI model explainability (live Grad-CAM overlays)
- Broader file format support (.mp3, .m4a, etc.)
- In-app tutorials and guided walkthroughs

---

## 👨‍💻 Author

**Patrick Walsh**  
Dissertation Project · Newcastle University  
GitHub: [@PWalsh14](https://github.com/PWalsh14)
