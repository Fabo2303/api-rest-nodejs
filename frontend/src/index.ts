import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
