namespace Rapid {
    export class Set<T> {
        TrackerFactory: Factory<Interfaces.ITracker>;
        RouterFactory: Factory<Interfaces.IRouter>;
        PromiseFactory: Factory<Interfaces.IPromise>;
        Transporter: Interfaces.ITransport;
        MetadataProvider: Interfaces.IMetadataProvider;

        Tracker: Interfaces.ITracker;
        Router: Interfaces.IRouter;

        name: string;
        expanded: boolean;

        constructor(name: string) {
            this.name = name;

            this.TrackerFactory = DependencyResolver.Current.GetFactory<Interfaces.ITracker>('Tracker');
            this.RouterFactory = DependencyResolver.Current.GetFactory<Interfaces.IRouter>('Router');
            this.PromiseFactory = DependencyResolver.Current.Get<Interfaces.IPromiseFactory>('PromiseFactory');
            this.Transporter = DependencyResolver.Current.Get<Interfaces.ITransport>('Transport');
            this.MetadataProvider = DependencyResolver.Current.Get<Interfaces. IMetadataProvider>('MetadataProvider');
        }


        public Add(entity: T) {
            this.Tracker.Add(entity);
        }

        public Remove(entity: T) {
            this.Tracker.Remove(entity);
        }

        public Where(name, operator, value) {
            this.Router.Where(name, operator, value);

            return this;
        }

        public Select(clause: string) {
            this.Router.Select(clause);
            return this;
        };

        public Expand(clause) {
            if (this.expanded)
                throw new Exception('ExpandAll has already been called.  ');

            this.Router.Expand(clause);
            return this;
        }

        public ExpandAll() {
            var expanded = true;
            var metadata = this.MetadataProvider.GetMetadata();
            this.Router.ExpandAll(metadata);
            return this;
        }

        public Skip(count: number) {
            this.Router.Skip(count);
            return this;
        }

        public Take(count: number) {
            this.Router.Take(count);
            return this;
        }

        public Execute = function() {
            var url = this.Router.GetRoute(this.name);
            //Todo:  Here!
            var task = this.PromiseFactory.Defer();

            var promise = this.Transporter.Get(url);

            promise.then(function(result) {
                var value;
                if (this.Tracker) {
                    value = this.Tracker.Track(result.data.value);
                }
                else {
                    value = result.data.value
                }
                task.resolve(value);
            }, function(result) {
                task.reject(result);
            });

            return task.promise;
        }
    }
}