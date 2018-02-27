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