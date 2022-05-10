export class User {
    email: string;
    displayname: string;
    studyprogramme: string;
    photoUrl?: string

    constructor(email: string, displayname: string, studyprogramme: string, photoUrl?: string, ) {
        this.email = email;
        this.displayname = displayname;
        this.studyprogramme = studyprogramme;
        this.photoUrl = photoUrl;
    }
}