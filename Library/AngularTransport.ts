namespace Rapid {
    export class AngularTransporter {
        $http: any;

        constructor(http: any) {
            this.$http = http;
        }

        Get(url: string, data: Object): Interfaces.ITask {
            return this.$http.get(url);
        }

        Post(url: string, data: Object): Interfaces.ITask {
            return this.$http.post(url, data);
        }

        Put(url: string, data: Object): Interfaces.ITask {
            return this.$http.put(url, data);
        }

        Delete(url: string, data: Object): Interfaces.ITask {
            return this.$http.delete(url, data);
        }

        Patch(url: string, data: Object): Interfaces.ITask {
            return this.$http.patch(url, data);
        }

        Batch(url: string, batch: Object): Interfaces.ITask {
            throw new Exception();
        }
    }
}