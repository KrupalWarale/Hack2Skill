import * as SQLite from 'expo-sqlite';
import { DisasterRequest, RequestStatus } from '../models/types';

class StorageService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init() {
    this.db = await SQLite.openDatabaseAsync('resqlink.db');
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS requests (
        id TEXT PRIMARY KEY NOT NULL,
        timestamp INTEGER,
        senderId TEXT,
        type TEXT,
        description TEXT,
        status TEXT,
        statusHistory TEXT,
        location TEXT
      );
    `);
  }

  async addRequest(request: DisasterRequest) {
    if (!this.db) await this.init();
    await this.db!.runAsync(
      `INSERT OR REPLACE INTO requests (id, timestamp, senderId, type, description, status, statusHistory, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        request.id,
        request.timestamp,
        request.senderId,
        request.type,
        request.description,
        request.status,
        JSON.stringify(request.statusHistory),
        JSON.stringify(request.location || null),
      ]
    );
  }

  async getRequests(): Promise<DisasterRequest[]> {
    if (!this.db) await this.init();
    const rows = await this.db!.getAllAsync('SELECT * FROM requests ORDER BY timestamp DESC');
    return rows.map((row: any) => ({
      id: row.id,
      timestamp: row.timestamp,
      senderId: row.senderId,
      type: row.type,
      description: row.description,
      status: row.status as RequestStatus,
      statusHistory: JSON.parse(row.statusHistory),
      location: row.location ? JSON.parse(row.location) : undefined,
    }));
  }

  async updateRequestStatus(id: string, status: RequestStatus, historyEntry: any) {
    if (!this.db) await this.init();

    // First get the current history
    const request = await this.db!.getFirstAsync('SELECT statusHistory FROM requests WHERE id = ?', [id]) as any;
    if (!request) return;

    const currentHistory = JSON.parse(request.statusHistory);
    const newHistory = [...currentHistory, historyEntry];

    await this.db!.runAsync(
      `UPDATE requests SET status = ?, statusHistory = ? WHERE id = ?`,
      [status, JSON.stringify(newHistory), id]
    );
  }

  async deleteAllRequests() {
    if (!this.db) await this.init();
    await this.db!.runAsync('DELETE FROM requests');
  }
}

export const storageService = new StorageService();
