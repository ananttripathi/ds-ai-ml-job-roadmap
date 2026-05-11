# Master Syllabus — Data Scientist | ML Engineer | AI Engineer | MLOps Engineer

> **500+ topics across 15 courses.** Each course lists which roles it is essential for.
> Role abbreviations: **DS** = Data Scientist · **MLE** = ML Engineer · **AIE** = AI Engineer · **MLO** = MLOps Engineer

---

## Table of Contents

1. [Mathematics for ML & AI](#1-mathematics-for-ml--ai)
2. [Programming Foundations](#2-programming-foundations)
3. [Data Analysis & EDA](#3-data-analysis--eda)
4. [Classical Machine Learning](#4-classical-machine-learning)
5. [Deep Learning](#5-deep-learning)
6. [Natural Language Processing](#6-natural-language-processing)
7. [Computer Vision (Advanced)](#7-computer-vision-advanced)
8. [Time Series & Forecasting](#8-time-series--forecasting)
9. [Reinforcement Learning](#9-reinforcement-learning)
10. [ML Systems & Software Engineering](#10-ml-systems--software-engineering)
11. [MLOps & Production ML](#11-mlops--production-ml)
12. [LLMOps & Generative AI Engineering](#12-llmops--generative-ai-engineering)
13. [Advanced Feature Engineering & AutoML](#13-advanced-feature-engineering--automl)
14. [ML Interpretability & Explainability](#14-ml-interpretability--explainability)
15. [Statistical Inference & Causal ML](#15-statistical-inference--causal-ml)
16. [ML System Design](#16-ml-system-design)
17. [Data Engineering for ML](#17-data-engineering-for-ml)
18. [Specialized & Emerging Areas](#18-specialized--emerging-areas)

---

## 1. Mathematics for ML & AI

**Relevant roles:** DS · MLE · AIE · MLO

### 1.1 Linear Algebra

- Scalars, Vectors, Matrices, Tensors
- Matrix operations & properties (addition, multiplication, transpose, inverse)
- Eigenvalues & Eigenvectors
- SVD (Singular Value Decomposition)
- Matrix factorization (LU, QR, Cholesky)
- Norms (L1, L2, Frobenius, nuclear)
- Dot products, projections, orthogonality
- Change of basis
- PCA via linear algebra
- Tensors for deep learning (axes, reshaping, broadcasting)

### 1.2 Calculus & Optimization

- Limits & continuity
- Derivatives, chain rule, product rule, quotient rule
- Partial derivatives & gradients
- Jacobian & Hessian matrices
- Gradient descent & variants (batch, mini-batch, stochastic)
- Lagrange multipliers & constrained optimization
- Convex vs non-convex optimization
- Taylor series approximation
- Automatic differentiation (autograd, forward & reverse mode)
- Second-order methods (Newton's method, BFGS, L-BFGS)

### 1.3 Probability & Statistics

- Sample spaces, events, axioms of probability
- Conditional probability & Bayes theorem
- Random variables (discrete & continuous)
- PMF, PDF, CDF
- Joint, marginal, and conditional distributions
- Expectation, variance, covariance, correlation
- Common distributions: Gaussian, Bernoulli, Poisson, Binomial, Beta, Dirichlet, Exponential, Gamma, Uniform
- Law of Large Numbers & Central Limit Theorem (CLT)
- Maximum Likelihood Estimation (MLE)
- Maximum A Posteriori (MAP) estimation
- Information theory: entropy, cross-entropy, KL divergence, mutual information, Fisher information

### 1.4 Discrete Math & Logic

- Set theory & mathematical logic
- Graph theory basics (nodes, edges, paths, cycles)
- Combinatorics & counting (permutations, combinations)
- Big-O notation & computational complexity
- Proof techniques (induction, contradiction, construction)

---

## 2. Programming Foundations

**Relevant roles:** DS · MLE · AIE · MLO

### 2.1 Python Core

- Data types, control flow, functions, scope
- OOP: classes, inheritance, polymorphism, encapsulation, abstract classes
- Iterators, generators, and the iterator protocol
- Decorators (function & class decorators, @property, @staticmethod, @classmethod)
- Context managers (`with` statement, `__enter__`, `__exit__`)
- List, dict, and set comprehensions
- Lambda, map, filter, reduce, functools
- Exception handling & custom exceptions
- Modules & packages (imports, `__init__.py`, namespaces)
- Type hints & annotations (typing module, mypy)

### 2.2 Data Structures & Algorithms

- Arrays, linked lists, stacks, queues, deques
- Hash maps & hash sets (collision handling, load factor)
- Trees: BST, AVL, Red-Black, segment trees, heaps (min/max)
- Graphs: BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, A*, topological sort
- Sorting: quicksort, mergesort, heapsort, timsort, radix sort
- Searching: binary search, interpolation search
- Recursion, memoization, dynamic programming
- Two-pointer, sliding window, prefix sums
- Greedy algorithms
- Time & space complexity analysis (best, average, worst case)
- LeetCode patterns (Easy/Medium level)
- System design basics

### 2.3 Scientific Python Stack

- NumPy: arrays, broadcasting, vectorization, indexing, ufuncs, einsum
- Pandas: DataFrames, Series, groupby, merge, pivot, melt, stack, unstack, apply
- Matplotlib: figures, axes, subplots, custom styling
- Seaborn: statistical plots, themes, FacetGrid
- Plotly & Plotly Express: interactive charts, dashboards
- Bokeh: streaming & interactive visualizations
- SciPy: stats, signal processing, linear algebra, optimize, interpolate
- SymPy: symbolic mathematics & calculus
- Polars: modern high-performance DataFrames
- Joblib & multiprocessing: parallelism in Python
- Profiling: cProfile, line_profiler, memory_profiler, py-spy

### 2.4 SQL & Databases

- SELECT, WHERE, GROUP BY, HAVING, ORDER BY
- JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF
- Subqueries, correlated subqueries, CTEs (WITH clause)
- Window functions: ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE
- Aggregation: SUM, COUNT, AVG, MIN, MAX, PERCENTILE_CONT
- Indexes: B-tree, Hash, GIN, GiST — when and how to use
- Query optimization & EXPLAIN plans
- Transactions & ACID properties
- Normalization (1NF, 2NF, 3NF, BCNF)
- PostgreSQL, MySQL, SQLite internals
- NoSQL basics: MongoDB (documents), Redis (key-value, caching), DynamoDB (key-value at scale), Cassandra (wide-column)
- Vector databases: Pinecone, Weaviate, Chroma, Qdrant, pgvector
- Data modeling: star schema, snowflake schema

---

## 3. Data Analysis & EDA

**Relevant roles:** DS · MLE

### 3.1 Data Wrangling

- Data ingestion from CSV, JSON, Parquet, Avro, ORC, Excel, APIs, databases
- Missing value analysis (MCAR, MAR, MNAR) & imputation strategies (mean, median, mode, KNN imputation, MICE, iterative imputer)
- Outlier detection: IQR method, Z-score, Modified Z-score, Isolation Forest, LOF
- Duplicate detection & removal
- String cleaning: regex, strip, split, replace, fuzzy matching (fuzzywuzzy/rapidfuzz)
- Type coercion & normalization
- Data reshaping: melt, pivot, pivot_table, stack, unstack, wide_to_long
- Working with dates, times, and time zones (datetime, pytz, dateutil)
- Large file chunking & out-of-memory processing (chunked reads, Dask, Polars lazy API)
- Data validation frameworks: Great Expectations, Pandera, Pydantic

### 3.2 Exploratory Analysis

- Univariate analysis: histograms, box plots, violin plots, KDE, QQ plots
- Bivariate analysis: scatter plots, hex bins, heatmaps, pair plots
- Multivariate analysis: parallel coordinates, radar charts, dimensionality reduction plots
- Correlation analysis: Pearson, Spearman, Kendall, point-biserial, phi coefficient
- Distribution fitting & goodness-of-fit tests
- Statistical hypothesis testing: t-test (one-sample, two-sample, paired), chi-square, ANOVA, Mann-Whitney U, Kruskal-Wallis, Wilcoxon signed-rank
- Effect size metrics: Cohen's d, eta-squared, Cramér's V
- Confidence intervals, p-values, and statistical power
- A/B testing analysis: sample size calculation, sequential testing, multiple comparisons (Bonferroni, FDR/Benjamini-Hochberg)
- Data storytelling & reporting (Jupyter, nbconvert, Quarto)

### 3.3 Feature Engineering

- Encoding: one-hot, label, ordinal, binary, target (mean encoding), frequency, hashing
- Binning & discretization (equal-width, equal-frequency, optimal binning)
- Log transform, Box-Cox transform, Yeo-Johnson transform
- Polynomial features & interaction terms
- Date/time feature extraction (year, month, day, hour, day-of-week, is_weekend, holidays)
- Text features: character count, word count, TF-IDF, readability scores
- Aggregation features: group-by statistics (mean, std, min, max, skew per group)
- Lag features & rolling window features for time series
- Feature selection: filter (variance threshold, correlation, mutual info), wrapper (RFE, SFS), embedded (Lasso, tree importance)
- Dimensionality reduction: PCA, Truncated SVD, t-SNE, UMAP, Autoencoders

---

## 4. Classical Machine Learning

**Relevant roles:** DS · MLE · AIE · MLO

### 4.1 Supervised — Regression

- Linear Regression: OLS, closed-form solution, gradient descent derivation
- Ridge (L2 regularization), Lasso (L1 regularization), ElasticNet
- Polynomial regression & basis function expansion
- Decision Tree Regression (CART, splitting criteria, pruning)
- Random Forest Regression (bagging, feature subsampling)
- Gradient Boosting: XGBoost, LightGBM, CatBoost (theory & hyperparameters)
- SVR (Support Vector Regression, epsilon-insensitive loss, kernels)
- KNN Regression (k selection, distance metrics)
- Isotonic regression & monotone constraints
- Bayesian linear regression & Gaussian Process Regression
- Quantile regression (pinball loss)

### 4.2 Supervised — Classification

- Logistic Regression (sigmoid, log-loss, multinomial)
- Naive Bayes: Gaussian, Multinomial, Bernoulli, Complement
- Decision Trees (Gini impurity, entropy, information gain, pruning)
- Random Forest (OOB error, feature importance)
- AdaBoost, Gradient Boosting, Stochastic Gradient Boosting
- XGBoost, LightGBM, CatBoost — advanced configurations
- SVM: linear kernel, RBF kernel, polynomial kernel, dual formulation, soft margin
- KNN Classification (curse of dimensionality, approximate nearest neighbors)
- LDA (Linear Discriminant Analysis) & QDA (Quadratic Discriminant Analysis)
- Neural Networks for tabular data (MLP with scikit-learn & PyTorch)

### 4.3 Unsupervised Learning

- K-Means (Lloyd's algorithm, K-Means++ initialization, choosing K: elbow, silhouette)
- Hierarchical clustering: Ward linkage, Complete linkage, Average linkage, dendrograms
- DBSCAN & HDBSCAN (epsilon, min_samples, cluster labels vs noise)
- Gaussian Mixture Models (GMM, EM algorithm, BIC/AIC for model selection)
- Spectral clustering
- PCA & Kernel PCA
- Autoencoders for representation learning & anomaly detection
- t-SNE (perplexity, iterations, interpreting clusters)
- UMAP (n_neighbors, min_dist, metric)
- Anomaly detection: Isolation Forest, Local Outlier Factor (LOF), One-class SVM, Elliptic Envelope
- Association rule learning: Apriori algorithm, FP-Growth, support, confidence, lift

### 4.4 Model Evaluation & Validation

- Train/Validation/Test split (stratification, data leakage prevention)
- K-Fold Cross-Validation, Stratified K-Fold, Repeated K-Fold, GroupKFold
- Leave-One-Out CV (LOOCV)
- Time series CV: walk-forward validation, purged CV, embargo
- Classification metrics: Accuracy, Precision, Recall, F1, F-beta, AUC-ROC, AUC-PR (Average Precision), Matthews Correlation Coefficient (MCC), Cohen's Kappa
- Regression metrics: MAE, MSE, RMSE, MAPE, sMAPE, RMSLE, R², Adjusted R², Huber loss
- Confusion matrix, calibration curves (Brier score, reliability diagram)
- Log-loss & cross-entropy
- Bias-Variance tradeoff decomposition
- Learning curves & validation curves
- Statistical tests for model comparison (Wilcoxon signed-rank test on CV scores)

### 4.5 Hyperparameter Tuning

- Grid Search CV (exhaustive, combinatorial explosion)
- Randomized Search CV (random sampling, budget control)
- Bayesian Optimization: Optuna (TPE sampler), Hyperopt, SMAC
- Successive Halving & Hyperband (early stopping of poor configs)
- Population-Based Training (PBT)
- Early stopping strategies
- Warm restarts & transfer of hyperparameters
- Neural Architecture Search (NAS): DARTS, ENAS, ProxylessNAS
- AutoML systems: Auto-sklearn, FLAML, H2O AutoML, AutoGluon, TPOT
- Cost-sensitive hyperparameter optimization

---

## 5. Deep Learning

**Relevant roles:** DS · MLE · AIE · MLO

### 5.1 Neural Network Foundations

- Perceptron & the XOR problem
- MLP architecture (layers, neurons, depth vs width)
- Forward pass computation
- Backpropagation derivation (chain rule applied to computation graphs)
- Activation functions: ReLU, Leaky ReLU, PReLU, ELU, SELU, GELU, Swish, Mish, Sigmoid, Tanh, Softmax, Softplus
- Weight initialization: Xavier/Glorot (uniform & normal), He/Kaiming, orthogonal, zero vs random
- Loss functions: Cross-entropy (binary & categorical), MSE, MAE, Huber, Focal Loss, Contrastive Loss, Triplet Loss, CTC Loss
- Batch GD, Mini-batch GD, SGD — convergence properties
- Momentum, Nesterov Momentum, RMSProp, Adam, AdamW, NAdam, Adagrad, Adadelta, AMSGrad
- Learning rate schedulers: step decay, exponential decay, cosine annealing, cosine with warm restarts, polynomial, one-cycle policy, warmup
- Regularization: Dropout, Spatial Dropout, DropConnect, L2 weight decay, Batch Normalization, Layer Normalization, Group Normalization, Instance Normalization, Label Smoothing
- Vanishing & exploding gradients — diagnosis & fixes (gradient clipping, residual connections, normalization)

### 5.2 CNNs — Computer Vision

- Convolution operation: kernel, stride, padding, dilation, receptive field
- Pooling: Max pooling, Average pooling, Global Average Pooling, Adaptive pooling
- Classic architectures: LeNet-5, AlexNet, VGG (11/13/16/19), GoogLeNet/Inception, ResNet (18/34/50/101/152), DenseNet, EfficientNet (B0–B7), MobileNet (V1/V2/V3), SqueezeNet
- Modern architectures: ConvNeXt (V1/V2), RegNet, NFNet, MaxViT
- Object detection: YOLO (V1–V10), Faster R-CNN, SSD, RetinaNet, DETR, DINO, RT-DETR
- Segmentation: Semantic (FCN, DeepLab V3+, SegFormer), Instance (Mask R-CNN, SOLQ), Panoptic, SAM (Segment Anything Model)
- Image generation: VAE, VQ-VAE, GAN, Diffusion Models (DDPM, DDIM)
- Data augmentation: random crop, flip, rotation, color jitter, Cutout, Mixup, CutMix, RandAugment, Albumentations library
- Transfer learning: ImageNet pre-training, fine-tuning strategies (frozen backbone, gradual unfreezing, discriminative learning rates)
- Multi-task learning for vision (shared backbone, task-specific heads)

### 5.3 RNNs, LSTMs, GRUs — Sequences

- Vanilla RNN: architecture, hidden state, BPTT (Backpropagation Through Time)
- LSTM: cell state, input gate, forget gate, output gate, peephole connections
- GRU: reset gate, update gate (parameter-efficient alternative)
- Bidirectional RNNs & Bidirectional LSTMs
- Seq2Seq: encoder-decoder framework, context vector bottleneck
- Bahdanau attention (additive attention) & Luong attention (multiplicative)
- Beam search, greedy decoding, top-k sampling, nucleus (top-p) sampling
- CRF (Conditional Random Field) for sequence labeling (NER, POS)
- Temporal Convolutional Networks (TCN) — dilated causal convolutions
- WaveNet for raw audio generation

### 5.4 Transformers & Attention

- Self-attention mechanism — intuition & derivation
- Scaled dot-product attention: Q, K, V matrices
- Multi-head attention (parallel attention heads)
- Positional encoding: sinusoidal (original), learned, Rotary (RoPE), ALiBi, xPos
- Transformer encoder architecture (layer: self-attention + FFN + residual + norm)
- Transformer decoder architecture (masked self-attention + cross-attention + FFN)
- Pre-LayerNorm vs Post-LayerNorm (stability implications)
- Feed-forward sub-layers (two linear layers with activation)
- Cross-attention in encoder-decoder (seq2seq tasks)
- Vision Transformer (ViT): patch embedding, class token, position embedding
- Swin Transformer: shifted windows, hierarchical feature maps
- Flash Attention (IO-aware attention) & Flash Attention 2
- Memory-efficient attention, PagedAttention

### 5.5 Deep Learning Frameworks

- **PyTorch:** tensor operations, autograd, `nn.Module`, `DataLoader`, `Dataset`, custom training loops, `torch.compile`, TorchScript
- **TensorFlow / Keras:** Sequential API, Functional API, Model subclassing, `tf.data`, `tf.function`, custom layers & training
- **JAX & Flax:** functional transformations (jit, grad, vmap, pmap), Flax modules for research
- **PyTorch Lightning:** LightningModule, LightningDataModule, Trainer, callbacks, logging hooks
- **HuggingFace Transformers:** `AutoModel`, `AutoTokenizer`, `Trainer`, `TrainingArguments`, `pipeline`
- **HuggingFace Datasets:** `load_dataset`, streaming, `map`, batched processing
- **ONNX:** model export, opset versions, ONNX Runtime inference
- Debugging tools: forward/backward hooks, `torchviz`, TensorBoard, W&B
- Mixed precision training: FP16, BF16, `torch.cuda.amp`, `GradScaler`
- Distributed training: `DataParallel`, `DistributedDataParallel (DDP)`, FSDP (Fully Sharded Data Parallel), DeepSpeed ZeRO (Stage 1/2/3)

---

## 6. Natural Language Processing

**Relevant roles:** DS · MLE · AIE

### 6.1 Text Preprocessing

- Tokenization strategies: whitespace, word-piece, BPE (Byte-Pair Encoding), SentencePiece, Unigram LM
- Stopword removal, stemming (Porter, Snowball), lemmatization (spaCy, NLTK)
- Text normalization: lowercasing, Unicode normalization (NFC/NFD), contraction expansion, special char removal
- Spelling correction & text cleaning
- N-grams & basic language modeling (unigram, bigram, trigram)
- TF-IDF vectorization (sklearn, sparse matrices)
- Word embeddings: Word2Vec (CBOW, Skip-gram), GloVe (global co-occurrence), FastText (subword)
- Subword embeddings & OOV (out-of-vocabulary) handling
- Sentence embeddings: Sentence-BERT (SBERT), E5, BGE, GTE, instructor-xl
- Document embeddings: Doc2Vec, averaging word embeddings, pooling strategies

### 6.2 Classical NLP Tasks

- Text classification: sentiment analysis, topic classification, intent detection
- Named Entity Recognition (NER) — sequence labeling, IOB/BIOES tagging schemes
- Part-of-Speech (POS) tagging
- Dependency parsing (arc-eager, arc-standard)
- Coreference resolution
- Relation extraction (closed IE, open IE)
- Text summarization: extractive (TextRank, BM25-based), abstractive (T5, BART, Pegasus)
- Machine translation: statistical MT history, neural MT (seq2seq with attention)
- Extractive Question Answering (SQuAD, span prediction)
- Text generation: autoregressive language modeling

### 6.3 Large Language Models

- GPT architecture: causal (autoregressive) language modeling
- BERT: masked language modeling (MLM), next sentence prediction (NSP)
- RoBERTa, ALBERT, DeBERTa improvements over BERT
- T5: text-to-text unified framework, span corruption pre-training
- GPT-2, GPT-3, GPT-4, Claude, Gemini, LLaMA, Mistral, Falcon, Phi, Qwen families
- Training data curation: web crawl, deduplication, quality filtering
- Tokenization at scale: vocabulary size decisions, multilingual tokenizers
- Pre-training objectives: MLM, CLM, NSP, SBO (sentence boundary objective), UL2
- Scaling laws: Chinchilla optimal compute allocation, emergent abilities
- In-context learning (ICL) & few-shot prompting mechanisms
- Chain-of-thought (CoT) prompting — zero-shot and few-shot
- Retrieval-Augmented Generation (RAG) — overview
- Tool use & function calling (OpenAI, Anthropic APIs)

### 6.4 Fine-tuning LLMs

- Full fine-tuning: catastrophic forgetting, when to use
- Parameter-Efficient Fine-Tuning (PEFT) methods overview
- LoRA (Low-Rank Adaptation): rank, alpha, target modules
- QLoRA: LoRA + 4-bit quantization for memory efficiency
- AdaLoRA: adaptive rank allocation
- Prefix tuning: prepended virtual tokens
- Prompt tuning: soft prompt optimization
- Instruction tuning: FLAN, Alpaca, Vicuna, WizardLM approaches
- RLHF pipeline: reward model training, PPO (Proximal Policy Optimization) for alignment
- DPO (Direct Preference Optimization): simplifying RLHF
- Constitutional AI & RLAIF (RL from AI Feedback)
- Evaluation: BLEU, ROUGE (1/2/L), BERTScore, MMLU, HumanEval, GSM8K, MT-Bench, LMSYS Chatbot Arena
- Hallucination: types (intrinsic, extrinsic), detection, mitigation strategies
- LLM safety: red-teaming, jailbreaking, alignment techniques

---

## 7. Computer Vision (Advanced)

**Relevant roles:** MLE · AIE

### 7.1 Generative Models

- GAN theory: generator, discriminator, minimax game, Nash equilibrium
- Training instability: mode collapse, vanishing gradients, training tricks
- DCGAN, CycleGAN (unpaired image translation), StyleGAN (style-based generator), BigGAN (class-conditional)
- Progressive GAN, StyleGAN2/3
- DDPM (Denoising Diffusion Probabilistic Models): forward process, reverse process, noise schedule
- DDIM (denoising diffusion implicit models): faster deterministic sampling
- DPM-Solver, DPM-Solver++, PNDM — accelerated samplers
- Score-based generative models (SDEs, score matching)
- Stable Diffusion: VAE encoder/decoder + UNet denoiser + CLIP text encoder
- ControlNet: conditioning on depth, edges, pose, segmentation
- LoRA for diffusion fine-tuning (Dreambooth, Textual Inversion)
- Video generation: temporal attention, Sora architecture concepts, VideoLDM
- Image editing: InstructPix2Pix, SDEdit, Prompt-to-Prompt

### 7.2 Multimodal Models

- CLIP: contrastive language-image pretraining, zero-shot classification
- ALIGN, SigLIP (sigmoid loss for language-image pairs)
- Image captioning: BLIP, BLIP-2 (Q-Former architecture)
- Visual Question Answering (VQA): datasets, metrics, model architectures
- Large Multimodal Models (LMMs): LLaVA, Flamingo, InternVL, Qwen-VL, Gemini, Claude Vision
- OCR & document understanding: Donut, PaddleOCR, Tesseract, Azure Document Intelligence
- Visual grounding & referring expression comprehension
- Image-text retrieval (FAISS + CLIP embeddings)
- Multimodal RAG (image + text retrieval)
- 3D vision: NeRF (Neural Radiance Fields), 3D Gaussian Splatting

### 7.3 Model Optimization for Deployment

- Post-training quantization: INT8, INT4, FP8
- GPTQ (weight-only quantization for LLMs)
- AWQ (Activation-aware Weight Quantization)
- Pruning: unstructured (magnitude), structured (channel, head pruning), gradual magnitude pruning
- Knowledge distillation: teacher-student training, soft targets, feature distillation, born-again networks
- TensorRT: layer fusion, precision calibration, dynamic shapes
- OpenVINO for Intel hardware
- CoreML & Metal for Apple Silicon
- ONNX Runtime optimization: graph optimization, provider selection (CUDA, TensorRT, CPU)
- Edge deployment: Raspberry Pi, NVIDIA Jetson (TensorRT), mobile (TFLite, PyTorch Mobile)
- Batch inference pipelines, async pre/post-processing

---

## 8. Time Series & Forecasting

**Relevant roles:** DS · MLE

### 8.1 Classical Methods

- Time series decomposition: trend, seasonality, residual (additive & multiplicative)
- Stationarity: definition, ADF test, KPSS test, differencing to achieve stationarity
- Autocorrelation Function (ACF) & Partial Autocorrelation Function (PACF) — interpretation
- ARMA (p, q), ARIMA (p,d,q), SARIMA (p,d,q)(P,D,Q,s), SARIMAX with exogenous variables
- Exponential smoothing: SES, Holt's (double), Holt-Winters (triple, additive & multiplicative)
- Prophet (additive model with Fourier series seasonality, changepoint detection)
- TBATS, BATS (complex seasonalities)
- Granger causality test
- Spectral analysis: FFT, periodogram, power spectral density
- Anomaly detection: CUSUM, BOCPD (Bayesian Online Changepoint Detection), Streaming Anomaly Detection

### 8.2 ML & DL for Time Series

- Lag features, rolling statistics, expanding window features
- Tree-based models for forecasting: LightGBM, XGBoost — feature engineering strategies
- Temporal Convolutional Networks (TCN) — dilated convolutions for long-range dependencies
- LSTM & Seq2Seq for multi-step forecasting
- Temporal Fusion Transformer (TFT): gating mechanisms, variable selection networks, interpretability
- N-BEATS: basis expansion time series forecasting
- N-HiTS: hierarchical interpolation for long horizon
- PatchTST: patched time series Transformer
- TimesNet: 2D temporal variation modeling
- Time series foundation models: TimesFM (Google), Chronos (Amazon), MOIRAI, MOMENT
- Multi-step forecasting strategies: direct multi-output, recursive (AR), MIMO (multi-input multi-output)
- Probabilistic forecasting: quantile regression, conformal prediction intervals, Monte Carlo dropout

---

## 9. Reinforcement Learning

**Relevant roles:** MLE · AIE

### 9.1 RL Foundations

- Markov Decision Processes (MDPs): formal definition
- States, actions, rewards, policy (deterministic & stochastic), value function, Q-function
- Bellman expectation & optimality equations
- Dynamic programming: value iteration, policy iteration (model-based, known MDP)
- Monte Carlo methods: first-visit, every-visit MC, MC control
- Temporal Difference: TD(0), TD(λ), eligibility traces
- SARSA (on-policy TD control)
- Q-Learning (off-policy TD control)
- Tabular methods & the curse of dimensionality
- Exploration vs exploitation: ε-greedy, decaying ε, UCB (Upper Confidence Bound), Thompson sampling, posterior sampling
- OpenAI Gym / Gymnasium environments, MuJoCo, PyBullet, Brax

### 9.2 Deep RL

- Deep Q-Network (DQN): experience replay, target network
- Double DQN (DDQN) — overestimation bias fix
- Dueling DQN — value + advantage decomposition
- Prioritized Experience Replay (PER)
- Policy Gradient theorem & REINFORCE algorithm
- Variance reduction: baselines, advantage function estimation
- Actor-Critic: A2C (synchronous), A3C (asynchronous)
- Proximal Policy Optimization (PPO): clip objective, GAE (Generalized Advantage Estimation)
- Trust Region Policy Optimization (TRPO)
- Soft Actor-Critic (SAC): entropy regularization, temperature parameter
- TD3 (Twin Delayed DDPG) — continuous action spaces
- DDPG (Deep Deterministic Policy Gradient)
- Multi-agent RL: MADDPG, QMIX, MAPPO, CTDE paradigm
- Hierarchical RL: options framework, goal-conditioned RL
- Offline RL: IQL (Implicit Q-Learning), TD3+BC, CQL, Decision Transformer, Gato
- RLHF for LLMs: reward model, PPO fine-tuning loop

---

## 10. ML Systems & Software Engineering

**Relevant roles:** MLE · MLO

### 10.1 Software Engineering for ML

- Object-oriented design applied to ML pipelines
- Design patterns: Factory (model creation), Strategy (algorithm selection), Observer (training callbacks), Repository (data access), Pipeline
- Unit testing for ML: pytest, hypothesis (property-based testing), testing transformers, testing model outputs
- Integration testing & regression testing (model performance regression)
- Code quality: flake8, pylint, black (formatting), isort (imports), mypy (type checking)
- Pre-commit hooks & CI linting gates
- Git workflows: Gitflow, trunk-based development, feature flags
- Documentation: Sphinx (API docs), MkDocs, Jupyter Book, docstrings (Google, NumPy, reStructuredText style)
- Configuration management: Hydra, OmegaConf, Dynaconf, python-dotenv
- Logging: structlog, loguru, Python logging module, structured JSON logging

### 10.2 Data Engineering Basics

- ETL vs ELT — when to use each
- Apache Spark: RDDs, DataFrames, Spark SQL, Spark Streaming, Structured Streaming, SparkML
- PySpark ML pipelines: Pipeline, PipelineModel, CrossValidator
- Apache Kafka: producers, consumers, topics, partitions, consumer groups, offsets
- Workflow orchestration: Airflow DAG design, operators, sensors, XComs, dynamic DAGs
- Prefect: flows, tasks, deployments, work pools
- Dagster: software-defined assets, ops, jobs, schedules, sensors
- dbt (data build tool): models, tests, macros, snapshots, documentation
- Delta Lake: ACID transactions, time travel, MERGE, OPTIMIZE, VACUUM, Z-ordering
- Apache Iceberg, Apache Hudi — open table format comparison
- Feature stores: Feast, Tecton, Hopsworks — architecture overview
- Data versioning: DVC (Data Version Control), LakeFS
- Data catalogs: DataHub, OpenMetadata, Apache Atlas

### 10.3 Cloud Platforms

- **AWS:** S3, EC2 (instance families for ML: p3, p4, g5), SageMaker (training jobs, endpoints, Pipelines, Feature Store, Experiments), Lambda, Glue (ETL), Athena, ECR, EKS, Bedrock
- **GCP:** BigQuery (ML, BI Engine), Vertex AI (training, endpoints, pipelines, Feature Store), GCS, Cloud Composer (Airflow), Dataflow (Apache Beam), Cloud Run, TPU access
- **Azure:** Azure ML (workspace, compute clusters, pipelines, model registry), Azure Blob Storage, Databricks on Azure, Azure OpenAI Service
- IAM, VPC, security groups, secrets management (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault)
- Cost optimization: spot/preemptible instances, reserved/committed use, auto-scaling, right-sizing
- Multi-cloud & hybrid cloud patterns
- Infrastructure as Code: Terraform (modules, state, workspaces), Pulumi (Python-native IaC)
- Cloud storage patterns for ML: data lakes (S3/GCS), lakehouses (Delta Lake on Databricks/S3)
- Serverless ML inference (Lambda, Cloud Functions, Cloud Run)
- Managed ML service comparison matrix

---

## 11. MLOps & Production ML

**Relevant roles:** MLO · MLE

### 11.1 Experiment Tracking & Model Registry

- MLflow: Tracking (runs, metrics, params, artifacts), Projects (reproducibility), Models (flavors, signatures), Model Registry (stages: Staging/Production/Archived)
- Weights & Biases (W&B): experiment tracking, W&B Sweeps (hyperparameter search), Artifacts (dataset/model versioning), Reports, Tables
- Neptune.ai: structured metadata, comparison views
- Comet ML: experiment management, code logging
- DVC (Data Version Control): `dvc run`, `dvc push/pull`, pipelines (dvc.yaml), metrics tracking
- Hyperparameter logging best practices (log everything, use tags)
- Artifact management & lineage tracking
- Model cards & documentation standards
- A/B experiment management for ML models
- Reproducibility: random seeds, environment pinning, dataset hashing
- Git + DVC integration workflows

### 11.2 Containerization & Orchestration

- Docker: image layers, Dockerfile best practices, multi-stage builds for lean ML images, `.dockerignore`
- Docker Compose: local ML development stacks (model + API + monitoring)
- Kubernetes fundamentals: pods, services (ClusterIP, NodePort, LoadBalancer), deployments, statefulsets, configmaps, secrets, namespaces, RBAC
- Helm charts: chart structure, values, templates, releases, Helmfile
- Kubernetes autoscaling: HPA (Horizontal Pod Autoscaler), VPA (Vertical Pod Autoscaler), KEDA (event-driven autoscaling)
- GPU scheduling in K8s: NVIDIA device plugin, GPU resource requests/limits, time-slicing, MIG (Multi-Instance GPU)
- Argo Workflows: DAG-based workflow execution on K8s
- Kubeflow: Kubeflow Pipelines (KFP v2), Katib (hyperparameter tuning), Training Operator (PyTorch, TF), KServe
- Seldon Core: SeldonDeployment CRD, inference graph, canary rollouts, explainer pods
- Ray on Kubernetes: RayCluster, RayJob, Ray Serve on K8s

### 11.3 CI/CD for ML (CI/CD/CT)

- GitHub Actions for ML: workflow YAML, matrix builds, GPU runners, caching (pip, model artifacts)
- GitLab CI for ML: `.gitlab-ci.yml`, ML-specific runners, artifact passing
- Jenkins pipelines for ML (Jenkinsfile, shared libraries)
- Automated model retraining triggers: data drift threshold, schedule, performance degradation
- Continuous Training (CT) pipelines: data validation → training → evaluation → registration → deployment
- Model validation gates: holdout performance threshold, bias checks, data quality checks
- Shadow deployment: running new model in parallel, comparing outputs without serving traffic
- Blue-green deployment: two identical environments, instant traffic switch
- Canary deployment: gradual traffic shift (5% → 25% → 100%), automated rollback triggers
- Rollback strategies: model version pinning, traffic rollback, champion-challenger framework
- Infrastructure testing with Terratest

### 11.4 Model Serving & APIs

- FastAPI for ML serving: Pydantic input/output schemas, background tasks, middleware, lifespan events
- Flask vs FastAPI vs gRPC — latency, throughput, and use-case comparison
- TorchServe: model archiver, handlers, management API, metrics
- TensorFlow Serving: SavedModel format, gRPC & REST endpoints, batching
- BentoML: Service, Runnable, bentofile.yaml, containerization, Yatai (Kubernetes deployment)
- NVIDIA Triton Inference Server: multi-framework, dynamic batching, model ensembles, concurrent execution
- Ray Serve: deployments, replicas, ingress, composable deployments
- ONNX Runtime for polyglot serving
- Async inference (message queue pattern: Celery + Redis/RabbitMQ)
- Batch inference at scale (Spark batch scoring, SageMaker Batch Transform)
- Streaming inference & server-sent events (SSE)
- REST vs gRPC vs GraphQL for ML APIs — protocol selection criteria
- API versioning, backward compatibility, deprecation strategies

### 11.5 Monitoring & Observability

- Data drift detection: PSI (Population Stability Index), KS test, Jensen-Shannon divergence, chi-square test for categoricals
- Concept drift detection: CUSUM (cumulative sum control chart), Page-Hinkley test, DDM (Drift Detection Method), ADWIN
- Feature drift monitoring: per-feature statistics, reference window vs current window
- Prediction drift: output distribution shifts, label distribution monitoring
- Model performance degradation alerts: threshold-based, statistical process control
- ML monitoring platforms: Evidently AI, WhyLabs, Fiddler AI, Arize AI, NannyML, Aporia
- Prometheus metrics: counters, gauges, histograms, summaries — custom metrics for ML
- Grafana dashboards: panel types, alerting, annotations, Loki for logs
- ELK Stack / OpenSearch: log ingestion, parsing, Kibana dashboards for ML
- Distributed tracing: Jaeger, Zipkin, OpenTelemetry SDK (Python), trace propagation in ML microservices
- SLAs, SLOs, SLIs definition for ML systems — error budgets

### 11.6 ML Pipeline & Workflow Orchestration

- Apache Airflow: DAGs, operators (BashOperator, PythonOperator, KubernetesPodOperator), sensors, hooks, XComs, task groups, dynamic task mapping, TaskFlow API
- Prefect 2.0: flows, tasks, deployments, work pools, blocks, artifacts, automations
- Dagster: software-defined assets (SDAs), asset checks, ops, graphs, jobs, schedules, sensors, IO managers, Partitions
- Kubeflow Pipelines v2: components, pipelines, artifacts, component spec YAML
- ZenML: steps, pipelines, stacks (artifact store, orchestrator, model deployer), integrations
- Metaflow (Netflix): decorators (@step, @retry, @batch, @kubernetes), namespace, resume
- Pipeline versioning & parameterization (runtime parameters)
- Caching & incremental computation (step-level caching in Airflow/Prefect/Metaflow)
- Data validation in pipelines (Great Expectations checkpoints, Pandera schema checks)
- End-to-end pipeline testing: unit tests for pipeline steps, integration tests with mock data

---

## 12. LLMOps & Generative AI Engineering

**Relevant roles:** AIE · MLO

### 12.1 Prompt Engineering

- Zero-shot prompting (task description only)
- One-shot & few-shot prompting (example selection strategies)
- Chain-of-thought (CoT): standard, zero-shot CoT ("Let's think step by step")
- Self-consistency: multiple CoT paths, majority voting
- Tree-of-Thought (ToT): branching reasoning, BFS/DFS search over thoughts
- ReAct (Reasoning + Acting): interleaving reasoning traces with tool actions
- System prompts & persona design (role, tone, constraints)
- Prompt injection attacks & jailbreak patterns — awareness & defenses
- Structured output prompting: JSON mode, XML extraction, schema enforcement
- Prompt templates: Jinja2, LangChain PromptTemplate, ChatPromptTemplate
- Prompt versioning & management (Langfuse, PromptLayer, Helicone)
- Prompt evaluation & red-teaming methodologies

### 12.2 RAG Systems (Retrieval-Augmented Generation)

- Document loading: PDF, DOCX, HTML, Markdown, Notion, Confluence, web scraping
- Chunking strategies: fixed-size, recursive character text splitter, semantic chunking (embedding similarity), late chunking, parent-child chunking, sentence-window retrieval
- Embedding model selection: OpenAI `text-embedding-3`, Cohere Embed, E5-large, BGE-M3, GTE, Jina
- Vector store setup & indexing: FAISS (Flat, IVF, HNSW), Pinecone, Weaviate, Chroma, Qdrant, pgvector, Milvus
- Retrieval strategies: dense retrieval (ANN search), sparse retrieval (BM25, Elastic BM25), hybrid retrieval (RRF — Reciprocal Rank Fusion)
- Re-ranking: Cohere Rerank, cross-encoder re-rankers, ColBERT
- Query rewriting: HyDE (Hypothetical Document Embeddings), step-back prompting, query expansion, multi-query retrieval
- Multi-vector retrieval & parent-child document hierarchies
- Contextual compression (LLMLinguaFilter, EmbeddingsFilter)
- RAG evaluation frameworks: RAGAS (faithfulness, answer relevancy, context precision, context recall), TruLens, DeepEval, ARES

### 12.3 LLM Application Frameworks

- **LangChain:** chains, RunnableSequence (LCEL), retrievers, memory (ConversationBufferMemory, ConversationSummaryMemory), agents (OpenAI Functions, ReAct), tools, callbacks, LangSmith for tracing
- **LlamaIndex:** data connectors, document stores, VectorStoreIndex, SummaryIndex, KnowledgeGraphIndex, query engines, response synthesizers, agents, workflows
- **OpenAI Assistants API:** threads, messages, runs, function calling, file search, code interpreter
- **Anthropic API:** tool use, extended thinking, prompt caching, streaming
- **Semantic Kernel:** kernel, plugins, planners, memory, connectors (C#, Python)
- **Haystack 2.0:** pipelines, components, DocumentStore, RAG pipeline composition
- Structured output libraries: Instructor (Pydantic + LLM), Outlines (constrained generation), Guidance
- LLM routing & gateway: LiteLLM (unified API), RouteLLM (cost-performance routing), Portkey, Helicone
- Multi-agent frameworks: AutoGen (conversable agents, group chat), CrewAI (crew, agents, tasks, tools), LangGraph (stateful graph-based agents)
- Agentic workflow patterns: planning, tool use, reflection (self-critique), memory management, parallelization

### 12.4 LLM Inference & Optimization

- KV (Key-Value) cache: purpose, memory consumption, cache eviction
- PagedAttention: virtual memory for KV cache (vLLM architecture)
- Continuous batching: iteration-level scheduling vs request-level batching
- Speculative decoding: draft model + target model, acceptance sampling
- Quantization for LLMs: GPTQ, AWQ, GGUF (llama.cpp for CPU inference), SmoothQuant
- Model parallelism: tensor parallelism, pipeline parallelism, sequence parallelism
- BitsAndBytes: 8-bit & 4-bit quantization for inference
- Inference servers: vLLM (high throughput), TGI — Text Generation Inference (HuggingFace), Ollama (local), SGLang, llama.cpp, ExLlama2
- SGLang: structured generation, RadixAttention (efficient KV cache sharing)
- Throughput vs latency tradeoffs: Time-To-First-Token (TTFT) vs Time-Per-Output-Token (TPOT), optimal batch size selection

### 12.5 LLM Evaluation & Safety

- Standard benchmarks: MMLU, HumanEval, GSM8K, MATH, BIG-Bench, MT-Bench, AlpacaEval, LMSYS Chatbot Arena
- Custom evaluation pipelines: task-specific metrics, human evaluation rubrics
- LLM-as-judge evaluation: G-EVAL, GPT-4 as evaluator, self-evaluation bias
- Factuality & hallucination detection: FActScore, FACTSCORE, SelfCheckGPT, semantic entropy
- Toxicity & bias evaluation: ToxiGen, BBQ, WinoBias, HolisticBias
- Red-teaming LLMs: adversarial prompts, multi-turn attacks, automated red-teaming (PyRIT, Garak)
- Guardrails systems: NeMo Guardrails (Colang), Guardrails.ai (validators), LlamaGuard (safety classifier), Lakera Guard
- PII detection & data privacy: presidio, scrubbing in RAG pipelines
- Cost tracking & token budgeting: per-request cost logging, token usage dashboards
- Responsible AI frameworks: Anthropic's responsible scaling policy, OpenAI usage policies, EU AI Act impact on LLMs

---

## 13. Advanced Feature Engineering & AutoML

**Relevant roles:** DS · MLE

### 13.1 Advanced Feature Engineering

- Target encoding with smoothing (empirical Bayes, leave-one-out)
- Embedding features from neural networks (entity embeddings for categoricals)
- Graph-based features: node degree, PageRank, betweenness centrality, clustering coefficient
- Geospatial features: H3 hexagonal indexing, Haversine distance, nearest point-of-interest, travel time
- Image embeddings as tabular features (extract from pretrained CNN/ViT)
- Text embeddings for tabular ML (sentence embeddings as feature vectors)
- Feature crosses (explicit multiplication, hashing trick)
- Weight of Evidence (WoE) & Information Value (IV) for binary classification
- Permutation feature importance (model-agnostic)
- SHAP-guided feature engineering (remove low-SHAP features, interaction discovery)

### 13.2 AutoML & Meta-learning

- Auto-sklearn: meta-learning warm start, combined algorithm selection & HPO (CASH)
- FLAML: cost-frugal optimization, adaptive search
- H2O AutoML: stacked ensembles, leaderboard
- AutoGluon: stack ensembles, multi-layer stacking, preset modes (best_quality, high_quality, medium_quality)
- Neural Architecture Search: DARTS (differentiable), ENAS (parameter sharing), ProxylessNAS
- Hyperparameter optimization at scale: Optuna (distributed with RDB storage), Ray Tune (PBT, ASHA, HyperBand), Ax (Bayesian, multi-objective)
- Meta-learning: MAML (Model-Agnostic Meta-Learning), Prototypical Networks, few-shot learning
- Transfer learning for tabular data: TabPFN (in-context learning for tabular), FT-Transformer fine-tuning
- Stacking, blending, and ensembling: first-level models, second-level meta-learner, out-of-fold predictions
- Automatic feature generation: featuretools (DFS — Deep Feature Synthesis), OpenFE, tsfresh (time series feature extraction)
- AutoML for time series: AutoTS, AutoGluon-TimeSeries
- AutoML evaluation pitfalls: data leakage in AutoML, evaluation set contamination
- AutoML in production: reliability concerns, model interpretability trade-offs

---

## 14. ML Interpretability & Explainability

**Relevant roles:** DS · AIE

### 14.1 Interpretability Methods

- Intrinsically interpretable models: linear regression (coefficients), logistic regression (log-odds), shallow decision trees, Generalized Additive Models (GAM), EBM (Explainable Boosting Machine)
- Global vs local explanations distinction
- SHAP (SHapley Additive exPlanations): TreeSHAP (exact, fast for tree models), KernelSHAP (model-agnostic), DeepSHAP (deep learning), LinearSHAP; SHAP values, summary plots, dependence plots, force plots, waterfall plots
- LIME (Local Interpretable Model-agnostic Explanations): tabular, text, and image LIME
- Integrated Gradients: attribution for neural networks (baseline, path integral)
- Saliency maps, Vanilla Gradients, Guided Backpropagation
- GradCAM, GradCAM++, ScoreCAM — class activation mapping for CNNs
- Attention visualization: attention rollout, attention flow
- Counterfactual explanations: DiCE (Diverse Counterfactual Explanations), DICE-ML, actionability constraints
- Partial Dependence Plots (PDP) — global feature effect
- Individual Conditional Expectation (ICE) plots — per-instance feature effect
- Permutation Feature Importance (model-agnostic global importance)

### 14.2 Responsible AI

- Algorithmic bias: types (historical, representation, measurement, aggregation bias)
- Fairness metrics: demographic parity, equalized odds, equal opportunity, calibration by group, individual fairness
- Fairness-performance tradeoffs (no free lunch)
- Bias detection & mitigation tools: Fairlearn, IBM AIF360, What-If Tool, Aequitas
- Differential privacy: ε-DP, DP-SGD, privacy budget, local vs central DP
- Federated learning concepts: FedAvg, FL challenges (communication, heterogeneity, privacy)
- Model auditing: pre-deployment audits, third-party audits
- Documentation standards: Model Cards (Mitchell et al.), Datasheets for Datasets (Gebru et al.)
- EU AI Act: risk classification (unacceptable, high, limited, minimal risk), compliance implications for ML systems
- ML governance: model inventory, approval workflows, version control for compliance
- Reproducibility: seeds, container pinning, dataset versioning, experiment logging
- Privacy-preserving ML: secure multi-party computation (SMPC) basics, homomorphic encryption overview

---

## 15. Statistical Inference & Causal ML

**Relevant roles:** DS

### 15.1 Statistical Inference

- Frequentist inference: NHST, p-values (interpretation pitfalls), Type I/II errors, statistical power
- Bayesian inference: prior, likelihood, posterior, marginal likelihood
- Bayesian vs Frequentist debate — practical implications
- Bayes factors & model comparison
- Conjugate priors (Beta-Binomial, Gamma-Poisson, Normal-Normal)
- MCMC sampling: Metropolis-Hastings algorithm, Gibbs sampling, convergence diagnostics (R-hat, trace plots)
- Hamiltonian Monte Carlo (HMC) & NUTS (No-U-Turn Sampler)
- Probabilistic programming: PyMC (v4/v5), Stan (via cmdstanpy), Pyro (PyTorch-based), NumPyro
- Hierarchical (multilevel) models: partial pooling, random effects
- Survival analysis: Kaplan-Meier estimator, log-rank test, Cox Proportional Hazard model, accelerated failure time (AFT) models
- Bootstrap & jackknife resampling: confidence intervals, bias estimation

### 15.2 Causal Inference

- Potential outcomes framework (Rubin causal model): ATE, ATT, ATC
- Directed Acyclic Graphs (DAGs): nodes, edges, d-separation, backdoor criterion, front-door criterion
- do-calculus (Pearl) — intervention vs observation distinction
- Randomized Controlled Trials (RCTs): randomization, ITT analysis, CACE
- Observational studies: confounding, selection bias, external validity
- Instrumental Variables (IV): 2SLS (two-stage least squares), weak instruments
- Difference-in-Differences (DiD): parallel trends assumption, staggered DiD, Callaway-Sant'Anna
- Synthetic Control Method
- Regression Discontinuity Design (RDD): sharp & fuzzy RDD, bandwidth selection, McCrary density test
- Propensity Score Matching (PSM): IPW, doubly robust estimation, overlap/common support
- Uplift modeling: treatment effect heterogeneity, S-learner, T-learner, X-learner, R-learner (metalearners)
- Causal ML libraries: DoWhy, EconML, CausalML, grf (generalized random forests)

---

## 16. ML System Design

**Relevant roles:** MLE · MLO · AIE

### 16.1 System Design for ML (Interview & Production)

- Requirements gathering: functional (what the system does) vs non-functional (latency, throughput, scale, consistency)
- Scale estimation: QPS (queries per second), storage requirements, bandwidth, feature computation budget
- High-level architecture design: training system vs serving system separation
- Feature store design: online (low-latency) vs offline (high-throughput), point-in-time correctness
- Training pipeline architecture: data ingestion → preprocessing → training → evaluation → registry
- Online vs offline inference trade-offs: real-time API vs batch scoring pipelines
- Low-latency serving: p50/p95/p99 latency targets, SLA design
- Caching strategies: feature caching, embedding caching, response caching (TTL, LRU)
- Fault tolerance: retries, circuit breakers, fallback models, graceful degradation
- Case studies to master:
  - Recommendation system (YouTube, Netflix, Spotify)
  - Search ranking (Airbnb, LinkedIn, Google)
  - Fraud & anomaly detection (financial services)
  - Ads click-through rate prediction (Meta, Google)
  - Content moderation at scale (TikTok, Instagram)
  - Ride-price surge estimation (Uber, Lyft)
  - Feed ranking (Twitter/X, Instagram)

### 16.2 Data Infrastructure

- Lambda architecture: batch layer + serving layer + speed layer (real-time)
- Kappa architecture: streaming-only, reprocessing via replay
- Data warehouse vs data lake vs lakehouse: trade-offs, use cases
- Medallion architecture: Bronze (raw), Silver (cleaned, conformed), Gold (aggregated, serving)
- Batch processing: Spark, MapReduce — when to use vs streaming
- Stream processing: Kafka + Flink, Kafka + Spark Streaming, Kafka + Kafka Streams
- Change Data Capture (CDC): Debezium, Maxwell's Daemon, database transaction log tailing
- Real-time feature computation: Flink feature pipelines, materialize.io, RisingWave
- Pub-Sub systems: Apache Kafka (partitions, consumer groups, compaction), AWS Kinesis, GCP Pub/Sub
- OLTP vs OLAP systems: differences, use cases, HTAP (Hybrid Transactional/Analytical Processing)
- Query engines for analytics: Presto, Trino, Spark SQL, DuckDB, Snowflake, BigQuery
- Schema evolution & backward compatibility (Avro schema registry, Protobuf)

---

## 17. Data Engineering for ML

**Relevant roles:** MLO · MLE

### 17.1 Pipeline Engineering

- Apache Spark deep dive: execution model (driver, executors, tasks, stages), DAG scheduler, shuffle operations, Spark UI for debugging
- PySpark: DataFrames, schema inference vs explicit schema, partitioning strategies, caching/persistence, UDFs (scalar, pandas UDFs)
- SparkML: Pipeline, Transformer, Estimator, CrossValidator, TrainValidationSplit
- Kafka deep dive: producers (acks, compression, batching), consumers (polling, offsets, rebalancing), Kafka Connect, Kafka Streams
- Apache Flink: DataStream API, Table API, stateful stream processing, watermarks & event time, checkpointing
- Batch processing patterns: idempotency, deduplication, late arriving data handling
- Delta Lake operations: ACID transactions, time travel (VERSION AS OF, TIMESTAMP AS OF), MERGE (upsert), OPTIMIZE (compaction), VACUUM (cleanup), Z-ordering for data skipping
- Data quality checks: schema validation, null checks, range checks, referential integrity, row count reconciliation
- Schema validation & enforcement at ingestion (Pydantic, Avro, Protobuf, JSON Schema)
- Incremental data loading: full load vs CDC vs watermark-based incremental

### 17.2 Feature Stores

- Online vs offline feature store architecture (low-latency read vs high-throughput write)
- Point-in-time correct feature retrieval (preventing label leakage via time-travel joins)
- Feature definitions: naming conventions, versioning, metadata, ownership
- **Feast:** registry (feature definitions), offline store (Parquet/BigQuery/Redshift), online store (Redis/DynamoDB), feature server
- **Tecton:** on Databricks/Snowflake, streaming + batch features, feature views, feature services
- **Hopsworks:** Feature Store, Hopskotch SQL, Python & Scala APIs, online store (RonDB)
- Feature monitoring: data quality, distribution drift at feature level
- Backfilling feature data: historical backfill pipelines, compute cost optimization
- Shared vs team-specific features: governance, discoverability
- Feature store in real-time ML: sub-10ms online feature retrieval architectures

---

## 18. Specialized & Emerging Areas

**Relevant roles:** AIE · MLE

### 18.1 Graph Machine Learning

- Graph Neural Networks (GNNs): intuition, message passing framework (aggregate → update)
- GCN (Graph Convolutional Network): spectral convolution approximation
- GraphSAGE: inductive learning, neighborhood sampling
- GAT (Graph Attention Network): attention-weighted message passing
- Node classification, link prediction, graph classification tasks
- Heterogeneous graphs: different node & edge types (R-GCN, HAN, HGT)
- Knowledge graphs: RDF, triples (subject, predicate, object), SPARQL
- Knowledge graph embeddings: TransE, RotatE, ComplEx, DistMult
- PyTorch Geometric (PyG) & DGL (Deep Graph Library)
- GraphRAG: Microsoft GraphRAG, community detection, entity extraction to KG
- Graph-based anomaly detection: structural anomalies, attribute anomalies
- Temporal graphs & dynamic GNNs
- Applications: fraud detection (transaction graphs), drug discovery (molecular graphs), recommendations (user-item graphs)

### 18.2 Audio & Speech

- Audio signal processing: sampling rate, bit depth, FFT, STFT, Mel spectrogram, MFCCs, log-Mel features
- Automatic Speech Recognition (ASR): Whisper (OpenAI), wav2vec 2.0, HuBERT, Conformer
- ASR evaluation: WER (Word Error Rate), CER (Character Error Rate)
- Text-to-Speech (TTS): Tacotron 2, FastSpeech 2, VITS, XTTS, Kokoro
- Speaker diarization: who spoke when (pyannote.audio)
- Audio classification: UrbanSound8K, ESC-50, AudioSet; PANNs, AST (Audio Spectrogram Transformer)
- Music generation: MusicGen, AudioCraft, AudioLDM
- Voice cloning: real-time voice conversion, speaker adaptation
- Noise reduction & speech enhancement: Demucs, RNNoise
- Real-time audio inference: latency constraints, streaming ASR, WebRTC

### 18.3 Tabular Deep Learning

- TabNet: sequential attention for feature selection, sparsity
- FT-Transformer (Feature Tokenizer + Transformer): embedding all features as tokens
- SAINT (Self-Attention and Intersample Attention Transformer): row-level attention
- TabPFN: Transformer trained in-context on synthetic data for small tabular datasets
- NODE (Neural Oblivious Decision Ensembles): differentiable oblivious decision trees
- Entity embeddings for categorical features (seminal Rossmann Kaggle solution)
- Deep & Wide models (Google Play recommendation): memorization + generalization
- Tree + neural hybrid models: XGBoost + MLP stacking, gradient boosted trees as feature extractors
- Benchmarks: OpenML-CC18 benchmark suite, AutoML Benchmark, TabZilla

### 18.4 AI Agents & Agentic Systems

- Agent loop architecture: perceive → plan → act → observe → (loop)
- Tool use & function calling: tool schemas, error handling, tool chaining
- Memory systems: episodic memory (conversation history), semantic memory (vector store knowledge), procedural memory (tools/skills)
- Planning strategies: ReAct, CoT-SC, ToT, LATS (Language Agent Tree Search), LLM-MCTS
- Code agents: SWE-bench, SWE-agent, OpenDevin, Aider, Claude Code
- Computer use & browser agents: web automation, Playwright, Selenium, Anthropic Computer Use
- Multi-agent coordination patterns: orchestrator-worker, peer-to-peer, market-based
- Agentic RAG: query planning, multi-hop retrieval, self-correcting retrieval
- Agent evaluation & benchmarks: SWE-bench, WebArena, AgentBench, ToolBench
- Safety in autonomous agents: human-in-the-loop, minimal footprint principle, reversibility, confirmation steps

---

## Role-to-Course Priority Matrix

| Course | DS | MLE | AIE | MLO |
|---|---|---|---|---|
| 1. Mathematics for ML & AI | ★★★ | ★★★ | ★★★ | ★★ |
| 2. Programming Foundations | ★★★ | ★★★ | ★★★ | ★★★ |
| 3. Data Analysis & EDA | ★★★ | ★★ | ★ | ★ |
| 4. Classical Machine Learning | ★★★ | ★★★ | ★★ | ★★ |
| 5. Deep Learning | ★★★ | ★★★ | ★★★ | ★★ |
| 6. Natural Language Processing | ★★ | ★★ | ★★★ | ★ |
| 7. Computer Vision (Advanced) | ★ | ★★ | ★★★ | ★ |
| 8. Time Series & Forecasting | ★★★ | ★★ | ★ | ★ |
| 9. Reinforcement Learning | ★ | ★★ | ★★ | ★ |
| 10. ML Systems & Software Eng. | ★★ | ★★★ | ★★ | ★★★ |
| 11. MLOps & Production ML | ★ | ★★★ | ★★ | ★★★ |
| 12. LLMOps & GenAI Engineering | ★ | ★★ | ★★★ | ★★★ |
| 13. Advanced Feature Eng. & AutoML | ★★★ | ★★ | ★ | ★ |
| 14. ML Interpretability | ★★★ | ★ | ★★ | ★ |
| 15. Statistical Inference & Causal ML | ★★★ | ★ | ★ | ★ |
| 16. ML System Design | ★ | ★★★ | ★★★ | ★★★ |
| 17. Data Engineering for ML | ★ | ★★ | ★ | ★★★ |
| 18. Specialized & Emerging Areas | ★ | ★★ | ★★★ | ★ |

> **★★★** = Core/Essential · **★★** = Important · **★** = Awareness-level

---

## Recommended Study Sequence

### Phase 1 — Universal Foundation (All Roles)
Mathematics → Programming Foundations → Classical ML → Deep Learning Fundamentals

### Phase 2 — Role Branching

**Data Scientist path:**
EDA & Feature Engineering → Statistical Inference & Causal ML → Time Series → ML Interpretability → AutoML

**ML Engineer path:**
ML Systems & Software Engineering → Advanced Deep Learning → ML System Design → MLOps Basics → Data Engineering

**AI Engineer path:**
NLP & LLMs → LLMOps & GenAI Engineering → RAG Systems → Agentic Systems → Computer Vision (Multimodal)

**MLOps Engineer path:**
ML Systems & Software Engineering → MLOps & Production ML → Data Engineering → Cloud Platforms → LLMOps

### Phase 3 — Differentiation (All Roles)
Reinforcement Learning (if relevant) → Graph ML → Emerging Areas → System Design at Scale → Open-source contributions & portfolio

---

*Last updated: May 2026 | Covers ~500+ topics across 18 subject areas*


---

# 19. GPU Systems & High-Performance AI

**Relevant roles:** MLE · AIE · MLO

## 19.1 CUDA & GPU Programming

- CUDA programming basics
- GPU architecture fundamentals
- GPU memory hierarchy (global/shared/register/constant memory)
- CUDA kernels, thread blocks, warps
- Warp divergence & occupancy optimization
- PyTorch custom CUDA operations
- Triton language for custom kernels
- CUDA streams & asynchronous execution
- NCCL & multi-GPU communication
- AllReduce operations
- ZeRO optimizer internals
- GPU profiling tools:
  - NVIDIA Nsight
  - nvprof
  - torch.profiler
- Gradient checkpointing
- Activation recomputation
- KV-cache optimization
- GPU memory fragmentation handling
- Mixed precision optimization
- Multi-node distributed training

---

# 20. Recommendation Systems & Search

**Relevant roles:** DS · MLE · AIE

## 20.1 Recommendation Systems

- Collaborative filtering
- Matrix factorization
- Implicit vs explicit feedback
- ALS (Alternating Least Squares)
- Two-tower architectures
- DSSM (Deep Structured Semantic Models)
- DeepFM
- Wide & Deep models
- Candidate generation
- Retrieval vs ranking architecture
- Sequential recommendation systems
- Session-based recommenders
- Multi-stage recommendation pipelines
- Embedding-based retrieval
- Context-aware recommendations
- Real-time recommendation systems
- Ranking metrics:
  - NDCG
  - MAP
  - MRR
- Contextual bandits
- Reinforcement learning for recommendations

## 20.2 Search & Information Retrieval

- BM25 deep dive
- Elasticsearch/OpenSearch
- ANN search internals
- HNSW indexing
- IVF indexing
- PQ (Product Quantization)
- Hybrid search systems
- Semantic search
- Learning to Rank (LTR)
- Cross-encoders vs bi-encoders
- Query understanding
- Search relevance tuning
- Search latency optimization
- Distributed search systems

---

# 21. AI Security & Safety Engineering

**Relevant roles:** AIE · MLE · MLO

## 21.1 ML & LLM Security

- Adversarial attacks on ML models
- Adversarial examples
- Prompt injection attacks
- Jailbreak techniques & defenses
- Data poisoning attacks
- Model extraction attacks
- Membership inference attacks
- Supply chain attacks in ML
- Secure model deployment
- AI red teaming
- Secrets management
- API security for AI systems
- Secure RAG pipelines
- Sandboxing tool execution
- Content moderation systems
- AI governance frameworks
- Threat modeling for AI systems

---

# 22. Distributed Systems & Backend Engineering

**Relevant roles:** MLE · MLO · AIE

## 22.1 Distributed Systems

- CAP theorem
- Distributed consensus basics
- Raft consensus algorithm
- Distributed caching systems
- Distributed locking
- Consistent hashing
- Load balancing strategies
- Event-driven architectures
- Message queues internals
- Distributed transactions
- Fault tolerance patterns
- Retry strategies
- Circuit breakers
- Idempotency in distributed systems
- Service discovery

## 22.2 Backend Engineering for AI

- FastAPI advanced patterns
- Async Python programming
- OAuth2 authentication
- JWT authentication
- WebSockets
- API gateways
- Reverse proxies (Nginx)
- Redis caching
- Background workers
- Celery task queues
- Microservices architecture
- gRPC internals
- Rate limiting
- API observability
- Scalable backend design

---

# 23. Linux, Networking & DevOps Foundations

**Relevant roles:** MLE · MLO · AIE

## 23.1 Linux & Shell

- Linux filesystem internals
- Bash scripting
- SSH & remote systems
- tmux/screen workflows
- File permissions
- Linux process management
- Cron jobs
- Environment variables
- Package managers
- System monitoring tools
- Disk & memory diagnostics

## 23.2 Networking & Infrastructure

- HTTP/HTTPS fundamentals
- TCP/IP basics
- DNS resolution
- SSL/TLS basics
- Reverse proxies
- CDN basics
- Load balancers
- VPN concepts
- Network debugging tools
- Kubernetes networking
- Service mesh basics

---

# 24. Data-Centric AI & Synthetic Data

**Relevant roles:** DS · AIE · MLE

## 24.1 Data-Centric AI

- Data-centric AI methodology
- Synthetic tabular data generation
- Weak supervision
- Snorkel framework
- Active learning
- Human-in-the-loop labeling
- Label noise handling
- Curriculum learning
- Data augmentation pipelines
- Pseudo-labeling
- Self-training methods
- Semi-supervised learning
- Data quality scoring
- Dataset balancing techniques

---

# 25. Advanced GenAI & Reasoning Systems

**Relevant roles:** AIE · MLE

## 25.1 Advanced LLM Architectures

- Reasoning models
- Test-time compute scaling
- Deliberate reasoning
- Verifier models
- Small Language Models (SLMs)
- Edge LLM deployment
- Long-context architectures
- Ring attention
- Mamba state-space models
- RWKV architecture
- Infinite attention
- Sparse mixture-of-experts (MoE)
- Memory-augmented transformers

## 25.2 AI Coding & Autonomous Agents

- SWE-agent architectures
- Repo-level reasoning
- AST parsing
- Code retrieval systems
- Autonomous coding systems
- Tool-augmented code generation
- Multi-agent orchestration
- Self-healing agents
- Long-horizon planning agents
- Autonomous browser agents

---

# 26. Production Reliability & AI Operations

**Relevant roles:** MLO · MLE

## 26.1 Production ML Reliability

- Feature leakage debugging
- Data contracts
- SLA/SLO design for ML
- ML incident response
- Rollback incident handling
- Shadow traffic testing
- Canary analysis
- Chaos engineering for ML
- Production debugging workflows
- Root cause analysis
- Cost-aware deployment strategies
- Reliability engineering for AI systems

## 26.2 AI FinOps & Cost Optimization

- GPU cost optimization
- Spot/preemptible instances
- Batch vs real-time inference economics
- Token optimization strategies
- Autoscaling economics
- Cloud billing analysis
- Throughput optimization
- Cost-performance benchmarking

---

# 27. Research Engineering & Scientific ML

**Relevant roles:** AIE · DS · MLE

## 27.1 Research Skills

- Research paper reading workflow
- Reproducing research papers
- Ablation studies
- Benchmark creation
- Literature review methodology
- Experimental design
- Scientific writing
- Reproducibility practices
- Open-source research workflows
- Statistical rigor in experimentation

---

# 28. Edge AI & On-Device ML

**Relevant roles:** MLE · AIE

## 28.1 Edge AI Systems

- TensorFlow Lite
- CoreML deployment
- ONNX mobile deployment
- Quantization-aware training
- TinyML fundamentals
- Edge TPU deployment
- Mobile optimization techniques
- Embedded AI systems
- Real-time edge inference
- Battery-aware AI optimization

---

# 29. Career & Portfolio Engineering

**Relevant roles:** DS · MLE · AIE · MLO

## 29.1 Career Acceleration

- Resume tailoring
- ATS optimization
- LinkedIn optimization
- GitHub optimization
- Open-source contribution strategy
- Technical blogging
- Kaggle strategy
- Research portfolio building
- Networking for AI roles
- Hackathons & competitions
- Personal branding for engineers
- Interview preparation strategy

## 29.2 Interview Preparation

- ML system design interviews
- SQL interview preparation
- Product case studies
- A/B testing case interviews
- ML debugging interviews
- Behavioral interview preparation
- DSA interview patterns
- AI engineering interview prep
- MLOps interview preparation
- Research interview preparation

---

# Updated Role-to-Course Priority Additions

| Course | DS | MLE | AIE | MLO |
|---|---|---|---|---|
| 19. GPU Systems & High-Performance AI | ★ | ★★★ | ★★★ | ★★★ |
| 20. Recommendation Systems & Search | ★★★ | ★★★ | ★★ | ★ |
| 21. AI Security & Safety Engineering | ★ | ★★ | ★★★ | ★★★ |
| 22. Distributed Systems & Backend Engineering | ★ | ★★★ | ★★★ | ★★★ |
| 23. Linux, Networking & DevOps Foundations | ★ | ★★★ | ★★ | ★★★ |
| 24. Data-Centric AI & Synthetic Data | ★★★ | ★★ | ★★ | ★ |
| 25. Advanced GenAI & Reasoning Systems | ★ | ★★ | ★★★ | ★★ |
| 26. Production Reliability & AI Operations | ★ | ★★★ | ★★ | ★★★ |
| 27. Research Engineering & Scientific ML | ★★ | ★★ | ★★★ | ★ |
| 28. Edge AI & On-Device ML | ★ | ★★ | ★★★ | ★★ |
| 29. Career & Portfolio Engineering | ★★★ | ★★★ | ★★★ | ★★★ |

---

*Extended Edition Updated: May 2026 | Expanded with modern GenAI, distributed systems, security, retrieval systems, GPU engineering, production reliability, and career acceleration topics.*
