import * as sinon from 'sinon';
import * as chai from 'chai';
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
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('se retorna status 200 após efetuar login', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(admin);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(admin);
  });

});
