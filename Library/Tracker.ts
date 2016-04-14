namespace Rapid {
    export class Tracker {
        private counter: number;
        private tracks: Dictionary<number, Interfaces.ITrackable>;
        private changes: Dictionary<number, List<Change>>;

        constructor() {
            this.counter = 0;
            this.tracks = new Dictionary<number, any>();
            this.changes = new Dictionary<number, List<Change>>();
        }

        public Track(value: Interfaces.ITrackable) {
            if (Is.ValueType(value))
                throw new Exception('Value Types cannot be tracked.');

            this.RecursiveTrack(value);
        }

        private RecursiveTrack(value: any) {
            var self = this;
            if (Is.Object(value)) {
                var tracked: boolean = false;

                if (Is.Defined(value.__TrackingId__))
                    tracked = self.tracks.Contains(value.__TrackingId__);

                if (tracked)
                    return;

                value.__TrackingId__ = ++self.counter;

                self.tracks.Add(value.__TrackingId__, value);

                for (var k in value) {
                    (function(key) {
                        var property = value[key];

                        if (key === '__TrackingId__')
                            return;

                        Object.defineProperty(value, key, {
                            get: function() { return property; },
                            set: function(next) {
                                var previous = this[key];
                              
                                if (!Is.Null(previous) && !Is.Null(next)) {
                                    if (!Is.SameType(previous, next)) {
                                        throw new Exception('Type switching is not allowed.')
                                    }
                                }

                                var referenceChanges = self.changes.ToEnumerable()
                                    .FirstOrDefault(new KeyValuePair<number, List<Change>>(),
                                    (kvp: KeyValuePair<number, List<Change>>) => kvp.Key === this.__TrackingId__).Value;

                                if (Is.Null(referenceChanges)) {
                                    referenceChanges = new List<Change>();
                                    self.changes.Add(this.__TrackingId__, referenceChanges);
                                }

                                var change = referenceChanges.ToEnumerable().FirstOrDefault(null, (change) => change.Name === key);

                                if (Is.Null(change)) {
                                    change = new Change();
                                    referenceChanges.Add(change);
                                }

                                change.Name = key;
                                change.Previous = previous;
                                change.Next = next;

                                if (Is.ReferenceType(next)) {
                                    if (Is.Null(previous)) {
                                        change.Type = ChangeTypes.Add;
                                    }
                                    else if (Is.Null(next)) {
                                        change.Type = ChangeTypes.Delete;
                                    }
                                    else {
                                        change.Type = ChangeTypes.Edit;
                                    }
                                }
                                else {
                                    change.Type = ChangeTypes.Edit;
                                }
                            }
                        });

                        if (Is.ReferenceType(property)) {
                            self.RecursiveTrack(property);
                        }
                    })(k);
                }
            }
            else if (Is.Array(value)) {
                //Todo: This is where you left off.
                for (var index in value) {
                    var property = value[index];

                    if (Is.ReferenceType(property) && !Is.Date(property)) {
                        this.RecursiveTrack(property);
                    }
                    else {
                        var self = this;
                        Object.defineProperty(value, index, {
                            get: function() { return property; },
                            set: function(next) {

                                //var change = new Change(index, ChangeTypes.Edit, property, next);
                                //self.changes.Add(property.__TrackingId__, change);
                            }
                        });
                    }
                }
            }
        }

        public Remove(input: Interfaces.ITrackable): boolean {
            return this.tracks.Remove(input.__TrackingId__);
        }

        public GetChanges(input: Interfaces.ITrackable): List<Change> {
            var changes = this.RecursiveGetChanges(input);
            return changes;
        }

        private RecursiveGetChanges(input: Interfaces.ITrackable): List<Change> {
            if (Is.Undefined(input)) {
                return;
            }
            if (Is.Undefined(input.__TrackingId__)) {
                throw new Exception('Object in object graph is not being tracked.')
            }
            var self = this;
            var changes = this.changes.ToEnumerable()
                .FirstOrDefault(new KeyValuePair<number, List<Change>>(), kvp => kvp.Key == input.__TrackingId__).Value;

            if (Is.Null(changes)) {
                changes = new List<Change>();
            }

            for (var key in input) {
                var property = input[key];
                if (!Is.Null(property)) {
                    if (Is.ReferenceType(property) && !Is.Date(property)) {
                        var propertyChanges = self.RecursiveGetChanges(property);
                        changes = new List<Change>(propertyChanges.ToEnumerable().Union(changes.ToEnumerable()));
                    }
                }
            }

            return changes;
        }
    }
}