/// <reference types ="cypress" />

const key = 'reqres-free-v1'

it('API-SANBER-1 : user API ', () => {

    cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        }
        }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('data')
    })
})

it('API-SANBER-2 : user id API ', () => {

    cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/1',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        }
        }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.data.first_name).to.eq('George')
    })
})

it('API-SANBER-3 : update user API ', () => {

    cy.request({
        method: 'PUT',
        url: 'https://reqres.in/api/users/2',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        },
        body:{

        }
        }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('updatedAt')
    })
})

it('API-SANBER-4 : patch user API ', () => {

    cy.request({
        method: 'PATCH',
        url: 'https://reqres.in/api/users/2',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        },
        body:{

        }
        }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('updatedAt')
    })
})

it('API-SANBER-5 : delete user API ', () => {

    cy.request({
        method: 'DELETE',
        url: 'https://reqres.in/api/users/3',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        }
        }).then((res) => {
        expect(res.status).to.eq(204)
    })
})

it('API-SANBER-6 : register API ', () => {

    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        },
        body:{
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
        }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('token')
        expect(res.body).to.have.property('id')
    })
})

it('API-SANBER-7 : login user API ', () => {

    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        },
        body:{
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
        }).then((res) => {
           
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('token')
    })
})
it('API-SANBER-8 : logout user API ', () => {

    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/logout',
        headers: {
            'x-api-key': key,
            'Content-Type': 'application/json'
        },
        body:{
        }
        }).then((res) => {
        expect(res.status).to.eq(200)
    })
})