import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');
const IMAGES_FILE = path.join(DATA_DIR, 'images.json');

interface Image {
  id: string;
  data: string;
  userId: string;
}

interface Movie {
  id: string;
  title: string;
  publishingYear: number;
  poster: string;
  userId: string;
}

interface User {
  id: string;
  email: string;
  password: string;
}

// Ensure data directory exists
async function initStorage() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(USERS_FILE, '[]', { flag: 'wx' });
    await fs.writeFile(MOVIES_FILE, '[]', { flag: 'wx' });
    await fs.writeFile(IMAGES_FILE, '[]', { flag: 'wx' });
  } catch (error) {
    // Files might already exist, that's ok
  }
}

initStorage();

export const storage = {
  async getUsers(): Promise<User[]> {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  },

  async saveUsers(users: User[]): Promise<void> {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  },

  async getMovies(): Promise<Movie[]> {
    const data = await fs.readFile(MOVIES_FILE, 'utf8');
    return JSON.parse(data);
  },

  async saveMovies(movies: Movie[]): Promise<void> {
    await fs.writeFile(MOVIES_FILE, JSON.stringify(movies, null, 2));
  },

  async getImages(): Promise<Image[]> {
    const data = await fs.readFile(IMAGES_FILE, 'utf8');
    return JSON.parse(data);
  },

  async getImage(id: string): Promise<Image | null> {
    const images = await this.getImages();
    return images.find(img => img.id === id) || null;
  },

  async saveImage(image: Image): Promise<void> {
    const images = await this.getImages();
    const existingIndex = images.findIndex(img => img.id === image.id);
    
    if (existingIndex >= 0) {
      images[existingIndex] = image;
    } else {
      images.push(image);
    }
    
    await fs.writeFile(IMAGES_FILE, JSON.stringify(images, null, 2));
  }
};