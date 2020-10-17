import * as tf from '@tensorflow/tfjs';

async function detect(imgdata:ImageData): Promise<number[]> {
  const model = await tf.loadLayersModel("model/model.json");
  let tensor = tf.browser.fromPixels(imgdata, 1)
    .resizeNearestNeighbor([28, 28])
    .expandDims(0)
    .toFloat();
  tensor = tensor.div(tf.scalar(255));
  const prediction:any = model.predict(tensor);
  const predictedValues = prediction.dataSync();
  return predictedValues;
}

export default detect;