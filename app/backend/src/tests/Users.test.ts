import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
// import Example from '../database/models/ExampleModel';
import User from '../database/models/UserModel';
import { token, admin } from './mocks/token.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verifica se é possível fazer login corretamente', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(admin as User);
    sinon
      .stub(jwt, "sign")
      .resolves(token.token as string);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
  })

  it('se retorna status 200 após efetuar login', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(admin);

    expect(chaiHttpResponse.status).to.be.eq(200);
    // expect(chaiHttpResponse.body).to.deep.eq(admin);
  });

  it('se retorna status 400 após efetuar login sem email', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        id: 1,
        username: 'Admin',
        role: 'admin',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.deep.eq({ message: "All fields must be filled" });
  });

  it('se retorna status 400 após efetuar login sem password', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
      });

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.deep.eq({ message: "All fields must be filled" });
  });

});
