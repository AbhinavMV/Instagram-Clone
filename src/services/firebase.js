import { firebase, FieldValue, storage } from "../lib/firebase";
import shortid from "shortid";
import { avatarPath, imagePath } from "../constants/paths";

export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  //   console.log(result);
  return result.empty;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  //   console.log(result);
  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));

  return user.length > 0 ? user : false;
}

export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection("users").where("userId", "==", userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getProfilesFromFirebase(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowingList(
  loggedInUserDocId,
  profileUserId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileUserId)
        : FieldValue.arrayUnion(profileUserId),
    });
}
export async function updateFollowedUserFollowersList(profileUserDocId, userId, isFollower) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileUserDocId)
    .update({
      followers: isFollower ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  const userFollowedPhotos = result.docs?.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) userLikedPhoto = true;
      //get user who created the photo
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
export async function getUserPhotosbyUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();
  return result.docs.map((photo) => ({ ...photo.data(), docId: photo.id }));
}

export async function followToggle(
  profileDocId,
  profileUserId,
  userDocId,
  userId,
  isFollowingProfile
) {
  await updateLoggedInUserFollowingList(userDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowersList(profileDocId, userId, isFollowingProfile);
}

export async function uploadImageToFirebase(image, caption, userId) {
  if (image) {
    const storageRef = storage.ref();
    const imageName = `${shortid.generate()}-${image.name}`;
    const imageRef = storageRef.child(imageName);
    imageRef.put(image).then(async () => {
      await firebase
        .firestore()
        .collection("photos")
        .add({
          caption,
          comments: [],
          dateCreated: Date.now(),
          imageSrc: imagePath(imageName),
          likes: [],
          photoId: imageName,
          userId,
          userLatitude: null,
          userLongitude: null,
        });
    });
    alert("Image uploaded successfully");
  } else {
    alert("Please add an Image.");
  }
}

export async function updateUserProfilePhoto(image, userId, docId) {
  if (image) {
    const storageRef = storage.ref();
    const imageName = `${userId}`;
    const imageRef = storageRef.child(`avatars/${imageName}`);
    imageRef.put(image).then(async () => {
      await firebase
        .firestore()
        .collection("users")
        .doc(docId)
        .update({ photoURL: avatarPath(imageName) });
      alert("Profile photo updated!");
    });
  } else {
    alert("Please add an image");
  }
}

export async function getAllFollowingUsersData(followingList) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "in", followingList)
    .get();
  return result.docs.map((user) => ({
    username: user.get("username"),
    photoURL: user.get("photoURL"),
    userId: user.get("userId"),
    fullName: user.get("fullName"),
  }));
}

export async function getCurrUserMessagesFromFirebase(currUserId, loggedInUserId, setMessages) {
  const ids = [currUserId, loggedInUserId];
  firebase
    .firestore()
    .collection("messages")
    .where("fromId", "in", ids)
    .limit(100)
    .orderBy("createdAt", "asc")
    .onSnapshot((messagesSnapshot) => {
      const conversations = [];
      messagesSnapshot.forEach((message) => {
        if (ids.includes(message.data().toId))
          conversations.push({ ...message.data(), docId: message.id });
      });
      setMessages({ messages: conversations });
    });
}

export const addMessage = async (msgObj) => {
  await firebase
    .firestore()
    .collection("messages")
    .add({
      ...msgObj,
      createdAt: FieldValue.serverTimestamp(),
    });
};
