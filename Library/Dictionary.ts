namespace Rapid {
    export class Dictionary<TKey, TValue>
    {
        public get Keys(): Linq.Enumerable<TKey> {
            return Enumerable.From(this.keys);
        }

        public get Values(): Linq.Enumerable<TValue> {
            return Enumerable.From(this.values);
        }

        private keys: Array<TKey>
        private values: Array<TValue>

        constructor() {
            this.keys = new Array<TKey>();
            this.values = new Array<TValue>();
        }

        public Add(key: TKey | any, value: TValue): void {
            if (this.Contains(key))
                throw new Exception('Key already exists');

            this.keys.push(key);
            this.values.push(value);
        }

        public Remove(key: TKey | any): boolean {
            if (!this.Contains(key))
                return false;

            var index = this.keys.indexOf(key);
            this.keys.splice(index, 1);
            this.values.splice(index, 1);

            return true;;
        }

        public Clear(): void {
            delete this.keys;
            delete this.values;

            this.keys = new Array<TKey>();
            this.values = new Array<TValue>();
        }
        
        public Contains(key: TKey): boolean {
            return this.keys.indexOf(key) > 0;
        }
        
        public ToEnumerable() {
            var entries = new List<KeyValuePair<TKey, TValue>>();

            for (var i = 0; i < this.keys.length; i++) {
                var key = this.keys[i];
                var value = this.values[i];
                var kvp = new KeyValuePair<TKey, TValue>(key, value);
                entries.Add(kvp);
            }
            
            return entries.ToEnumerable();
        }
    }
}