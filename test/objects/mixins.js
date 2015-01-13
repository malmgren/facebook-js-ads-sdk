if (typeof require === 'function') {
  var chai = require('chai');
  var sinon = require('sinon');
  var CrudObject = require('./../../src/objects/crud-object.js');
  var CannotCreate = require('./../../src/objects/mixins/cannot-create.js');
  var CannotUpdate = require('./../../src/objects/mixins/cannot-update.js');
  var CannotDelete = require('./../../src/objects/mixins/cannot-delete.js');
  var ObjectValidation = require('./../../src/objects/mixins/object-validation.js');
  chai.should();
} else {
  var CrudObject = FbApiAssets.coreObjects.CrudObject;
  var CannotCreate = FbApiAssets.mixins.CannotCreate;
  var CannotUpdate = FbApiAssets.mixins.CannotUpdate;
  var CannotDelete = FbApiAssets.mixins.CannotDelete;
  var ObjectValidation = FbApiAssets.mixins.ObjectValidation;
}

describe('Mixins', function() {
  'use strict';

  describe('CannotCreate', function() {

    it('augmented object can\'t create an object', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      CannotCreate.call(crudObj);
      crudObj.create.should.throw('Object cannot be created');
    });

  });

  describe('CannotUpdate', function() {

    it('augmented object can\'t update an object', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      CannotUpdate.call(crudObj);
      crudObj.update.should.throw('Object cannot be updated');
    });

  });

  describe('CannotDelete', function() {

    it('augmented object can\'t delete an object', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      CannotDelete.call(crudObj);
      crudObj.delete.should.throw('Object cannot be deleted');
    });

  });

  describe('ObjectValidation', function() {

    it('augmented object can be validated', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      ObjectValidation.call(crudObj);
      crudObj.validate.should.be.a('function');
    });

    it('augmented object sends execution_options params', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      ObjectValidation.call(crudObj);
      var crudSave = sinon.stub(crudObj, 'save');
      crudObj.validate({param: 1});
      crudSave.should.have.been.calledWith({param: 1, execution_options: ['validate_only']});
    });

  });

});
