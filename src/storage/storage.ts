import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, UserStored, UserPublic } from '../types';

const USERS_KEY = '@sn_users';
const NOTES_KEY = '@sn_notes';
const CURRENT_KEY = '@sn_current';


export async function getUsers(): Promise<UserStored[]> {
const raw = await AsyncStorage.getItem(USERS_KEY);
return raw ? JSON.parse(raw) : [];
}
export async function saveUsers(users: UserStored[]): Promise<void> {
await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}


export async function setCurrentUser(user: UserPublic): Promise<void> {
await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}
export async function getCurrentUser(): Promise<UserPublic | null> {
const raw = await AsyncStorage.getItem(CURRENT_KEY);
return raw ? JSON.parse(raw) : null;
}
export async function clearCurrentUser(): Promise<void> {
await AsyncStorage.removeItem(CURRENT_KEY);
}


export async function getAllNotes(): Promise<Note[]> {
const raw = await AsyncStorage.getItem(NOTES_KEY);
return raw ? JSON.parse(raw) : [];
}
export async function saveAllNotes(notes: Note[]): Promise<void> {
await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}


export async function getNotesForUser(userId: string): Promise<Note[]> {
const notes = await getAllNotes();
return notes.filter(n => n.userId === userId);
}


export async function createNote(note: Note): Promise<void> {
const notes = await getAllNotes();
notes.push(note);
await saveAllNotes(notes);
}


export async function updateNote(updated: Note): Promise<void> {
const notes = await getAllNotes();
const idx = notes.findIndex(n => n.id === updated.id);
if (idx !== -1) {
notes[idx] = updated;
await saveAllNotes(notes);
}
}


export async function deleteNote(id: string): Promise<void> {
const notes = await getAllNotes();
const filtered = notes.filter(n => n.id !== id);
await saveAllNotes(filtered);
}