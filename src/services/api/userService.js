import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async getAll() {
    await this.delay(200);
    return this.users.map(user => ({ ...user }));
  }

  async getById(id) {
    await this.delay(200);
    const user = this.users.find(u => u.Id === parseInt(id));
    return user ? { ...user } : null;
  }

  async create(userData) {
    await this.delay(300);
    const newUser = {
      ...userData,
      Id: Math.max(...this.users.map(u => u.Id)) + 1,
      joinedDate: new Date().toISOString()
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await this.delay(300);
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return { ...this.users[index] };
    }
    throw new Error("User not found");
  }

  async delete(id) {
    await this.delay(200);
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    throw new Error("User not found");
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const userService = new UserService();