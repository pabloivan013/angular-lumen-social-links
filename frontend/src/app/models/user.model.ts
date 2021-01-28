import { SocialLink } from "./social-link.model";

export class User {
    name: string;
    nickname: string;
    email: string;
    accountname: string;
    picture: string;
    socialLinks: SocialLink[] = []

    constructor(name: string=undefined, email: string=undefined) {
        this.name = name
        this.email = email
    }
}
