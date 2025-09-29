import type {Account} from "@/classes/Account.ts";

// Ошибки валидации
export class AccountErrors {
    tags: string | null = null;
    login: string | null = null;
    password: string | null = null;
    empty(): boolean {
        return !this.tags && !this.login && !this.password;
    }
}

export class AccountValidator {
    static validate(account: Account): AccountErrors  {

        const errs: AccountErrors = new AccountErrors();

        if (account.tags.some(tag => tag.text.length > 50)) {
            errs.tags = 'Одна из меток > 50 символов';
        }

        if (!account.login || account.login.trim().length === 0) {
            errs.login = 'Логин обязателен';
        } else if (account.login.length > 100) {
            errs.login = 'Максимум 100 символов для логина';
        }

        if (account.type === 'Local') {
            if (!account.password || account.password.trim().length === 0) {
                errs.password = 'Пароль обязателен';
            } else if (account.password.length > 100) {
                errs.password = 'Максимум 100 символов для пароля';
            }
        }

        return errs;
    }

    static clear(errs: AccountErrors) {
        errs.tags = null;
        errs.login = null;
        errs.password = null;
    }
}