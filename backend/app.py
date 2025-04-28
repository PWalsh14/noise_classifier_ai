from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import librosa
import os
import io
import base64
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import librosa.display
from PIL import Image
import urllib.request  # ✅ for downloading the model

app = Flask(__name__)
CORS(app, supports_credentials=True)

# 📁 Ensure upload directory exists
os.makedirs("uploads", exist_ok=True)

# ✅ Auto-download model if not found
MODEL_PATH = "model/audio_classifier.h5"
MODEL_URL = "https://drive.google.com/uc?export=download&id=1t9AYmllvCKQzuAVCQpkwFV5pLlqftAcW"

if not os.path.exists(MODEL_PATH):
    os.makedirs("model", exist_ok=True)
    print("📦 Downloading model from Google Drive...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print("✅ Model downloaded.")

# 🔖 Load label map
def load_label_map(path="model/label_map.txt"):
    label_map = {}
    if os.path.exists(path):
        with open(path, "r") as f:
            for line in f:
                idx, label = line.strip().split(":")
                label_map[int(idx)] = label
    return label_map

label_map = load_label_map()
print("✅ Label map loaded:", label_map)

# 🧠 Load trained model
model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Model loaded")
model.summary()



# 🔬 Feature extraction
def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=22050)
    
    # Match training:
    mel = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128)
    db = librosa.power_to_db(mel, ref=np.max)
    db = (db - np.mean(db)) / (np.std(db) + 1e-9)

    # Resize to 128x128 exactly like training
    if db.shape[1] < 128:
        db = np.pad(db, ((0, 0), (0, 128 - db.shape[1])), mode='constant')
    elif db.shape[1] > 128:
        db = db[:, :128]

    db = db[:128, :]

    rgb = np.stack([db] * 3, axis=-1)  # RGB stack
    return rgb.astype(np.float32)



# 📊 Spectrogram to base64
def generate_spectrogram_image(y, sr):
    mel = librosa.feature.melspectrogram(y=y, sr=sr)
    db = librosa.power_to_db(mel, ref=np.max)
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(db, sr=sr, x_axis="time", y_axis="mel")
    plt.colorbar(format="%+2.0f dB")
    plt.title("Mel Spectrogram")
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)
    return base64.b64encode(buf.read()).decode("utf-8")

# 🌐 Routes
@app.route("/")
def home():
    return "✅ Flask is running and model is ready!"

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    path = os.path.join("uploads", file.filename)
    file.save(path)
    print("Uploaded:", file.filename)


    try:
        # Process input image
        features = extract_features(path)
        features = (features - features.min()) / (features.max() - features.min())
        input_data = np.expand_dims(features, axis=0)
        print("📦 Running prediction using model:", model.name)


        predictions = model.predict(input_data)
        print("Raw predictions:", predictions)


        # Final predicted class and confidence
        predicted_class = int(np.argmax(predictions))
        predicted_label = label_map.get(predicted_class, "Unknown")
        confidence = float(np.max(predictions))


        # Spectrogram image
        y, sr = librosa.load(path, sr=22050)
        spectrogram_img = generate_spectrogram_image(y, sr)

        

        return jsonify({
            "prediction": predicted_label,
            "confidence": round(confidence * 100, 2),
            "spectrogram": spectrogram_img
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# 🧪 Analyze audio (for Explore page)
@app.route("/analyze", methods=["POST"])
def analyze_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    path = os.path.join("uploads", file.filename)
    file.save(path)

    try:
        print(f"📂 Analyzing: {path}")
        y, sr = librosa.load(path, sr=22050)
        print(f"✅ Loaded audio: {len(y)} samples at {sr} Hz")

        

        # Spectrogram
        mel = librosa.feature.melspectrogram(y=y, sr=sr)
        db = librosa.power_to_db(mel, ref=np.max)
        plt.figure(figsize=(10, 4))
        librosa.display.specshow(db, sr=sr, x_axis="time", y_axis="mel")
        plt.title("Mel Spectrogram")
        plt.colorbar(format="%+2.0f dB")
        buf1 = io.BytesIO()
        plt.savefig(buf1, format="png")
        plt.close()
        buf1.seek(0)
        spectrogram_img = base64.b64encode(buf1.read()).decode("utf-8")

        # Waveform
        plt.figure(figsize=(10, 2))
        librosa.display.waveshow(y, sr=sr)
        plt.title("Waveform")
        buf2 = io.BytesIO()
        plt.savefig(buf2, format="png")
        plt.close()
        buf2.seek(0)
        waveform_img = base64.b64encode(buf2.read()).decode("utf-8")

        return jsonify({
            "spectrogram": spectrogram_img,
            "waveform": waveform_img
        })

    except Exception as e:
        import traceback
        print("❌ Analyze error:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500





if __name__ == "__main__":
    app.run(debug=True)
