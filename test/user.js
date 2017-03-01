const chai = require('chai');
const jsonfile = require('jsonfile');
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
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });
});

describe('/POST users', () => {
  it('should not POST a user when missing a field', (done) => {
    const user = {
	  	firstName: 'James',
	  	email: 'J@gmail.com'
	  };
    chai.request(url)
      .post('/users')
	    .send(user)
	    .end((err, res) => {
        if (err) {
          console.log(err.status);
        }
		  	res.should.have.status(400);
        res.text.should.eql('error with form data');
        done();
      });
  });

  it('should not POST a user with incorrect form', (done) => {
    const user = {
	  	firstName: 'Oliver',
      lastName: 'Twist',
	  	email: 'o@gmail.com',
      badNews: 'I\m coming in'
	  };
    chai.request(url)
      .post('/users')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err.status);
        }
        res.should.have.status(400);
        res.text.should.eql('error with form data');
        done();
      });
  });

  it('should POST a user when correct data is given', (done) => {
    const user = {
	  	firstName: 'Jerry',
      lastName: 'Seinfeld',
	  	email: 'js@gmail.com'
	  };
    const currentData = jsonfile.readFileSync('./users.json');
    chai.request(url)
      .post('/users')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        const currentUser = res.body[res.body.length - 1];

        res.should.have.status(200);
        res.body.length.should.be.eql(currentData.users.length + 1);

        currentUser.should.have.property('firstName');
        currentUser.should.have.property('lastName');
		  	currentUser.should.have.property('email');

        jsonfile.writeFileSync('./users.json', currentData)
        done();
      });
  })
});
