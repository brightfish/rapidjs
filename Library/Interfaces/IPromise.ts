namespace Rapid.Interfaces {
    export interface IPromise {
        Then(success: Function, failure: Function);
    }
}