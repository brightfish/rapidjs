interface ISerializer{    
    Serialize(input: any) : string;
    Deserialize(input: string) : any;
}