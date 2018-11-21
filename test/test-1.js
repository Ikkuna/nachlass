const redisOptions = {
    port: 6379,
    // host: 'redis'
    host: '192.168.99.100'
},
redis     = require('redis'),
client    = redis.createClient(redisOptions.port, redisOptions.host),
nachlass = require('../');

nachlass.setClient(client);  

const dosearch = (x, search) => {
    return new Promise( (resolve, reject) => {
        const reqCallback = (err, ids) => {
            if (err) reject(err);
            else resolve(ids);
        };
        search.query(x).end(reqCallback)
    })
}

querylist = [ [ 'lapiz', 'pasta' ] ]

nachlass.createSearch('catalog-search', {}, (err, search) => {
    var skus = [];
    var finalresult = [];
    // var sku_result = 
        querylist.map( (x,i) =>   {
            // console.log('searching ',x)
            return dosearch(x, search) 
        }).reduce( (acc,x) => {
            return x.then( (y) => {
                finalresult = finalresult.concat(y)
                // console.log(y,finalresult)
             } )
         } , Promise.resolve() )
        .then( () =>  client.hmget('skus',finalresult, (err, items) => {
                // console.log( 'correct ?', JSON.stringify(items) )
                // console.log('will send',msg.from.value)
                console.log('items',items)
                // if (msg.from.value[0].address) storeclassification( msg, typeof items !== 'undefined' && items.length > 0 ? items.map( (x,i) => finalresult[i]+' '+x ) : [ 'no result' ] )
            })
        )
        .catch(err => { console.log('err',err)});
});