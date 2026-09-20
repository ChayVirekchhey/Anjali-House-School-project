import { db } from './index.ts';
import { users } from './schema.ts';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        name: name || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          name: name || null,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Failed to get or create user:", error);
    throw new Error("Failed to synchronize user in database", { cause: error });
  }
}
