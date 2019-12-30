import { Router, Request, Response } from 'express';
import Server from '../classes/server';

// Para crear las API endpoints o servicios REST
const router = Router();



// Servicios
router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo ok'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {cuerpo, de};

    // Enviamos mensaje al chat general desde servicio REST
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);
    
    res.json({
        ok: true,
        mensaje: 'Post ok',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    // Única instancia del servidor
    const server = Server.instance;
    //  socket server al canal del id del usuario
    server.io.in(id).emit('mensaje-pivado', {de, cuerpo});

    res.json({
        ok: true,
        mensaje: 'Post ok',
        cuerpo,
        de,
        id
    });
});

export default router;
