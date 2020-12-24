module.exports = (client, DataTypes) => {
    const Cars_Files = client.define(
        'Cars_files',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            file: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            car_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                reference: {
                    model: 'Cars',
                    key: 'id'
                }
            },
            created_at: {
                type: DataTypes.DATE,
                default: client.fn('NOW')
            }
        },
        {
            tableName: 'cars_files',
            timestamps: false
        }
    );

    return Cars_Files;
};
