const chai = require("chai");
const chaiHttp = require("chai-http");
//assertions
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    describe('GET /tasks/all', () => {
        it('It should GET all the tasks', (done) => {
            chai.request('http://localhost:3000')
                .get('/tasks/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    done()
                })
        })
        it('It should NOT GET all the tasks', (done) => {
            chai.request('http://localhost:3000')
                .get('/task/all')
                .end((err, res) => {
                    res.should.have.status(404);
                    done()
                })
        })
    })

    describe('GET /tasks/:id', () => {
        it('It should GET a task by id', (done) => {
            const taskId = 1
            chai.request('http://localhost:3000')
                .get('/tasks/' + 1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('done');
                    done();
                })
        })
    })

    // describe('POST /tasks/add', () => {
    //     it('It should post a new task', (done) => {
    //         let task = {
    //             id: 4,
    //             name: 'Make an http request',
    //             done: true
    //         }
    //         chai.request('http://localhost:3000')
    //             .post('/tasks/add')
    //             .send(task)
    //             .end((err, res) => {
    //                 res.should.have.status(201);
    //                 res.body.should.be.a('object')

    //             })
    //     })
    // })

})