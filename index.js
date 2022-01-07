const soap = require('soap');

class Unicode {
    client;
    username;
    password;
    constructor(client) {
        this.client = client;
    }

    setConfig(username, password) {
        this.username = username;
        this.password = password;
    }

    GetPersonStatus(national_code) {
        return new Promise((resolve, reject) => {
            this.client.GetPersonStatus(
                {
                    username: this.username,
                    password: this.password,
                    nationalCode: national_code
                },
                (err, call) => {
                    if (err) return reject(err);
                    return resolve(call.GetPersonStatusResult);
                }
            );
        });
    }

    GetPersonCompany(national_code) {
        return new Promise((resolve, reject) => {
            this.client.GetPersonCompany({
                username: this.username,
                password: this.password,
                nationalCode: national_code
            }, (err, call) => {
                if (err) return reject(err);
                return resolve(call.GetPersonCompanyResult);
            });
        });
    }

    GetPersonCode(national_code) {
        return new Promise((resolve, reject) => {
            this.client.GetPersonCode({
                username: this.username,
                password: this.password,
                nationalCode: national_code
            }, (err, call) => {
                if (err) return reject(err);
                return resolve(call.GetPersonCodeResult);
            });
        });
    }

    ReActive(national_code) {
        return new Promise((resolve, reject) => {
            this.client.ReActive({
                username: this.username,
                password: this.password,
                nationalCode: national_code,
                IsCompanyRequest: true,
            }, (err, call) => {
                if (err) return reject(err);
                return resolve(call.ReActiveResult);
            });
        });
    }

    Register(national_code, first_name, last_name, father_name, phone, email, birth) {
        return new Promise((resolve, reject) => {
            this.client.Register({
                username: this.username,
                password: this.password,
                nationalCode: national_code,
                firstName: first_name,
                lastName: last_name,
                fatherName: father_name,
                phone1: phone,
                email: email,
                birthDate: birth,
            }, (err, call) => {
                if (err) return reject(err);
                return resolve(call.RegisterResult);
            });
        });
    }

    Revoke(national_code) {
        return new Promise((resolve, reject) => {
            this.client.Revoke({
                username: this.username,
                password: this.password,
                nationalCode: national_code,
                IsCompanyRequest: true,
            }, (err, call) => {
                if (err) return reject(err);
                return resolve(call.RevokeResult);
            });
        });
    }
}

module.exports = function () {
    return new Promise(async (resolve, reject) => {
        const client = await soap.createClientAsync('http://unicode.mimt.gov.ir/nmir.asmx?wsdl');
        resolve(new Unicode(client));
    });
}