import messagesData from "@/services/mockData/messages.json";

class MessageService {
  constructor() {
    this.messages = [...messagesData];
  }

  async getAll() {
    await this.delay(200);
    return this.messages.map(message => ({ ...message }));
  }

  async getById(id) {
    await this.delay(200);
    const message = this.messages.find(m => m.Id === parseInt(id));
    return message ? { ...message } : null;
  }

  async create(messageData) {
    await this.delay(300);
    const newMessage = {
      ...messageData,
      Id: Math.max(...this.messages.map(m => m.Id)) + 1,
      timestamp: new Date().toISOString()
    };
    this.messages.push(newMessage);
    return { ...newMessage };
  }

  async update(id, messageData) {
    await this.delay(300);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index !== -1) {
      this.messages[index] = { ...this.messages[index], ...messageData };
      return { ...this.messages[index] };
    }
    throw new Error("Message not found");
  }

  async delete(id) {
    await this.delay(200);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index !== -1) {
      this.messages.splice(index, 1);
      return true;
    }
    throw new Error("Message not found");
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const messageService = new MessageService();