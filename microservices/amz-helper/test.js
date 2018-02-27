var handler = require('./handler');

test('can use', done => {
  const eventMock = {
    queryStringParameters : {
      token: 'LAMBDA_UNSAFE_TOKEN',
      productId: 'B06XCM9LJ4'
    }
  }
  
  handler.itemLookUp(eventMock, {}, function(err, res) {
    if(!err){
      done();
    }
  })  
})