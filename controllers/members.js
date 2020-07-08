const Intl = require('intl')
const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')


exports.index = (req,res) =>{
    return res.render('members/index', { members: data.members })
}

//SHOW
exports.show = (req,res) =>{
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    
    if (!foundMember){
        return res.send("Instrutor não encontrado.")
    }

    member = {
        ... foundMember,
        birth: date(foundMember.birth).birthDay,
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundMember.created_at)
    }

    return res.render('members/show', {member})
}

exports.create = (req, res) => {
    return res.render("members/create")
}

//POST
exports.post = (req,res) =>{
    const keys = Object.keys(req.body)

    for(key of keys){
        if ( req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos!")
        }
    }

    let {avatar_url, name, email, birth, gender, weight, height} = req.body
    
    birth = Date.parse(birth)
   
    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if(lastMember){
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        weight,
        height
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Erro na escrita do arquivo.')

        return res.redirect(`members/${id}`)
    })
}

//EDIT 
exports.edit = (req,res) =>{
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    
    if (!foundMember){
        return res.send("Instrutor não encontrado.")
    }

    member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

//PUT
exports.put = (req,res) =>{
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (member.id == id){
            index = foundIndex
            return true
        }
    })
    
    if (!foundMember){
        return res.send("Instrutor não encontrado.")
    }

    member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
    }

    data.members[index] = member 

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Error na escrita do arquivo.')

        return res.redirect(`members/${id}`)
    })
}

//DELETE
exports.delete = (req,res) =>{
    const { id } = req.body
    let index = 0

    const filteredMembers = data.members.filter(function(member){
        return member.id != id 
    })

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Error na escrita do arquivo.')

        return res.redirect(`members`)
    })
}
