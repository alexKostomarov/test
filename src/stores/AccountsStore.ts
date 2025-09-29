import { defineStore } from 'pinia';
import { ref, computed, inject } from 'vue';
import type {IRepository} from "@/repo/LocalStorage.ts";
import { Account} from '@/classes/Account.ts';
import { AccountValidator } from '@/classes/AccountValidator'



export const useAccountsStore = defineStore('accounts', () => {

    //Репозиторий, в задании локальное хранилище
    const repository = inject<IRepository<Account>>('accountsRepo');
    if (!repository) throw new Error('accountsRepo not provided');

    // хранилище
    const _accounts = ref<Account[]>([]);
    const _page = ref(1);
    const _perPage = ref(5);

    /* публичные computed */

    /**
     * массив аккаунтов для текущей страницы.
     */
    const paginatedAccounts = computed(() => {
        const offset = (_page.value - 1) * _perPage.value;
        _accounts.value.forEach(acc => console.log(acc, typeof acc));
        return _accounts.value.slice(offset, offset + _perPage.value).map(acc => acc.clone());
    });

    /**
     * Всего аккаунтов
     */
    const total = computed(() => _accounts.value.length);

    /**
     * всего страниц
     */
    const totalPages = computed(() => Math.max(1, Math.ceil(total.value / _perPage.value)));

    //загрузка из репозитория
    const load = async (): Promise<void> => {

        const rows = await repository.load();

        _accounts.value =  rows.map(acc => Account.fromObject(acc));
    }


    /**
     * Создаёт новый объект аккаунта с типом LDAP, добавляет его в репозитоий и возвращает его копию.
     *
     * @returns Клонированный объект Account, только что добавленный
     */
    const add = async (): Promise<Account | null> => {

        const acc = new Account();

        const res = await repository.add(acc);

        if(!res) return null;

        _accounts.value.push(acc);

        setPage(totalPages.value);

        return acc.clone();
    }

    /**
     * Обновляет аккаунт в репо после валидации.
     *
     * @param account - объект Account
     * @returns AccountErrors, если есть ошибки или запись не найдена; иначе null
     */
    const update = async (account: Account): Promise<boolean> => {

        //валидация, вдруг не из формы
        const errs = AccountValidator.validate(account);

        if (!errs.empty()) return false;

        const idx = _accounts.value.findIndex(a => a.id === account.id);


        if (idx === -1) {
            return false;
         }

        if(account.same(_accounts.value[idx])) return false;


        if(!await repository.update(account)) {

            return false;
        }

        _accounts.value[idx] = account.clone();

        return true;
    }

    /**
     * Удаление аккаунта
     *
     * @param id - id аккаунта
     */
    const remove = async (id: string):Promise<void> => {

        if(!await repository.remove(id)) return;

        _accounts.value = _accounts.value.filter(a => a.id !== id);

        //вдруг число страниц уменьшилось, чтобы не попасть на несуществующую
        if (_page.value > totalPages.value) _page.value = totalPages.value;

    }

    /**
     * установить текущую страницу
     *
     * @param p - номер страницы
     */
    const setPage = (p: number):void => {
        _page.value = Math.max(1, Math.min(p, totalPages.value));
    }

    /**
     * установить количество аккаунтов на странице
     *
     * @param n - количество аккаунтов на странице
     */
    const setPerPage = (n: number):void => {

        _perPage.value = Math.max(1, n);

        if (_page.value > totalPages.value) _page.value = totalPages.value;
    }

    //наружу отдаем только копии и экшены
    return {
        state: {
            paginatedAccounts,
            total,
            totalPages,
            page: computed( () => _page.value),
            perPage: computed( () => _perPage.value),
        },
        actions: {
            add, update, remove, setPage, setPerPage, load
        }
    };

});