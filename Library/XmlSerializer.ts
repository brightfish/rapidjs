namespace Rapid {
    export class XmlSerializer implements Interfaces.ISerializer {
        public Serialize(input: any) : string{
            var serializer = new XMLSerializer();
            return serializer.serializeToString(input);            
        }
        public Deserialize(input: string) : any {
            var parser = new DOMParser();
            return parser.parseFromString(input, 'text/xml');            
        }
        }
}