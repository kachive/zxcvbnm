import { container } from './cosmosdb';
import { Resource } from '@azure/cosmos';

export interface Notice {
  id: string;
  title: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// 使用环境变量
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const noticeService = {
  async getAllNotices(): Promise<Notice[]> {
    try {
      console.log('Fetching from:', `${API_URL}/notices`);
      
      const response = await fetch(`${API_URL}/notices`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      return data;
    } catch (error) {
      console.error('Error in getAllNotices:', error);
      throw error;
    }
  },

  async createNotice(notice: Omit<Notice, 'id' | 'isDeleted' | 'updatedAt'>): Promise<Notice> {
    const newNotice = {
      ...notice,
      id: Date.now().toString(),
      isDeleted: false,
      updatedAt: new Date().toISOString()
    };
    const response = await fetch(`${API_URL}/notices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNotice)
    });
    if (!response.ok) throw new Error('Failed to create notice');
    return response.json();
  },

  async updateNotice(id: string, notice: Partial<Notice>): Promise<Notice> {
    const response = await fetch(`${API_URL}/notices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notice)
    });
    if (!response.ok) throw new Error('Failed to update notice');
    return response.json();
  },

  async deleteNotice(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/notices/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete notice');
  }
}; 