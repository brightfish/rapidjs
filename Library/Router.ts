class Router {
    base: string;
    filters: Array<any>;
    target: string = '';
    expands: Linq.Enumerable<{}> = Enumerable.Empty();
    selects: [string, Linq.Enumerable<any>]; //Todo: =  '': Enumerable.Empty() };
    skip: number = 0;
    take: number = 0;
    count: boolean = false;

    constructor(url: string) {
        this.base = url.replace(/\/$/, '');
    }



    Route(relative: string) {
        relative = relative.replace(/^\//, '');
        var path = '{base}/{relative}'.replace('{base}', this.base).replace('{relative}', relative);
        return path;
    }

    GetRoute(name: string) {
        //Todo:  You were here trying to create selections based on previous expansions.  
        var query = '?'

        var selections = this.selects[''];
        if (selections.Any()) {
            query = query.concat('$select={selection}&'.replace('{selection}', selections.ToArray().join(',')));
        }

        this.expands.ForEach(function (expansion:string) {

            var select = this.selects[expansion];

            if (select) {
                var selection = select.ToArray().join(',');
                var template = '$expand={expansion}($select={selection})&'.replace('{expansion}', expansion).replace('{selection}', selection);
                query = query.concat(template);
            }
            else {
                query = query.concat('$expand={expansion}&'.replace('{expansion}', expansion));
            }
        });

        var route = this.Route(name + query);

        return route;
    }

    GetMetadataUrl() {
        var path = '{base}/{metadata}'.replace('{base}', this.base).replace('{metadata}', '$metadata');
        return path;
    }

    Where(name: string, operator: string, value: string) {
        var template = '{name} {operator} {value}';
        var filter = template.replace('{name}', name)
            .replace('{operator}', operator)
            .replace('{value}', value);
        this.filters.push(filter);
    }

    Select(clause: string) {
        var targets = Enumerable.From(clause.split(','));

        var value = this.selects[this.target];
        if (!value) {
            value = Enumerable.Empty();
        }

        this.selects[this.target] = value.Union(targets);
    }

    Expand = function (clause: string) {
        var targets = Enumerable.From(clause.split(','));
        this.target = targets.Last();
        this.expands = this.expands.Union(targets);
    }

    ExpandAll() {
        //Todo:  
    }

    Skip(count: number) {
        if (this.skip) {
            throw 'Invalid Operation: Skip can only be called once. ';
        }

        this.skip = count;
    }

    Take = function (count) {
        if (this.take) {
            throw 'Invalid Operation: Take can only be called once. ';
        }

        this.take = count;
    }

    Count = function () {
        if (this.count) {
            throw 'Invalid Operation: Count can only be called once. ';
        }
    }

    OrderBy = function (clause) {
        if (this.orderby) {
            throw 'Invalid Operation: OrderBy can only be called once. '
        }
    }
}