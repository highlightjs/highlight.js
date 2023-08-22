import ballerina/io;

// Modules and functions can declare variables. You can see both in this example.
// Here we declare a variable `greeting` of type `string` and initialize it to `"Hello"`.
string greeting = "Hello";

public function main() {
    // Assignments are statements not expressions.
    string name = "Ballerina";

    io:println(greeting, " ", name);
}