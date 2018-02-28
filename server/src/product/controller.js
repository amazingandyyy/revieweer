import Product from './model';
import itemLookUp from './itemLookUp';
import axios from 'axios';
import {dotNotate} from '../services';
export default {
  searchAmazonByProductId: (req, res, next) => {
    const {productId} = req.query;
    if(!productId) return next('403:productId is required');
    itemLookUp(productId, (err, p)=>{
      if(err) return next;
      res.send(p)
    })
  },
  createOne: (req, res, next) => {
    const obj = req.body;
    if(!obj)return next('500:No Product Details')
    const cleanUpObj = {
      details: {
        imageURL: obj.imageURL,
        title: obj.title,
        link: obj.link,
        price: obj.price,
        seller: obj.seller,
      },
      benefits: {
          cashback: obj.cashback,
          notes: obj.notes || '',
          rewards: obj.rewards,
      },
      productId: obj.productId,
      createdBy: req.user._id  // must be admin
    }
    Product.findOneByProductId(obj.productId)
    .then(p=>{
      if(p) {
        return res.send({
          message: 'Existing',
          productId: p.productId
        })
      }
      const product = new Product(cleanUpObj);
      product.save().then(p=>{
        return res.send({
          message: 'New',
          productId: p.productId
        })
      })
    })
    .catch(next)
  },
  getOneByProductId: (req, res, next) => {
    const {productId} = req.query;
    if(!productId) next('404:No Product Id')
    productId
    ?Product.findOneByProductId(productId)
      .then(p=>res.send(p))
      .catch(next)
    :next('404:No Product Id')
  },
  endOneById: (req, res, next) => {
    const {id} = req.query;
    id
    ?Product.findByIdAndUpdate(id, { end: true })
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  updateOneById: (req, res, next) => {
    const {id} = req.query;
    const obj = req.body;
    id
    ?Product.findByIdAndUpdate(id, {$set: dotNotate(obj)})
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  activeOneById: (req, res, next) => {
    const {id} = req.query;
    id
    ?Product.findByIdAndUpdate(id, { end: false })
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  deleteOneById: (req, res, next) => {
    const {id} = req.query;
    id
    ?Product.findByIdAndRemove(id)
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  fetchProductPreview: (req, res, next) => {
    const {productPendingId} = req.query;
    axios.get(`https://api.apify.com/v1/execs/${productPendingId}/results`)
        .then(p=>res.send(p.data[0].pageFunctionResult))
        .catch(next)
  },
  fetchAll: (req, res, next) => {
    Product.find({})
    .sort({createdAt: -1})
    .then(list=>{
      res.send({
        total: list.length,
        list
      })
    })
    .catch(next)

    // use local time: 
    //     new Date(2018, 1, 20, 23, 13, 27)
    // convert to ISO: 
    //     .toISOString() = "2018-02-21T07:13:27.000Z"
    // can use it intuitively: 
    //     .where('createdAt').gt(new Date(2018, 1, 20, 23, 13, 27).toISOString())
    // result:
    //     2018-02-21T07:14:28.372Z stay
    //     2018-02-21T07:13:26.372Z out
  },
}

// let larger = new Date(list[0].createdAt); // younger is bigger, have passed more time
// let smaller = new Date(2018, 1, 20, 23, 15, 33);
// // '2018-02-21T07:15:34.256Z' > 
// // '2018-02-21T07:15:33.000Z'
// console.log('local larger', larger.toLocaleString());
// console.log('>')
// console.log('local smaller', smaller.toLocaleString())
// console.log('is', larger>smaller)