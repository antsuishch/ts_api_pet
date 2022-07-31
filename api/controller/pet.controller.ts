import got from 'got';
import { URLSearchParams } from 'url';


export class PetController {

    async getById(id: number | string) {
        const response = await got(`http://192.168.1.42:8080/api/v3/pet/${id}`)
        return JSON.parse(response.body)
    }

    async findByTag(tags: string | string[]) {
        let response = await got('http://192.168.1.42:8080/api/v3/pet/findByTags', {
            searchParams: new URLSearchParams({tags}) //tags: tags
        })
        return JSON.parse(response.body)
    }

    async findByStatus(status: string | string[]) {
        let response = await got('http://192.168.1.42:8080/api/v3/pet/findByStatus', {
            searchParams: new URLSearchParams({status})
        })
        return JSON.parse(response.body)
    }

    async addPet(pet: {
        "id": number,
        "name": string,
        "category": {
            "id": number,
            "name": string
        },
        "photoUrls": string[],
        "tags":
            {
                "id": number,
                "name": string
            }[],
        "status": string
    }) {
        let response = await got('http://192.168.1.42:8080/api/v3/pet', {
            method: 'POST',
            json: pet
        })
        return JSON.parse(response.body)
    }

    async deletePet(id: number | string) {
        await got.delete(`http://192.168.1.42:8080/api/v3/pet/${id}`)
    }

    async updatePet(pet: {
        "id": number
        "name": string,
        "category": {
            "id": number,
            "name": string
        },
        "photoUrls": string[],
        "tags":
            {
                "id": number,
                "name": string
            }[],
        "status": string
    }) {
        let response = await got('http://192.168.1.42:8080/api/v3/pet', {
            method: 'PUT',
            json: pet
        })
        return JSON.parse(response.body)
    }
}