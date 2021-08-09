export interface Article {
    author: string;
    content: string;
    description: string;
    publicationDate: string;
    sourceName: string;
    title: string;
    url: string;
    image: string;
    // My Stuff
    selected: boolean;
    retrievedDate: Date;
    saved: boolean;
    id: number;
}