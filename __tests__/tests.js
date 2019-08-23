const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');

describe('Routes', () => {
  beforeEach(async () => {
      // guarantees that the table is cleaned out before any of the tests run
      await db('users').truncate();
  });

  describe('GET /api/jokes', () => {
    it('should return JSON', () => {
      return request(server)
        .get('/api/jokes')
        .then(response => {
          expect(response).toHaveProperty('type', 'application/json');
        })
    });
    it('should return 200 code', () => {
        return request(server)
          .get('/api/jokes')
          .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InZsYWQiLCJpYXQiOjE1NjY1NzQzNDIsImV4cCI6MTU2NjYwMzE0Mn0.Je70Q__R59O5wMTEWxeVFHV8SyAZkyoFRs_k6aszDcc")
          .then(response => {
            expect(response).toHaveProperty('status', 200);
          })
      });
  });

  describe('POST /api/auth/register', () => {
    it('should return JSON', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'cosmo', password: 'timmy' })
        .then(response => {
            expect(response).toHaveProperty('type', 'application/json');
        })
    });
    it('should send a status code code 200', () => {
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'wanda', password: 'timmy' })
            .then(response => {
                expect(response).toHaveProperty('status', 200);
            })
    });
    it('should return JSON', () => {
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'cosmo', password: 'timmy' })
          .then(response => {
              expect(response).toHaveProperty('type', 'application/json');
            // expect(response).toHaveProperty('status', 200);
          })
      });
      it('should send a status code code 401', () => {
          return request(server)
            .post('/api/auth/login')
            .send({ username: 'wanda', password: 'timmy' })
            .then(response => {
              expect(response).toHaveProperty('status', 401);
            })
        });
    });

  });

//   describe('POST /api/auth/login', () => {
//     it('should return JSON', () => {
//       return request(server)
//         .post('/api/auth/login')
//         .send({ username: 'cosmo', password: 'timmy' })
//         .then(response => {
//             expect(response).toHaveProperty('type', 'application/json');
//         })
//     });
//     it('should send a status code code 200', () => {
//         return request(server)
//           .post('/api/auth/login')
//           .send({ username: 'wanda', password: 'turner' })
//           .then(response => {
//             expect(response).toHaveProperty('status', 200);
//           })
//       });
//   });
// });