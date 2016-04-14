namespace Rapid {
    export class List<TValue>
    {
        public get Count(): number {
            return this.list.length;
        }

        private list: Array<TValue>;

        constructor();
        constructor(input: Linq.Enumerable<TValue>);
        constructor(input?: Linq.Enumerable<TValue>) {
            if (Is.Defined(input)) {
                this.list = input.ToArray();
            }
            else {
                this.list = new Array<TValue>();
            }
        }

        public Add(input: TValue): void {
            this.list.push(input);
        }

        public Remove(input: TValue): boolean {
            var index = this.list.indexOf(input);
            if (index < 0)
                return false;

            this.list.splice(index, 1);
            return true;
        }

        public Clear() {
            delete this.list;
            this.list = new Array<TValue>();
        }

        public Contains(input): boolean {
            return this.list.indexOf(input) > 0;
        }

        public IndexOf(input: TValue): number {
            return this.list.indexOf(input);
        }

        public Insert(index: number, value: TValue): void {
            if (index > this.list.length)
                throw new Exception()
        }

        public Reverse(): void {
            this.list = this.list.reverse();
        }

        public ToEnumerable(): Linq.Enumerable<TValue> {
            return Enumerable.From(this.list);
        }
    }
}