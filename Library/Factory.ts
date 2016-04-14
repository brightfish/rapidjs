namespace Rapid {
    export class Factory<T>  {
        Create(output: { new (): T; }) {
            return new output();
        }
    }
}