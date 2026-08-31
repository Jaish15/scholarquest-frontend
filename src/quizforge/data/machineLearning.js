/* QuizForge Question Bank — machine_learning_questions.json (60 Questions: 25 Beginner / 20 Intermediate / 15 Advanced) */
import { normalizeDomainQuestions } from "../quizLoader.js";

export const RAW_DATA = {
  "domain": "Machine Learning",
  "questions": [
    {
      "id": "ml-beg-001",
      "difficulty": "Beginner",
      "question": "What is K-Means?",
      "options": [
        "A supervised classification algorithm",
        "An unsupervised clustering algorithm",
        "A deep neural network architecture",
        "A regression technique"
      ],
      "correctAnswer": "An unsupervised clustering algorithm"
    },
    {
      "id": "ml-beg-002",
      "difficulty": "Beginner",
      "question": "What is the main difference between supervised and unsupervised learning?",
      "options": [
        "No difference",
        "Supervised learning uses labeled data; unsupervised learning uses unlabeled data",
        "Unsupervised learning is always more accurate",
        "Supervised learning doesn't require any data"
      ],
      "correctAnswer": "Supervised learning uses labeled data; unsupervised learning uses unlabeled data"
    },
    {
      "id": "ml-beg-003",
      "difficulty": "Beginner",
      "question": "What type of problem is linear regression used for?",
      "options": [
        "Classification",
        "Predicting a continuous numeric value",
        "Clustering",
        "Dimensionality reduction"
      ],
      "correctAnswer": "Predicting a continuous numeric value"
    },
    {
      "id": "ml-beg-004",
      "difficulty": "Beginner",
      "question": "What does 'overfitting' mean in machine learning?",
      "options": [
        "The model performs poorly on both training and test data",
        "The model learns training data too well, including noise, and performs poorly on new data",
        "The model is too simple",
        "The model trains too quickly"
      ],
      "correctAnswer": "The model learns training data too well, including noise, and performs poorly on new data"
    },
    {
      "id": "ml-beg-005",
      "difficulty": "Beginner",
      "question": "What is a decision tree?",
      "options": [
        "A clustering algorithm",
        "A model that makes decisions by splitting data based on feature values in a tree structure",
        "A type of neural network",
        "A data visualization tool only"
      ],
      "correctAnswer": "A model that makes decisions by splitting data based on feature values in a tree structure"
    },
    {
      "id": "ml-beg-006",
      "difficulty": "Beginner",
      "question": "What is the purpose of splitting data into training and test sets?",
      "options": [
        "To make the dataset smaller",
        "To evaluate how well a model generalizes to unseen data",
        "To speed up training only",
        "To remove duplicate data"
      ],
      "correctAnswer": "To evaluate how well a model generalizes to unseen data"
    },
    {
      "id": "ml-beg-007",
      "difficulty": "Beginner",
      "question": "What does 'feature' mean in a machine learning dataset?",
      "options": [
        "The output/target variable",
        "An individual measurable input variable used for prediction",
        "A type of algorithm",
        "The final accuracy score"
      ],
      "correctAnswer": "An individual measurable input variable used for prediction"
    },
    {
      "id": "ml-beg-008",
      "difficulty": "Beginner",
      "question": "What is logistic regression primarily used for?",
      "options": [
        "Predicting continuous values",
        "Binary or multi-class classification problems",
        "Clustering unlabeled data",
        "Image compression"
      ],
      "correctAnswer": "Binary or multi-class classification problems"
    },
    {
      "id": "ml-beg-009",
      "difficulty": "Beginner",
      "question": "What does accuracy measure in a classification model?",
      "options": [
        "Training time",
        "The proportion of correct predictions out of total predictions",
        "The number of features used",
        "Memory usage"
      ],
      "correctAnswer": "The proportion of correct predictions out of total predictions"
    },
    {
      "id": "ml-beg-010",
      "difficulty": "Beginner",
      "question": "What is the k-Nearest Neighbors (k-NN) algorithm based on?",
      "options": [
        "Gradient descent optimization",
        "Classifying a point based on the majority class of its closest neighbors",
        "Random probability sampling",
        "Neural network layers"
      ],
      "correctAnswer": "Classifying a point based on the majority class of its closest neighbors"
    },
    {
      "id": "ml-int-001",
      "difficulty": "Intermediate",
      "question": "What is the bias-variance tradeoff?",
      "options": [
        "A tradeoff between training speed and accuracy",
        "Balancing a model's tendency to underfit (bias) versus overfit (variance)",
        "A tradeoff between hardware cost and data size",
        "A concept only relevant to deep learning"
      ],
      "correctAnswer": "Balancing a model's tendency to underfit (bias) versus overfit (variance)"
    },
    {
      "id": "ml-int-002",
      "difficulty": "Intermediate",
      "question": "What does cross-validation help evaluate?",
      "options": [
        "Only training speed",
        "How well a model generalizes by testing on multiple data splits",
        "The size of the dataset",
        "The programming language used"
      ],
      "correctAnswer": "How well a model generalizes by testing on multiple data splits"
    },
    {
      "id": "ml-int-003",
      "difficulty": "Intermediate",
      "question": "What is regularization used for in machine learning?",
      "options": [
        "Speeding up data loading",
        "Preventing overfitting by penalizing model complexity",
        "Visualizing data",
        "Increasing dataset size"
      ],
      "correctAnswer": "Preventing overfitting by penalizing model complexity"
    },
    {
      "id": "ml-int-004",
      "difficulty": "Intermediate",
      "question": "What is the difference between L1 and L2 regularization?",
      "options": [
        "No difference",
        "L1 can shrink coefficients to exactly zero (feature selection); L2 shrinks them smoothly toward zero",
        "L2 is always better than L1",
        "L1 only works with neural networks"
      ],
      "correctAnswer": "L1 can shrink coefficients to exactly zero (feature selection); L2 shrinks them smoothly toward zero"
    },
    {
      "id": "ml-int-005",
      "difficulty": "Intermediate",
      "question": "What does a confusion matrix show?",
      "options": [
        "Training loss over time",
        "The breakdown of true/false positives and negatives for a classifier",
        "The number of features used",
        "The learning rate schedule"
      ],
      "correctAnswer": "The breakdown of true/false positives and negatives for a classifier"
    },
    {
      "id": "ml-int-006",
      "difficulty": "Intermediate",
      "question": "What is ensemble learning?",
      "options": [
        "Using a single very large model",
        "Combining multiple models to produce better predictive performance than any single model",
        "A data preprocessing technique",
        "A visualization method"
      ],
      "correctAnswer": "Combining multiple models to produce better predictive performance than any single model"
    },
    {
      "id": "ml-int-007",
      "difficulty": "Intermediate",
      "question": "What does Random Forest primarily use as its base learners?",
      "options": [
        "Neural networks",
        "Multiple decision trees",
        "Support vector machines",
        "Linear regressions"
      ],
      "correctAnswer": "Multiple decision trees"
    },
    {
      "id": "ml-int-008",
      "difficulty": "Intermediate",
      "question": "What is the purpose of feature scaling (e.g. normalization)?",
      "options": [
        "To reduce dataset size",
        "To bring features to a comparable range so no single feature dominates due to scale",
        "To remove all outliers automatically",
        "To convert categorical data to text"
      ],
      "correctAnswer": "To bring features to a comparable range so no single feature dominates due to scale"
    },
    {
      "id": "ml-adv-001",
      "difficulty": "Advanced",
      "question": "What problem does gradient boosting primarily address?",
      "options": [
        "It clusters data using distance metrics",
        "It sequentially builds models where each new model corrects errors of the previous ones",
        "It reduces dimensionality of data",
        "It only works with image data"
      ],
      "correctAnswer": "It sequentially builds models where each new model corrects errors of the previous ones"
    },
    {
      "id": "ml-adv-002",
      "difficulty": "Advanced",
      "question": "What is the kernel trick used for in Support Vector Machines?",
      "options": [
        "Speeding up data loading",
        "Mapping data into higher-dimensional space to make it linearly separable without explicit transformation",
        "Reducing the number of training examples needed",
        "Visualizing decision boundaries only"
      ],
      "correctAnswer": "Mapping data into higher-dimensional space to make it linearly separable without explicit transformation"
    },
    {
      "id": "ml-adv-003",
      "difficulty": "Advanced",
      "question": "What does Principal Component Analysis (PCA) primarily achieve?",
      "options": [
        "Classification of labeled data",
        "Dimensionality reduction while preserving as much variance as possible",
        "Clustering time-series data",
        "Generating synthetic images"
      ],
      "correctAnswer": "Dimensionality reduction while preserving as much variance as possible"
    },
    {
      "id": "ml-adv-004",
      "difficulty": "Advanced",
      "question": "What is the exploration-exploitation tradeoff most associated with?",
      "options": [
        "Supervised regression",
        "Reinforcement learning",
        "Unsupervised clustering",
        "Data cleaning"
      ],
      "correctAnswer": "Reinforcement learning"
    },
    {
      "id": "ml-adv-005",
      "difficulty": "Advanced",
      "question": "What is the primary purpose of hyperparameter tuning (e.g. grid search)?",
      "options": [
        "Changing the training data",
        "Finding the optimal configuration values that are not learned directly from training data",
        "Removing features automatically",
        "Increasing model interpretability"
      ],
      "correctAnswer": "Finding the optimal configuration values that are not learned directly from training data"
    },
    {
      "id": "ml-beg-011",
      "difficulty": "Beginner",
      "question": "What is a dataset's 'label' in supervised learning?",
      "options": [
        "An input feature",
        "The known correct output the model is trying to predict",
        "The algorithm's name",
        "A visualization tool"
      ],
      "correctAnswer": "The known correct output the model is trying to predict"
    },
    {
      "id": "ml-beg-012",
      "difficulty": "Beginner",
      "question": "What does 'training' a model mean?",
      "options": [
        "Deploying it to production",
        "Adjusting model parameters using data so it learns to make predictions",
        "Visualizing the data",
        "Deleting bad data points"
      ],
      "correctAnswer": "Adjusting model parameters using data so it learns to make predictions"
    },
    {
      "id": "ml-beg-013",
      "difficulty": "Beginner",
      "question": "What is Naive Bayes based on?",
      "options": [
        "Neural network layers",
        "Bayes' theorem with an assumption of feature independence",
        "Decision tree splits",
        "Gradient descent optimization"
      ],
      "correctAnswer": "Bayes' theorem with an assumption of feature independence"
    },
    {
      "id": "ml-beg-014",
      "difficulty": "Beginner",
      "question": "What does 'underfitting' mean?",
      "options": [
        "The model performs very well on training data only",
        "The model is too simple to capture the underlying pattern in the data",
        "The model has too many features",
        "The model trains too slowly"
      ],
      "correctAnswer": "The model is too simple to capture the underlying pattern in the data"
    },
    {
      "id": "ml-beg-015",
      "difficulty": "Beginner",
      "question": "What is a common use case for clustering algorithms?",
      "options": [
        "Predicting a continuous price value",
        "Grouping similar customers together without predefined labels",
        "Classifying labeled emails as spam",
        "Translating text between languages"
      ],
      "correctAnswer": "Grouping similar customers together without predefined labels"
    },
    {
      "id": "ml-beg-016",
      "difficulty": "Beginner",
      "question": "What does 'label encoding' do to categorical data?",
      "options": [
        "Deletes categorical columns",
        "Converts categories into numeric values so algorithms can process them",
        "Visualizes categories as a chart",
        "Removes duplicate categories only"
      ],
      "correctAnswer": "Converts categories into numeric values so algorithms can process them"
    },
    {
      "id": "ml-beg-017",
      "difficulty": "Beginner",
      "question": "What is the purpose of a validation set?",
      "options": [
        "Final testing before deployment only",
        "Tuning model hyperparameters and checking performance during development, separate from the test set",
        "Storing raw unprocessed data",
        "Replacing the training set entirely"
      ],
      "correctAnswer": "Tuning model hyperparameters and checking performance during development, separate from the test set"
    },
    {
      "id": "ml-beg-018",
      "difficulty": "Beginner",
      "question": "What does 'precision' measure in a classification model?",
      "options": [
        "Overall accuracy",
        "The proportion of positive predictions that were actually correct",
        "The speed of predictions",
        "The number of features used"
      ],
      "correctAnswer": "The proportion of positive predictions that were actually correct"
    },
    {
      "id": "ml-beg-019",
      "difficulty": "Beginner",
      "question": "What does 'recall' measure in a classification model?",
      "options": [
        "The proportion of actual positives that were correctly identified",
        "The number of false positives only",
        "Training time",
        "Model complexity"
      ],
      "correctAnswer": "The proportion of actual positives that were correctly identified"
    },
    {
      "id": "ml-beg-020",
      "difficulty": "Beginner",
      "question": "What is one-hot encoding used for?",
      "options": [
        "Compressing images",
        "Representing categorical variables as binary vectors",
        "Speeding up neural network training only",
        "Removing outliers"
      ],
      "correctAnswer": "Representing categorical variables as binary vectors"
    },
    {
      "id": "ml-beg-021",
      "difficulty": "Beginner",
      "question": "What is the main purpose of a scatter plot in exploratory data analysis?",
      "options": [
        "Storing data permanently",
        "Visualizing the relationship between two numeric variables",
        "Encrypting data",
        "Training a model directly"
      ],
      "correctAnswer": "Visualizing the relationship between two numeric variables"
    },
    {
      "id": "ml-beg-022",
      "difficulty": "Beginner",
      "question": "What does 'missing data imputation' refer to?",
      "options": [
        "Deleting the entire dataset",
        "Filling in missing values using statistical or model-based methods",
        "Encrypting sensitive fields",
        "Renaming columns"
      ],
      "correctAnswer": "Filling in missing values using statistical or model-based methods"
    },
    {
      "id": "ml-beg-023",
      "difficulty": "Beginner",
      "question": "What is the goal of a recommendation system?",
      "options": [
        "Classifying images only",
        "Suggesting relevant items to users based on preferences or behavior",
        "Detecting anomalies in network traffic",
        "Compressing large files"
      ],
      "correctAnswer": "Suggesting relevant items to users based on preferences or behavior"
    },
    {
      "id": "ml-beg-024",
      "difficulty": "Beginner",
      "question": "What is a 'hyperparameter' in machine learning?",
      "options": [
        "A parameter learned automatically during training",
        "A configuration value set before training that controls the learning process",
        "The final prediction of a model",
        "A type of loss function"
      ],
      "correctAnswer": "A configuration value set before training that controls the learning process"
    },
    {
      "id": "ml-beg-025",
      "difficulty": "Beginner",
      "question": "What does time-series forecasting aim to predict?",
      "options": [
        "Categories with no order",
        "Future values based on previously observed values over time",
        "Static image labels",
        "Unrelated random data"
      ],
      "correctAnswer": "Future values based on previously observed values over time"
    },
    {
      "id": "ml-int-009",
      "difficulty": "Intermediate",
      "question": "What does the F1-score combine?",
      "options": [
        "Accuracy and training time",
        "Precision and recall into a single harmonic mean metric",
        "Bias and variance directly",
        "Learning rate and batch size"
      ],
      "correctAnswer": "Precision and recall into a single harmonic mean metric"
    },
    {
      "id": "ml-int-010",
      "difficulty": "Intermediate",
      "question": "What is the purpose of the ROC curve?",
      "options": [
        "Visualizing training loss over epochs",
        "Showing the tradeoff between true positive rate and false positive rate at various thresholds",
        "Comparing dataset sizes",
        "Showing feature correlations only"
      ],
      "correctAnswer": "Showing the tradeoff between true positive rate and false positive rate at various thresholds"
    },
    {
      "id": "ml-int-011",
      "difficulty": "Intermediate",
      "question": "What is stratified sampling used for in train-test splitting?",
      "options": [
        "Randomly shuffling data with no constraints",
        "Preserving the proportion of classes in both training and test sets",
        "Removing outliers",
        "Speeding up model training"
      ],
      "correctAnswer": "Preserving the proportion of classes in both training and test sets"
    },
    {
      "id": "ml-int-012",
      "difficulty": "Intermediate",
      "question": "What does gradient descent optimize?",
      "options": [
        "The size of the dataset",
        "Model parameters by iteratively minimizing a loss function",
        "The number of features",
        "The visualization style"
      ],
      "correctAnswer": "Model parameters by iteratively minimizing a loss function"
    },
    {
      "id": "ml-int-013",
      "difficulty": "Intermediate",
      "question": "What is the curse of dimensionality?",
      "options": [
        "A benefit of having more features",
        "The phenomenon where data becomes sparse and models perform worse as the number of features grows very large",
        "A bug in scikit-learn",
        "A type of overfitting specific to images"
      ],
      "correctAnswer": "The phenomenon where data becomes sparse and models perform worse as the number of features grows very large"
    },
    {
      "id": "ml-int-014",
      "difficulty": "Intermediate",
      "question": "What does bagging (bootstrap aggregating) do?",
      "options": [
        "Trains a single model on all the data",
        "Trains multiple models on random subsets of data (with replacement) and aggregates their predictions",
        "Removes noisy features",
        "Encrypts training data"
      ],
      "correctAnswer": "Trains multiple models on random subsets of data (with replacement) and aggregates their predictions"
    },
    {
      "id": "ml-int-015",
      "difficulty": "Intermediate",
      "question": "What is the main difference between bagging and boosting?",
      "options": [
        "No difference",
        "Bagging trains models independently in parallel; boosting trains models sequentially, each correcting prior errors",
        "Boosting is always faster to train",
        "Bagging only works with neural networks"
      ],
      "correctAnswer": "Bagging trains models independently in parallel; boosting trains models sequentially, each correcting prior errors"
    },
    {
      "id": "ml-int-016",
      "difficulty": "Intermediate",
      "question": "What does the term 'data leakage' refer to?",
      "options": [
        "A hardware malfunction",
        "Information from outside the training set inappropriately influencing the model, inflating performance estimates",
        "Losing data due to a crash",
        "A type of encryption failure"
      ],
      "correctAnswer": "Information from outside the training set inappropriately influencing the model, inflating performance estimates"
    },
    {
      "id": "ml-int-017",
      "difficulty": "Intermediate",
      "question": "What is the purpose of a learning curve in model evaluation?",
      "options": [
        "Showing model accuracy vs. training set size or epochs to diagnose bias/variance issues",
        "Showing the shape of the input data only",
        "Visualizing hyperparameter names",
        "Displaying the confusion matrix"
      ],
      "correctAnswer": "Showing model accuracy vs. training set size or epochs to diagnose bias/variance issues"
    },
    {
      "id": "ml-int-018",
      "difficulty": "Intermediate",
      "question": "What does Naive Bayes assume about features?",
      "options": [
        "They are perfectly correlated",
        "They are conditionally independent given the class label",
        "They must be numeric only",
        "They must be normalized first"
      ],
      "correctAnswer": "They are conditionally independent given the class label"
    },
    {
      "id": "ml-int-019",
      "difficulty": "Intermediate",
      "question": "What is the elbow method used for?",
      "options": [
        "Tuning a neural network's learning rate",
        "Choosing the optimal number of clusters in k-means by examining within-cluster variance",
        "Selecting the best regularization type",
        "Cleaning missing data"
      ],
      "correctAnswer": "Choosing the optimal number of clusters in k-means by examining within-cluster variance"
    },
    {
      "id": "ml-int-020",
      "difficulty": "Intermediate",
      "question": "What does AUC (Area Under the Curve) generally measure?",
      "options": [
        "Training speed",
        "The overall ability of a classifier to distinguish between classes across all thresholds",
        "The number of features used",
        "Data preprocessing time"
      ],
      "correctAnswer": "The overall ability of a classifier to distinguish between classes across all thresholds"
    },
    {
      "id": "ml-adv-006",
      "difficulty": "Advanced",
      "question": "What is the purpose of Bayesian optimization in hyperparameter tuning?",
      "options": [
        "Randomly trying hyperparameter combinations",
        "Using a probabilistic model to intelligently choose which hyperparameters to try next, minimizing search cost",
        "Only tuning learning rate",
        "Replacing gradient descent entirely"
      ],
      "correctAnswer": "Using a probabilistic model to intelligently choose which hyperparameters to try next, minimizing search cost"
    },
    {
      "id": "ml-adv-007",
      "difficulty": "Advanced",
      "question": "What does the term 'model interpretability' refer to?",
      "options": [
        "How fast a model trains",
        "The degree to which a human can understand the reasons behind a model's predictions",
        "The size of the model file",
        "The number of hyperparameters"
      ],
      "correctAnswer": "The degree to which a human can understand the reasons behind a model's predictions"
    },
    {
      "id": "ml-adv-008",
      "difficulty": "Advanced",
      "question": "What is SHAP (SHapley Additive exPlanations) used for?",
      "options": [
        "Speeding up training",
        "Explaining individual predictions by attributing contribution values to each feature",
        "Cleaning missing data",
        "Selecting the best model architecture"
      ],
      "correctAnswer": "Explaining individual predictions by attributing contribution values to each feature"
    },
    {
      "id": "ml-adv-009",
      "difficulty": "Advanced",
      "question": "What is the purpose of stacking (stacked generalization) in ensemble learning?",
      "options": [
        "Running a single model multiple times",
        "Training a meta-model to combine predictions from multiple base models",
        "Reducing the number of features",
        "A type of data augmentation"
      ],
      "correctAnswer": "Training a meta-model to combine predictions from multiple base models"
    },
    {
      "id": "ml-adv-010",
      "difficulty": "Advanced",
      "question": "What is covariate shift in machine learning?",
      "options": [
        "A change in the labels only",
        "A change in the distribution of input features between training and deployment data",
        "A type of regularization",
        "A neural network architecture"
      ],
      "correctAnswer": "A change in the distribution of input features between training and deployment data"
    },
    {
      "id": "ml-adv-011",
      "difficulty": "Advanced",
      "question": "What is adversarial robustness in machine learning?",
      "options": [
        "A model's training speed",
        "A model's ability to maintain correct predictions when faced with intentionally crafted, deceptive inputs",
        "The size of the training dataset",
        "A type of data visualization"
      ],
      "correctAnswer": "A model's ability to maintain correct predictions when faced with intentionally crafted, deceptive inputs"
    },
    {
      "id": "ml-adv-012",
      "difficulty": "Advanced",
      "question": "What does the term 'catastrophic forgetting' refer to?",
      "options": [
        "A hardware failure during training",
        "A model losing previously learned knowledge when trained on new tasks sequentially",
        "A type of overfitting on the test set",
        "A data leakage issue"
      ],
      "correctAnswer": "A model losing previously learned knowledge when trained on new tasks sequentially"
    },
    {
      "id": "ml-adv-013",
      "difficulty": "Advanced",
      "question": "What is the purpose of a Gaussian Mixture Model (GMM)?",
      "options": [
        "Binary classification only",
        "Modeling data as a mixture of multiple Gaussian distributions, often used for soft clustering",
        "Compressing image files",
        "Encrypting model parameters"
      ],
      "correctAnswer": "Modeling data as a mixture of multiple Gaussian distributions, often used for soft clustering"
    },
    {
      "id": "ml-adv-014",
      "difficulty": "Advanced",
      "question": "What does 'model drift' refer to in production machine learning systems?",
      "options": [
        "A model's accuracy improving indefinitely",
        "A model's performance degrading over time as real-world data distributions change from training data",
        "A visualization rendering bug",
        "A type of hyperparameter tuning method"
      ],
      "correctAnswer": "A model's performance degrading over time as real-world data distributions change from training data"
    },
    {
      "id": "ml-adv-015",
      "difficulty": "Advanced",
      "question": "What is the purpose of the Expectation-Maximization (EM) algorithm?",
      "options": [
        "Speeding up neural network training",
        "Iteratively estimating parameters of statistical models with latent (hidden) variables",
        "Encrypting training data",
        "Visualizing decision boundaries"
      ],
      "correctAnswer": "Iteratively estimating parameters of statistical models with latent (hidden) variables"
    }
  ]
};
export const QUIZFORGE_MACHINE_LEARNING_QUESTIONS = normalizeDomainQuestions(RAW_DATA);
