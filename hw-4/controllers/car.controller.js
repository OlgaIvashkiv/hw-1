const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const { carService } = require('../services');
const { OK, NO_CONTENT, CREATED } = require('../configs/error-codes');
const { errors: { CAR_IS_UPDATED, CAR_IS_DELETED } } = require('../error');
const { TYPE_DOC, TYPE_PHOTO } = require('../configs/constants');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const allCars = await carService.findAllCars();

            res
                .status(OK)
                .json(allCars);
        } catch (e) {
            next(e);
        }
    },
    findCarById: async (req, res, next) => {
        try {
            const [{ id }] = req.car;
            const foundCar = await carService.findCarById(id);

            res
                .status(OK)
                .json(foundCar);
        } catch (e) {
            next(e);
        }
    },
    deleteCarById: async (req, res, next) => {
        try {
            const id = req.user;

            await carService.deleteCarById(id);
            await carService.deleteCarFiles(id);

            const photosPathWithoutPublic = path.join('cars', `${id}`, 'photos');
            const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

            await fs.mkdir(photosFullPath, { recursive: true });

            const docsPathWithoutPublic = path.join('cars', `${id}`, 'documents');
            const docsFullPath = path.join(process.cwd(), 'public', docsPathWithoutPublic);

            await fs.mkdir(docsFullPath, { recursive: true });

            res
                .status(NO_CONTENT)
                .json({
                    message: CAR_IS_DELETED.message
                });
        } catch (e) {
            next(e);
        }
    },
    updateCarById: async (req, res, next) => {
        try {
            const {
                photos,
                docs,
                body, params
            } = req;

            if (photos) {
                const photosPathWithoutPublic = path.join('cars', `${params.id}`, 'photos');
                const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                await fs.mkdir(photosFullPath, { recursive: true });

                photos.map(async (photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const newPhotoName = `${uuid}.${photoExtension}`;

                    await photo.mv(path.join(photosFullPath, newPhotoName));

                    const file_type = TYPE_PHOTO;
                    const file_path = await path.join(photosFullPath, newPhotoName);
                    const carFile = { type: file_type, file: file_path, car_id: params.id };

                    await carService.updateSingleCarFiles(carFile);
                });
            }

            if (docs) {
                const docsPathWithoutPublic = path.join('cars', `${params.id}`, 'documents');
                const docsFullPath = path.join(process.cwd(), 'public', docsPathWithoutPublic);

                await fs.mkdir(docsFullPath, { recursive: true });

                docs.map(async (document) => {
                    const photoExtension = document.name.split('.').pop();
                    const newDocumentName = `${uuid}.${photoExtension}`;

                    await document.mv(path.join(docsFullPath, newDocumentName));

                    const file_type = TYPE_DOC;
                    const file_path = await path.join(docsFullPath, newDocumentName);

                    await carService.updateSingleCarFiles({ type: file_type, file: file_path, car_id: params.id });
                });
            }

            await carService.updateCarById(body, params.id);

            res.status(CREATED)
                .json({
                    message: CAR_IS_UPDATED.message
                });
        } catch (e) {
            next(e);
        }
    },
    createNewCar: async (req, res, next) => {
        try {
            const {
                photos,
                docs,
                body, params
            } = req;

            const newCar = await carService.createCar(body);

            if (photos) {
                const photosPathWithoutPublic = path.join('cars', `${newCar.id}`, 'photos');
                const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                await fs.mkdir(photosFullPath, { recursive: true });

                photos.map(async (photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const newPhotoName = `${uuid}.${photoExtension}`;

                    await photo.mv(path.join(photosFullPath, newPhotoName));

                    const file_type = TYPE_PHOTO;
                    const file_path = await path.join(photosFullPath, newPhotoName);

                    await carService.updateSingleCarFiles({ type: file_type, file: file_path, car_id: newCar.id });
                });
            }

            if (docs) {
                const docsPathWithoutPublic = path.join('cars', `${newCar.id}`, 'documents');
                const docsFullPath = path.join(process.cwd(), 'public', docsPathWithoutPublic);

                await fs.mkdir(docsFullPath, { recursive: true });

                docs.map(async (document) => {
                    const photoExtension = document.name.split('.').pop();
                    const newDocumentName = `${uuid}.${photoExtension}`;

                    await document.mv(path.join(docsFullPath, newDocumentName));

                    const file_type = TYPE_DOC;
                    const file_path = await path.join(docsFullPath, newDocumentName);

                    await carService.updateSingleCarFiles({ type: file_type, file: file_path, car_id: newCar.id });
                });
            }
            const user2Car = { user_id: params.id, car_id: newCar.id };
            await carService.assignCarToUser(user2Car);

            res.status(CREATED).json(newCar);
        } catch (e) {
            next(e);
        }
    },
};
