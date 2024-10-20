"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { createClient } from "@/utils/supabase/client";

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

export default function ClientTodoComponent() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getTodos = async () => {
            const { data: todos, error } = await supabase.from("todo").select("*");
            if (todos) setTodos(todos);
        };
        getTodos();
    }, []);

    /*const handleTodoChange = (id: number, field: keyof Todo, value: string | number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, [field]: value } : todo
            )
        );
    };*/

    const insertTodo = async () => {
        const { data, error } = await supabase.from("todo").insert([{ title }]).select();
        router.refresh();
    };

    return (
        <>
            {/*<main className="flex-1 flex flex-col gap-6 px-4">
                <Accordion type="single" collapsible>
                    {todos.map((todo) => (
                        <AccordionItem key={todo.id} value={`item-${todo.id}`}>
                            <AccordionTrigger>{todo.title}</AccordionTrigger>
                            <AccordionContent>
                                <ul>
                                    <li>
                                        <Label>Title</Label>
                                        <Input
                                            type="text"
                                            value={todo.title}
                                            onChange={(e) =>
                                                handleTodoChange(todo.id, "title", e.target.value)
                                            }
                                        />
                                    </li>
                                    <li>
                                        <Label>Priority</Label>
                                        <Input
                                            type="number"
                                            value={todo.priority}
                                            onChange={(e) =>
                                                handleTodoChange(todo.id, "priority", e.target.value)
                                            }
                                        />
                                    </li>
                                    <li>
                                        <Label>Created At:</Label>
                                        <Input
                                            type="text"
                                            value={formatTimestamp(todo.created_at)}
                                            readOnly
                                        />
                                    </li>
                                    <li>
                                        <Label>Updated At:</Label>
                                        <Input
                                            type="text"
                                            value={
                                                todo.updated_at
                                                    ? formatTimestamp(todo.updated_at)
                                                    : "Never"
                                            }
                                            readOnly
                                        />
                                    </li>
                                    <li>
                                        <Label>ID:</Label>
                                        <Input type="number" value={todo.id} readOnly />
                                    </li>
                                </ul>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </main> */}
            <Input onChange={(e) => setTitle(e.target.value)} />
            <Button onClick={insertTodo}>Insert Todo from Client</Button>
        </>
    );
}
