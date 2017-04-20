import Foundation

@objc class Person: Entity {
  var name: String!
  var age:  Int!

  init(name: String, age: Int) {
    /* /* ... */ */
  }

  // Return a descriptive string for this person
  func description(offset: Int = 0) -> String {
    return "\(name) is \(age + offset) years old"
  }
}
