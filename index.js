const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 8080;

// Inicializa o Prisma
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas

// Criar tarefa
app.post('/tarefas', async (req, res) => {
    const { titulo, concluida } = req.body;

    // Verifica se já existe uma tarefa com o mesmo título
    const tarefaExistente = await prisma.tarefa.findFirst({
        where: {
            titulo: titulo, // Buscando pelo título
        },
    });

    if (tarefaExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma tarefa com esse título.' });
    }

    // Cria a nova tarefa
    const novaTarefa = await prisma.tarefa.create({
        data: {
            titulo,
            concluida: concluida || false,
        },
    });

    res.status(201).json(novaTarefa);
});


// Listar tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany();
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar tarefas', erro: error.message });
    }
});

// Obter tarefa por ID
app.get('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await prisma.tarefa.findUnique({
            where: { id: parseInt(id) },
        });
        if (tarefa) {
            res.json(tarefa);
        } else {
            res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar tarefa', erro: error.message });
    }
});

// Atualizar tarefa
app.put('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, concluida } = req.body;
    try {
        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id: parseInt(id) },
            data: {
                titulo: titulo ?? undefined,
                concluida: concluida ?? undefined,
            },
        });
        res.json(tarefaAtualizada);
    } catch (error) {
        res.status(404).json({ mensagem: 'Tarefa não encontrada', erro: error.message });
    }
});

// Deletar tarefa
app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tarefaRemovida = await prisma.tarefa.delete({
            where: { id: parseInt(id) },
        });
        res.json(tarefaRemovida);
    } catch (error) {
        res.status(404).json({ mensagem: 'Tarefa não encontrada', erro: error.message });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
