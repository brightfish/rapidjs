namespace Rapid {
    export class Context {
        Tracker: Interfaces.ITracker;
        PromiseFactory: Interfaces.IPromiseFactory;
        Transport: Interfaces.ITransport;
        XmlSerializer: Interfaces.ISerializer;
        Serializer: Interfaces.ISerializer;
        Router: Interfaces.IRouter;
        MetadataProvider: Interfaces.IMetadataProvider;
        ValidatorFactory: Factory<Validator>

        constructor(Tracker: Interfaces.ITracker, 
        PromiseFactory: Interfaces.IPromiseFactory) {
            this.Tracker = DependencyResolver.Current.Get<Interfaces.ITracker>('Tracker');
            this.PromiseFactory = DependencyResolver.Current.Get<Interfaces.IPromiseFactory>('PromiseFactory');
            this.Transport = DependencyResolver.Current.Get<Interfaces.ITransport>('Transporter');
            this.XmlSerializer = DependencyResolver.Current.Get<Interfaces.ISerializer>('XmlSerializer');
            this.Serializer = DependencyResolver.Current.Get<Interfaces.ISerializer>('Serializer');
            this.Router = DependencyResolver.Current.Get<Interfaces.IRouter>('Router');
            this.MetadataProvider = DependencyResolver.Current.Get<Interfaces.IMetadataProvider>('MetadataProvider');
            this.ValidatorFactory = DependencyResolver.Current.GetFactory<Validator>('Validator');
        }

        SaveChanges() {

        }

        Initialize() : Interfaces.IPromise {
            var task = this.PromiseFactory.Defer();

            var promise = this.MetadataProvider.Process();

            promise.Then(function(metadata) {
                this.MetadataProvider.BuildContext(self);
                task.Resolve();
            }, function(error) {
                task.Reject();
                alert(error);
            });

            return task.Promise;
        }

        Dispose = function() {

        }
    }
}