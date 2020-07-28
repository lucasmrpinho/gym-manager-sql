const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM members`, function(err, results){
            if (err) return res.send("Database: Error!")

            callback(results.rows)
        })
    },
    
    create(data, callback){
        
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.weight,
            data.height,
            data.instructor
        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database error! + ${err}`
          
            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`SELECT members.*, instructors.name AS instructor_name 
                  FROM members 
                  LEFT JOIN instructors ON (members.instructor_id = instructors.id)
                  WHERE members.id = $1`, [id], function(err, results){
            if(err) throw `Database error! + ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `UPDATE members SET
                        avatar_url = ($1),
                        name = ($2),
                        email = ($3),
                        birth = ($4),
                        gender = ($5),
                        weight = ($6),
                        height = ($7), 
                        instructor_id = ($8)
                       WHERE id = $9
                       `
        
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! + ${err}`

            callback()
        })
    },

    delete(id, callback){
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error! + ${err}`

            callback()
        })
    },

    instructorsSelectOptions(callback) {
        db.query(`SELECT id, name FROM instructors `, function(err, results){
            if(err) throw `Database error! + ${err}`

            callback(results.rows)
        })

    }

}