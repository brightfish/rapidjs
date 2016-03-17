interface ITask {
    Reject(data?: any);
    Resolve(data?: any);
    Promise: IPromise;
}