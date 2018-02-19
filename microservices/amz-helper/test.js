var handler = require('./handler');

test('can use', done => {
  const eventMock = {
    queryStringParameters : {
      token: 'LAMBDA_UNSAFE_TOKEN',
      productId: 'B06XCM9LJ4'
    }
  }
  
  handler.itemLookUp(eventMock, {}, function(err, res) {
    console.log(err);
    if(!err){
      console.log(res);
      done();
    }
  })  
})