import ClientTodoComponent from "@/components/todo/client-component";
import ServerTodoComponent from "@/components/todo/server-component";


export default async function Index() {
  return (
    <>
      <ServerTodoComponent />
      <ClientTodoComponent />
    </>
  );
}
