namespace Rapid.Interfaces {
    export interface IMetadataProvider {
        Process(): IPromise;
        BuildContext(context: any): Context;
        GetMetadata(): any;
    }
}