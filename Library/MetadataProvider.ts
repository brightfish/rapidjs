class MetadataProvider {
    Router: IRouter;
    Transporter: ITransporter;
    PromiseFactory: IPromiseFactory;
    XmlSerializer: ISerializer;
    Metadata: [ string, any ];

    constructor() {
        this.Router = DependencyResolver.Current.Get('Router');
        this.Transporter = DependencyResolver.Current.Get('Transporter');
        this.PromiseFactory = DependencyResolver.Current.Get('PromiseFactory');
        this.XmlSerializer = DependencyResolver.Current.Get('XmlSerializer');
    }


    public Process() {
        var url = this.Router.GetMetadataUrl();
        var promise = this.Transporter.Get(url);
        var task = this.PromiseFactory.Defer();

        promise.Then(function (result) {
            this.Metadata = this.XmlSerializer.Deserialize(result.data);
            task.Resolve(this.Metadata);
        }, function (result) {
            task.Reject('Metadata was not found at {0}.'.replace('{0}', url));
        });

        return task.Promise;
    }

    BuildContext(context : Context) {
        var edmx = this.Metadata['edmx:Edmx'];
        var version = edmx['@Version'];
        var schemas = edmx['edmx:DataServices']['Schema'];

        //Todo: var schema = Enumerable<any>.From(schemas).First<any>(function (schema) { return schema['@Namespace'] === 'Default'; });
        var schema: any;

        for (var index in schema.EntityContainer.EntitySet) {
            var entitySet = schema.EntityContainer.EntitySet[index];

            var name = entitySet['@Name'];
            var set = new Set(name);
            context[name] = set;
        }
    }
}