import { Detection, detection } from '../models/detectionModel';

const errLogging = (err: any) => err && console.log(err);

async function createEntry(body: Detection) {
    const newDetection = new detection(body);
    await newDetection.save(errLogging);

    await scaleDatabase();
}

async function readLastFiveEntries() {
    const detects = await detection.find(errLogging).sort({dateCreated: -1});
    return detects.map(detect => detect).filter((_, index) => index < 5);
}

async function deleteOldestEntry() {
    const entries = await detection.find().sort({dateCreated: 1});
    const oldestEntry = entries.shift();

    detection.findByIdAndDelete(oldestEntry?._id, errLogging);
}

async function scaleDatabase(){
    const LOWER_ENTRY_BOUND = 5;
    let entries = (await detection.find()).length;

    while (entries > LOWER_ENTRY_BOUND) {
        await deleteOldestEntry();
        entries--;
    }
}

export { createEntry, readLastFiveEntries };

