import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');

// Ensure data directory exists
async function initStorage() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(USERS_FILE, '[]', { flag: 'wx' });
    await fs.writeFile(MOVIES_FILE, '[]', { flag: 'wx' });
  } catch (error) {
    // Files might already exist, that's ok
  }
}

initStorage();

export const storage = {
  async getUsers() {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  },

  async saveUsers(users: any[]) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  },

  async getMovies() {
    const data = await fs.readFile(MOVIES_FILE, 'utf8');
    return JSON.parse(data);
  },

  async saveMovies(movies: any[]) {
    await fs.writeFile(MOVIES_FILE, JSON.stringify(movies, null, 2));
  }
};