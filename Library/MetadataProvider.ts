namespace Rapid {
    export class MetadataProvider {
        Router: Interfaces.IRouter;
        Transporter: Interfaces.ITransport;
        PromiseFactory: Interfaces.IPromiseFactory;
        XmlSerializer: Interfaces.ISerializer;
        Metadata: [string, any];

        constructor(router: Interfaces.IRouter, transport: Interfaces.ITransport, promiseFactory: Interfaces.IPromiseFactory, xmlSerializer: Interfaces.ISerializer) {
            this.Router = router
            this.Transporter = transport;
            this.PromiseFactory = promiseFactory;
            this.XmlSerializer = xmlSerializer;
        }

        public Process() {
            var url = this.Router.GetMetadataUrl();
            var promise = this.Transporter.Get(url);
            var task = this.PromiseFactory.Defer();

            promise.Then(function(result) {
                this.Metadata = this.XmlSerializer.Deserialize(result.data);
                task.Resolve(this.Metadata);
            }, function(result) {
                task.Reject('Metadata was not found at {0}.'.replace('{0}', url));
            });

            return task.Promise;
        }

        BuildContext(context: Context) {
            var edmx = this.Metadata['edmx:Edmx'];
            var version = edmx['@Version'];
            var schemas = edmx['edmx:DataServices']['Schema'];

            //Todo: var schema = Enumerable<any>.From(schemas).First<any>(function (schema) { return schema['@Namespace'] === 'Default'; });
            var schema: any;

            for (var entitySet of schema.EntityContainer.EntitySet) {
                var name = entitySet['@Name'];
                var set = new Set(name);
                context[name] = set;
            }
        }
    }
}