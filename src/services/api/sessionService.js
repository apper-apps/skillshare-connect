import sessionsData from "@/services/mockData/sessions.json";

class SessionService {
  constructor() {
    this.sessions = [...sessionsData];
  }

  async getAll() {
    await this.delay(250);
    return this.sessions.map(session => ({ ...session }));
  }

  async getById(id) {
    await this.delay(200);
    const session = this.sessions.find(s => s.Id === parseInt(id));
    return session ? { ...session } : null;
  }

  async create(sessionData) {
    await this.delay(400);
    const newSession = {
      ...sessionData,
      Id: Math.max(...this.sessions.map(s => s.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    this.sessions.push(newSession);
    return { ...newSession };
  }

  async update(id, sessionData) {
    await this.delay(300);
    const index = this.sessions.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      this.sessions[index] = { ...this.sessions[index], ...sessionData };
      return { ...this.sessions[index] };
    }
    throw new Error("Session not found");
  }

  async delete(id) {
    await this.delay(200);
    const index = this.sessions.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      this.sessions.splice(index, 1);
      return true;
    }
    throw new Error("Session not found");
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const sessionService = new SessionService();