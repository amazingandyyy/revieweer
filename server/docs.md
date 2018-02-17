# Revieweer RESTful API v1 documentation

## BaseURI

- [base url][base url]:   `https://server.revieweer.com`
- [webhook][webhook]:     `https://server.revieweer.com/webhook`
- [open api][open api]:   `https://server.revieweer.com/openapi`
- [auth api][auth api]:   `https://server.revieweer.com/api`

notes: The first three route are publicly available.

[base url]: https://server.revieweer.com/
[webhook]: https://server.revieweer.com/webhook/
[open api]: https://server.revieweer.com/openapi/
[auth api]: https://server.revieweer.com/api/

## API Usage & Response

to use `/api` route, complete the following stpes:

- Login [revieweer](https://revieweer.com/#signin) to signup
- A `auth_jwt_token` will be generated and stored in your browser localStorage
- This token will expired in 7 days, to request an extended token, [contact]((team@revieweer.com)) us
- request the endpoint with an `Authentication` header

Example:

```javascript
request.headers['Authorization'] = `token`
```

### Endpoints

#### Account

- GET `https://server.revieweer.com/api`
  - good response
  ```json
  {'message': '/api connected'}
  ```
  - bad response
  ```json
  'Please make sure your request has an Authorization header.'
  ```
- GET `https://server.revieweer.com/api/userProfile`
- POST `https://server.revieweer.com/api/userProfile`

#### Product

- POST `https://server.revieweer.com/api/product/createFromAmazonSource?source=XXX`
  - request sample:
  ```terminal
  POST https://server.revieweer.com/api/product/createFromAmazonSource?source=https://www.amazon.com/gp/product/B005FEGYJC
  ```
  - good response:
  ```json
  "5a87d194d2b4c919cb364a9c"
  ```
- GET `ttps://server.revieweer.com/api/product`
  - good response:
  ```json
  { 'message': '/api/product connected' }
  ```
- GET `ttps://server.revieweer.com/api/product/getOneFromAmazon`
- GET `https://server.revieweer.com/api/getOneFromRevieweer?productId=XXX`
  - request sample:
  ```terminal
  GET https://server.revieweer.com/api/getOneFromRevieweer?productId=5a87d194d2b4c919cb364a9c
  ```
  - good response:
  ```json
    {
      "basic_info": {
          "imageURL": "https://images-na.ssl-images-amazon.com/images/I/51QkQmoDrUL._AC_US218_.jpg",
          "title": "LE Headlamp LED, 4 Modes Headlight, Battery Powered Helmet Light for Camping, Running, Hiking and Reading, 3 AAA Batteries Included",
          "link": "https://www.amazon.com/Headlamp-Headlight-Battery-Batteries-Included/dp/B005FEGYJC/ref=sr_1_1/134-0081924-2614903?ie=UTF8&qid=1518850452&sr=8-1&keywords=B005FEGYJC",
          "price": 7.99,
          "seller": "Lighting EVER"
      },
      "end": false,
      "_id": "5a87d194d2b4c919cb364a9c",
      "productId": "B005FEGYJC",
      "createdAt": "2018-02-17T06:54:12.638Z",
      "updatedAt": "2018-02-17T06:54:12.638Z",
      "__v": 0
    }
  ```
- GET `https://server.revieweer.com/api/admin`
  - good response: `{'message': '/api/admin connected'}`