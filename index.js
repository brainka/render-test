const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const date = new Date();

let persons = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const generateId = () => {
	const maxId =
		persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
	return String(maxId + 1);
};

app.use(express.json());
app.use(express.static('dist'));

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);

	if (!person) {
		response.status(404);
	}

	response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

app.post('/api/persons', (request, response) => {
	const body = request.body;
	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	if (!body.name) {
		response.status(400).json({
			error: 'name is missing',
		});
	}

	if (!body.number) {
		response.status(400).json({ error: 'number is missing' });
	}

	persons = [...persons, person];
	response.json(persons);
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
