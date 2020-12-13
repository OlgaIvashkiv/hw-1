module.exports = (client, DataTypes) => {
    const User = client.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
    const Car = require('./Car')(client, DataTypes);

    User.hasMany(Car, {
        foreignKey: 'users_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });

    return User;
};
