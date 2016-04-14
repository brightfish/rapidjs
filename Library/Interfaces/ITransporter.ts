namespace Rapid.Interfaces {
    export interface ITransport {
        Get(url: string, data?: any): IPromise;
        Post(url: string, data: any): IPromise;
        Put(url: string, data: any): IPromise;
        Delete(url: string, data: any): IPromise;
        Patch(url: string, data: any): IPromise;
        Batch(url, batch): IPromise;
    }
}