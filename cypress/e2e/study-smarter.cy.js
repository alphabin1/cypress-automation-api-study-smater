const { validateSchema } = require('../support/schemaValidation')
const signUpSchema = require('../fixtures/signUpResponseSchema.json')
const loginSchema = require('../fixtures/loginResponseSchema.json')
const randomNumber = Math.floor(Math.random() * 1000)
const email_random = `'pratik+studysmarterdemo${ randomNumber }@alphabin.co`
const password = '6yaUClWGIVyhuzYQ'
const studySetName = 'test'
let studysetId
let new_userId
let old_userId
let firstName
let lastName
let userName
let email
let join_date
let signUpAccessToken
let loginAccessToken
let token

describe("Study-smater Tests:", function () {        
     it("API Test: Should able to create new user account", function () {
          cy.request({
               method: 'POST',
               url:  `${Cypress.env('API_BASE_URL')}/users/`, // baseUrl
               body: {
                    "email": email_random,
                    "platform": "web",
                    "language": "en-gb",
                    "signup_location": "webapp",
                    "delayed_confirmation_possible": true,
                    "university": null,
                    "course_of_studies": null,
                    "password": password,
                    "tracking_number":2139
               },
          }).then((response) => {
                    // Check response
                    expect(response.status).to.eq(201)
                    expect(response.isOkStatusCode).to.eq(true)
                    expect(response.statusText).to.eq("Created")

                    // Check response headers
                    expect(response.headers['connection']).to.eq('keep-alive');
                    expect(response.headers['content-type']).to.eq('application/json');
                    expect(response.headers['strict-transport-security']).to.contains('max-age=31536000');
                    expect(response.headers['strict-transport-security']).to.contains('includeSubDomains');
                    expect(response.headers['strict-transport-security']).to.contains('preload');

                    // Check response body
                    expect(response.body['id']).to.id
                    expect(response.body['first_name']).to.undefined
                    expect(response.body['last_name']).to.undefined
                    expect(response.body['user']['username']).to.eq(email_random)
                    expect(response.body['user']['email']).to.eq(email_random)
                    expect(response.body['user']['email']).to.eq(email_random)
                    expect(response.body['user']['date_joined']).to.string
                    expect(response.body['token']).to.string

                    // Schema validation
                    validateSchema(signUpSchema, response.body)

                    // Get response data
                    new_userId = response.body['id']
                    firstName = response.body['user']['first_name']
                    lastName = response.body['user']['last_name']
                    userName = response.body['user']['username']
                    email = response.body['user']['email']
                    join_date = response.body['user']['date_joined']
                    signUpAccessToken = response.body['token']
               }
          )
     });

     it("API Test: Should able to login with user credentials", function () {

          cy.request({
               method: 'POST',
               url: `${Cypress.env('API_BASE_URL')}/api-token-auth/`, // baseUrl
               body: {
                    "username": email,
                    "password": password,
               },
          }).then((response) => {
                    // Check response
                    expect(response.status).to.eq(200)
                    expect(response.isOkStatusCode).to.eq(true)
                    expect(response.statusText).to.eq("OK")

                    // Check response headers
                    expect(response.headers['connection']).to.eq('keep-alive');
                    expect(response.headers['content-type']).to.eq('application/json');
                    expect(response.headers['strict-transport-security']).to.contains('max-age=31536000');
                    expect(response.headers['strict-transport-security']).to.contains('includeSubDomains');
                    expect(response.headers['strict-transport-security']).to.contains('preload');

                    // Check response body
                    expect(response.body['token']).to.string
                    expect(response.body['id']).to.eq(new_userId)
                    expect(response.body['language']).to.eq('en')

                    // Schema validation
                    validateSchema(loginSchema, response.body)

                    // Get response data
                    old_userId = response.body['id']
                    loginAccessToken = response.body['token']
               }
          )
     })

     it("API Test: Should able to create study set", function () {
          token = `Token ${loginAccessToken}`
          cy.request({
               method: 'POST',
               url: `${Cypress.env('API_BASE_URL')}/users/${old_userId}/course-subjects/`, // baseUrl
               headers: {
                    authorization: token,
               },
               body: {
                    "name": studySetName,
                    "colorId": 1,
                    "shared": true,
                    "exam_date": join_date,
                    "countries":[],
                    "level":0
               },
          }).then((response) => {
                    // Check response
                    expect(response.status).to.eq(201)
                    expect(response.isOkStatusCode).to.eq(true)
                    expect(response.statusText).to.eq("Created")

                    // Check response headers
                    expect(response.headers['connection']).to.eq('keep-alive');
                    expect(response.headers['content-type']).to.eq('application/json');
                    expect(response.headers['strict-transport-security']).to.contains('max-age=31536000');
                    expect(response.headers['strict-transport-security']).to.contains('includeSubDomains');
                    expect(response.headers['strict-transport-security']).to.contains('preload');

                    // // Check response body
                    expect(response.body['id']).to.id
                    expect(response.body['colorId']).to.eq(1)
                    expect(response.body['creator_id']).to.id
                    expect(response.body['breadcrumbs'][0]['name']).to.eq(studySetName)
                    expect(response.body['breadcrumbs'][0]['id']).to.eq(response.body['id'])

                    // Get response data
                    studysetId = response.body['id']
               }
          )
     })

     it("API Test: Should able to delete study set", function () {
          cy.request({
               method: 'DELETE',
               url: `${Cypress.env('API_BASE_URL')}/users/${old_userId}/course-subjects/${studysetId}`, // baseUrl
               headers: {
                    authorization: token,
               },
          }).then((response) => {
                    // Check response
                    expect(response.status).to.eq(200)
                    expect(response.isOkStatusCode).to.eq(true)
                    expect(response.statusText).to.eq("OK")

                    // Check response headers
                    expect(response.headers['connection']).to.eq('keep-alive');
                    expect(response.headers['content-type']).to.eq('application/json');
                    expect(response.headers['strict-transport-security']).to.contains('max-age=31536000');
                    expect(response.headers['strict-transport-security']).to.contains('includeSubDomains');
                    expect(response.headers['strict-transport-security']).to.contains('preload');
               }
          )
     })
})
