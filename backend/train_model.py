import os
import numpy as np
from collections import Counter
import librosa
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import (
    Input, Conv2D, MaxPooling2D,
    GlobalAveragePooling2D, Dense, Dropout, BatchNormalization
)
from tensorflow.keras.callbacks import EarlyStopping

# 📁 Dataset path
DATA_PATH = "../dataset/train"
print("📁 Scanning:", DATA_PATH)

# 🏷️ Label map
labels = {
    label: idx for idx, label in enumerate(
        sorted([d for d in os.listdir(DATA_PATH) if os.path.isdir(os.path.join(DATA_PATH, d))])
    )
}
print("✅ Label map:", labels)

X = []
y = []

# 🔬 Feature extraction
def extract_mel_image(y_audio, sr):
    mel = librosa.feature.melspectrogram(y=y_audio, sr=sr, n_mels=128)
    db = librosa.power_to_db(mel, ref=np.max)
    db = (db - np.mean(db)) / (np.std(db) + 1e-9)

    if db.shape[1] < 128:
        db = np.pad(db, ((0, 0), (0, 128 - db.shape[1])), mode='constant')
    elif db.shape[1] > 128:
        db = db[:, :128]

    db = db[:128, :]

    rgb = np.stack([db] * 3, axis=-1)
    return rgb.astype(np.float32)

# 🔁 Load dataset
for label, idx in labels.items():
    folder = os.path.join(DATA_PATH, label)
    for file in os.listdir(folder):
        if not file.endswith(".wav"):
            continue
        path = os.path.join(folder, file)
        try:
            y_audio, sr = librosa.load(path, sr=22050)
            mel_img = extract_mel_image(y_audio, sr)
            X.append(mel_img)
            y.append(idx)
        except Exception as e:
            print(f"⚠️ Skipped {file}: {e}")

X = np.array(X)
y = np.array(y)
print("📊 Dataset shapes — X:", X.shape, "y:", y.shape)
print("📊 Class distribution:", Counter(y))

# 🧪 Split train/val
X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# ⚖️ Compute class weights
class_weights = compute_class_weight(class_weight='balanced', classes=np.unique(y_train), y=y_train)
class_weight_dict = {i: weight for i, weight in enumerate(class_weights)}
print("⚖️ Class weights:", class_weight_dict)

# 🧠 Optimized lightweight CNN
model = Sequential([
    Input(shape=(128, 128, 3)),

    Conv2D(64, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(2, 2),
    Dropout(0.2),

    Conv2D(128, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(2, 2),
    Dropout(0.2),

    Conv2D(256, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(2, 2),
    Dropout(0.25),

    GlobalAveragePooling2D(),
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(len(labels), activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# ⏹️ Early stopping
early_stopping = EarlyStopping(
    monitor='val_loss',
    patience=8,
    restore_best_weights=True
)

# 🏋️‍♂️ Train
history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=40,
    batch_size=8,  # Smaller batch size = more updates, better generalization
    callbacks=[early_stopping],
    class_weight=class_weight_dict,
    verbose=1
)

# 💾 Save model + label map
os.makedirs("model", exist_ok=True)
model.save("model/audio_classifier.keras")

with open("model/label_map.txt", "w") as f:
    for label, idx in labels.items():
        f.write(f"{idx}:{label}\n")

# 📊 Final evaluation
val_loss, val_accuracy = model.evaluate(X_val, y_val)
print(f"✅ Final validation accuracy: {val_accuracy * 100:.2f}%")
