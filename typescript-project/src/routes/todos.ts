import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos:todos})
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    res.status(201).json({ message: "Todo added" ,todos:todos});
    todos.push(newTodo);
});

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);

    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: 'updated todo', todos: todos });
    }

    res.status(404).json({ message: 'Could not find todo' });
});

router.delete('/todo/:todoid', (req, res, next) => {
    todos = todos.filter(todo => todo.id !== req.params.todoid);
    res.status(200).json({ message: 'Deleted todo', todis: todos });
});

export default router;