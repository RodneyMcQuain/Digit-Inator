import { getModelForClass, prop  } from '@typegoose/typegoose';

const required = { required: true };
const notRequired = { required: false };

class Detection {

    constructor() {
        this.image = '';
        this.predictions = [];
    }

    @prop(required)
    public image!: string;

    @prop(required)
    public predictions!: Object;

    @prop(notRequired)
    public dateCreated?: Date;
}

const DetectionSchema = getModelForClass(Detection);

export { DetectionSchema as detection, Detection };
