export interface IRepository<T> {
    load: () => Promise<T[]>;
    add: (item: T) => Promise<T | null>;
    remove: (id: string) => Promise<boolean>;
    update: (item: T) => Promise<T | null>;
}



export class LocalStorage<T extends { id: string }> implements IRepository<T> {

    private readonly storageKey: string = 'accounts';

    async load(): Promise<T[]> {
        const data = localStorage.getItem(this.storageKey);
        if( !data ) return [];
        return data ? JSON.parse(data) as T[] : [];
    }

    async add(item: T): Promise<T | null> {
        const items = await this.load();
        items.push(item);
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        return item;
    }

    async remove(id: string): Promise<boolean> {
        const items = await this.load();
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return true;
    }
    async update(item: T): Promise<T | null> {
        const items = await this.load();
        const index = items.findIndex(i => i.id === item.id);

        if (index === -1) return null;

        items[index] = item;
        localStorage.setItem(this.storageKey, JSON.stringify(items));

        return item;
    }
}