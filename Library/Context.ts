class Context {
    Tracker: ITracker;
    PromiseFactory: IPromiseFactory;
    Transporter: ITransporter;
    XmlSerializer: ISerializer;
    Serializer: ISerializer;
    Router: IRouter;
    MetadataProvider: IMetadataProvider;

    constructor() {
        this.Tracker = DependencyResolver.Current.Get<ITracker>('Tracker');
        this.PromiseFactory = DependencyResolver.Current.Get<IPromiseFactory>('PromiseFactory');
        this.Transporter = DependencyResolver.Current.Get<ITransporter>('Transporter');
        this.XmlSerializer = DependencyResolver.Current.Get<ISerializer>('XmlSerializer');
        this.Serializer = DependencyResolver.Current.Get<ISerializer>('Serializer');
        this.Router = DependencyResolver.Current.Get<IRouter>('Router');
        this.MetadataProvider = DependencyResolver.Current.Get<IMetadataProvider>('MetadataProvider');
        //Todo: self.ValidatorFactory = DependencyResolver.Current.GetFactory('Validator');
    }   
    
    SaveChanges() {

    }

    Initialize () {
        var task = this.PromiseFactory.Defer();

        var promise = this.MetadataProvider.Process();

        promise.Then(function (metadata) {
            this.MetadataProvider.BuildContext(self);
            task.Resolve();
        }, function (error) {
            task.Reject();
            alert(error);
        });

        return task.Promise;
    }

    Dispose = function () {

    }
}