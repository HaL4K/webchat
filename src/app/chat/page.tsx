import MessageList from "@/entities/message/ui/MessageList";
import SendMessageForm from "@/features/send-message/ui/SendMessageForm";
import { useChatStore } from "@/shared/store/chat.store";

function Home() {
  console.log(useChatStore.getState().addMessage("Test1"));
  console.log(useChatStore.getState().addMessage("Test2"));
  console.log(useChatStore.getState().addMessage("Test3"));
  console.log(useChatStore.getState());
  console.log(useChatStore.getState().clear());
  console.log(useChatStore.getState());

  return (
    <>
      <h1>heelo word</h1>

      <MessageList />
      <SendMessageForm />
    </>
  );
}

export default Home;
