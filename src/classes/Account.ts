import type {ITag} from "@/classes/Tag.ts";
import {Tag} from "@/classes/Tag.ts";
export const accountTypes = ['LDAP', 'Local'] as const;
export type AccountType = typeof accountTypes[number];


export class Account  {
    id: string;
    tags: ITag[];
    type: AccountType;
    login: string;
    password: string | null;
    uid():string {
        return Math.random().toString(36).slice(2, 10);
    };
    constructor() {
        this.id = this.uid();
        this.tags = [];
        this.type = accountTypes[0];
        this.login = '';
        this.password = '';
    }
    /*
        Глубокая копия
    */
    clone(): Account {
        const a =  new Account();
        a.id = this.id;
        a.tags = this.tags.map(tag => new Tag(tag.text));
        a.type = this.type;
        a.login = this.login;
        a.password = this.password;
        return a;
    }
    /*
       true если значения полей совпадают
    */
    same(a: Account): boolean {
        return JSON.stringify(a) === JSON.stringify(this);
    }

    /**
     * Получить объект Account из объекта с данными
     * @param data
     */
    static fromObject(data: any): Account {
        if(!data) throw new Error('data долдно быть объектом');

        if (typeof data?.id !== 'string' || data.id.trim() === '') {
            throw new Error('Поле id обязательно и должно быть строкой');
        }
        const acc = new Account();

        acc.id = data.id;
        acc.login = data.login ?? '';
        acc.password = data.password ?? '';
        acc.type = data.type ?? accountTypes[0];

        acc.tags = Array.isArray(data.tags)
            ? data.tags.map((tag: any) => new Tag(tag.text))
            : [];

        return acc;
    }

}
