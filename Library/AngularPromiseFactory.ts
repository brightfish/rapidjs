namespace Rapid {
    export class AngularPromiseFactory implements Interfaces.IPromiseFactory {
        $q: any;
        constructor(q: any) {
            this.$q = q;
        }

        Defer() {
            return this.$q.defer();
        }
    }
}