import { Author, Message } from "@/entities/message/model/type";
import { create } from "zustand";
import { genId } from "../lib/id";

type BootstrapPayload = {
  messages: Message[];
  authors: Author[];
  currentUserId: string;
};

interface ChatState {
  messages: Message[];
  authors: Record<string, Author>;
  currentUserId: string;
  bootstrapMock: (payload: BootstrapPayload) => void;
  addMessage: (text: string) => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  authors: {},
  currentUserId: "",

  bootstrapMock: (payload) => {
    const authorsMap = Object.fromEntries(
      payload.authors.map((author) => [author.id, author])
    );

    set({
      messages: payload.messages,
      authors: authorsMap,
      currentUserId: payload.currentUserId,
    });
  },
  addMessage: (text) => {
    const userId = get().currentUserId;
    const newMessage: Message = {
      id: genId(),
      text,
      authorId: userId,
      createdAt: Date.now(),
      status: "sent",
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
  },
  clear: () =>
    set(() => ({
      messages: [],
      authors: {},
      currentUserId: "",
    })),
}));

//мок данные
useChatStore.getState().bootstrapMock({
  authors: [
    { id: "u1", name: "Alice" },
    { id: "u2", name: "Bob" },
  ],
  messages: [
    {
      id: "m1",
      text: "Привет!",
      authorId: "u1",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m2",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m23",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m22",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m21",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m11",
      text: "Привет!",
      authorId: "u1",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m12",
      text: "Привет!",
      authorId: "u1",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m26",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m27",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m28",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m29",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m20",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m201",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m202",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m203",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m204",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m205",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m206",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m207",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
    {
      id: "m208",
      text: "Здорово!",
      authorId: "u2",
      createdAt: Date.now(),
      status: "sent",
    },
  ],
  currentUserId: "u1",
});
