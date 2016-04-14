namespace Rapid.Interfaces {
    export interface IPromiseFactory {
        Defer(): ITask;
    }
}