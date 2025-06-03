const express = require('express');
const sequelize = require('./db');
const Member = require('./model');

const app = express();
app.use(express.json());

app.get('/members', async(req, res) => {
    try{
        const result = await Member.findAll();
        res.json(result);
    }catch(err){
        console.error('Error fetching members:', err.message);
        res.status(500).send('Server Error');
    }
})

app.post('/members', async(req, res) => {
    try{
        const {name, email} = req.body;
        const result = await Member.create({name, email});
        res.status(201).json(result);
    }catch(err){
        console.error('Error creating member:', err.message);
        res.status(500).send('Server Error');
    }
})

app.put('/members/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [updated] = await Member.update({ name, email }, { where: { id: req.params.id } });

    if (updated) {
      const updatedMember = await Member.findByPk(req.params.id);
      res.json(updatedMember);
    } else {
      res.status(404).send('Member not found');
    }
  } catch (err) {
    console.error('Error updating member:', err.message);
    res.status(500).send('Server error');
  }
})

app.delete('/members/:id', async(req, res) => {
    try{
        const deleted = await Member.destroy({where: {id: req.params.id}});
        if(deleted){
            res.send(`Member with id ${req.params.id} deleted`);
        } else{
            res.status(400).send('Member not found');
        }
    } catch(err){
        console.error('Error deleting member:', err.message);
        res.status(500).send('Server Error');
    }
})

app.get('/members/:id', async(req, res) => {
    try{
        const result = await Member.findByPk(req.params.id);
        if(result){
            res.json(result);
        } else{
            res.status(404).send('Member not found');
        }
    } catch(err){
        console.error('Error fetching user:', err.message);
        res.status(500).send('Server error');
    }
})

async function start() {
    try{
        await sequelize.sync();
        console.log('Database synced');

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }catch(error){
        console.error('Error starting server:', error);
    }
}

start();