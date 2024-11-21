class Serializer {
    /**
     * Serializes an object to JSON, handling nested classes, lists, and dictionaries.
     * @param obj The object to serialize.
     * @returns A JSON string representing the serialized object.
     */
    static serialize(obj: any): string {
        return JSON.stringify(obj, (key, value) => {
            if (Array.isArray(value)) {
                return value; // Do not add __class for arrays
            }
            if (value && typeof value === "object" && value.constructor) {
                return {
                    ...value,
                    __class: value.constructor.name, // Store class name for deserialization
                };
            }
            return value;
        });
    }

    /**
     * Deserializes a JSON string back into an object, restoring classes and nested structures.
     * @param json The JSON string to deserialize.
     * @param classMap A map of class constructors for restoring instances.
     * @returns The deserialized object.
     */
    static deserialize<T>(json: string, classMap: Record<string, new () => T>): T {
        const parsed = JSON.parse(json, (key, value) => {
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
        });
        return parsed;
    }
}

export default Serializer;