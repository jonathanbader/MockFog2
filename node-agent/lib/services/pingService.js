var ping = require('ping')
const logger = require("./logService.js")("pingService")

let timer
const ping_history = []

function startPinging(interval, hosts) {

    if (timer) {
        logger.debug("Clearing ping timer")
        clearInterval(timer)
    }

    logger.info("Started ping to " + hosts)
    timer = setInterval(function() {
        pingHosts(hosts).then(function(res) {
            ping_history.push(res)
        })
    }, interval)

}

/**
 * 
 * Returns ping measurements to every host and unix timestamps.
 * 
 * @param {Array} hosts - an array of host ip address strings
 * @returns {object} - see above
 */
async function pingHosts(hosts) {
    pings = []
    for(let host of hosts) {
        res = await ping.promise.probe(host, {
            extra: ["-c", "3"]
        })

        logger.verbose(res)

        pings.push({
            "host": host,
            "ping": res.avg,
            "time": Date.now()
        })
    }
    return pings
}

module.exports = {
    startPinging: startPinging,
    ping_history: ping_history
}