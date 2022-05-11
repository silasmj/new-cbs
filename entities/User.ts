export class User {
    email: string;
    displayname: string;
    studyprogramme: string;
    photoUrl?: string
    localid?: string

    constructor(email: string, displayname: string, studyprogramme: string, localid?: string, photoUrl?: string, ) {
        this.email = email;
        this.displayname = displayname;
        this.studyprogramme = studyprogramme;
        this.localid = localid;
        this.photoUrl = photoUrl;
    }
}