const {Router} = require('express');
const handlePolicies = require('../middleware/handle-policies.middleware');
const userControler = require ( "../controllers/userControllers");



const router = Router();

//Ruta para mostrar todos los usuarios , es pública.
router.get("/",handlePolicies(["PUBLIC"]),userControler.getUser);

//Ruta para actualizar un usuario a premium
router.post('/upgrade', handlePolicies(["ADMIN"]), userControler.upgradeUserToPremium);

//Ruta para mostrar cada usuario por su ID, esta ruta solo la pueden usar los: USER Y ADMIN.
router.get ("/:userId",handlePolicies(["USER","ADMIN"]),userControler.getUserById );

//Ruta para borrar un usuario por ID, solo el ADMIN , la puede usar.
router.delete ("/:userId",handlePolicies(["ADMIN"]),userControler.getdeleteUserById);


module.exports = router;