# train_model.py ✅ (ESC-10 stable version)
import os
import numpy as np
import librosa
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Input

# 📁 ESC-10 dataset
DATA_PATH = "../dataset/train"
print("📁 Scanning", DATA_PATH)

labels = {
    label: idx for idx, label in enumerate(
        sorted([d for d in os.listdir(DATA_PATH) if os.path.isdir(os.path.join(DATA_PATH, d))])
    )
}
print("✅ Label map:", labels)

X_train = []
y_train = []

# 🎛️ Feature extractor
def extract_mel_image(y, sr):
    mel = librosa.feature.melspectrogram(y=y, sr=sr)
    db = librosa.power_to_db(mel, ref=np.max)
    img = Image.fromarray(db).resize((128, 128))
    rgb = np.stack([np.array(img)] * 3, axis=-1)
    return rgb.astype(np.float32)

# 🎛️ Basic augmentation
def augment(y, sr):
    return [
        y,
        librosa.effects.time_stretch(y, rate=0.9),
        librosa.effects.time_stretch(y, rate=1.1),
        librosa.effects.pitch_shift(y, sr=sr, n_steps=2),
        librosa.effects.pitch_shift(y, sr=sr, n_steps=-2),
        y + 0.005 * np.random.randn(len(y)),
    ]

# 🔄 Process all audio files
for label, idx in labels.items():
    folder = os.path.join(DATA_PATH, label)
    for file in os.listdir(folder):
        if not file.endswith(".wav"):
            continue
        path = os.path.join(folder, file)
        try:
            y, sr = librosa.load(path, sr=22050)
            for version in augment(y, sr):
                mel_img = extract_mel_image(version, sr)
                X_train.append(mel_img)
                y_train.append(idx)
        except Exception as e:
            print(f"⚠️ Skipping {file}: {e}")

# ✅ Convert to arrays
X_train = np.array(X_train)
y_train = np.array(y_train)
print("📊 X:", X_train.shape, "y:", y_train.shape)

# ✅ Normalize input
X_train = X_train / 255.0

# 🧠 Define CNN model
model = Sequential([
    Input(shape=(128, 128, 3)),
    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(len(labels), activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, batch_size=16)

# 💾 Save model + label map
os.makedirs("model", exist_ok=True)
model.save("model/audio_classifier.h5")
with open("model/label_map.txt", "w") as f:
    for label, idx in labels.items():
        f.write(f"{idx}:{label}\n")

print("✅ Model trained and saved!")
