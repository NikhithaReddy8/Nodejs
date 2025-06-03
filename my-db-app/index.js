const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/users', async(req, res)=>{
    try{
        const {name, email} = req.body;
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error('Insert error: ',err.message);
        res.status(500).send('server error');
    }
});

app.delete('/users/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.send(`User with ID ${id} deleted`);
    }catch(err){
        console.error('Delete Error:', err.message);
        res.status(500).send('server error');
    }
});

app.put('/users/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        res.json(result.rows[0]);
    }catch(err){
        console.error('Update error: ', err.message);
        res.status(500).send('server error');
    }
});

app.get('/users/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if(result.rows.length === 0){
            return res.status(404).send('User not found');
        }
        res.json(result.rows[0]);
    }catch(err){
        console.error('Query error: ', err.message);
        res.status(500).send('server error');
    }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
