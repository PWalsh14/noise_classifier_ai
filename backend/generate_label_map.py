import os

# Path to your training folder
train_path = "dataset/train"

# Scan subdirectories of all class_ folders
all_labels = []

for class_dir in os.listdir(train_path):
    class_path = os.path.join(train_path, class_dir)
    if os.path.isdir(class_path):
        for subdir in os.listdir(class_path):
            full_path = os.path.join(class_path, subdir)
            if os.path.isdir(full_path):
                all_labels.append(subdir)

# Remove duplicates and sort alphabetically (optional for consistency)
unique_labels = sorted(set(all_labels))

# Create label map
label_map = {i: label for i, label in enumerate(unique_labels)}
print("Generated label map:", label_map)
