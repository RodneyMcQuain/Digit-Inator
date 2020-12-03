import { getModelForClass, prop  } from '@typegoose/typegoose';

const required = { required: true };

class Detection {

    constructor(body: any) {
        this.image = body.image;
        this.predictions = body.predictions;
        this.dateCreated = new Date();
    }

    @prop(required)
    public image!: string;

    @prop({type: [Number]})
    public predictions!: number[];

    @prop(required)
    public dateCreated?: Date;
}

const DetectionSchema = getModelForClass(Detection);

export { DetectionSchema as detection, Detection };
