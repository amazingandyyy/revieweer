import axios from 'axios';
import config from '../config';
import Product from './model';

export default function itemLookUp(productId, cb){
    if(!productId) return cb(new Error('No productId Is Provided.'));
    Product.findOne({ productId })
        .then(p=>{
            if(!p) return searchViaApify();
            return cb(null, {
                message: 'Existing',
                productId: p._id
            })
        })
        .catch(err=>cb(err))

    const searchViaApify = () => {
        axios.post(`https://api.apify.com/v1/k85BDCrCt5HTrNAE4/crawlers/xZbpx7AEMEzYCQMLP/execute?token=${config.apifyToken.itemLookUp}`, {
            "startUrls": [
                {
                    "key": "START",
                    "value": `https://www.amazon.com/s/field-keywords=${productId}`
                }
            ]
        })
        .then(r=>cb(null, {
            message: 'New',
            productPendingId: r.data._id
        }))
        .catch(err=>cb(err))
    }
}

// For information about migrating to our APIs refer to our 
// Marketplace APIs at https://developer.amazonservices.com/ref=rm_c_sv
// our Product Advertising API at https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html/ref=rm_c_ac for advertising use cases.

//
//
// Testing //
// itemLookUp('https://www.amazon.com/Drive-Converter-FIDECO-Adapter-External/dp/B077N2KK27/ref=sr_1_1?ie=UTF8&qid=1518249729&sr=8-1&keywords=B077N2KK27')
//   .then(product=>{
//     console.log('product', product)
//   }).catch(e=>console.log(e));
//
//