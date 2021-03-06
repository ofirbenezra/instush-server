const https = require("https");

var images = [];
var tag = "";
var token = '7484048701.40116e0.346f60d6b2694139b646173871cef740',
    num_photos = 1; // maximum 20



function recursiveGetProp(obj, lookup, callback) {
    for (property in obj) {
        if (property == lookup) {
            callback(obj[property]);
        } else if (obj[property] instanceof Object) {
            recursiveGetProp(obj[property], lookup, callback);
        }
    }
}
var InstaClient = {
    getProps(tag,minTagId){
        let url = `https://api.instagram.com/v1/tags/${tag}/media/recent?&access_token=` + token;

        if(minTagId != -1){
            url += '&min_tag_id=' + minTagId;
        }
        // Return new promise
        return new Promise(function(resolve, reject) {
            // Do async job
            https.get(url, res => {
                res.setEncoding("utf8");
                var body = "";

                res.on("data", data => {
                    body += data;

                });

                res.on("end", () => {
                    console.log(body);
                    const jsonObj = JSON.parse(body);

                    let ImageData  = { data:[], paging:{}};
                    ImageData.data = jsonObj.data.map((obj) => {
                        return {
                            url: obj.images.standard_resolution.url,
                            width: obj.images.standard_resolution.width,
                            height: obj.images.standard_resolution.height,
                        };
                    });
                    ImageData.paging.minTagId = jsonObj.pagination? jsonObj.pagination.min_tag_id: -1,
                    resolve(ImageData);
                });
            });
        })




    }
};
module.exports = InstaClient;