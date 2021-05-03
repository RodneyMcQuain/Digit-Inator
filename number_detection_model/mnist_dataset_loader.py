from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical
from mnist_dataset_constants import MNIST_DATASET_IMAGE_SIZE

def load_mnist_dataset():
	(trainX, trainY), (testX, testY) = mnist.load_data()
	trainX = trainX.reshape((trainX.shape[0], MNIST_DATASET_IMAGE_SIZE, MNIST_DATASET_IMAGE_SIZE, 1))
	testX = testX.reshape((testX.shape[0], MNIST_DATASET_IMAGE_SIZE, MNIST_DATASET_IMAGE_SIZE, 1))
	trainY = to_categorical(trainY)
	testY = to_categorical(testY)
	return trainX, trainY, testX, testY