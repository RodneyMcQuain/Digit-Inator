export interface Detection {
    image: string;
    predictions: number[];
    dateCreated?: Date;
    id?: string;
}