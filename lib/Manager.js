
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, office) {
    super(name, id, email);
    this.Office = Office;
  }

  getRole() {
    return "Manager";
  }

  getOffice() {
    return this.Office;
  }
    
}

module.exports = Manager;