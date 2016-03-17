class DependencyResolver {
    static Current: DependencyResolver;

    dependencies: [ string, Factory<any> ];

    Set(name: string, value: any) {
        if (!value)
            throw 'Dependency {name} is null or undefined. '.replace('{name}', name);

        this.dependencies[name] = value;
    }

    Get<T>(name: string) {
        var factory = this.dependencies[name];

        if (!factory)
            throw 'Dependency {name} does not exist. '.replace('{name}', name);

        return factory.Create();
    }

    GetFactory<T>(name: string) : Factory<T> {
        var factory = this.dependencies[name];

        if (!factory)
            throw 'Dependency {name} does not exist. '.replace('{name}', name);

        return factory;
    }

    Remove(name: string) {
        delete this.dependencies[name];
    }
}

