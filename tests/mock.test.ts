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

})