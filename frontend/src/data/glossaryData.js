// glossaryData.js
const glossary = [
    {
      key: "activation",
      display: "Activation Function",
      definition: "An activation function introduces non-linearity into the neural network, helping it learn complex patterns."
    },
    {
      key: "activationmap",
      display: "Activation Map",
      definition: "The output of applying an activation function to a feature map."
    },
    {
      key: "accuracy",
      display: "Accuracy",
      definition: "A metric that measures the proportion of correct predictions made by a model."
    },
    {
      key: "auc",
      display: "AUC",
      definition: "Area Under the Curve; a metric representing the degree or measure of separability achieved by the model."
    },
    {
      key: "augmentation",
      display: "Augmentation",
      definition: "Data augmentation involves modifying existing training data to improve model generalization."
    },
    {
      key: "augmentationtechniques",
      display: "Augmentation Techniques",
      definition: "Methods used to artificially increase the size and diversity of a dataset by creating modified versions of existing data."
    },
    {
      key: "backpropagation",
      display: "Backpropagation",
      definition: "An algorithm for training neural networks that computes gradients and updates weights to minimize loss."
    },
    {
      key: "batchnormalization",
      display: "Batch Normalization",
      definition: "A technique to improve the stability and performance of a neural network by normalizing inputs to each layer."
    },
    {
      key: "batchsize",
      display: "Batch Size",
      definition: "The number of training samples processed before the model's internal parameters are updated."
    },
    {
      key: "classifier",
      display: "Classifier",
      definition: "An algorithm that categorizes data into specific classes or labels."
    },
    {
      key: "cnn",
      display: "CNN",
      definition: "A Convolutional Neural Network is a type of deep learning model specialized for analyzing images."
    },
    {
      key: "confusionmatrix",
      display: "Confusion Matrix",
      definition: "A table used to evaluate the performance of a classification model by comparing predicted and actual labels."
    },
    {
      key: "convolution",
      display: "Convolution",
      definition: "A convolution is a mathematical operation used in CNNs to extract features like edges, patterns, or textures from an image."
    },
    {
      key: "crossentropyloss",
      display: "Cross-Entropy Loss",
      definition: "A loss function commonly used for classification tasks that measures the difference between predicted and actual probability distributions."
    },
    {
      key: "datapipeline",
      display: "Data Pipeline",
      definition: "A series of data processing steps that transform raw data into input features for a model."
    },
    {
      key: "dataset",
      display: "Dataset",
      definition: "A collection of data samples used for training and evaluating machine learning models."
    },
    {
      key: "dropout",
      display: "Dropout",
      definition: "A regularization technique where randomly selected neurons are ignored during training to prevent overfitting."
    },
    {
      key: "earlystopping",
      display: "Early Stopping",
      definition: "A technique to prevent overfitting by stopping training when the model's performance on a validation set starts to degrade."
    },
    {
      key: "esc10",
      display: "ESC-10",
      definition: "A subset of the ESC-50 dataset containing 10 classes of environmental audio recordings."
    },
    {
      key: "f1score",
      display: "F1 Score",
      definition: "The harmonic mean of precision and recall, providing a single metric for model performance."
    },
    {
      key: "featureextraction",
      display: "Feature Extraction",
      definition: "The process of transforming raw data into numerical features that can be processed while preserving the information in the original data."
    },
    {
      key: "featuremap",
      display: "Feature Map",
      definition: "A feature map is the output of a convolutional layer, representing learned features from the input image."
    },
    {
      key: "filter",
      display: "Filter",
      definition: "A set of learnable parameters applied to an input to detect specific features in data."
    },
    {
      key: "finetuning",
      display: "Fine-Tuning",
      definition: "The process of making small adjustments to a pre-trained model to adapt it to a new, related task."
    },
    {
      key: "fullyconnectedlayer",
      display: "Fully Connected Layer",
      definition: "A layer where each input neuron connects to every output neuron."
    },
    {
      key: "gradcam",
      display: "Grad-CAM",
      definition: "Gradient-weighted Class Activation Mapping (Grad-CAM) highlights the areas of an image most influential in a neural network’s prediction."
    },
    {
      key: "hyperparametertuning",
      display: "Hyperparameter Tuning",
      definition: "The process of optimizing the parameters that govern the training process of a model."
    },
    {
      key: "keras",
      display: "Keras",
      definition: "An open-source software library that provides a Python interface for artificial neural networks."
    },
    {
      key: "kernel",
      display: "Kernel",
      definition: "Another term for filter; used in convolution operations to extract features from input data."
    },
    {
      key: "learningrate",
      display: "Learning Rate",
      definition: "A hyperparameter that controls the step size during the optimization process in training a model."
    },
    {
      key: "librosa",
      display: "Librosa",
      definition: "A Python library for analyzing and processing audio signals."
    },
    {
      key: "l2regularization",
      display: "L2 Regularization",
      definition: "A regularization technique that adds a penalty equal to the square of the magnitude of coefficients to the loss function."
    },
    {
      key: "melspectrogram",
      display: "Mel Spectrogram",
      definition: "A type of spectrogram that represents the energy levels of different frequencies on the Mel scale, which aligns with human hearing perception."
    },
    {
      key: "metadata",
      display: "Metadata",
      definition: "Data that provides information about other data, such as descriptions of file contents."
    },
    {
      key: "modelevaluation",
      display: "Model Evaluation",
      definition: "The process of assessing how well a trained model performs on unseen data."
    },
    {
      key: "modelcheckpoint",
      display: "Model Checkpoint",
      definition: "A technique to save the current state of a model during training, allowing for resumption or rollback if needed."
    },
    {
      key: "normalization",
      display: "Normalization",
      definition: "The process of scaling data to a standard range of values, often between 0 and 1."
    },
    {
      key: "noiseinjection",
      display: "Noise Injection",
      definition: "An augmentation technique that adds random noise to an audio signal to make models more robust."
    },
    {
      key: "oned",
      display: "1D",
      definition: "Refers to one-dimensional data, such as raw audio waveforms."
    },
    {
      key: "padding",
      display: "Padding",
      definition: "The addition of extra pixels around the border of an image to control the spatial dimensions of the output feature map."
    },
    {
      key: "pitchshift",
      display: "Pitch Shift",
      definition: "An augmentation technique that changes the pitch of an audio signal without altering its duration."
    },
    {
      key: "pooling",
      display: "Pooling",
      definition: "Pooling reduces the spatial size of the feature maps to make computations faster and prevent overfitting."
    },
    {
      key: "precision",
      display: "Precision",
      definition: "A metric that indicates the proportion of true positive results among all positive predictions."
    },
    {
      key: "preprocessing",
      display: "Preprocessing",
      definition: "The process of cleaning and transforming raw data into a format suitable for analysis."
    },
    {
      key: "recall",
      display: "Recall",
      definition: "A metric that measures the ability of a model to identify all relevant instances in a dataset."
    },
    {
      key: "regularization",
      display: "Regularization",
      definition: "Techniques used to reduce overfitting by adding information or constraints to a model."
    },
    {
      key: "relu",
      display: "ReLU",
      definition: "Rectified Linear Unit; an activation function that outputs zero for negative inputs and the input itself for positive inputs."
    },
    {
      key: "roc",
      display: "ROC",
      definition: "Receiver Operating Characteristic; a graph showing the performance of a classification model at all classification thresholds."
    },
    {
      key: "scikitlearn",
      display: "Scikit-Learn",
      definition: "A Python library for machine learning that provides simple and efficient tools for data mining and analysis."
    },
    {
      key: "softmax",
      display: "Softmax",
      definition: "An activation function that converts logits into probabilities, often used in the output layer of a classifier."
    },
    {
      key: "spectrogram",
      display: "Spectrogram",
      definition: "A visual representation of the spectrum of frequencies of sound as they vary with time."
    },
    {
      key: "spectrogramimage",
      display: "Spectrogram Image",
      definition: "A visual representation of the spectrum of frequencies in a signal as it varies with time, used as input for image-based models."
    },
    {
      key: "stride",
      display: "Stride",
      definition: "The number of pixels by which a filter is moved across an image during convolution."
    },
    {
      key: "tensorflow",
      display: "TensorFlow",
      definition: "An open-source platform for machine learning developed by Google."
    },
    {
      key: "testset",
      display: "Test Set",
      definition: "A subset of the dataset used to assess the performance of a fully trained model."
    },
    {
      key: "timeshift",
      display: "Time Shift",
      definition: "An augmentation technique that shifts an audio signal forward or backward in time."
    },
    {
      key: "timestretch",
      display: "Time Stretch",
      definition: "An augmentation technique that changes the speed of an audio signal without affecting its pitch."
    },
    {
      key: "traintestsplit",
      display: "Train-Test Split",
      definition: "The process of dividing a dataset into separate training and testing subsets to evaluate model performance."
    },
    {
      key: "transferlearning",
      display: "Transfer Learning",
      definition: "A machine learning method where a model developed for a particular task is reused as the starting point for a model on a second task."
    },
    {
      key: "twod",
      display: "2D",
      definition: "Refers to two-dimensional data, like images or spectrograms."
    },
    {
      key: "validationset",
      display: "Validation Set",
      definition: "A subset of the dataset used to provide an unbiased evaluation of a model fit during training."
    },
    {
      key: "wav",
      display: "WAV",
      definition: "A standard digital audio file format used for storing waveform data."
    }
  ];
  
  export default glossary;
  