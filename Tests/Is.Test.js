describe('Is', function() {
    it('should identify arrays', function() {
        expect(Rapid.Is.Array({})).toEqual(false);
        expect(Rapid.Is.Array('One')).toEqual(false);
        expect(Rapid.Is.Array(1)).toEqual(false);
        expect(Rapid.Is.Array(new Date())).toEqual(false);
        expect(Rapid.Is.Array(true)).toEqual(false);
        expect(Rapid.Is.Array(null)).toEqual(false);
        expect(Rapid.Is.Array(undefined)).toEqual(false);
        expect(Rapid.Is.Array([])).toEqual(true);
    });

    it('should identify objects', function() {
        expect(Rapid.Is.Object({})).toEqual(true);
        expect(Rapid.Is.Object('One')).toEqual(false);
        expect(Rapid.Is.Object(1)).toEqual(false);
        expect(Rapid.Is.Object(new Date())).toEqual(false);
        expect(Rapid.Is.Object(true)).toEqual(false);
        expect(Rapid.Is.Object(null)).toEqual(false);
        expect(Rapid.Is.Object(undefined)).toEqual(false);
        expect(Rapid.Is.Object([])).toEqual(false);
    });

    it('should identify strings', function() {
        expect(Rapid.Is.String({})).toEqual(false);
        expect(Rapid.Is.String('One')).toEqual(true);
        expect(Rapid.Is.String(1)).toEqual(false);
        expect(Rapid.Is.String(new Date())).toEqual(false);
        expect(Rapid.Is.String(true)).toEqual(false);
        expect(Rapid.Is.String(null)).toEqual(false);
        expect(Rapid.Is.String(undefined)).toEqual(false);
        expect(Rapid.Is.String([])).toEqual(false);
    });

    it('should identify null', function() {
        expect(Rapid.Is.Null({})).toEqual(false);
        expect(Rapid.Is.Null('One')).toEqual(false);
        expect(Rapid.Is.Null(1)).toEqual(false);
        expect(Rapid.Is.Null(new Date())).toEqual(false);
        expect(Rapid.Is.Null(true)).toEqual(false);
        expect(Rapid.Is.Null(null)).toEqual(true);
        expect(Rapid.Is.Null(undefined)).toEqual(false);
        expect(Rapid.Is.Null([])).toEqual(false);
    });

    it('should identify undefined variables', function() {
        expect(Rapid.Is.Undefined({})).toEqual(false);
        expect(Rapid.Is.Undefined('One')).toEqual(false);
        expect(Rapid.Is.Undefined(1)).toEqual(false);
        expect(Rapid.Is.Undefined(new Date())).toEqual(false);
        expect(Rapid.Is.Undefined(true)).toEqual(false);
        expect(Rapid.Is.Undefined(null)).toEqual(false);
        expect(Rapid.Is.Undefined(undefined)).toEqual(true);
        expect(Rapid.Is.Undefined([])).toEqual(false);
    });
    
    it('should identify undefined numbers', function () {
        expect(Rapid.Is.Number({})).toEqual(false);
        expect(Rapid.Is.Number('One')).toEqual(false);
        expect(Rapid.Is.Number(1)).toEqual(true);
        expect(Rapid.Is.Number(new Date())).toEqual(false);
        expect(Rapid.Is.Number(true)).toEqual(false);
        expect(Rapid.Is.Number(null)).toEqual(false);
        expect(Rapid.Is.Number(undefined)).toEqual(false);
        expect(Rapid.Is.Number([])).toEqual(false);
    });
    
    it('should identify dates', function() {
        expect(Rapid.Is.Date({})).toEqual(false);
        expect(Rapid.Is.Date('One')).toEqual(false);
        expect(Rapid.Is.Date(1)).toEqual(false);
        expect(Rapid.Is.Date(new Date())).toEqual(true);
        expect(Rapid.Is.Date(true)).toEqual(false);
        expect(Rapid.Is.Date(null)).toEqual(false);
        expect(Rapid.Is.Date(undefined)).toEqual(false);
        expect(Rapid.Is.Date([])).toEqual(false);
    });
    
    it('should identify booleans', function() {
        expect(Rapid.Is.Bool({})).toEqual(false);
        expect(Rapid.Is.Bool('One')).toEqual(false);
        expect(Rapid.Is.Bool(1)).toEqual(false);
        expect(Rapid.Is.Bool(new Date())).toEqual(false);
        expect(Rapid.Is.Bool(true)).toEqual(true);
        expect(Rapid.Is.Bool(null)).toEqual(false);
        expect(Rapid.Is.Bool(undefined)).toEqual(false);
        expect(Rapid.Is.Bool([])).toEqual(false);
    });
    
    it('should identify defined variables', function() {
        expect(Rapid.Is.Defined({})).toEqual(true);
        expect(Rapid.Is.Defined('One')).toEqual(true);
        expect(Rapid.Is.Defined(1)).toEqual(true);
        expect(Rapid.Is.Defined(new Date())).toEqual(true);
        expect(Rapid.Is.Defined(true)).toEqual(true);
        expect(Rapid.Is.Defined(null)).toEqual(false);
        expect(Rapid.Is.Defined(undefined)).toEqual(false);
        expect(Rapid.Is.Defined([])).toEqual(true);
    });
    
    it('should identify reference types', function() {
        expect(Rapid.Is.ReferenceType({})).toEqual(true);
        expect(Rapid.Is.ReferenceType('One')).toEqual(false);
        expect(Rapid.Is.ReferenceType(1)).toEqual(false);
        expect(Rapid.Is.ReferenceType(new Date())).toEqual(true);
        expect(Rapid.Is.ReferenceType(true)).toEqual(false);
        expect(Rapid.Is.ReferenceType(null)).toEqual(true);
        expect(Rapid.Is.ReferenceType(undefined)).toEqual(false);
        expect(Rapid.Is.ReferenceType([])).toEqual(true);
    }); 
       
    it('should identify value types', function() {
        expect(Rapid.Is.ValueType({})).toEqual(false);
        expect(Rapid.Is.ValueType('One')).toEqual(true);
        expect(Rapid.Is.ValueType(1)).toEqual(true);
        expect(Rapid.Is.ValueType(new Date())).toEqual(false);
        expect(Rapid.Is.ValueType(true)).toEqual(true);
        expect(Rapid.Is.ValueType(null)).toEqual(false);
        expect(Rapid.Is.ValueType(undefined)).toEqual(true);
        expect(Rapid.Is.ValueType([])).toEqual(false);
    });
});