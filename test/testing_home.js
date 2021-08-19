import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

dotenv.config();
chai.use(chaiHttp);
chai.should();

describe('HOME', () => {

    it('load endpoint', (done) => {
        chai.request(`${process.env.HOST}:${process.env.PORT}`)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.include("Welcome to Ngendika API");

                done();
            });
    });

});