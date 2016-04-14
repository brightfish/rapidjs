namespace Rapid.Interfaces {
    export interface ITracker {
        Add<T>(value: T);
        Remove<T>(value: T);
        GetChanges<T>(value: T);
    }
}