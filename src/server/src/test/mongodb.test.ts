import { createEntry, readLastFiveEntries } from '../repositories/detectionRepo';
import { mongoose } from '@typegoose/typegoose';

describe('Mongoose', () => {
    let connection: any;
    
    beforeAll(() => {
        connection = mongoose.connect(process.env.MONGO_URL!, {
            useNewUrlParser: true,
        });
    });
    
    afterAll(() => {
        mongoose.connection.close();
    });
    
    it('Saves to database and returns', async () => {
        const mockEntry = {image: "asdf", predictions: [{"1": 0}, {"2": 0.1}]};
 
        await createEntry(mockEntry);
        const {image, predictions} = ((await readLastFiveEntries())[0]);
        
        expect({image, predictions}).toEqual(mockEntry);
    });
    
    it('Only returns 5 values', async () => {
        const mockEntries = [
                                {image: "1", predictions: [{"1": 0}, {"2": 0.1}], dateCreated: new Date(2019, 1)},
                                {image: "2", predictions: [{"1": 0}, {"2": 0.1}], dateCreated: new Date(2019, 2)},
                                {image: "3", predictions: [{"1": 0}, {"2": 0.1}], dateCreated: new Date(2019, 3)},
                                {image: "4", predictions: [{"1": 0}, {"2": 0.1}], dateCreated: new Date(2019, 4)},
                                {image: "5", predictions: [{"1": 0}, {"2": 0.1}], dateCreated: new Date(2019, 5)},
                                {image: "6", predictions: [{"1": 0}, {"2": 0.1}], dateCreated: new Date(2019, 6)},
                            ];

        for (const mockEntry of mockEntries) await createEntry(mockEntry); 
        
        const actualEntries = await readLastFiveEntries();
        
        const actualEntriesSorted = actualEntries.map(({image, predictions, dateCreated}) => ({image, predictions, dateCreated}));
        const mockEntriesSorted = mockEntries.filter(({image}) => new Number(image) > 1).sort((x, y) => x.dateCreated > y.dateCreated ? -1: 1);

        expect(actualEntries.length).toEqual(5);
        expect(actualEntriesSorted).toEqual(mockEntriesSorted);
    });
});
