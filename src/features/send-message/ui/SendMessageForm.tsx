"use client";

import { Send } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useChatStore } from "@/shared/store/chat.store";

const MAX_LEN = 2000;
const MAX_LINES = 20;

export default function SendMessageForm() {
  const addMessage = useChatStore((s) => s.addMessage);

  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // авто-рост textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px"; // max ~8 строк
  }, [value]);

  function normalize(raw: string) {
    // убираем невидимые символы и нормализуем переносы
    const cleaned = raw.replace(/\u200B|\u00A0/g, " ").replace(/\r\n/g, "\n");
    return cleaned.trim();
  }

  function validate(text: string): string | null {
    if (text.length === 0) return "Введите сообщение";
    if (text.length > MAX_LEN) return `Превышен лимит в ${MAX_LEN} символов`;
    const lines = text.split("\n").length;
    if (lines > MAX_LINES) return `Слишком много строк (>${MAX_LINES})`;
    return null;
  }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (isSubmitting) return;

    const text = normalize(value);
    const err = validate(text);
    if (err) {
      setError(err);
      return;
    }

    setIsSubmitting(true);
    addMessage(text);
    setValue("");
    setError(null);
    textareaRef.current?.focus();
    setIsSubmitting(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const disabled = isSubmitting || normalize(value).length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 bg-background/80 backdrop-blur px-3 py-2 border-t"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            // жёсткая защита от сверхдлинной строки
            const v = e.target.value;
            setValue(v.length > MAX_LEN + 100 ? v.slice(0, MAX_LEN + 100) : v);
          }}
          onKeyDown={onKeyDown}
          placeholder="Напишите сообщение…"
          aria-label="Поле ввода сообщения"
          className="flex-1 min-h-[40px] max-h-40 resize-none rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 whitespace-pre-wrap break-words"
        />
        <button
          type="submit"
          disabled={disabled}
          aria-label="Отправить сообщение"
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 bg-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-700 transition"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-1 flex items-center justify-between">
        {error ? (
          <span className="text-sm text-red-500">{error}</span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {normalize(value).length}/{MAX_LEN}
          </span>
        )}
        {/* Можно добавить счётчик строк при желании */}
      </div>
    </form>
  );
}
