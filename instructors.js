const Intl = require('intl')
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')


exports.index = (req,res) =>{
    return res.render('instructors/index', { instructors: data.instructors })
}

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
    services = services.split(',')
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

        return res.redirect(`instructors/${id}`)
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

//PUT
exports.put = (req,res) =>{
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (instructor.id == id){
            index = foundIndex
            return true
        }
    })
    
    if (!foundInstructor){
        return res.send("Instrutor não encontrado.")
    }

    instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
        services: req.body.services.split(',')
    }

    data.instructors[index] = instructor 

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Error na escrita do arquivo.')

        return res.redirect(`instructors/${id}`)
    })
}

//DELETE
exports.delete = (req,res) =>{
    const { id } = req.body
    let index = 0

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id 
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Error na escrita do arquivo.')

        return res.redirect(`instructors`)
    })
}
