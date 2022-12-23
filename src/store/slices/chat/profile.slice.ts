import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, Unsubscribe, updateDoc } from "firebase/firestore";
import { RootState } from "../..";
import { dataBase } from "../../../firebase";

export interface IMessageItem {
  uid: string;
  name: string;
  message: string;
  date: string;
}

interface IFiedDb {
  fieldChats: "chats";
  fieldMessages: "messages";
}

interface IStateInitial {
  isLoad: {
    addCreate: boolean;
    profile: boolean;
  };
  isHide: {
    create: boolean;
    join: boolean;
  };
  response: string;
  messages: IMessageItem[];
  currentChat: string | undefined;
  chatList: string[];
  collection: {
    collUsers: "chat-users";
    collChats: "chats";
  };
  fieldsDb: IFiedDb;
  isChatJoin: boolean;
}

let profileRef: Unsubscribe | undefined = undefined;
let messagesRef: Unsubscribe | undefined = undefined;

const unsubProfile = () => {
  if (profileRef !== undefined) {
    profileRef();
  }
};

const unsubMessages = () => {
  if (messagesRef !== undefined) {
    messagesRef();
  }
};

const tryCreateChat = async (chatName: string, collection: string): Promise<boolean> => {
  const dbMessages = doc(dataBase, collection, chatName);
  const docSnap = await getDoc(dbMessages);
  const data = docSnap.data();

  if (!data) {
    try {
      await setDoc(dbMessages, {
        messages: [],
      });
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};

const tryJoinChat = async (chatName: string, collection: string): Promise<boolean> => {
  const dbMessages = doc(dataBase, collection, chatName);
  const docSnap = await getDoc(dbMessages);
  const data = docSnap.data();

  if (!!data) {
    return true;
  }

  return false;
};

const addUserToChat = async (chatName: string, collection: string, uid: string) => {
  const db = doc(dataBase, collection, uid);

  try {
    await updateDoc(db, {
      chats: arrayUnion(chatName),
    });
  } catch (e) {
    await setDoc(db, {
      chats: [chatName],
    });
  }
};

const checkFieldsChat = async (chatName: string, collectionMessages: string, fieldMessages: string) => {
  const db = doc(dataBase, collectionMessages, chatName);
  const docSnap = await getDoc(db);
  const data = docSnap.data();

  if (!!data) {
    const hasKeyChats = Object.prototype.hasOwnProperty.call(data, fieldMessages);

    if (!hasKeyChats) {
      try {
        await updateDoc(db, {
          messages: [],
        });
      } catch (err) {
        await setDoc(db, {
          messages: [],
        });
      }
    }
  } else {
    await setDoc(db, {
      messages: [],
    });
  }
};

export const createChat = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: RootState; rejectValue: string | undefined; fullFilled: string }
>("profile/createChat", async function (chatName, { dispatch, getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;

  const replaceChatName = chatName.toLowerCase().trim();

  if (isAuth) {
    if (!replaceChatName) {
      return rejectWithValue("chat name is empty");
    }

    const uid = getState().auth.user.uid;
    const collectionUsers = getState().chat.profile.collection.collUsers;
    const collectionChats = getState().chat.profile.collection.collChats;
    const fieildChat = getState().chat.profile.fieldsDb.fieldMessages;

    let tempMessages: IMessageItem[] = [];

    const result = await tryCreateChat(replaceChatName, collectionChats);

    if (!result) {
      return rejectWithValue("имя чата занято");
    }

    unsubMessages();
    dispatch(clearMessages());

    await addUserToChat(replaceChatName, collectionUsers, uid);

    const getMessages = async (): Promise<boolean> => {
      await checkFieldsChat(replaceChatName, collectionChats, fieildChat);

      try {
        return new Promise((resolve) => {
          messagesRef = onSnapshot(doc(dataBase, collectionChats, replaceChatName), (doc: any) => {
            if (!!doc.data()) {
              tempMessages = doc.data()[fieildChat] || [];
              dispatch(setMessages(tempMessages));
            }
          });
          resolve(true);
        });
      } catch (e) {
        return Promise.reject(false);
      }
    };

    const responseMessages = await getMessages();

    if (!responseMessages) {
      return rejectWithValue("error");
    }

    return fulfillWithValue(replaceChatName);
  }
  return rejectWithValue("no auth");
});

export const joinChat = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: RootState; rejectValue: undefined | string; fullFilled: string }
>("profile/joinChat", async function (chatName, { dispatch, getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;

  const currentChat = getState().chat.profile.currentChat;

  const replaceChatName = chatName.toLowerCase().trim();

  if (!!currentChat && currentChat === replaceChatName) {
    unsubMessages();
    dispatch(clearMessages());
    return rejectWithValue(undefined);
  }

  if (!replaceChatName) {
    return rejectWithValue(undefined);
  }

  if (isAuth) {
    if (!replaceChatName) {
      return rejectWithValue("chat name is empty");
    }

    const uid = getState().auth.user.uid;

    const collectionUsers = getState().chat.profile.collection.collUsers;
    const collectionChats = getState().chat.profile.collection.collChats;

    const fieildChat = getState().chat.profile.fieldsDb.fieldMessages;

    let tempMessages: IMessageItem[] = [];

    const resultJoin = await tryJoinChat(replaceChatName, collectionChats);

    if (!resultJoin) {
      return rejectWithValue("чата не существует");
    }

    unsubMessages();
    dispatch(clearMessages());

    await addUserToChat(replaceChatName, collectionUsers, uid);

    const getMessages = async (): Promise<boolean> => {
      await checkFieldsChat(replaceChatName, collectionChats, fieildChat);

      try {
        return new Promise((resolve) => {
          messagesRef = onSnapshot(doc(dataBase, collectionChats, replaceChatName), (doc: any) => {
            if (!!doc.data()) {
              tempMessages = doc.data()[fieildChat] || [];
              dispatch(setMessages(tempMessages));
            }
          });
          resolve(true);
        });
      } catch (e) {
        return Promise.reject(false);
      }
    };

    const responseMessages = await getMessages();

    if (!responseMessages) {
      return rejectWithValue("error");
    }

    return fulfillWithValue(replaceChatName);
  }

  return rejectWithValue("no auth");
});

export const tryProfile = createAsyncThunk<
  undefined,
  undefined,
  { dispatch: Dispatch; state: RootState; rejectValue: undefined; fullFilled: undefined }
>("profile/tryProfile", async function (_, { dispatch, getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;
  const uid = getState().auth.user.uid;
  const collection = getState().chat.profile.collection.collUsers;
  const field = getState().chat.profile.fieldsDb.fieldChats;

  if (isAuth && !!uid) {
    unsubProfile();

    let tempChats: string[] = [];
    const checkFieldsProfile = async () => {
      const db = doc(dataBase, collection, uid);
      const docSnap = await getDoc(db);
      const data = docSnap.data();

      if (!!data) {
        const hasKeyChats = Object.prototype.hasOwnProperty.call(data, field);

        if (!hasKeyChats) {
          try {
            await updateDoc(db, {
              chats: [],
            });
          } catch (err) {
            await setDoc(db, {
              chats: [],
            });
          }
        }
      } else {
        await setDoc(db, {
          chats: [],
        });
      }
    };

    const fetchProfile = async (): Promise<void> => {
      await checkFieldsProfile();
      return new Promise((resolve) => {
        profileRef = onSnapshot(doc(dataBase, collection, uid), (doc: any) => {
          if (!!doc.data()) {
            tempChats = doc.data()[field] || [];
            dispatch(setChats(tempChats));
          }
        });
        resolve();
      });
    };

    await fetchProfile();
  }

  return fulfillWithValue(undefined);
});

export const profileSignOut = createAsyncThunk<
  undefined,
  undefined,
  { dispatch: Dispatch; state: RootState; rejectValue: undefined; fullFilled: undefined }
>("profile/profileSignOut", async function (_, { getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;

  if (isAuth) {
    unsubProfile();
    return fulfillWithValue(undefined);
  }
  return rejectWithValue(undefined);
});

export const outChat = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: RootState; rejectValue: string; fullFilled: string }
>("profile/outChat", async function (chatName, { getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;
  const uid = getState().auth.user.uid;

  const replaceChatName = chatName.toLowerCase().trim();

  if (isAuth && !!uid) {
    if (!replaceChatName) {
      return rejectWithValue("chat name is empty");
    }

    const collection = getState().chat.profile.collection.collUsers;

    const db = doc(dataBase, collection, uid);

    try {
      await updateDoc(db, {
        chats: arrayRemove(replaceChatName),
      });
    } catch (e) {
      return rejectWithValue("err out chat");
    }

    return fulfillWithValue("");
  }

  return rejectWithValue("no auth");
});

export const pushMessage = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: RootState; rejectValue: string; fullFilled: string }
>("profile/pushMessage", async function (message, { getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;
  const uid = getState().auth.user.uid;

  if (isAuth && !!uid) {
    const userName = getState().auth.user.userName;
    const currentChat = getState().chat.profile.currentChat;
    const collection = getState().chat.profile.collection.collChats;

    if (!message) {
      return rejectWithValue("message is empty");
    }

    if (!userName) {
      return rejectWithValue("user name is empty");
    }

    if (!currentChat) {
      return rejectWithValue("current chat undefined");
    }

    const db = doc(dataBase, collection, currentChat);

    const date =
      new Date().toISOString().split("T")[0] +
      "T" +
      new Date().toLocaleString().split(",")[1].trim() +
      ":" +
      new Date().getMilliseconds();

    const itemMessage: IMessageItem = {
      uid: uid,
      name: userName,
      message: message,
      date: date,
    };

    try {
      await updateDoc(db, {
        messages: arrayUnion(itemMessage),
      });
    } catch (e) {
      await setDoc(db, {
        messages: [itemMessage],
      });
    }

    return fulfillWithValue("");
  }

  return rejectWithValue("no auth");
});

export const deleteMessage = createAsyncThunk<
  string,
  IMessageItem,
  { dispatch: Dispatch; state: RootState; rejectValue: string; fullFilled: string }
>("profile/deleteMessage", async function (message, { getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;
  const uid = getState().auth.user.uid;
  const currentChat = getState().chat.profile.currentChat;

  if (isAuth && !!uid) {
    const collection = getState().chat.profile.collection.collChats;

    if (!message) {
      return rejectWithValue("message is empty");
    }

    if (!currentChat) {
      return rejectWithValue("current chat is empty");
    }

    const db = doc(dataBase, collection, currentChat);

    try {
      await updateDoc(db, {
        messages: arrayRemove(message),
      });
    } catch (e) {
      return rejectWithValue("err delete message");
    }

    return fulfillWithValue("");
  }

  return rejectWithValue("no auth");
});

const initialStateValue: IStateInitial = {
  isLoad: {
    addCreate: false,
    profile: false,
  },
  response: "",
  messages: [],
  currentChat: undefined,
  chatList: [""],
  isHide: {
    create: true,
    join: true,
  },
  collection: {
    collUsers: "chat-users",
    collChats: "chats",
  },
  fieldsDb: {
    fieldChats: "chats",
    fieldMessages: "messages",
  },
  isChatJoin: false,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialStateValue,
  reducers: {
    clearResponse(state) {
      state.response = "";
    },

    clearMessages(state) {
      state.messages = [];
    },

    clearCurrentChat(state) {
      state.currentChat = undefined;
    },

    hideJoinCreate(state) {
      state.isHide.create = true;
      state.isHide.join = true;
    },

    showCreateChat(state) {
      state.isHide.create = false;
      state.isHide.join = true;
    },

    showJoinChat(state) {
      state.isHide.create = true;
      state.isHide.join = false;
    },

    setChats(state, action: PayloadAction<string[]>) {
      state.chatList = [...action.payload];
    },

    setMessages(state, action: PayloadAction<IMessageItem[]>) {
      state.messages = [...action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(tryProfile.pending, (state) => {
        state.isLoad.profile = true;
      })
      .addCase(tryProfile.fulfilled, (state) => {
        state.isLoad.profile = false;
      })
      .addCase(tryProfile.rejected, (state) => {
        state.isLoad.profile = false;
      })

      .addCase(profileSignOut.pending, (state) => {
        state.isLoad.profile = true;
      })
      .addCase(profileSignOut.fulfilled, (state) => {
        state.isLoad.profile = false;
        state.chatList = [];
        state.messages = [];
        state.currentChat = undefined;
      })
      .addCase(profileSignOut.rejected, (state) => {
        state.isLoad.profile = false;
        state.chatList = [];
        state.messages = [];
        state.currentChat = undefined;
      })

      .addCase(createChat.pending, (state) => {
        state.isLoad.addCreate = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoad.addCreate = false;
        state.currentChat = action.payload;
        state.isHide.create = true;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoad.addCreate = false;
        state.response = String(action.payload);
      })

      .addCase(joinChat.pending, (state) => {
        state.isLoad.addCreate = true;
      })
      .addCase(joinChat.fulfilled, (state, action) => {
        state.isLoad.addCreate = false;
        state.currentChat = action.payload;
        state.isHide.join = true;
      })
      .addCase(joinChat.rejected, (state, action) => {
        state.isLoad.addCreate = false;
        if (!action.payload) {
          state.currentChat = undefined;
        } else {
          state.response = String(action.payload);
        }
      })

      .addCase(outChat.pending, (state) => {
        state.isLoad.profile = true;
      })
      .addCase(outChat.fulfilled, (state) => {
        state.isLoad.profile = false;
      })
      .addCase(outChat.rejected, (state) => {
        state.isLoad.profile = false;
      });
  },
});

export const {
  clearResponse,
  showCreateChat,
  showJoinChat,
  hideJoinCreate,
  setChats,
  clearMessages,
  clearCurrentChat,
  setMessages,
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
