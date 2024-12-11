import Serializer from "../../src/util/Serializer"; // 假设 Serializer 类位于同一目录
import "jest";

class Address {
    street: string;
    city: string;
    properties: Record<string, any>;

    constructor(street: string = "", city: string = "", properties: Record<string, any> = {}) {
        this.street = street;
        this.city = city;
        this.properties = properties;
    }
}

class User {
    name: string;
    age: number;
    address: Address;
    hobbies: string[];

    constructor(name: string = "", age: number = 0, address: Address = new Address(), hobbies: string[] = []) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.hobbies = hobbies;
    }
}

describe("Serializer Class", () => {
    const classMap = {
        Address: Address,
        User: User,
    };

    test("should serialize and deserialize a simple object", () => {
        const address = new Address("123 Main St", "Springfield", {"test1": 1, "test2": "answer2"});
        const user = new User("John Doe", 30, address, ["reading", "coding"]);

        // Serialize the object
        const json = Serializer.serialize(user);
        expect(typeof json).toBe("string");

        // Deserialize back into an object
        const deserializedUser = Serializer.deserialize<User>(json, classMap as any);
        expect(deserializedUser).toBeInstanceOf(User);
        expect(deserializedUser.name).toBe("John Doe");
        expect(deserializedUser.age).toBe(30);
        expect(deserializedUser.address).toBeInstanceOf(Address);
        expect(deserializedUser.address.street).toBe("123 Main St");
        expect(deserializedUser.address.properties).toStrictEqual({"test1": 1, "test2": "answer2"});
        expect(deserializedUser.hobbies).toEqual(["reading", "coding"]);
    });

    test("should handle nested classes", () => {
        const address = new Address("456 Elm St", "Shelbyville");
        const user = new User("Jane Doe", 25, address, ["painting"]);

        // Serialize and deserialize
        const json = Serializer.serialize(user);
        const deserializedUser = Serializer.deserialize<User>(json, classMap as any);

        expect(deserializedUser.address.city).toBe("Shelbyville");
        expect(deserializedUser.address).toBeInstanceOf(Address);
    });

    test("should handle lists of objects", () => {
        const users = [
            new User("User1", 20, new Address("Street1", "City1"), ["hobby1"]),
            new User("User2", 22, new Address("Street2", "City2"), ["hobby2"]),
        ];

        const json = Serializer.serialize(users);
        const deserializedUsers = Serializer.deserialize<User[]>(json, classMap as any);

        expect(Array.isArray(deserializedUsers)).toBeTruthy();
        expect(deserializedUsers[0]).toBeInstanceOf(User);
        expect(deserializedUsers[0].address).toBeInstanceOf(Address);
        expect(deserializedUsers[1].name).toBe("User2");
    });

    test("should handle dictionaries", () => {
        const data = {
            user1: new User("Alice", 28, new Address("Street A", "City A"), ["hobbyA"]),
            user2: new User("Bob", 32, new Address("Street B", "City B"), ["hobbyB"]),
        };

        const json = Serializer.serialize(data);
        const deserializedData = Serializer.deserialize<Record<string, User>>(json, classMap as any);

        expect(deserializedData.user1).toBeInstanceOf(User);
        expect(deserializedData.user1.address).toBeInstanceOf(Address);
        expect(deserializedData.user1.name).toBe("Alice");
        expect(deserializedData.user2.hobbies).toEqual(["hobbyB"]);
    });

    test("should ignore unknown classes", () => {
        const unknownClassJson = JSON.stringify({
            __class: "UnknownClass",
            data: "some data",
        });

        const deserialized = Serializer.deserialize(unknownClassJson, classMap as any);
        expect(deserialized).toEqual({ __class: "UnknownClass", data: "some data" });
    });
});