import https from 'https'

export function apiRequest(url: string) {
    return new Promise(function (resolve, reject) {
        const req = https.request(url, function (res) {
            if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
                return reject(new Error(`statusCode=${res.statusCode}`))
            }
            const body: Uint8Array[] = []
            res.on('data', function (chunk) {
                body.push(chunk)
            })
            res.on('end', function () {
                try {
                    const res = JSON.parse(Buffer.concat(body).toString())
                    resolve(res)
                } catch (e) {
                    reject(e)
                }
            })
        })
        req.on('error', function (err) {
            reject(err)
        })
        req.end()
    })
}
