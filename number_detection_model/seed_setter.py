from numpy.random import seed
import tensorflow

def set_seed():
    seed(1)
    tensorflow.random.set_seed(2)