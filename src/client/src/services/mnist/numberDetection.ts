import * as tf from '@tensorflow/tfjs';
import { loadModel } from './loadModel';

const MNIST_DATASET_DIMENSION_PX = 28;

const detect = async (imageData: ImageData): Promise<number[]> => {
    const model = await loadModel();
    const tensor = tf.browser.fromPixels(imageData)
        .resizeNearestNeighbor([MNIST_DATASET_DIMENSION_PX, MNIST_DATASET_DIMENSION_PX])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return await model.predict(tensor.div(255.0)).data();
}

export default detect;