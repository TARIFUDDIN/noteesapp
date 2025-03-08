const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
let notes = [];
let nextIndex = 1;
app.get('/api/notes', (req, res) => {
  res.json(notes);
});
app.post('/api/notes', (req, res) => {
  const {title,content} =req.body;
  if (!title||!content) {
    return res.status(400).json({error: 'Title and content are required' });
  }
  const newNote = {
    id: nextIndex++,
    title,
    content,
    createdAt: new Date()
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});
app.delete(`/api/notes/:id`,(req,res)=>{
const id=parseInt(req.params.id);
const initialLength=notes.length;
notes=notes.filter(note=>note.id!==id);
if(notes.length===initialLength){
  return res.status(404).json({error:'Note not found'});
}
res.status(200).json({message:'Note is deleted successfully'});
});
app.listen(port,()=>{
console.log('api server is running at http://localhost:${port}');
});