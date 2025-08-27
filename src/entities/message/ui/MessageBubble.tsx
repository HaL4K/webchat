import { Check, CheckCheck } from "lucide-react";
import { Message } from "../model/type";

interface MessageBubbleProps {
  isMe: boolean;
  message: Message;
}

function MessageBubble({ message, isMe }: MessageBubbleProps) {
  const d = new Date(message.createdAt);
  return isMe == true ? (
    <div
      className={` text-white flex mx-auto   ${
        isMe ? "justify-end " : "justify-start"
      }  bg-auto p-2`}
    >
      <h2
        className={`rounded-xl  bg-auto bg-blue-600
         p-2 max-w-[70%] whitespace-pre-wrap break-words min-w-0`}
      >
        <div className="">
          {message.text}
          {message.status === "sent" ? (
            <p className="flex justify-start">
              <Check className="w-4 h-4 text-gray-400 mt-1 mx-1" />
              <span className=" text-gray-400 ">
                {d.getHours()}:{d.getMinutes()}
              </span>
            </p>
          ) : (
            <p className="flex justify-start">
              <CheckCheck className="w-4 h-4 text-blue-500 mt-1 mx-1" />
              <span className=" text-gray-400 ">
                {d.getHours()}:{d.getMinutes()}
              </span>
            </p>
          )}
        </div>
      </h2>
    </div>
  ) : (
    <div
      className={` text-white flex mx-auto  ${
        isMe ? "justify-end " : "justify-start"
      }  `}
    >
      <h2
        className={`rounded-xl   bg-gray-600
         p-2 bg-auto  max-w-[70%] whitespace-pre-wrap break-words min-w-0`}
      >
        <div className="">
          {message.text}

          {message.status === "sent" ? (
            <p className="flex justify-end">
              <span className=" text-gray-400 mx-1.5 ">
                {d.getHours()}:{d.getMinutes()}
              </span>
              <Check className="w-4 h-4 text-gray-400 mt-1 " />
            </p>
          ) : (
            <p className="flex justify-end">
              <span className=" text-gray-400 mx-1.5 ">
                {d.getHours()}:
                {d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}
              </span>
              <CheckCheck className="w-4 h-4 text-blue-500 mt-1 " />
            </p>
          )}
        </div>
      </h2>
    </div>
  );
}

export default MessageBubble;
