/// <reference path="../build/rapid.js" />

require([
    '../../tests/mocks/MockTracker.js',
    '../../tests/mocks/MockPromiseFactory.js',
    '../../tests/mocks/MockAngularTransport.js',
    '../../tests/mocks/MockRouter.js',
    '../../tests/mocks/MockMetadataProvider.js',
]);


describe('Context', function() {
    var context = null;

    beforeEach(function() {
        DependencyResolver.Current.Set('Tracker', function() { return new MockTracker(); });
        DependencyResolver.Current.Set('PromiseFactory', function() { return new MockPromiseFactory(); });
        DependencyResolver.Current.Set('Transporter', function() { return new AngularTransport($http); });
        DependencyResolver.Current.Set('XmlSerializer', function() { return new XmlSerializer(); });
        DependencyResolver.Current.Set('Serializer', function() { return new JsonSerializer(); });
        DependencyResolver.Current.Set('Router', function() { return new MockRouter(); });
        DependencyResolver.Current.Set('MetadataProvider', function() { return new MockMetadataProvider(); });

        context = new Context();
    });

    it('should initialize', function() {
        expect(context).not.toBe(null);

        var promise = context.Initialize();

        expect(promise).not.toBe(null);
    });

    it('should ', function() {
        var promise = context.Initialize();
        promise.then(() => {
            var barPromise = context.Bars.Execute();
            barPromise.then((results) => {

            });
        });
    });
});