var parse = require('../lib/parse'),
    market = require('../lib/market'),
    goods = [];

module.exports = {
    upload: require('multer')({
        dest: './uploads/'
    }),

    parse: function (req, res, next) {
        var goodNames = parse(req.files.file.path);
        if (goodNames.length == 0) {
            res.status(400).send('Parsed 0 goods');
            return;
        }

        goods = goodNames.map(function (good) {
            return { name: good, price: undefined, sent: false }
        });

        market.enqueue(goodNames);
        res.send(goodNames);
    },

    status: function (req, res, next) {
        var wait = 0;
        var goodsToSend = [];

        console.log(market);

        goods.forEach(function (good) {
            good.price = market.prices[good.name];
            if (!good.sent) {
                if (good.price) {
                    goodsToSend.push(good);
                    good.sent = true;
                }
                else {
                    wait++
                }
            }
        });

        res.send({
            goods: goodsToSend,
            wait: wait
        });
    }
};