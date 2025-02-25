const app = require('../server.js');

module.exports = async function (context, req) {
    await new Promise((resolve, reject) => {
        app(req, context.res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}; 