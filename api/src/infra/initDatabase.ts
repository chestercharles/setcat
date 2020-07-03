import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const initDatabase = createConnection;
