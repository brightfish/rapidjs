//Todo: ITransporter

class AngularTransporter  {
    $http: any;
    constructor(http: any) {
        this.$http = http;
    }

    Get(url: string, data: {}) {

        return this.$http.get(url);
    }

    Post(url: string, data: {}) {
        return this.$http.post(url, data);
    }

    Put(url: string, data: {}) {
        return this.$http.put(url, data);
    }

    Delete(url: string, data: {}) {
        return this.$http.delete(url, data);
    }

    Patch(url: string, data: {}) {
        return this.$http.patch(url, data);
    }

    Batch(url, batch) {

    }
}