export type UserPublic = { id: string; email: string; username: string };
export type UserStored = UserPublic & { password: string };


export type Note = {
id: string;
userId: string;
title: string;
body: string;
category: 'work' | 'study' | 'personal' | string;
createdAt: number;
updatedAt: number;
};