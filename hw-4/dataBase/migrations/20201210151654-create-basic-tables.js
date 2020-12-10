module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            }

        });

        await queryInterface.createTable('cars', {
            idCar: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            users_id: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cars');
        await queryInterface.dropTable('users');
    }
};
