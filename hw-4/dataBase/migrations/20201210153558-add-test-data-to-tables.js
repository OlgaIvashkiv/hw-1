module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [{
            id: 1,
            name: 'Olga',
            email: 'olgaivashkiv@gmail.com',
            password: '12345678',
            age: 27
        }]);

        await queryInterface.bulkInsert('cars', [{
            id: 1,
            model: 'mercedes',
            year: 2011
        }]);
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('cars', null, {});
    }
};
