// src/utils/firestore.ts
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp, getDoc } from 'firebase/firestore';

// Interface data
export interface Mainan {
  id?: string;
  name: string;
  steps: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const firestoreService = {
  getMainanRef() {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('User not authenticated');
    return collection(db, 'users', uid, 'mainan');
  },

  async addMainan(mainan: Omit<Mainan, 'id'>) {
    const mainanRef = this.getMainanRef();
    const docRef = await addDoc(mainanRef, {
      ...mainan,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getMainanList(): Promise<Mainan[]> {
    const mainanRef = this.getMainanRef();
    const q = query(mainanRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Mainan));
  },

  async updateMainan(id: string, mainan: Partial<Mainan>) {
    const mainanRef = this.getMainanRef();
    const docRef = doc(mainanRef, id);
    await updateDoc(docRef, {
      ...mainan,
      updatedAt: Timestamp.now()
    });
  },

  async deleteMainan(id: string) {
    const mainanRef = this.getMainanRef();
    const docRef = doc(mainanRef, id);
    await deleteDoc(docRef);
  },

  async getMainanById(id: string): Promise<Mainan | null> {
    const mainanRef = this.getMainanRef();
    const docRef = doc(mainanRef, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Mainan;
    } else {
      return null;
    }
  }
};