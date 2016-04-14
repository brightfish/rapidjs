namespace Rapid.Interfaces {
    export interface ISerializer {
        Serialize(input: any): string;
        Deserialize(input: string): any;
    }
}