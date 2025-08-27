"use client";
import { useRef, useEffect } from "react";
import { useChatStore } from "@/shared/store/chat.store";
import MessageBubble from "./MessageBubble";

function MessageList() {
  const { messages, currentUserId } = useChatStore();
  const listRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const didInitialScroll = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      anchorRef.current?.scrollIntoView({ block: "end" });
      didInitialScroll.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;

    if (!didInitialScroll.current || nearBottom) {
      setTimeout(() => {
        anchorRef.current?.scrollIntoView({ block: "end" });
        didInitialScroll.current = true;
      }, 0);
    }
  }, [messages.length]);

  return (
    <div
      ref={listRef}
      role="list"
      className=" gap-2 h-[calc(100vh-160px)] overflow-y-auto px-3 w-full min-w-0"
    >
      {messages.map((mess) => (
        <MessageBubble
          key={mess.id}
          message={mess}
          isMe={mess.authorId == currentUserId && true}
        ></MessageBubble>
      ))}
      <div ref={anchorRef} />
    </div>
  );
}
export default MessageList;
