/* eslint-disable no-unused-vars, no-undef*/
const formError = require('../errors').formError;
const chai = require('chai');

describe('form error function handling', () => {
	it('should return true when the form is missing a property', (done) => {
		const form = {
			firstName: 'tim',
			lastName: 'Jones',
		};
		formError(form).should.be.eq(true);
		done();
	});

	it('should return true with an incorrect form', (done) => {
		const form = {
			firstName: 'tim',
			lastName: 'Jones',
			emal: 'wrongEmailSpelling',
		};
		formError(form).should.be.eq(true);
		done();
	});

	it('should return false when the form is correct', (done) => {
		const form = {
			firstName: 'Jane',
			lastName: 'Jackson',
			email: 'Jane@gmail.co',
		};
		formError(form).should.be.eq(false);
		done();
	});
});
