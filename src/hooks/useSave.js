import { setDoc, doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firestore/client";

export default function useSave() {
  const saveUser = async ({ users, user, navigate }) => {
    const isSaved = users.find((profile) => profile.id === user.id);
    if (isSaved === undefined) {
      const data = {
        id: user.id,
        photo: user.profile_image_url,
        email: user.email,
        createdAt: user.created_at,
      };
      await setDoc(doc(db, "users", user.id), data);
    }
    window.location.replace(`${process.env.REACT_APP_URL}/#/dashboard`);
  };

  const saveWallet = async (wallet, user) => {
    const data = {
      wallet,
    };
    await updateDoc(doc(db, "users", user.id), data);
  };

  const saveDonation = async ({ user, channel, amount, token, message }) => {
    const data = {
      name: user.display_name.toLowerCase(),
      id: user.id,
      photo: user.profile_image_url,
      amount,
      token,
      cid: channel.broadcaster_id,
      channel: channel.broadcaster_name,
      time: Math.round(new Date().getTime() / 1000),
      message: message !== "" ? true : false,
    };
    await addDoc(collection(db, "donations"), data);
  };

  return { saveUser, saveWallet, saveDonation };
}
