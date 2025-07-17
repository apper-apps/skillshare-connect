import skillsData from "@/services/mockData/skills.json";

class SkillService {
  constructor() {
    this.skills = [...skillsData];
  }

  async getAll() {
    await this.delay(300);
    return this.skills.map(skill => ({ ...skill }));
  }

  async getById(id) {
    await this.delay(200);
    const skill = this.skills.find(s => s.Id === parseInt(id));
    return skill ? { ...skill } : null;
  }

  async create(skillData) {
    await this.delay(400);
    const newSkill = {
      ...skillData,
      Id: Math.max(...this.skills.map(s => s.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    this.skills.push(newSkill);
    return { ...newSkill };
  }

  async update(id, skillData) {
    await this.delay(300);
    const index = this.skills.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      this.skills[index] = { ...this.skills[index], ...skillData };
      return { ...this.skills[index] };
    }
    throw new Error("Skill not found");
  }

  async delete(id) {
    await this.delay(200);
    const index = this.skills.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      this.skills.splice(index, 1);
      return true;
    }
    throw new Error("Skill not found");
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const skillService = new SkillService();