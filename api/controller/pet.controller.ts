import { URLSearchParams } from 'url';
import { JsonRequest } from "../request";
import got from "got";


export class PetController {
    
    BASE_URI: string = `http://192.168.1.42:8080/api/v3/pet`

    async getById(id: number | string) {
         return (
            await new JsonRequest()
                .url(`${this.BASE_URI}/${id}`)
                .send()
         ).body
    }

    async findByTag(tags: string | string[]) {
            return (
                await new JsonRequest()
                 .url(`${this.BASE_URI}/findByTags`)
                 .searchParams(new URLSearchParams({ tags }))
                 .send()
            ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
                .url(`${this.BASE_URI}/findByStatus`)
                .searchParams(new URLSearchParams({ status} ))
                .send()
        ).body
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
        return (
           await new JsonRequest()
               .url(`${this.BASE_URI}`)
               .method('POST')
               .body(pet)
               .send()
        ).body
    }

    async deletePet(id: number | string) {
        await got.delete(`${this.BASE_URI}/${id}`)
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
        return (
            await new JsonRequest()
                .url(`${this.BASE_URI}`)
                .method('PUT')
                .body(pet)
                .send()
        ).body
    }
}


