/* QuizForge Question Bank — deep_learning_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Deep Learning",
  "questions": [
    {
      "id": "dl-beg-001",
      "difficulty": "Beginner",
      "question": "What is a neural network loosely inspired by?",
      "options": [
        "Computer circuits",
        "The structure of biological neurons in the brain",
        "Database indexes",
        "Sorting algorithms"
      ],
      "correctAnswer": "The structure of biological neurons in the brain"
    },
    {
      "id": "dl-beg-002",
      "difficulty": "Beginner",
      "question": "What is an activation function used for?",
      "options": [
        "Loading data faster",
        "Introducing non-linearity so the network can learn complex patterns",
        "Reducing dataset size",
        "Naming layers"
      ],
      "correctAnswer": "Introducing non-linearity so the network can learn complex patterns"
    },
    {
      "id": "dl-beg-003",
      "difficulty": "Beginner",
      "question": "What does the term 'epoch' mean in training a neural network?",
      "options": [
        "A single data point",
        "One complete pass through the entire training dataset",
        "The learning rate value",
        "A type of activation function"
      ],
      "correctAnswer": "One complete pass through the entire training dataset"
    },
    {
      "id": "dl-beg-004",
      "difficulty": "Beginner",
      "question": "What is a weight in a neural network?",
      "options": [
        "The size of the dataset",
        "A learnable parameter that scales the input signal between neurons",
        "The number of layers",
        "The activation function type"
      ],
      "correctAnswer": "A learnable parameter that scales the input signal between neurons"
    },
    {
      "id": "dl-beg-005",
      "difficulty": "Beginner",
      "question": "What is the purpose of a loss function?",
      "options": [
        "To visualize the network architecture",
        "To measure how far the model's predictions are from the actual values",
        "To increase training speed",
        "To normalize input data"
      ],
      "correctAnswer": "To measure how far the model's predictions are from the actual values"
    },
    {
      "id": "dl-beg-006",
      "difficulty": "Beginner",
      "question": "What is the most common activation function used in hidden layers of modern networks?",
      "options": [
        "Sigmoid",
        "ReLU (Rectified Linear Unit)",
        "Softmax",
        "Linear"
      ],
      "correctAnswer": "ReLU (Rectified Linear Unit)"
    },
    {
      "id": "dl-beg-007",
      "difficulty": "Beginner",
      "question": "What does CNN stand for in deep learning?",
      "options": [
        "Central Node Network",
        "Convolutional Neural Network",
        "Combined Neuron Node",
        "Cyclic Node Network"
      ],
      "correctAnswer": "Convolutional Neural Network"
    },
    {
      "id": "dl-beg-008",
      "difficulty": "Beginner",
      "question": "What type of data are CNNs typically best suited for?",
      "options": [
        "Tabular spreadsheet data only",
        "Image and grid-like spatial data",
        "Plain text sequences",
        "Time-series financial data only"
      ],
      "correctAnswer": "Image and grid-like spatial data"
    },
    {
      "id": "dl-beg-009",
      "difficulty": "Beginner",
      "question": "What does 'batch size' refer to in training?",
      "options": [
        "The total number of layers",
        "The number of training samples processed before updating model weights",
        "The number of epochs",
        "The size of the output layer"
      ],
      "correctAnswer": "The number of training samples processed before updating model weights"
    },
    {
      "id": "dl-int-001",
      "difficulty": "Intermediate",
      "question": "What problem does backpropagation solve?",
      "options": [
        "Data augmentation",
        "Efficiently computing gradients of the loss with respect to each weight in the network",
        "Splitting data into batches",
        "Choosing the activation function"
      ],
      "correctAnswer": "Efficiently computing gradients of the loss with respect to each weight in the network"
    },
    {
      "id": "dl-int-002",
      "difficulty": "Intermediate",
      "question": "What is the vanishing gradient problem?",
      "options": [
        "Gradients becoming too large and causing instability",
        "Gradients becoming very small in early layers during backpropagation, slowing or halting learning",
        "The loss function disappearing entirely",
        "A dataset losing labels during training"
      ],
      "correctAnswer": "Gradients becoming very small in early layers during backpropagation, slowing or halting learning"
    },
    {
      "id": "dl-int-003",
      "difficulty": "Intermediate",
      "question": "What is dropout used for in neural networks?",
      "options": [
        "Speeding up inference only",
        "A regularization technique that randomly disables neurons during training to prevent overfitting",
        "Increasing the number of layers",
        "Removing bad training data"
      ],
      "correctAnswer": "A regularization technique that randomly disables neurons during training to prevent overfitting"
    },
    {
      "id": "dl-int-004",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a pooling layer in a CNN?",
      "options": [
        "Increasing image resolution",
        "Reducing spatial dimensions while retaining important features",
        "Adding color channels",
        "Normalizing pixel values only"
      ],
      "correctAnswer": "Reducing spatial dimensions while retaining important features"
    },
    {
      "id": "dl-int-005",
      "difficulty": "Intermediate",
      "question": "What is an RNN (Recurrent Neural Network) particularly well suited for?",
      "options": [
        "Static image classification",
        "Sequential data like text or time series, due to its memory of previous inputs",
        "3D object detection only",
        "Tabular data with no order"
      ],
      "correctAnswer": "Sequential data like text or time series, due to its memory of previous inputs"
    },
    {
      "id": "dl-int-006",
      "difficulty": "Intermediate",
      "question": "What does the learning rate control during training?",
      "options": [
        "The number of layers in the network",
        "The step size taken when updating weights during gradient descent",
        "The batch size",
        "The number of output classes"
      ],
      "correctAnswer": "The step size taken when updating weights during gradient descent"
    },
    {
      "id": "dl-int-007",
      "difficulty": "Intermediate",
      "question": "What is transfer learning?",
      "options": [
        "Moving a model to a different programming language",
        "Reusing a pre-trained model on a new, related task instead of training from scratch",
        "Transferring data between databases",
        "A type of activation function"
      ],
      "correctAnswer": "Reusing a pre-trained model on a new, related task instead of training from scratch"
    },
    {
      "id": "dl-adv-001",
      "difficulty": "Advanced",
      "question": "What key innovation do Transformer architectures introduce over RNNs?",
      "options": [
        "Convolutional filters",
        "Self-attention mechanisms that process sequences in parallel rather than sequentially",
        "Pooling layers",
        "Dropout regularization"
      ],
      "correctAnswer": "Self-attention mechanisms that process sequences in parallel rather than sequentially"
    },
    {
      "id": "dl-adv-002",
      "difficulty": "Advanced",
      "question": "What is the purpose of batch normalization?",
      "options": [
        "Reducing dataset size",
        "Normalizing layer inputs to stabilize and accelerate training",
        "Increasing the number of parameters",
        "Replacing the loss function"
      ],
      "correctAnswer": "Normalizing layer inputs to stabilize and accelerate training"
    },
    {
      "id": "dl-adv-003",
      "difficulty": "Advanced",
      "question": "What do Generative Adversarial Networks (GANs) consist of?",
      "options": [
        "A single classifier network",
        "A generator and a discriminator network trained in opposition to each other",
        "Only convolutional layers",
        "A reinforcement learning agent"
      ],
      "correctAnswer": "A generator and a discriminator network trained in opposition to each other"
    },
    {
      "id": "dl-adv-004",
      "difficulty": "Advanced",
      "question": "What is the role of the attention mechanism's 'query, key, value' vectors?",
      "options": [
        "They define the loss function",
        "They determine how much focus to place on different parts of the input when producing an output",
        "They set the learning rate",
        "They define the batch size"
      ],
      "correctAnswer": "They determine how much focus to place on different parts of the input when producing an output"
    },
    {
      "id": "dl-adv-005",
      "difficulty": "Advanced",
      "question": "What is the purpose of gradient clipping?",
      "options": [
        "Speeding up data loading",
        "Preventing exploding gradients by capping their maximum value during training",
        "Reducing the number of epochs",
        "Choosing the best activation function"
      ],
      "correctAnswer": "Preventing exploding gradients by capping their maximum value during training"
    },
    {
      "id": "dl-beg-010",
      "difficulty": "Beginner",
      "question": "What is a perceptron?",
      "options": [
        "A type of database",
        "The simplest form of a neural network unit, computing a weighted sum and applying a threshold",
        "A data visualization tool",
        "A loss function"
      ],
      "correctAnswer": "The simplest form of a neural network unit, computing a weighted sum and applying a threshold"
    },
    {
      "id": "dl-beg-011",
      "difficulty": "Beginner",
      "question": "What does the sigmoid activation function output?",
      "options": [
        "A value between 0 and 1",
        "A value between -infinity and infinity",
        "Only integers",
        "Only negative values"
      ],
      "correctAnswer": "A value between 0 and 1"
    },
    {
      "id": "dl-beg-012",
      "difficulty": "Beginner",
      "question": "What is a hidden layer in a neural network?",
      "options": [
        "The input layer",
        "A layer between input and output that transforms data using weights and activations",
        "The final prediction layer",
        "A layer that is skipped during training"
      ],
      "correctAnswer": "A layer between input and output that transforms data using weights and activations"
    },
    {
      "id": "dl-beg-013",
      "difficulty": "Beginner",
      "question": "What does 'feedforward' mean in a neural network?",
      "options": [
        "Data flows in loops indefinitely",
        "Data flows in one direction from input to output without cycles",
        "Only the output layer processes data",
        "Weights are updated instantly with each input"
      ],
      "correctAnswer": "Data flows in one direction from input to output without cycles"
    },
    {
      "id": "dl-beg-014",
      "difficulty": "Beginner",
      "question": "What is the softmax function commonly used for?",
      "options": [
        "Binary classification only",
        "Converting raw output scores into a probability distribution over multiple classes",
        "Reducing image size",
        "Normalizing input pixels only"
      ],
      "correctAnswer": "Converting raw output scores into a probability distribution over multiple classes"
    },
    {
      "id": "dl-beg-015",
      "difficulty": "Beginner",
      "question": "What does 'deep' in deep learning refer to?",
      "options": [
        "Large datasets only",
        "Neural networks with many hidden layers",
        "Complex mathematical proofs",
        "Deep storage requirements"
      ],
      "correctAnswer": "Neural networks with many hidden layers"
    },
    {
      "id": "dl-beg-016",
      "difficulty": "Beginner",
      "question": "What is the purpose of an optimizer like Adam or SGD?",
      "options": [
        "Visualizing the network architecture",
        "Updating model weights to minimize the loss function during training",
        "Loading the dataset",
        "Normalizing input images"
      ],
      "correctAnswer": "Updating model weights to minimize the loss function during training"
    },
    {
      "id": "dl-beg-017",
      "difficulty": "Beginner",
      "question": "What does a filter/kernel do in a convolutional layer?",
      "options": [
        "Deletes noisy pixels",
        "Slides over the input to detect specific features like edges or textures",
        "Resizes the entire image",
        "Compresses the file size"
      ],
      "correctAnswer": "Slides over the input to detect specific features like edges or textures"
    },
    {
      "id": "dl-beg-018",
      "difficulty": "Beginner",
      "question": "What is the purpose of an embedding layer, commonly used with text?",
      "options": [
        "Compressing images",
        "Mapping discrete tokens (like words) into continuous dense vector representations",
        "Removing punctuation",
        "Splitting sentences into paragraphs"
      ],
      "correctAnswer": "Mapping discrete tokens (like words) into continuous dense vector representations"
    },
    {
      "id": "dl-int-008",
      "difficulty": "Intermediate",
      "question": "What is the exploding gradient problem?",
      "options": [
        "Gradients become extremely small during backpropagation",
        "Gradients grow excessively large during backpropagation, causing unstable training",
        "The loss function becomes negative",
        "The dataset grows too large to process"
      ],
      "correctAnswer": "Gradients grow excessively large during backpropagation, causing unstable training"
    },
    {
      "id": "dl-int-009",
      "difficulty": "Intermediate",
      "question": "What does LSTM stand for and what problem does it address?",
      "options": [
        "Long Short-Term Memory; addresses vanishing gradients in standard RNNs for long sequences",
        "Linear Sequential Training Model; speeds up CNN training",
        "Layered Sparse Tensor Method; reduces model size",
        "Large Scale Training Machine; distributes training across GPUs"
      ],
      "correctAnswer": "Long Short-Term Memory; addresses vanishing gradients in standard RNNs for long sequences"
    },
    {
      "id": "dl-int-010",
      "difficulty": "Intermediate",
      "question": "What is data augmentation used for in training image models?",
      "options": [
        "Reducing the dataset size",
        "Artificially expanding the training set by applying transformations like rotation or flipping",
        "Compressing the model",
        "Removing mislabeled data automatically"
      ],
      "correctAnswer": "Artificially expanding the training set by applying transformations like rotation or flipping"
    },
    {
      "id": "dl-int-011",
      "difficulty": "Intermediate",
      "question": "What is the purpose of early stopping during training?",
      "options": [
        "Speeding up data loading",
        "Halting training when validation performance stops improving, to prevent overfitting",
        "Reducing the batch size",
        "Increasing the learning rate automatically"
      ],
      "correctAnswer": "Halting training when validation performance stops improving, to prevent overfitting"
    },
    {
      "id": "dl-int-012",
      "difficulty": "Intermediate",
      "question": "What does a fully connected (dense) layer do?",
      "options": [
        "Connects every input neuron to every output neuron with learnable weights",
        "Only connects adjacent neurons",
        "Randomly disables neurons",
        "Reduces spatial dimensions only"
      ],
      "correctAnswer": "Connects every input neuron to every output neuron with learnable weights"
    },
    {
      "id": "dl-int-013",
      "difficulty": "Intermediate",
      "question": "What is weight initialization important for in deep networks?",
      "options": [
        "It has no real effect on training",
        "Poor initialization can cause vanishing or exploding gradients from the start of training",
        "It only affects inference speed",
        "It determines the dataset size needed"
      ],
      "correctAnswer": "Poor initialization can cause vanishing or exploding gradients from the start of training"
    },
    {
      "id": "dl-int-014",
      "difficulty": "Intermediate",
      "question": "What does the term 'inference' mean in the context of a trained deep learning model?",
      "options": [
        "The training process itself",
        "Using a trained model to make predictions on new data",
        "Cleaning the dataset",
        "Calculating the loss during training"
      ],
      "correctAnswer": "Using a trained model to make predictions on new data"
    },
    {
      "id": "dl-adv-006",
      "difficulty": "Advanced",
      "question": "What is the purpose of positional encoding in Transformer models?",
      "options": [
        "Compressing the model size",
        "Injecting information about token order/position since self-attention has no inherent sense of sequence",
        "Normalizing pixel values",
        "Reducing vocabulary size"
      ],
      "correctAnswer": "Injecting information about token order/position since self-attention has no inherent sense of sequence"
    },
    {
      "id": "dl-adv-007",
      "difficulty": "Advanced",
      "question": "What does knowledge distillation aim to achieve?",
      "options": [
        "Training a large model from a small one",
        "Training a smaller 'student' model to mimic a larger 'teacher' model's behavior",
        "Removing all data labels",
        "Compressing image files"
      ],
      "correctAnswer": "Training a smaller 'student' model to mimic a larger 'teacher' model's behavior"
    },
    {
      "id": "dl-adv-008",
      "difficulty": "Advanced",
      "question": "What is the purpose of layer normalization compared to batch normalization?",
      "options": [
        "They are identical in function",
        "Layer normalization normalizes across features for a single sample, independent of batch size, useful in sequence models",
        "Batch normalization only works with images",
        "Layer normalization removes the need for activation functions"
      ],
      "correctAnswer": "Layer normalization normalizes across features for a single sample, independent of batch size, useful in sequence models"
    },
    {
      "id": "dl-adv-009",
      "difficulty": "Advanced",
      "question": "What problem does residual (skip) connections in ResNet architectures solve?",
      "options": [
        "Overfitting on small datasets only",
        "Degradation and vanishing gradient issues in very deep networks by allowing gradients to flow through shortcut paths",
        "Slow inference speed",
        "Excessive memory usage during inference"
      ],
      "correctAnswer": "Degradation and vanishing gradient issues in very deep networks by allowing gradients to flow through shortcut paths"
    },
    {
      "id": "dl-beg-019",
      "difficulty": "Beginner",
      "question": "What does the output layer of a neural network typically represent?",
      "options": [
        "The raw input data",
        "The final prediction(s) produced by the network",
        "A hidden transformation step",
        "The loss function value"
      ],
      "correctAnswer": "The final prediction(s) produced by the network"
    },
    {
      "id": "dl-beg-020",
      "difficulty": "Beginner",
      "question": "What is the tanh activation function's output range?",
      "options": [
        "0 to 1",
        "-1 to 1",
        "-infinity to infinity",
        "Only 0 or 1"
      ],
      "correctAnswer": "-1 to 1"
    },
    {
      "id": "dl-beg-021",
      "difficulty": "Beginner",
      "question": "What does 'forward pass' refer to in neural network training?",
      "options": [
        "Updating the weights",
        "Computing the output of the network given an input, moving from input to output layer",
        "Calculating gradients",
        "Shuffling the dataset"
      ],
      "correctAnswer": "Computing the output of the network given an input, moving from input to output layer"
    },
    {
      "id": "dl-beg-022",
      "difficulty": "Beginner",
      "question": "What is a common framework used for building deep learning models?",
      "options": [
        "Excel",
        "TensorFlow or PyTorch",
        "Photoshop",
        "MySQL"
      ],
      "correctAnswer": "TensorFlow or PyTorch"
    },
    {
      "id": "dl-beg-023",
      "difficulty": "Beginner",
      "question": "What does 'model checkpointing' during training allow you to do?",
      "options": [
        "Delete the model permanently",
        "Save the model's state at intervals so training can be resumed or the best version restored",
        "Speed up the forward pass",
        "Reduce the dataset size"
      ],
      "correctAnswer": "Save the model's state at intervals so training can be resumed or the best version restored"
    },
    {
      "id": "dl-beg-024",
      "difficulty": "Beginner",
      "question": "What does GPU acceleration primarily help with in deep learning?",
      "options": [
        "Writing code faster",
        "Performing the large number of parallel matrix computations required for training much faster than a CPU",
        "Storing more data",
        "Improving model accuracy directly"
      ],
      "correctAnswer": "Performing the large number of parallel matrix computations required for training much faster than a CPU"
    },
    {
      "id": "dl-beg-025",
      "difficulty": "Beginner",
      "question": "What is a common loss function used for multi-class classification?",
      "options": [
        "Mean Squared Error only",
        "Categorical cross-entropy",
        "Hinge loss exclusively",
        "Manhattan distance"
      ],
      "correctAnswer": "Categorical cross-entropy"
    },
    {
      "id": "dl-int-015",
      "difficulty": "Intermediate",
      "question": "What does 'fine-tuning' a pre-trained model involve?",
      "options": [
        "Training a completely new model from scratch",
        "Continuing to train a pre-trained model on a new, typically smaller and related dataset",
        "Deleting the model's later layers only",
        "Only changing the learning rate without any training"
      ],
      "correctAnswer": "Continuing to train a pre-trained model on a new, typically smaller and related dataset"
    },
    {
      "id": "dl-int-016",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a validation loss curve alongside training loss?",
      "options": [
        "It has no real purpose",
        "Comparing them helps detect overfitting when training loss keeps dropping but validation loss rises",
        "It only shows dataset size",
        "It replaces the need for a test set"
      ],
      "correctAnswer": "Comparing them helps detect overfitting when training loss keeps dropping but validation loss rises"
    },
    {
      "id": "dl-int-017",
      "difficulty": "Intermediate",
      "question": "What does 'stride' control in a convolutional layer?",
      "options": [
        "The number of filters used",
        "How many pixels the filter moves at each step across the input",
        "The activation function applied",
        "The size of the output classes"
      ],
      "correctAnswer": "How many pixels the filter moves at each step across the input"
    },
    {
      "id": "dl-int-018",
      "difficulty": "Intermediate",
      "question": "What is padding used for in CNNs?",
      "options": [
        "Increasing training speed only",
        "Preserving spatial dimensions of the input by adding border pixels before convolution",
        "Removing noise from images",
        "Normalizing pixel intensity"
      ],
      "correctAnswer": "Preserving spatial dimensions of the input by adding border pixels before convolution"
    },
    {
      "id": "dl-int-019",
      "difficulty": "Intermediate",
      "question": "What does a bidirectional RNN process that a standard RNN does not?",
      "options": [
        "Only numeric data",
        "The input sequence in both forward and backward directions to capture context from both sides",
        "Only fixed-length sequences",
        "Only image data"
      ],
      "correctAnswer": "The input sequence in both forward and backward directions to capture context from both sides"
    },
    {
      "id": "dl-int-020",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the Adam optimizer compared to plain SGD?",
      "options": [
        "It removes the need for a learning rate",
        "It adapts the learning rate for each parameter using estimates of first and second moments of gradients",
        "It only works for image data",
        "It guarantees finding the global minimum"
      ],
      "correctAnswer": "It adapts the learning rate for each parameter using estimates of first and second moments of gradients"
    },
    {
      "id": "dl-adv-010",
      "difficulty": "Advanced",
      "question": "What is the purpose of multi-head attention in Transformers?",
      "options": [
        "Running multiple models in parallel for redundancy",
        "Allowing the model to jointly attend to information from different representation subspaces at once",
        "Reducing the vocabulary size",
        "Compressing the model for deployment"
      ],
      "correctAnswer": "Allowing the model to jointly attend to information from different representation subspaces at once"
    },
    {
      "id": "dl-adv-011",
      "difficulty": "Advanced",
      "question": "What does the term 'mode collapse' refer to in GANs?",
      "options": [
        "The discriminator failing to train at all",
        "The generator producing a limited variety of outputs, failing to capture the full diversity of the data distribution",
        "A hardware failure during training",
        "The loss function becoming undefined"
      ],
      "correctAnswer": "The generator producing a limited variety of outputs, failing to capture the full diversity of the data distribution"
    },
    {
      "id": "dl-adv-012",
      "difficulty": "Advanced",
      "question": "What is the purpose of dilated (atrous) convolutions?",
      "options": [
        "Reducing the number of parameters to zero",
        "Expanding the receptive field of a filter without increasing the number of parameters or losing resolution",
        "Only working on 1D signals",
        "Replacing pooling layers entirely by design requirement"
      ],
      "correctAnswer": "Expanding the receptive field of a filter without increasing the number of parameters or losing resolution"
    },
    {
      "id": "dl-adv-013",
      "difficulty": "Advanced",
      "question": "What does model quantization aim to achieve for deployment?",
      "options": [
        "Increasing model accuracy",
        "Reducing model size and inference cost by using lower-precision numerical representations",
        "Adding more layers to the model",
        "Retraining the model from scratch"
      ],
      "correctAnswer": "Reducing model size and inference cost by using lower-precision numerical representations"
    },
    {
      "id": "dl-adv-014",
      "difficulty": "Advanced",
      "question": "What is the vanishing gradient problem's relationship to activation function choice?",
      "options": [
        "Activation functions have no effect on gradients",
        "Saturating functions like sigmoid/tanh can produce very small gradients in deep networks, motivating alternatives like ReLU",
        "Only the loss function matters, not activations",
        "It only occurs with the softmax function"
      ],
      "correctAnswer": "Saturating functions like sigmoid/tanh can produce very small gradients in deep networks, motivating alternatives like ReLU"
    },
    {
      "id": "dl-adv-015",
      "difficulty": "Advanced",
      "question": "What is the purpose of the CLIP-style contrastive pretraining approach?",
      "options": [
        "Training only on labeled image data",
        "Learning joint representations of paired data (e.g. images and text) by contrasting matching and non-matching pairs",
        "Compressing datasets for storage",
        "Replacing convolutional layers with recurrent ones"
      ],
      "correctAnswer": "Learning joint representations of paired data (e.g. images and text) by contrasting matching and non-matching pairs"
    }
  ]
};
export const QUIZFORGE_DEEP_LEARNING_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
