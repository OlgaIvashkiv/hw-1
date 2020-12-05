module.exports = (client, DataTypes) => {
    const Car = client.define(
        'Car',
        {
            idCar: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            users_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            }
        },
        {
            tableName: 'cars',
            timestamps: false
        }
    );

    const User = require('./User')(client, DataTypes);

    Car.belongsTo(User, {
        foreignKey: 'users_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    return Car;
};
