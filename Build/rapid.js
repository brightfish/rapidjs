var Rapid;
(function (Rapid) {
    var AngularPromiseFactory = (function () {
        function AngularPromiseFactory(q) {
            this.$q = q;
        }
        AngularPromiseFactory.prototype.Defer = function () {
            return this.$q.defer();
        };
        return AngularPromiseFactory;
    })();
    Rapid.AngularPromiseFactory = AngularPromiseFactory;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
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
            throw new Rapid.Exception();
        };
        return AngularTransporter;
    })();
    Rapid.AngularTransporter = AngularTransporter;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Change = (function () {
        function Change() {
        }
        return Change;
    })();
    Rapid.Change = Change;
    (function (ChangeTypes) {
        ChangeTypes[ChangeTypes["Add"] = 0] = "Add";
        ChangeTypes[ChangeTypes["Edit"] = 1] = "Edit";
        ChangeTypes[ChangeTypes["Delete"] = 2] = "Delete";
    })(Rapid.ChangeTypes || (Rapid.ChangeTypes = {}));
    var ChangeTypes = Rapid.ChangeTypes;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Context = (function () {
        function Context(Tracker, PromiseFactory) {
            this.Dispose = function () {
            };
            this.Tracker = Rapid.DependencyResolver.Current.Get('Tracker');
            this.PromiseFactory = Rapid.DependencyResolver.Current.Get('PromiseFactory');
            this.Transport = Rapid.DependencyResolver.Current.Get('Transporter');
            this.XmlSerializer = Rapid.DependencyResolver.Current.Get('XmlSerializer');
            this.Serializer = Rapid.DependencyResolver.Current.Get('Serializer');
            this.Router = Rapid.DependencyResolver.Current.Get('Router');
            this.MetadataProvider = Rapid.DependencyResolver.Current.Get('MetadataProvider');
            this.ValidatorFactory = Rapid.DependencyResolver.Current.GetFactory('Validator');
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
    Rapid.Context = Context;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
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
        DependencyResolver.Current = new DependencyResolver();
        return DependencyResolver;
    })();
    Rapid.DependencyResolver = DependencyResolver;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Dictionary = (function () {
        function Dictionary() {
            this.keys = new Array();
            this.values = new Array();
        }
        Object.defineProperty(Dictionary.prototype, "Keys", {
            get: function () {
                return Enumerable.From(this.keys);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "Values", {
            get: function () {
                return Enumerable.From(this.values);
            },
            enumerable: true,
            configurable: true
        });
        Dictionary.prototype.Add = function (key, value) {
            if (this.Contains(key))
                throw new Rapid.Exception('Key already exists');
            this.keys.push(key);
            this.values.push(value);
        };
        Dictionary.prototype.Remove = function (key) {
            if (!this.Contains(key))
                return false;
            var index = this.keys.indexOf(key);
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            return true;
            ;
        };
        Dictionary.prototype.Clear = function () {
            delete this.keys;
            delete this.values;
            this.keys = new Array();
            this.values = new Array();
        };
        Dictionary.prototype.Contains = function (key) {
            return this.keys.indexOf(key) > 0;
        };
        Dictionary.prototype.ToEnumerable = function () {
            var entries = new Rapid.List();
            for (var i = 0; i < this.keys.length; i++) {
                var key = this.keys[i];
                var value = this.values[i];
                var kvp = new Rapid.KeyValuePair(key, value);
                entries.Add(kvp);
            }
            return entries.ToEnumerable();
        };
        return Dictionary;
    })();
    Rapid.Dictionary = Dictionary;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Exception = (function () {
        function Exception(message) {
            this.error = new Error();
        }
        Exception.prototype.toString = function () {
            return '{message}\r\n'.replace('{message}', this.error.stack);
        };
        return Exception;
    })();
    Rapid.Exception = Exception;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Factory = (function () {
        function Factory() {
        }
        Factory.prototype.Create = function (output) {
            return new output();
        };
        return Factory;
    })();
    Rapid.Factory = Factory;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Is = (function () {
        function Is() {
        }
        Is.Array = function (value) {
            return Array.isArray(value);
        };
        Is.Object = function (value) {
            if (Is.Null(value))
                return false;
            if (Is.Date(value))
                return false;
            if (Is.Array(value))
                return false;
            return typeof value === 'object';
        };
        Is.String = function (value) {
            return typeof value === 'string';
        };
        Is.Null = function (value) {
            return value === null;
        };
        Is.Undefined = function (value) {
            return value === undefined;
        };
        Is.Number = function (value) {
            return typeof value === 'number';
        };
        Is.Date = function (value) {
            return value instanceof Date;
        };
        Is.Bool = function (value) {
            return typeof value === 'boolean';
        };
        Is.Defined = function (value) {
            if (Is.Undefined(value))
                return false;
            if (Is.Null(value))
                return false;
            return true;
        };
        Is.ReferenceType = function (value) {
            if (Is.Null(value))
                return true;
            if (Is.Date(value))
                return true;
            if (Is.Object(value))
                return true;
            if (Is.Array(value))
                return true;
            return false;
        };
        Is.ValueType = function (value) {
            return !this.ReferenceType(value);
        };
        Is.SameType = function (one, two) {
            if (Is.Date(one) && Is.Date(two))
                return true;
            if (Is.Number(one) && Is.Number(two))
                return true;
            if (Is.Bool(one) && Is.Bool(two))
                return true;
            if (Is.Array(one) && Is.Array(two))
                return true;
            if (Is.String(one) && Is.String(two))
                return true;
            if (Is.Object(one) && Is.Object(two))
                return one instanceof two;
            return false;
        };
        return Is;
    })();
    Rapid.Is = Is;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var JsonSerializer = (function () {
        function JsonSerializer() {
        }
        JsonSerializer.prototype.Serialize = function (input) {
            return JSON.stringify(input);
        };
        JsonSerializer.prototype.Deserialize = function (input) {
            return JSON.parse(input);
        };
        return JsonSerializer;
    })();
    Rapid.JsonSerializer = JsonSerializer;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var KeyValuePair = (function () {
        function KeyValuePair(key, value) {
            this.Key = Rapid.Is.Defined(key) ? key : null;
            this.Value = Rapid.Is.Defined(value) ? value : null;
        }
        return KeyValuePair;
    })();
    Rapid.KeyValuePair = KeyValuePair;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var List = (function () {
        function List(input) {
            if (Rapid.Is.Defined(input)) {
                this.list = input.ToArray();
            }
            else {
                this.list = new Array();
            }
        }
        Object.defineProperty(List.prototype, "Count", {
            get: function () {
                return this.list.length;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.Add = function (input) {
            this.list.push(input);
        };
        List.prototype.Remove = function (input) {
            var index = this.list.indexOf(input);
            if (index < 0)
                return false;
            this.list.splice(index, 1);
            return true;
        };
        List.prototype.Clear = function () {
            delete this.list;
            this.list = new Array();
        };
        List.prototype.Contains = function (input) {
            return this.list.indexOf(input) > 0;
        };
        List.prototype.IndexOf = function (input) {
            return this.list.indexOf(input);
        };
        List.prototype.Insert = function (index, value) {
            if (index > this.list.length)
                throw new Rapid.Exception();
        };
        List.prototype.Reverse = function () {
            this.list = this.list.reverse();
        };
        List.prototype.ToEnumerable = function () {
            return Enumerable.From(this.list);
        };
        return List;
    })();
    Rapid.List = List;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var MetadataProvider = (function () {
        function MetadataProvider(router, transport, promiseFactory, xmlSerializer) {
            this.Router = router;
            this.Transporter = transport;
            this.PromiseFactory = promiseFactory;
            this.XmlSerializer = xmlSerializer;
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
            for (var _i = 0, _a = schema.EntityContainer.EntitySet; _i < _a.length; _i++) {
                var entitySet = _a[_i];
                var name = entitySet['@Name'];
                var set = new Rapid.Set(name);
                context[name] = set;
            }
        };
        return MetadataProvider;
    })();
    Rapid.MetadataProvider = MetadataProvider;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
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
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
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
            this.TrackerFactory = Rapid.DependencyResolver.Current.GetFactory('Tracker');
            this.RouterFactory = Rapid.DependencyResolver.Current.GetFactory('Router');
            this.PromiseFactory = Rapid.DependencyResolver.Current.Get('PromiseFactory');
            this.Transporter = Rapid.DependencyResolver.Current.Get('Transport');
            this.MetadataProvider = Rapid.DependencyResolver.Current.Get('MetadataProvider');
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
                throw new Rapid.Exception('ExpandAll has already been called.  ');
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
    Rapid.Set = Set;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Tracker = (function () {
        function Tracker() {
            this.counter = 0;
            this.tracks = new Rapid.Dictionary();
            this.changes = new Rapid.Dictionary();
        }
        Tracker.prototype.Track = function (value) {
            if (Rapid.Is.ValueType(value))
                throw new Rapid.Exception('Value Types cannot be tracked.');
            this.RecursiveTrack(value);
        };
        Tracker.prototype.RecursiveTrack = function (value) {
            var self = this;
            var tracked = false;
            if (Rapid.Is.Null(value))
                return;
            if (Rapid.Is.Defined(value.__TrackingId__))
                tracked = self.tracks.Contains(value.__TrackingId__);
            if (tracked)
                return;
            value.__TrackingId__ = ++self.counter;
            self.tracks.Add(value.__TrackingId__, value);
            for (var k in value) {
                (function (key) {
                    var property = value[key];
                    if (key === '__TrackingId__')
                        return;
                    Object.defineProperty(value, key, {
                        get: function () { return property; },
                        set: function (next) {
                            var _this = this;
                            var previous = this[key];
                            if (!Rapid.Is.Null(previous) && !Rapid.Is.Null(next)) {
                                if (!Rapid.Is.SameType(previous, next)) {
                                    throw new Rapid.Exception('Type switching is not allowed.');
                                }
                            }
                            var referenceChanges = self.changes.ToEnumerable()
                                .FirstOrDefault(new Rapid.KeyValuePair(), function (kvp) { return kvp.Key === _this.__TrackingId__; }).Value;
                            if (Rapid.Is.Null(referenceChanges)) {
                                referenceChanges = new Rapid.List();
                                self.changes.Add(this.__TrackingId__, referenceChanges);
                            }
                            var change = referenceChanges.ToEnumerable().FirstOrDefault(null, function (change) { return change.Name === key; });
                            if (Rapid.Is.Null(change)) {
                                change = new Rapid.Change();
                                referenceChanges.Add(change);
                            }
                            change.Name = key;
                            change.Previous = previous;
                            change.Next = next;
                            if (Rapid.Is.ReferenceType(next)) {
                                if (Rapid.Is.Null(previous)) {
                                    change.Type = Rapid.ChangeTypes.Add;
                                }
                                else if (Rapid.Is.Null(next)) {
                                    change.Type = Rapid.ChangeTypes.Delete;
                                }
                                else {
                                    change.Type = Rapid.ChangeTypes.Edit;
                                }
                            }
                            else {
                                change.Type = Rapid.ChangeTypes.Edit;
                            }
                        }
                    });
                    if (Rapid.Is.ReferenceType(property)) {
                        self.RecursiveTrack(property);
                    }
                })(k);
            }
        };
        Tracker.prototype.Remove = function (input) {
            return this.tracks.Remove(input.__TrackingId__);
        };
        Tracker.prototype.GetChanges = function (input) {
            var changes = this.RecursiveGetChanges(input);
            return changes;
        };
        Tracker.prototype.RecursiveGetChanges = function (input) {
            if (Rapid.Is.Undefined(input)) {
                return;
            }
            if (Rapid.Is.Undefined(input.__TrackingId__)) {
                throw new Rapid.Exception('Object in object graph is not being tracked.');
            }
            var self = this;
            var changes = this.changes.ToEnumerable()
                .FirstOrDefault(new Rapid.KeyValuePair(), function (kvp) { return kvp.Key == input.__TrackingId__; }).Value;
            if (Rapid.Is.Null(changes)) {
                changes = new Rapid.List();
            }
            for (var key in input) {
                var property = input[key];
                if (!Rapid.Is.Null(property)) {
                    if (Rapid.Is.ReferenceType(property) && !Rapid.Is.Date(property)) {
                        var propertyChanges = self.RecursiveGetChanges(property);
                        changes = new Rapid.List(propertyChanges.ToEnumerable().Union(changes.ToEnumerable()));
                    }
                }
            }
            return changes;
        };
        return Tracker;
    })();
    Rapid.Tracker = Tracker;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var Validator = (function () {
        function Validator() {
        }
        Validator.prototype.Validate = function (input) {
            return true;
        };
        return Validator;
    })();
    Rapid.Validator = Validator;
})(Rapid || (Rapid = {}));
var Rapid;
(function (Rapid) {
    var XmlSerializer = (function () {
        function XmlSerializer() {
        }
        XmlSerializer.prototype.Serialize = function (input) {
            var serializer = new XMLSerializer();
            return serializer.serializeToString(input);
        };
        XmlSerializer.prototype.Deserialize = function (input) {
            var parser = new DOMParser();
            return parser.parseFromString(input, 'text/xml');
        };
        return XmlSerializer;
    })();
    Rapid.XmlSerializer = XmlSerializer;
})(Rapid || (Rapid = {}));
//# sourceMappingURL=rapid.js.map