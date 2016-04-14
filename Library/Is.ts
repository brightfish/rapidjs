namespace Rapid {
    export class Is {
        public static Array(value) {
            return Array.isArray(value);
        }

        public static Object(value) {
            if (Is.Null(value))
                return false;
            if (Is.Date(value))
                return false;
            if (Is.Array(value))
                return false;
            return typeof value === 'object';
        }

        public static String(value) {
            return typeof value === 'string';
        }

        public static Null(value) {
            return value === null;
        }

        public static Undefined(value) {
            return value === undefined;
        }

        public static Number(value) {
            return typeof value === 'number';
        }

        public static Date(value) {
            return value instanceof Date;
        }

        public static Bool(value) {
            return typeof value === 'boolean';
        }

        public static Defined(value) {
            if (Is.Undefined(value))
                return false;
            if (Is.Null(value))
                return false;

            return true;
        }

        public static ReferenceType(value) {
            if (Is.Null(value))
                return true;
            if (Is.Date(value))
                return true;
            if (Is.Object(value))
                return true;
            if (Is.Array(value))
                return true;

            return false;
        }

        public static ValueType(value) {
            return !this.ReferenceType(value);
        }

        public static SameType(one, two): boolean {

            if (Is.Date(one) && Is.Date(two))
                return true;
            if (Is.Number(one) && Is.Number(two))
                return true;
            if (Is.Bool(one) && Is.Bool(two))
                return true;
            if (Is.Array(one) && Is.Array(two))
                return true;
            if (Is.String(one) && Is.String(two))
                return true;
            if (Is.Object(one) && Is.Object(two))
                return one instanceof two;

            return false;
        }
    }
}