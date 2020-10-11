const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('../index')
    //assertions
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    describe('GET /tasks/all', () => {
        it('It should GET all the tasks', (done) => {
            chai.request(server)
                .get('/tasks/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    done()
                })
        })
        it('It should NOT GET all the tasks', (done) => {
            chai.request(server)
                .get('/task/all')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })

    describe('GET /tasks/:id', () => {
        it('It should GET a task by id', (done) => {
                const taskId = 1
                chai.request(server)
                    .get(`/tasks/${taskId}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('name');
                        res.body.should.have.property('done');
                        res.body.should.have.property('id').eql(1);
                        done();
                    })
            })
            // it('It should NOT GET a task by id', (done) => {
            //     const taskId = 212
            //     chai.request(server)
            //         .get(`/tasks/${taskId}`)
            //         .end((err, res) => {
            //             res.should.have.status(404)
            //             res.body.should.have.property('id').eq(`Cannot find task with id ${taskId}`)
            //             done();
            //         })
            // })
    })

    describe('POST /tasks/add', () => {
        it('It should POST a new task', (done) => {
            let task = {
                name: 'Make an http request',
                done: true
            }
            chai.request(server)
                .post('/tasks/add')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name').eql('Make an http request')
                    res.body.should.have.property('done').eql(true)
                    res.body.should.have.property('id').eql(4)
                    done();
                })
        })
        it('It should NOT POST a new task', (done) => {
            let task = {

            }
            chai.request(server)
                .post('/tasks/add')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object').eql('{}')
                    done();
                })
        })
    })

})