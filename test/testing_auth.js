import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const route = '/auth';
const email = "rizukiichirou@gmail.com";
const pw = 12345;

async function login() {
    return await chai.request(`${process.env.HOST}:${process.env.PORT}`)
            .post(`${route}/login`)
            .send({
                token: process.env.API_SECRET,
                email: email,
                password: pw
            });
}

describe('AUTH', () => {

    it('login', async () => {
        const res = await login();

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.have.true;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.include('login success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('access_token');
    });

    it('get user', async () => {
        const res_login = await login();

        const res = await chai.request(`${process.env.HOST}:${process.env.PORT}`)
                                        .post(`${route}/get-user`)
                                        .send({
                                            token: res_login.body.data.access_token
                                        });
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.have.true;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.include('get user success');
    });

    it('update user', async () => {
        const res_login = await login();

        const res = await chai.request(`${process.env.HOST}:${process.env.PORT}`)
                                        .put(`${route}/update-user`)
                                        .send({
                                            token: res_login.body.data.access_token,
                                            name: res_login.body.data.name === 'Riizu' ? 'Rizuki' : 'Riizu'
                                        });
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.have.true;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.include('profile has been updated successfully');
    });

    it('update password', async () => {
        const res_login = await login();

        const res = await chai.request(`${process.env.HOST}:${process.env.PORT}`)
                                        .put(`${route}/update-pw`)
                                        .send({
                                            token: res_login.body.data.access_token,
                                            old_password: "12345",
                                            new_password: "12345",
                                            new_password_confirm: "12345"
                                        });
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.have.true;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.include('password has been updated successfully');
    });

});