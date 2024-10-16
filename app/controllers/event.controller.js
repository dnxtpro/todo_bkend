
const db = require("../models");

const Category = db.category;
const Event = db.event;

exports.addEvent = async(req,res)=>{
    const userId=req.userId
    try {
        const { Titulo, Descripcion, Categoria, Prioridad, Fecha, Hecho } = req.body.tarea;

        console.log(Titulo, Descripcion, Categoria, Prioridad, Fecha, Hecho);
        const category = await Category.findByPk(Categoria.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Crear el nuevo evento
        const newEvent = await Event.create({
            title:Titulo,
            description:Descripcion,
            category_id: category.id, // Usa el id de la categoría existente
            priority:Prioridad,
            date: Fecha, // Convierte a formato de fecha
            done:Hecho,
            userId:userId,
        });

        return res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el evento', error });
    }
};
exports.getEvent = async(req,res)=>{
   
    try {
        const userId = req.userId; // Obtén el ID del usuario desde el objeto de la solicitud

        // Busca todos los eventos asociados al ID del usuario
        const eventos = await Event.findAll({
            where: { userId: userId },
            include: [{
              model: Category,
              as:'Categoria',
              attributes: ['id', 'name', 'color'] // Selecciona solo las columnas necesarias de la categoría
            }]
          });

        // Verifica si hay eventos
        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos para este usuario' });
        }

        // Mapea los eventos a la estructura deseada
        const eventosFormateados = eventos.map(evento => ({
            Titulo: evento.title,
            Descripcion: evento.description,
            Categoria: {
              id: evento.Categoria.id,
              name: evento.Categoria.name,
              color: evento.Categoria.color
            },
            Prioridad: evento.priority,
            Fecha: evento.date,
            Hecho: evento.done
          }));
        return res.status(200).json(eventosFormateados);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al recuperar eventos', error });
    }
};

