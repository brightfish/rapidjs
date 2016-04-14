namespace Rapid.Interfaces {
    export interface IRouter {
        GetMetadataUrl(): string;
        Route(realtive: string): string;
        Where(name: string, operator: string, value: string);
        Select(clause: string);
        Expand(clause: string);
        ExpandAll(metadata: any);
        Skip(count: number);
        Take(count: number);
        Count();
        OrderBy(clause: string);
    }
}