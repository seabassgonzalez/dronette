const request = require('supertest');
const assert = require('chai').assert; 
const app = require('../app');

describe('App', function(){
	it('should return hello', function(){
		assert.equal(app(), 'hello');
	})
});