export interface ITag {
    text: string;
}

export class Tag implements ITag {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

}