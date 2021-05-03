from numpy.random import seed
seed(1)
import tensorflow
tensorflow.random.set_seed(2)
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Flatten
from tensorflow.keras.optimizers import SGD
import time
from pixel_preparer import prepare_pixels
from mnist_dataset_loader import load_mnist_dataset
from mnist_dataset_constants import MNIST_DATASET_IMAGE_SIZE

def define_model():
	model = Sequential()
	model.add(Conv2D(32, (3, 3), activation='relu', kernel_initializer='he_uniform', input_shape=(MNIST_DATASET_IMAGE_SIZE, MNIST_DATASET_IMAGE_SIZE, 1)))
	model.add(MaxPooling2D((2, 2)))
	model.add(Conv2D(64, (3, 3), activation='relu', kernel_initializer='he_uniform'))
	model.add(Conv2D(64, (3, 3), activation='relu', kernel_initializer='he_uniform'))
	model.add(MaxPooling2D((2, 2)))
	model.add(Flatten())
	model.add(Dense(100, activation='relu', kernel_initializer='he_uniform'))
	model.add(Dense(10, activation='softmax'))
	opt = SGD(lr=0.01, momentum=0.9)
	model.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])
	return model

def build():
	start_time = time.time()
	trainX, trainY, testX, testY = load_mnist_dataset()
	trainX, testX = prepare_pixels(trainX, testX)

	model = define_model()
	model.fit(trainX, trainY, epochs=10, batch_size=32, verbose=0)
	
	model.save('number_detection_model.h5')
	print('Total time for model creation: %s' % {round(time.time() - start_time, 2)})

build()