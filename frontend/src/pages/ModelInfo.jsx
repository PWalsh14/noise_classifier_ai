import React from "react";

const ModelInfo = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">🧠 Model Information</h1>

      {/* Architecture */}
      <section className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Model Architecture</h2>
        <p className="text-sm">
          This app uses a custom Convolutional Neural Network (CNN) trained on mel spectrograms derived from the ESC-10 dataset — a collection of 10 environmental sound categories.
        </p>
        <ul className="list-disc list-inside text-sm mt-2 text-gray-600 dark:text-gray-300">
          <li>Input shape: 128×128×3 (RGB spectrogram)</li>
          <li>4 × Conv2D → BatchNorm → MaxPooling layers</li>
          <li>GlobalAveragePooling → Dense(128, ReLU) → Dropout(0.3)</li>
          <li>Final Dense(10) layer with softmax activation</li>
        </ul>
      </section>

      {/* Preprocessing */}
      <section className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Preprocessing</h2>
        <p className="text-sm">
          All audio files were preprocessed in the same way during training and prediction:
        </p>
        <ul className="list-disc list-inside text-sm mt-2 text-gray-600 dark:text-gray-300">
          <li>Converted to mono and resampled to 22,050 Hz</li>
          <li>Transformed into 128×128 mel spectrograms (log-scaled dB)</li>
          <li>Standardised (mean = 0, std = 1) and stacked into RGB format</li>
        </ul>
        <p className="mt-3 text-sm">
          Unlike image datasets, audio inputs vary in time and frequency — preprocessing ensured fixed size and scale to help the model generalize.
        </p>
      </section>

      {/* Training setup */}
      <section className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Training Setup</h2>
        <ul className="text-sm list-disc list-inside text-gray-600 dark:text-gray-300">
          <li>Dataset: <strong>ESC-10</strong> (subset of ESC-50)</li>
          <li>Train/Val split: 80/20 (stratified)</li>
          <li>Batch size: 8</li>
          <li>Optimizer: Adam</li>
          <li>Loss function: Sparse Categorical Crossentropy</li>
          <li>Training technique: Early stopping + class weighting</li>
          <li>Platform: Local machine (CPU/GPU optional)</li>
          <li><strong>Final validation accuracy:</strong> 80.00%</li>
        </ul>
      </section>

      {/* Limitations */}
      <section className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Limitations</h2>
        <p className="text-sm">
          The model performs well on the ESC-10 validation set but may struggle with real-world inputs that differ from training examples. Limitations include:
        </p>
        <ul className="list-disc list-inside text-sm mt-2 text-gray-600 dark:text-gray-300">
          <li>High confidence in incorrect predictions (overconfidence)</li>
          <li>Misclassification of noisy or ambiguous sounds</li>
          <li>Generalisation issues outside ESC-10 categories</li>
        </ul>
        <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
          These limitations are common in small-audio classifiers and highlight challenges in deploying ML outside controlled datasets.
        </p>
      </section>

      {/* Further Improvements */}
      <section className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Further Improvements</h2>
        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
          <li>Train on larger datasets like ESC-50 or UrbanSound8K</li>
          <li>Apply more diverse and subtle data augmentations</li>
          <li>Use deeper architectures like ResNet or EfficientNet</li>
          <li>Add explainability tools (e.g. Grad-CAM on spectrograms)</li>
          <li>Deploy real-time audio capture + feedback in-browser</li>
        </ul>
      </section>
    </div>
  );
};

export default ModelInfo;
