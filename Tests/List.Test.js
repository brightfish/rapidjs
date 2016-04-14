describe('List', function() {
    var list;

    beforeEach(function() {
        list = new List();
    });

    describe('Add', function() {
        it('should increase count by number of items added', function() {
            list.Add(1);
            expect(list.Count).toEqual(1);
        });
    });
    describe('Remove', function() {

    });
    describe('Clear', function() {

    });
    describe('Contains', function() {

    })
});