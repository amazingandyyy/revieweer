import axios from 'axios';
import config from '../config';

export default function itemLookUp(uri, cb){
        if(!uri) return cb(new Error('No Uri Is Provided.'));
        if(uri.search('/B0') < 0) return cb(new Error('No Product Id Found'));
        let productId = 'B0' + uri.split('/B0')[1].split('/')[0];
        axios.post(`https://api.apify.com/v1/k85BDCrCt5HTrNAE4/crawlers/xZbpx7AEMEzYCQMLP/execute?token=${config.apifyToken.itemLookUp}`, {
            "startUrls": [
                {
                    "key": "START",
                    "value": `https://www.amazon.com/s/field-keywords=${productId}`
                }
            ]
        })
        .then(res=> {
            const {status, resultsUrl, _id, detailsUrl} = res.data;
            cb(null, {status, resultsUrl, _id, detailsUrl});
        })
        .catch(err=>{
            console.log(err)
            cb(err)
        })
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