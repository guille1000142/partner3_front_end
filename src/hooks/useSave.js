import { setDoc, doc } from "firebase/firestore";
import { db } from "../firestore/client";

export default function useSave() {
  const saveUser = async (users, user) => {
    const isSaved = users.find((user) => user.id === user.id);
    if (isSaved === undefined) {
      const data = {
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
      };
      await setDoc(doc(db, "users", user.id), data);
    }

    window.sessionStorage.setItem("user", JSON.stringify(user));
  };

  return { saveUser };
}
