namespace Rapid {
    export class JsonSerializer {
        public Serialize(input: Object): string {
            return JSON.stringify(input);
        }

        public Deserialize(input: string): Object {
            return JSON.parse(input);
        }
    }
}