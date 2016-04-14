require([

]);

describe('Tracker', function() {
    var tracker = null;

    beforeEach(function() {
        tracker = new Rapid.Tracker();
    });

    it('should initialize', function() {
        expect(tracker).not.toBe(null);
    });

    it('should fail on value types', function() {
        var input = 1;

        expect(function() {
            tracker.Track(input);
        }).toThrow();
    });

    it('should track changes to value types', function() {
        var input = {
            String: 'One',
            Number: 1,
            Date: new Date(),
            Boolean: true
        };

        tracker.Track(input);

        input.String = 'Two';
        input.Number = 2;
        input.Date = new Date(2014, 8, 18);
        input.Boolean = false;

        var changes = tracker.GetChanges(input);

        expect(changes.Count).toEqual(4);
        //Todo: figure out how to get names back from changes like 'input.Object.String'
    });

    it('should track changes as edit if value types are modified', function() {
        var input = {
            String: 'One'
        };

        tracker.Track(input);

        input.String = 'Two';

        var changes = tracker.GetChanges(input);
        var change = changes.ToEnumerable().First();

        expect(changes.Count).toEqual(1);
        expect(change.Type).toEqual(Rapid.ChangeTypes.Edit);
    });

    it('should track changes as add if object is null then set', function() {
        var input = {
            Object: null
        };

        tracker.Track(input);

        input.Object = {};

        var changes = tracker.GetChanges(input);
        var change = changes.ToEnumerable().First();

        expect(changes.Count).toEqual(1);
        expect(change.Type).toEqual(Rapid.ChangeTypes.Add);
    });

    it('should track changes as remove if object is set to null', function() {
        var input = {
            Object: {}
        };

        tracker.Track(input);

        input.Object = null;

        var changes = tracker.GetChanges(input);
        var change = changes.ToEnumerable().First();

        expect(changes.Count).toEqual(1);
        expect(change.Type).toEqual(Rapid.ChangeTypes.Delete);
    });

    it('should track sub object changes in objects', function() {
        var input = {
            Object: {
                String: 'One'
            }
        };

        tracker.Track(input);

        input.Object.String = 'Two';

        var changes = tracker.GetChanges(input);
        expect(changes.Count).toEqual(1);

        var change = changes.ToEnumerable().First();

        expect(change.Type).toEqual(Rapid.ChangeTypes.Edit);
        expect(change.Previous).toEqual('One');
        expect(change.Next).toEqual('Two');
    });

    it('should throw error when object is set to undefined', function() {
        //not sure about this one.  Is undefined ok for objects?  will it cause issues further down the line?  
    });

    it('should throw exception if value type changed', function() {
        var input = {
            String: 'One'
        };

        tracker.Track(input);

        expect(function() {
            input.String = 2;
        }).toThrow();
    });

    it('should track circular references', function() {
        var input = {
            String: 'One',
            Reference: input
        };

        tracker.Track(input);

        input.String = 'Two';

        var changes = tracker.GetChanges(input);
        var change = changes.ToEnumerable().First();

        expect(changes.Count).toEqual(1);
        expect(change.Type).toEqual(Rapid.ChangeTypes.Edit);
        expect(change.Previous).toEqual('One');
        expect(change.Next).toEqual('Two');
    });

    it('should track value changes in arrays', function() {
        var input = [
            'One',
            1,
            new Date()
        ];

        tracker.Track(input);
        
        input[0] = 'Two';
        
        var changes = tracker.GetChanges(input);
        expect(changes.Count).toEqual(1);
        
    });

    it('should track object changes in arrays', function() {
        var input = [ 
            { String: 'One' }
        ];
        
        tracker.Track(input);
        
        input[0].String = 'Two';
        
        var changes = tracker.GetChanges(input);
        expect(changes.Count).toEqual(1);
    });
});