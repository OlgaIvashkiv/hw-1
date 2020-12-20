module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('o_auth', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            refresh_token: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'users',
                    as: 'user',
                    key: 'id'
                }
            },
            created_at: {
                type: Sequelize.DATE,
                default: Sequelize.NOW
            }

        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('o_auth');
    }
};
