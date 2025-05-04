import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: { [key: string]: any } = {}; // Object to store multiple types of data

  // Set a value in the storage
  setItem(key: string, value: any): void {
    this.storage[key] = value;
  }

  // Get a value from the storage
  getItem<T>(key: string): T | null {
    return this.storage[key] ?? null;
  }

  // Remove a specific item from the storage
  removeItem(key: string): void {
    delete this.storage[key];
  }

  // Clear all stored data
  clear(): void {
    this.storage = {};
  }
}