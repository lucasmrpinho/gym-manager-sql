const Intl = require('intl')
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

//SHOW
exports.show = (req,res) =>{
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    
    if (!foundInstructor){
        return res.send("Instrutor não encontrado.")
    }

    instructor = {
        ... foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(', '),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    }

    return res.render('instructors/show', {instructor})
}

//POST
exports.post = (req,res) =>{
    const keys = Object.keys(req.body)

    for(key of keys){
        if ( req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos!")
        }
    }

    let {avatar_url, name, birth, gender, services} = req.body
    
    birth = Date.parse(birth)
    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Erro na escrita do arquivo.')

        return res.redirect("instructors")
    })
}

//EDIT 
exports.edit = (req,res) =>{
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    
    if (!foundInstructor){
        return res.send("Instrutor não encontrado.")
    }

    instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', { instructor })
}