'use strict';

//setup
require('dotenv').config();
const superTest = require('supertest');
const mongoose = require('mongoose');

//import
const { server } = require('../src/server.js');
const { expect } = require('@jest/globals');
const request = superTest(server);


mongoose.connect(process.env.MONGOOSE_TEST_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true});


let id;
describe('api server', () => {
  afterAll(() => {// we need to close the connection after tests
    mongoose.connection.close();
  });


  //create ------
  it('should create a new food using post request', async () => {
    //arrange
    let food = {
      name: 'pizza',
      type: 'salty',
    };
    //act
    const response = await request.post('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('pizza');
    expect(response.body.type).toEqual('salty');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });

  //update------
  it('should update a food using put request', async () => {
    //arrange
    let food = {
      name: 'pizza',
      type: 'salty',
    };
    //act
    const response = await request.put(`/api/v1/food/${id}`)
      .send(food);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('salty');
  });



  it('should get food using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/food`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should delete a food using delete request', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/food/${id}`);
    //asert
    expect(response.status).toEqual(200);

  });


  it('should Read a food record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/food/${id}`);

    expect(recordResponse.status).toBe(200);

  });

  let id;

  it('should create a new clothes using post request', async () => {
    //arrange
    let clothes = {
      name: 'hat',
      type: 'red',
    };
    //act
    const response = await request.post('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('hat');
    expect(response.body.type).toEqual('red');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });





  it('should update a clothes using put request', async () => {
    //arrange
    let clothes = {
      name: 'hat',
      type: 'red',
    };
    //act
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('hat');
    expect(response.body.type).toEqual('red');

  });


  it('should get clothes using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/clothes`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });



  it('should Read a clothes record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/clothes/${id}`);

    expect(recordResponse.status).toBe(200);
  });


  it('should delete a clothes using delete request', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/clothes/${id}`);
    //asert
    expect(response.status).toEqual(200);
  });

});



describe('404 error', () => {

  it('should get 404 status error on a bad route', async () => {
    const notFoundResponse ={
      error: 404,
      message: 'Not Found',
    };

    const response = await request.get('/foo');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(notFoundResponse);
  });


  it('should get 404 status error on a bad method', async () => {
    const notFoundResponse ={
      error: 404,
      message: 'Not Found',
    };

    const postResponse = await request.post('/foo');
    const putResponse = await request.put('/foo');
    const deleteResponse = await request.delete('/foo');

    expect(postResponse.status).toBe(404);
    expect(postResponse.body).toEqual(notFoundResponse);

    expect(putResponse.status).toBe(404);
    expect(putResponse.body).toEqual(notFoundResponse);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toEqual(notFoundResponse);
  });

});