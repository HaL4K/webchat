export type Author = {
  id: string;
  name: string;
  avatarURL?: string;
};
export type Message = {
  id: string;
  text: string;
  authorId: string;
  createdAt: number;
  status: "sent" | "read";
};
