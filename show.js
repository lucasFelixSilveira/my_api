const Discord = require('discord.js')
const Canvas = require('canvas')
const Utils = require('../../utils/General.js')
const fsdb = require('fsdb.js')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
module.exports = {
    aliases: [ 'sexo' ],
    description: 'Veja o perfil de membros!',
    syntax: '[pre~][cmd~] @User(opcional)',
    cat: 'infos',
    emoji: '🙂',
    run: async function (client, message, args, db, mics) {
        const user = message.mentions.users.first() || message.author;
        const msgP = await message.channel.send(`⏰・Aguarde, estou processando seu perfil...`)
        try {
            const avatar = user.avatarURL({dynamic: true, format:'jpg'})
            function baixarAvatar(folder) {
                return new Promise(resolve => {
                    axios({
                        metohd: 'GET',
                        url: (!avatar?'https://images-ext-2.discordapp.net/external/a5M0eCUyKWxHtv46jzc3-38bx_vYIPwIYfXQUjob99c/https/i.imgur.com/bWhx7OT.png?width=461&height=490':user.avatarURL({format:'jpg'})),
                        responseType: 'stream'
                    }).then(response => {
                        new Promise((resolve_, reject_) => {
                            response.data.pipe(fs.createWriteStream(folder))
                            resolve_('ok')
                        }).then(
                            () => {
                                resolve(true)
                            }
                        )
                    })
                })
            }
            function name() {
                return new Promise(resolve => {
                    const n = user.tag.split('#')[0].split('');
                    const number = user.tag.split('#')[1]
                    const _name = `${n[0]+n[1]+n[2]+n[3]+n[4]+n[5]}...#${number}`
                    resolve(_name)
                })
            }
            const canvas = Canvas.createCanvas(1920, 1080)
            const ctx = canvas.getContext('2d')
            const folderAndFile = await Utils().backDir( await Utils().backDir(__dirname) ) + '/assets/mics/userAvatar.jpg'
            await baixarAvatar(folderAndFile)
            const dbUser = ( await db.ref(`users/${user.id}`).once('value') ).val();
            const avatar_ = await Canvas.loadImage('./src/assets/mics/userAvatar.jpg')
            ctx.drawImage(avatar_, 10, 30, 350, 350)
            const xp = ( dbUser?dbUser.rank?dbUser.rank.xp?dbUser.rank.xp:0:0:0 )
            const level = ( dbUser?dbUser.rank?dbUser.rank.level?dbUser.rank.level:1:1:1 )
            const max = level * 500;
            const _level = max / 7
            let level_ = 0
            if( xp > _level ) level_ = 1
            if( xp > _level * 2 ) level_ = 2
            if( xp > _level * 3 ) level_ = 3
            if( xp > _level * 4 ) level_ = 4
            if( xp > _level * 5 ) level_ = 5
            if( xp > _level * 6 ) level_ = 6
            setBg(level_)
            async function setBg(level_) {
                const background = await Canvas.loadImage('./src/assets/wallpapers/default/default-'+level_+'.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                const sb = dbUser? dbUser.perfil? dbUser.perfil.sobremim? dbUser.perfil.sobremim.value : 'Olá, eu sou um usuário da AnnyEta!' : 'Olá, eu sou um usuário da AnnyEta!' : 'Olá, eu sou um usuário da AnnyEta!'
                ctx.font = '63px calibri'
                ctx.fillStyle = '#ffffff'
                ctx.fillText(sb, 45, 920, 1780)
                ctx.font = '63px calibri'
                ctx.textAlign = 'center'
                ctx.fillText(`(${level}) ${xp}/${max}`, 970, 120, 260)
                ctx.font = '58px calibri'
                ctx.fillText(`${await name()}`, 490, 120)
                ctx.font = '34px calibri'
                ctx.fillStyle = '#cccccc'
                ctx.fillText(`${user.id}`, 490, 160)
                setTimeout(async () => fs.writeFile('./src/assets/mics/profile.jpg', canvas.toBuffer(), null, async (err) => {
                        if( err ) return console.log(err)
                        setTimeout(async () => {
                            const element = await fsdb.cdn().upload(folderAndFile.replace(folderAndFile.split('/').pop(), 'profile.jpg'))
                            fsdb.cdn().validate(element).then(async valid => {
                                const url = await valid.getURL()
                                try {msgP.delete()}catch(er){/** non */}
                                message.channel.send({content: `${message.author} ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ `+url}).then(
                                    (msg) => {
                                        setTimeout(async () => {
                                            try {msg.delete()}catch(er){/** non */}
                                            try {message.delete()}catch(er){/** non */}
                                        }, 1000 * 40)
                                    }
                                )
                            })
                        }, 2000)
                }), 1000)
            }
        } catch (er) {
            console.log(er)
            try {msgP.delete()}catch(er){/** non */}
            mics.err('Infelizmente houve uma falha ao processar seu perfil.')
        }
    }
}
