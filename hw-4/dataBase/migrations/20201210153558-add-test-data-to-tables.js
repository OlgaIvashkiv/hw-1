module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
        'cars', [{
            model: 'mercedes',
            year: 2011,
            users_id: 1,
        }]
);
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('cars', null, {});
    }
};
