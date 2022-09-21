import { setDoc, doc, updateDoc, addDoc, collection } from "firebase/firestore";
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

  const saveWallet = async (wallet, user) => {
    const data = {
      wallet,
    };
    await updateDoc(doc(db, "users", user.id), data);
  };

  const saveDonation = async ({ user, channel, amount, token }) => {
    console.log("saving...");
    const data = {
      name: user.display_name.toLowerCase(),
      id: user.id,
      photo: user.profile_image_url,
      amount,
      token,
      cid: channel.broadcaster_id,
      channel: channel.broadcaster_name,
      time: Math.round(new Date().getTime() / 1000),
    };
    await addDoc(collection(db, "donations"), data);
  };

  return { saveUser, saveWallet, saveDonation };
}
