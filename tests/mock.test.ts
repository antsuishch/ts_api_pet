import { describe, it } from 'mocha';
import { strict as assert } from 'assert'
import { PetController } from '../api/controller/pet.controller';

const pet = new PetController()

describe('Test suite /pet', () => {
    
    it('GET - pet by id', async ()=> {

        let body = await pet.getById(2)
        assert(body.category.id === 2, `Expect status created but was ${body.category.id}`)
    })

    it('GET - find by status-available with query params', async ()=> {

        let body = await pet.findByStatus('available')
        assert(body.length > 0)
    })

    it('GET - find by status sold with query params', async ()=> {
       
        let body = await pet.findByStatus('sold')
        assert(body.length > 0)

    })

    it('GET - find by status pending with query params', async ()=> {
       
        const body = await pet.findByStatus('pending');
        assert(body.some((pet: any) => pet.status === 'pending'))

    })

    it('GET - find by tags', async ()=> {
       
        let body = await pet.findByTag('tag1')
        assert(body.some(
            (pet: any) => pet.tags.some(
                (tag: any) => tag.name === 'tag1')))

    })

    it('POST, PUT, DELETE  - can be added, update, deleted', async () => {
        let petCreate = {
            'id': 89,
            "name": "Floppa",
            "category": {
                "id": 1,
                "name": "Caracal"
            },
            "photoUrls": [
                "https://i.natgeofe.com/n/5329307c-6c4a-40a8-a5ff-d38b8af2d929/caracal-thumbnail-nationalgeographic_2165629.jpg"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
        let addedPet = await pet.addPet(petCreate)
        assert.deepEqual(addedPet, petCreate)
        // assert.deepEqual(addedPet, {
        //     ...petCreate, // Взять все ключи из petCreate, ниже к этим ключам добавляем id
        //     ///id: addedPet.id // Так как на выходе мы получаем объект с id
        // })

         let checkAddedPet = await pet.getById(addedPet.id)
         assert.deepEqual(checkAddedPet, petCreate)

         let petUpdate = {
             "id": 89,
             "name": "FloppaS",
             "category": {
                 "id": 1,
                 "name": "Caracal"
             },
             "photoUrls": [
                 "https://i.natgeofe.com/n/5329307c-6c4a-40a8-a5ff-d38b8af2d929/caracal-thumbnail-nationalgeographic_2165629.jpg"
             ],
             "tags": [
                 {
                     "id": 0,
                     "name": "string"
                 }
             ],
             "status": "available"
         }
         let updatePet = await pet.updatePet(petUpdate)
         assert.deepEqual(updatePet, petUpdate)

        await pet.deletePet(89)
    })


})