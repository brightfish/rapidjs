namespace Rapid {
    export class DependencyResolver {
        static Current: DependencyResolver = new DependencyResolver();

        private dependencies: [string, Factory<any>];
        constructor() {

        }
        public Set(name: string, value: any) {
            if (!value)
                throw 'Dependency {name} is null or undefined. '.replace('{name}', name);

            this.dependencies[name] = value;
        }

        public Get<T>(name: string) {
            var factory = this.dependencies[name];

            if (!factory)
                throw 'Dependency {name} does not exist. '.replace('{name}', name);

            return factory.Create();
        }

        public GetFactory<T>(name: string): Factory<T> {
            var factory = this.dependencies[name];

            if (!factory)
                throw 'Dependency {name} does not exist. '.replace('{name}', name);

            return factory;
        }

        public Remove(name: string) {
            delete this.dependencies[name];
        }
    }
}