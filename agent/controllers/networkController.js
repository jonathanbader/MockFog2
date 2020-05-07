const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();
const networkService = require("../services/networkService.js")

module.exports = function(app) {

    /**
     * Expects a tcconfig JSON as produced by the tcshow command.
     */
    app.put("/network/tcconfig", jsonParser, function(req, res) {
        
        networkService.updateTCConfig(req.body)
            .then(result => {
                if (result) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(400)
                }
            })
    });

}