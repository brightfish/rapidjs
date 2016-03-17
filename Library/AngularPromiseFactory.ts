class AngularPromiseFactory implements IPromiseFactory {
    $q: any;
    constructor(q: any){
        this.$q = q;
    }

    Defer() {
        return this.$q.defer();
    }
}