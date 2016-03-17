var AngularPromiseFactory = (function () {
    function AngularPromiseFactory(q) {
        this.$q = q;
    }
    AngularPromiseFactory.prototype.Defer = function () {
        return this.$q.defer();
    };
    return AngularPromiseFactory;
})();
var AngularTransporter = (function () {
    function AngularTransporter(http) {
        this.$http = http;
    }
    AngularTransporter.prototype.Get = function (url, data) {
        return this.$http.get(url);
    };
    AngularTransporter.prototype.Post = function (url, data) {
        return this.$http.post(url, data);
    };
    AngularTransporter.prototype.Put = function (url, data) {
        return this.$http.put(url, data);
    };
    AngularTransporter.prototype.Delete = function (url, data) {
        return this.$http.delete(url, data);
    };
    AngularTransporter.prototype.Patch = function (url, data) {
        return this.$http.patch(url, data);
    };
    AngularTransporter.prototype.Batch = function (url, batch) {
    };
    return AngularTransporter;
})();
var Context = (function () {
    function Context() {
        this.Dispose = function () {
        };
        this.Tracker = DependencyResolver.Current.Get('Tracker');
        this.PromiseFactory = DependencyResolver.Current.Get('PromiseFactory');
        this.Transporter = DependencyResolver.Current.Get('Transporter');
        this.XmlSerializer = DependencyResolver.Current.Get('XmlSerializer');
        this.Serializer = DependencyResolver.Current.Get('Serializer');
        this.Router = DependencyResolver.Current.Get('Router');
        this.MetadataProvider = DependencyResolver.Current.Get('MetadataProvider');
    }
    Context.prototype.SaveChanges = function () {
    };
    Context.prototype.Initialize = function () {
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
    };
    return Context;
})();
var DependencyResolver = (function () {
    function DependencyResolver() {
    }
    DependencyResolver.prototype.Set = function (name, value) {
        if (!value)
            throw 'Dependency {name} is null or undefined. '.replace('{name}', name);
        this.dependencies[name] = value;
    };
    DependencyResolver.prototype.Get = function (name) {
        var factory = this.dependencies[name];
        if (!factory)
            throw 'Dependency {name} does not exist. '.replace('{name}', name);
        return factory.Create();
    };
    DependencyResolver.prototype.GetFactory = function (name) {
        var factory = this.dependencies[name];
        if (!factory)
            throw 'Dependency {name} does not exist. '.replace('{name}', name);
        return factory;
    };
    DependencyResolver.prototype.Remove = function (name) {
        delete this.dependencies[name];
    };
    return DependencyResolver;
})();
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.Create = function (output) {
        return new output();
    };
    return Factory;
})();
var JsonSerializer = function () {
    var self = this;
    self.Serialize = function (input) {
        return JSON.stringify(input);
    };
    self.Deserialize = function (input) {
        return JSON.parse(input);
    };
    return self;
};
var MetadataProvider = (function () {
    function MetadataProvider() {
        this.Router = DependencyResolver.Current.Get('Router');
        this.Transporter = DependencyResolver.Current.Get('Transporter');
        this.PromiseFactory = DependencyResolver.Current.Get('PromiseFactory');
        this.XmlSerializer = DependencyResolver.Current.Get('XmlSerializer');
    }
    MetadataProvider.prototype.Process = function () {
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
    };
    MetadataProvider.prototype.BuildContext = function (context) {
        var edmx = this.Metadata['edmx:Edmx'];
        var version = edmx['@Version'];
        var schemas = edmx['edmx:DataServices']['Schema'];
        var schema;
        for (var index in schema.EntityContainer.EntitySet) {
            var entitySet = schema.EntityContainer.EntitySet[index];
            var name = entitySet['@Name'];
            var set = new Set(name);
            context[name] = set;
        }
    };
    return MetadataProvider;
})();
var Router = (function () {
    function Router(url) {
        this.target = '';
        this.expands = Enumerable.Empty();
        this.skip = 0;
        this.take = 0;
        this.count = false;
        this.Expand = function (clause) {
            var targets = Enumerable.From(clause.split(','));
            this.target = targets.Last();
            this.expands = this.expands.Union(targets);
        };
        this.Take = function (count) {
            if (this.take) {
                throw 'Invalid Operation: Take can only be called once. ';
            }
            this.take = count;
        };
        this.Count = function () {
            if (this.count) {
                throw 'Invalid Operation: Count can only be called once. ';
            }
        };
        this.OrderBy = function (clause) {
            if (this.orderby) {
                throw 'Invalid Operation: OrderBy can only be called once. ';
            }
        };
        this.base = url.replace(/\/$/, '');
    }
    Router.prototype.Route = function (relative) {
        relative = relative.replace(/^\//, '');
        var path = '{base}/{relative}'.replace('{base}', this.base).replace('{relative}', relative);
        return path;
    };
    Router.prototype.GetRoute = function (name) {
        var query = '?';
        var selections = this.selects[''];
        if (selections.Any()) {
            query = query.concat('$select={selection}&'.replace('{selection}', selections.ToArray().join(',')));
        }
        this.expands.ForEach(function (expansion) {
            var select = this.selects[expansion];
            if (select) {
                var selection = select.ToArray().join(',');
                var template = '$expand={expansion}($select={selection})&'.replace('{expansion}', expansion).replace('{selection}', selection);
                query = query.concat(template);
            }
            else {
                query = query.concat('$expand={expansion}&'.replace('{expansion}', expansion));
            }
        });
        var route = this.Route(name + query);
        return route;
    };
    Router.prototype.GetMetadataUrl = function () {
        var path = '{base}/{metadata}'.replace('{base}', this.base).replace('{metadata}', '$metadata');
        return path;
    };
    Router.prototype.Where = function (name, operator, value) {
        var template = '{name} {operator} {value}';
        var filter = template.replace('{name}', name)
            .replace('{operator}', operator)
            .replace('{value}', value);
        this.filters.push(filter);
    };
    Router.prototype.Select = function (clause) {
        var targets = Enumerable.From(clause.split(','));
        var value = this.selects[this.target];
        if (!value) {
            value = Enumerable.Empty();
        }
        this.selects[this.target] = value.Union(targets);
    };
    Router.prototype.ExpandAll = function () {
    };
    Router.prototype.Skip = function (count) {
        if (this.skip) {
            throw 'Invalid Operation: Skip can only be called once. ';
        }
        this.skip = count;
    };
    return Router;
})();
var Set = (function () {
    function Set(name) {
        this.Execute = function () {
            var url = this.Router.GetRoute(this.name);
            var task = this.PromiseFactory.Defer();
            var promise = this.Transporter.Get(url);
            promise.then(function (result) {
                var value;
                if (this.Tracker) {
                    value = this.Tracker.Track(result.data.value);
                }
                else {
                    value = result.data.value;
                }
                task.resolve(value);
            }, function (result) {
                task.reject(result);
            });
            return task.promise;
        };
        this.name = name;
        this.TrackerFactory = DependencyResolver.Current.GetFactory('Tracker');
        this.RouterFactory = DependencyResolver.Current.GetFactory('Router');
        this.PromiseFactory = DependencyResolver.Current.Get('PromiseFactory');
        this.Transporter = DependencyResolver.Current.Get('Transport');
        this.MetadataProvider = DependencyResolver.Current.Get('MetadataProvider');
    }
    Set.prototype.Add = function (entity) {
        this.Tracker.Add(entity);
    };
    Set.prototype.Remove = function (entity) {
        this.Tracker.Remove(entity);
    };
    Set.prototype.Where = function (name, operator, value) {
        this.Router.Where(name, operator, value);
        return this;
    };
    Set.prototype.Select = function (clause) {
        this.Router.Select(clause);
        return this;
    };
    ;
    Set.prototype.Expand = function (clause) {
        if (this.expanded)
            throw 'ExpandAll has already been called.  ';
        this.Router.Expand(clause);
        return this;
    };
    Set.prototype.ExpandAll = function () {
        var expanded = true;
        var metadata = this.MetadataProvider.GetMetadata();
        this.Router.ExpandAll(metadata);
        return this;
    };
    Set.prototype.Skip = function (count) {
        this.Router.Skip(count);
        return this;
    };
    Set.prototype.Take = function (count) {
        this.Router.Take(count);
        return this;
    };
    return Set;
})();
var Tracker = (function () {
    function Tracker() {
    }
    Tracker.prototype.Add = function (value) {
    };
    Tracker.prototype.Remove = function (value) {
    };
    Tracker.prototype.GetChanges = function (value) {
    };
    return Tracker;
})();
var Validator = (function () {
    function Validator() {
    }
    return Validator;
})();
var XmlSerializer = (function () {
    function XmlSerializer() {
    }
    XmlSerializer.prototype.Serialize = function (input) {
        return '';
    };
    XmlSerializer.prototype.Deserialize = function (input) {
        return {};
    };
    XmlSerializer.prototype.ParseXml = function (xml) {
    };
    return XmlSerializer;
})();
//# sourceMappingURL=rapid.js.map