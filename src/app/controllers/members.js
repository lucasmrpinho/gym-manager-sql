const Intl = require('intl')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res){
        return res.render('members/index')
    },
    show(req, res){
        return 
    },
    create(req, res){
        return res.render('members/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if ( req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos!")
            }
        }

        let {avatar_url, name, birth, gender, services} = req.body

        return
    },
    edit(req, res){
        return
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if ( req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos!")
            }
        }

        let {avatar_url, name, birth, gender, services} = req.body

        return
    },
    delete(req, res){
        return
    }
}
