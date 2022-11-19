module.exports.run = (app, FIreray) => {

    app.get('fireray/version', (req, res) => {
        res.status(200).json({version: FIreray.version})
    })

}