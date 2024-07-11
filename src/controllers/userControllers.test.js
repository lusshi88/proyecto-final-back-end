const sinon = require('sinon');
const userService = require('../services/userService');
const userController = require('../controllers/userControllers');

describe('User Controller', () => {
  let assert;

  before(async () => {
    // Importo'assert' dinámicamente
    const chai = await import('chai');
    assert = chai.assert;
  });

  describe('getUser', () => {
    it('should return a list of users', async () => {
      // Mocks para req y res
      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      // Datos de prueba
      const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

      // Stub del servicio
      sinon.stub(userService, 'getUserService').resolves(users);

      // Ejecutar la función del controlador
      await userController.getUser(req, res);

      // Verificar la respuesta
      assert.isTrue(res.json.calledWith({ message: 'Lista de usuarios', user: users }));

      // Restaurar el stub
      userService.getUserService.restore();
    });

    it('should return 500 if there is a server error', async () => {
      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      sinon.stub(userService, 'getUserService').throws(new Error('Server error'));

      await userController.getUser(req, res);

      assert.isTrue(res.status.calledWith(500));
      assert.isTrue(res.json.calledWith({ message: 'error del servidor, al traer los usuarios' }));

      userService.getUserService.restore();
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const req = { params: { userId: 'validUserId' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      const user = { id: 'validUserId', name: 'John Doe' };

      sinon.stub(userService, 'getUserByIdService').resolves(user);

      await userController.getUserById(req, res);

      assert.isTrue(res.json.calledWith({ message: 'Usuarios encontrados por id:', user }));

      userService.getUserByIdService.restore();
    });

    it('should return 500 if there is a server error', async () => {
      const req = { params: { userId: 'invalidUserId' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      sinon.stub(userService, 'getUserByIdService').throws(new Error('Server error'));

      await userController.getUserById(req, res);

      assert.isTrue(res.status.calledWith(500));
      assert.isTrue(res.json.calledWith({ message: 'Error en el servidor,al encontrar usuario por ID', error: 'Server error' }));

      userService.getUserByIdService.restore();
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      const req = { params: { userId: 'validUserId' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      const user = { id: 'validUserId', name: 'John Doe' };

      sinon.stub(userService, 'deleteUserByIdService').resolves(user);

      await userController.getdeleteUserById(req, res);

      assert.isTrue(res.json.calledWith({ message: 'Usuario eliminado con éxito', user }));

      userService.deleteUserByIdService.restore();
    });

    it('should return 500 if there is a server error', async () => {
      const req = { params: { userId: 'invalidUserID' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      sinon.stub(userService, 'deleteUserByIdService').throws(new Error('Server error'));

      await userController.getdeleteUserById(req, res);

      assert.isTrue(res.status.calledWith(500));
      assert.isTrue(res.json.calledWith({ message: 'Error en el servidor, al borrar usuario por ID', error: 'Server error' }));

      userService.deleteUserByIdService.restore();
    });
  });

});
