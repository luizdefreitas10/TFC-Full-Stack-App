import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
// import Example from '../database/models/ExampleModel';
import Team from '../database/models/TeamModel';
import { allTeams, soccerTeam } from './mocks/token.mock';

import { Response } from 'superagent';
import { before, after } from 'node:test';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verifica se é possível listar times', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(allTeams as Team[]);
    sinon
      .stub(Team, "findByPk")
      .resolves(soccerTeam as Team);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('se retorna uma lista com todos os times', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(allTeams);
  });

  it('se retorna o time específico quando procura pelo id', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/:id');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(soccerTeam);
  });

});