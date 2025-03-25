import { UserType } from './user'

export interface MediaType {
    url: string
    type: string
}

export interface PostType {
    id: string
    text: string
    media: MediaType
    createdAt: string
    author: UserType
}
