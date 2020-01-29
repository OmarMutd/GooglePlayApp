const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of games on google playstore', () => {
        return supertest(app)
        .get("/apps")
        .expect("Content-Type", /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(13);
            const app = res.body[0];
            expect(app).to.include.all.keys(
                "App", "Category", "Rating", "Price"
            ) 
        })
    })
    it('Can sort by App', () => {
        return supertest(app)
        .get("/apps")
        .query({sort: "App"})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
        

    })
    it('Can sort by Rating', () => {
        return supertest(app)
        .get("/apps")
        .query({sort: "Rating"})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            
            

        });
})
})
