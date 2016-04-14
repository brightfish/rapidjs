namespace Rapid{
    export class Exception {
        error: any;
        message: string;
        
        constructor();
        constructor(message: string);
        constructor(message?: string)
        {
            this.error = new Error();
        }
        
        toString(){
            return '{message}\r\n'.replace('{message}', this.error.stack);
        }
    }    
}