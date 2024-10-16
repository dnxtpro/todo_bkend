module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Asegúrate de que se incremente automáticamente
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false // Puedes agregar esto si quieres que sea obligatorio
        },
        color :{
            type: Sequelize.STRING,
            allowNull:true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,    
            references: {
                model: 'users', // Asegúrate de que esto coincida con el nombre de tu modelo de usuarios
                key: 'id'
            }
        },
    });
    Category.associate = function(models) {
    Category.hasMany(models.Eventos, {
        foreignKey: 'category_id',
        as: 'eventos', // Esto puede ser útil si necesitas acceder a eventos desde categoría
    });
};
    return Category;
};
