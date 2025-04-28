import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
from tensorflow.keras.models import load_model
from sklearn.model_selection import train_test_split
import librosa

# 📁 Paths
MODEL_PATH = "model/audio_classifier.keras"
LABEL_MAP_PATH = "model/label_map.txt"
DATA_PATH = "../dataset/train"

# 🔁 Load label map
labels = {}
with open(LABEL_MAP_PATH, "r") as f:
    for line in f:
        idx, name = line.strip().split(":")
        labels[name] = int(idx)  # now label name → idx

label_names = list(labels.keys())  # for classification_report labels


# 🔄 Re-extract validation set
X = []
y = []

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

for label_str, idx in labels.items():
    folder = os.path.join(DATA_PATH, label_str)
    for file in os.listdir(folder):
        if file.endswith(".wav"):
            path = os.path.join(folder, file)
            try:
                y_audio, sr = librosa.load(path, sr=22050)
                mel_img = extract_mel_image(y_audio, sr)
                X.append(mel_img)
                y.append(int(idx))
            except Exception as e:
                print(f"⚠️ Skipped {file}: {e}")

X = np.array(X)
y = np.array(y)

# 🔀 Use same split strategy as training
_, X_val, _, y_val = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# 🧠 Load model
model = load_model(MODEL_PATH)

# 🔮 Predict
y_pred = model.predict(X_val)
y_pred_labels = np.argmax(y_pred, axis=1)

# 📊 Confusion matrix
cm = confusion_matrix(y_val, y_pred_labels)
cr = classification_report(y_val, y_pred_labels, target_names=label_names, digits=2)

# 📈 Plot
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=label_names, yticklabels=label_names)
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.title("Confusion Matrix")
plt.tight_layout()
plt.savefig("confusion_matrix.png")
plt.show()

# 📝 Print classification report
print("Classification Report:\n")
print(cr)
