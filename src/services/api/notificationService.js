import notificationsData from "@/services/mockData/notifications.json";

class NotificationService {
  constructor() {
    this.notifications = [...notificationsData];
  }

  async getAll() {
    await this.delay(200);
    return this.notifications.map(notification => ({ ...notification }));
  }

  async getById(id) {
    await this.delay(200);
    const notification = this.notifications.find(n => n.Id === parseInt(id));
    return notification ? { ...notification } : null;
  }

  async create(notificationData) {
    await this.delay(300);
    const newNotification = {
      ...notificationData,
      Id: Math.max(...this.notifications.map(n => n.Id)) + 1,
      timestamp: new Date().toISOString()
    };
    this.notifications.push(newNotification);
    return { ...newNotification };
  }

  async update(id, notificationData) {
    await this.delay(300);
    const index = this.notifications.findIndex(n => n.Id === parseInt(id));
    if (index !== -1) {
      this.notifications[index] = { ...this.notifications[index], ...notificationData };
      return { ...this.notifications[index] };
    }
    throw new Error("Notification not found");
  }

  async delete(id) {
    await this.delay(200);
    const index = this.notifications.findIndex(n => n.Id === parseInt(id));
    if (index !== -1) {
      this.notifications.splice(index, 1);
      return true;
    }
    throw new Error("Notification not found");
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const notificationService = new NotificationService();