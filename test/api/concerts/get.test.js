const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {

  before(async () => {
    const concertOne = new Concert({ _id: '5d9f1140f10a81216cfd4401', performer: '5e75f438198dac38704fe98f', price: 20, day: 2, image: '/img/uploads/hdfh42sd213.jpg' });
    await concertOne.save();
  
    const concertTwo = new Concert({ _id: '5d9f1140f10a81216cfd4321', performer: '5e75f438198dac38704fe98f', price: 28, day: 3, image: '/img/uploads/hdfh42sd213.jpg' });
    await concertTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('/performer/:performer should return only concerts with this performer id', async () => {
    const res = await request(server).get('/api/concerts/performer/5e75f438198dac38704fe98f');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/day/:day should return only concerts from this day ', async () => {
    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/concerts/genre/:genre should return only concerts from genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/concerts/price/:price_min/:price_max should return only concerts at the given price', async () => {
    const res = await request(server).get('/api/concerts/price/19/21');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

});