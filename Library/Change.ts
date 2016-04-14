namespace Rapid {
    export class Change {
        public Name: string;
        public Type: ChangeTypes;
        public Previous: any;
        public Next: any;        
    }

    export enum ChangeTypes {
        Add,
        Edit,
        Delete
    }
}