namespace Rapid {
    export class KeyValuePair<TKey, TValue>
    {
        public Key: TKey;
        public Value: TValue;

        constructor();
        constructor(key: TKey, value: TValue);
        constructor(key?: TKey, value?: TValue) {            
            this.Key = Is.Defined(key) ? key : null;
            this.Value = Is.Defined(value) ? value : null;
        }
    }
}