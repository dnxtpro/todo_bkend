module.exports = (sequelize, Sequelize) => {
    const Eventos = sequelize.define("eventos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Asegúrate de que se incremente automáticamente
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false // Puedes agregar esto si quieres que sea obligatorio
        },
        description: {
            type: Sequelize.TEXT, // Cambié a TEXT para permitir descripciones más largas
            allowNull: true
        },
        date: {
            type: Sequelize.STRING,
            allowNull: true // Puede ser obligatorio según tus necesidades
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW // Marca de tiempo de creación
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW // Marca de tiempo de actualización
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,    
            references: {
                model: 'users', // Asegúrate de que esto coincida con el nombre de tu modelo de usuarios
                key: 'id'
            }
        },
        priority:{
            type: Sequelize.STRING,
            allowNull:true,

        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references:{
                model:'categories',
                key:'id'
            }
        },
        done:{
            type:Sequelize.BOOLEAN,
            allowNull:true,
        }
    });
    

    // Puedes definir relaciones aquí si es necesario

    return Eventos;
};
