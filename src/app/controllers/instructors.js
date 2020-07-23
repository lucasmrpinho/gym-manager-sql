const Intl = require('intl')
const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(req, res){
        db.query(`SELECT * FROM instructors`, function(err, results){
            if (err) return res.send("Database: Error!")

            return res.render("instructors/index", {instructors: results.rows})
        })
    },
    show(req, res){
        return 
    },
    create(req, res){
        return res.render('instructors/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if ( req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos!")
            }
        }

        let {avatar_url, name, birth, gender, services} = req.body

        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            req.body.avatar_url,
            req.body.name,
            date(req.body.birth).iso,
            req.body.gender,
            req.body.services,
            date(Date.now()).iso
        ]
        
        db.query(query, values, function(err, results){
            if(err) return res.send("Database: Error!")

            return res.redirect(`/instructors/${results.rows[0].id}`)
        })
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
