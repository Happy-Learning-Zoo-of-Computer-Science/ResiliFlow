import * as yaml from "js-yaml";

class Serializer {
    /**
     * Serializes an object to YAML, handling nested classes, lists, and dictionaries.
     * @param obj The object to serialize.
     * @returns A YAML string representing the serialized object.
     */
    static serialize(obj: any): string {
        return yaml.dump(obj, {
            replacer: (key: any, value: any) => {
                if (Array.isArray(value)) {
                    return value; // Do not add __class for arrays
                }
                if (value && typeof value === "object" && value.constructor && value.constructor !== Object) {
                    return {
                        ...value,
                        __class: value.constructor.name, // Store class name for deserialization
                    };
                }
                return value;
            },
        });
    }

    /**
     * Deserializes a YAML string back into an object, restoring classes and nested structures.
     * @param yamlString The YAML string to deserialize.
     * @param classMap A map of class constructors for restoring instances.
     * @returns The deserialized object.
     */
    static deserialize<T>(yamlString: string, classMap: Record<string, new () => T>): T {
        const parsed = yaml.load(yamlString);
        const reviver = (key: any, value: any) => {
            if (value && value.__class) {
                const classConstructor = classMap[value.__class];
                if (classConstructor) {
                    const instance = new classConstructor();
                    Object.assign(instance as any, value);
                    delete (instance as any).__class; // Remove the class marker
                    return instance;
                }
            }
            return value;
        };

        return this.traverse(parsed, reviver) as T;
    }

    /**
     * Traverses an object and applies a reviver function to all keys and values.
     * @param obj The object to traverse.
     * @param reviver The reviver function to apply.
     * @returns The transformed object.
     */
    private static traverse(obj: any, reviver: (key: any, value: any) => any): any {
        if (Array.isArray(obj)) {
            return obj.map((item) => this.traverse(item, reviver));
        }
        if (obj && typeof obj === "object" && obj.constructor === Object) {
            const newObj: Record<string, any> = {};
            for (const [key, value] of Object.entries(obj)) {
                newObj[key] = this.traverse(value, reviver);
            }
            return reviver("", newObj);
        }
        return obj;
    }
}

export default Serializer;