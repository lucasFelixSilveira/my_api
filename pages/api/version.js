const {FIreray} = require('../../src/date.json')

function Home(req, res) {
    res.status(200).json({
        FIreray: {
            version: FIreray.version
        }
    })
}

export default Home;