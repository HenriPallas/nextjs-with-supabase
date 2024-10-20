import { createClient } from "@/utils/supabase/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Todo {
    id: number;
    title: string;
    priority: string;
    created_at: string;
    updated_at: string | null;
    deleted: boolean;
}

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
  
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, 
      timeZone: 'UTC',
    });
  }

export default async function ServerTodoComponent() {
    const supabase = createClient();

    let { data: todos, error } = await supabase.from("todo").select("*");
    
    if (!todos || todos.length === 0) return <h1>No todos found.</h1>

    todos.sort((a, b) => b.priority - a.priority);

    return (
    <>
        <main className="flex-1 flex flex-col gap-6 px-4">
            <Accordion type="single" collapsible>
                {todos?.map((todo) => (
                    <AccordionItem key={todo.id} value={`item-${todo.id}`}>
                        <AccordionTrigger>{todo.title}</AccordionTrigger>
                        <AccordionContent>
                            <ul>
                                <li>
                                    <Label>Title</Label>
                                    <Input type="text" value={todo.title}></Input>
                                </li>
                                <li>
                                    <Label>Priority</Label>
                                    <Input type="number" value={todo.priority}></Input>
                                </li>
                                <li>
                                    <Label>Created At:</Label>
                                    <Input type="text" value={formatTimestamp(todo.created_at)} readOnly></Input>
                                </li>
                                <li>
                                    <Label>Updated At:</Label>
                                    <Input type="text" value={todo.updated_at ? formatTimestamp(todo.updated_at) : "Never"} readOnly></Input>
                                </li>
                                 <li>
                                    <Label>ID:</Label>
                                    <Input type="number" value={todo.id} readOnly></Input>
                                </li>
                            </ul>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </main>
    </>
  );
}
