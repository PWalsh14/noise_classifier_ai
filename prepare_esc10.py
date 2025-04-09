import os
import pandas as pd
import shutil

# Paths (customize these if needed)
csv_path = "ESC-50/meta/esc50.csv"
audio_path = "ESC-50/audio"
output_dir = "dataset/train"

# Load metadata and filter ESC-10 samples
print("🔍 Loading ESC-50 metadata...")
df = pd.read_csv(csv_path)
esc10_df = df[df['esc10'] == True]

print(f"✅ Found {len(esc10_df)} ESC-10 samples across {esc10_df['category'].nunique()} categories.")

# Copy each file to dataset/train/<label>/...
for _, row in esc10_df.iterrows():
    label = row['category']
    src_file = os.path.join(audio_path, row['filename'])
    target_dir = os.path.join(output_dir, label)
    os.makedirs(target_dir, exist_ok=True)
    shutil.copy(src_file, target_dir)

print("✅ ESC-10 dataset has been organized into 'dataset/train/<label>/' folders.")
