const chai = require('chai');
const chaiHttp = require('chai-http');
const url = 'http://localhost:3000';
const should = chai.should();

chai.use(chaiHttp);

describe('/GET users', () => {
  it('should GET all the users', (done) => {
    chai.request(url)
      .get('/users')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });
});

describe('/POST users', () => {
  it('should not POST a book when missing a field', (done) => {
    const user = {
	  	firstName: 'James',
	  	email: 'J@gmail.com'
	  };
    chai.request(url)
      .post('/users')
	    .send(user)
	    .end((err, res) => {
		  	res.should.have.status(200);
        res.text.should.eql('error with data');
        done();
      })
  })

  it('should not POST a book with incorrect form', (done) => {
    const user = {
	  	firstName: 'Oliver',
      lastName: 'Twist',
	  	email: 'o@gmail.com'
	  };
    chai.request(url)
      .post('/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.eql('error with data');
        done();
      })
  })
})
