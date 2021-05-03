import os
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as pyplot
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import to_categorical
import time
from seed_setter import set_seed
from pixel_preparer import prepare_pixels
from mnist_dataset_loader import load_mnist_dataset
from mnist_dataset_constants import MNIST_DATASET_IMAGE_SIZE
from model_filename import model_filename

def save_figure(fig_id, fig_extension="png", resolution=300):
    path = os.path.join(os.path.dirname(__file__), fig_id + "." + fig_extension)
    print("Saving figure", fig_id)
    pyplot.savefig(path, format=fig_extension, dpi=resolution)

def test():
	start_time = time.time()

	trainX, trainY, testX, testY = load_mnist_dataset()
	trainX, testX = prepare_pixels(trainX, testX)
	model = load_model(model_filename)

	yPred = np.argmax(model.predict(testX), axis=-1)
	yPred_probabilities = model.predict(testX)
	yTest_original = np.argmax(testY, axis=1)

	print('\nClassification report \n=====================')
	print(classification_report(y_true=yTest_original, y_pred=yPred))
	
	print('\nConfusion matrix report \n=====================')
	print(confusion_matrix(y_true=yTest_original, y_pred=yPred))
	conf_mx = confusion_matrix(yTest_original, yPred)
	row_sums = conf_mx.sum(axis=1, keepdims=True)
	
	norm_conf_mx = conf_mx / row_sums
	np.fill_diagonal(norm_conf_mx, 0)
	print('\nConfusion matrix error report \n=====================')
	print(f'{norm_conf_mx}\n')
	pyplot.matshow(conf_mx, cmap=pyplot.cm.gray)
	save_figure("confusion_matrix_plot")
	pyplot.matshow(norm_conf_mx, cmap=pyplot.cm.gray)
	save_figure("confusion_matrix_error_plot")

	_, acc = model.evaluate(testX, testY, verbose=1)
	print('> %.3f' % (acc * 100.0))
	
	print('Total time for model testing: %s' % {round(time.time() - start_time, 2)})

set_seed()
test()