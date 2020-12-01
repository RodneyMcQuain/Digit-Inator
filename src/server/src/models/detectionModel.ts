import { getModelForClass, prop  } from '@typegoose/typegoose';

const required = { required: true };

class Detection {
    @prop(required)
    public image!: string;

    @prop(required)
    public predictions!: Object;

    @prop(required)
    public dateCreated!: Date;
}

const DetectionSchema = getModelForClass(Detection);

export { DetectionSchema as detection, Detection };
