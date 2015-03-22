var request = require('request'),
    cheerio = require('cheerio'),
    async = require('async'),
    Q = require('q'),
    _ = require('lodash'),
    prices = {};

function find(good) {
    var defer = Q.defer();
    request('http://market.yandex.ru/search.xml', { qs: { text: good } }, function (err, res, body) {
        setTimeout(function () {
                if (err) {
                    console.log(err);
                    defer.reject();
                    return;
                }
                defer.resolve(body);
            },
            500)
    });
    return defer.promise;
}

function parse(html) {
    $ = cheerio.load(html);
    var queries = [
        '.snippet-card__price .price',
        '.main .headline .breadcrumbs',
        '.layout__col_search-results_normal p'
    ];

    var texts = [];
    queries.forEach(function (query) {
        var text = $(query).text().trim();
        if (text.length > 0) {
            texts.push(text);
        }
    });

    if (texts.length > 0) return texts[0];

    console.log('-----------------------------------------------------------');
    console.log(html);
    console.log('-----------------------------------------------------------');

    return 'хуй';
}

function getPrice(good, cb) {
    return find(good)
        .then(function (html) {
            var price = parse(html);
            if (price) {
                console.info(good, 'стоит', price);
                prices[good] = price;
            }
            else {
                console.error('Could not parse price for', good.name);
            }
            cb();
        }, function (error) {
            prices[good] = 'error';
            console.error('Shit happened', good, error);
            cb();
        })
}

module.exports = {
    prices: prices,
    enqueue: function (goods) {
        goods.forEach(function (good) {
            prices[good] = undefined;
        });
        async.parallel(goods.map(function (good) {
            return function () {
                return getPrice(good)
            }
        }), 1)
    }
};