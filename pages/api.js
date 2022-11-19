const {FIreray} = require('../src/date.json')
const fetch = require('node-fetch')

function Home(req, res) {
    fetch("https://lucasfelixsilveira.github.io/my_api/", {
        "method": "GET",
        "headers": {
            "user-agent": "vscode-restclient"
        }
    })
    .then(res => res.json())
    .then(res_ => {
        res.send(200).json(res_)
    })
}

export default Home;