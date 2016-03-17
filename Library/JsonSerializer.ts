var JsonSerializer = function () {
    var self = this;

    self.Serialize = function (input) {
        return JSON.stringify(input);
    }

    self.Deserialize = function (input) {
        return JSON.parse(input);
    }

    return self;
}