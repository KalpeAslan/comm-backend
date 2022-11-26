import * as getenv from 'getenv';

/**
 * @ref https://www.npmjs.com/package/getenv
 */
export class Env {
    /**
     * Initialize environment configuration
     * @returns {Env}
     */
    static init(): Env {
        getenv.enableErrors();
        this._processOverrides();
        return this;
    }

    /**
     * Write value to environment
     * @param {string} name
     * @param {*} value
     * @returns {Env}
     */
    static write(name: string, value: string): Env {
        process.env[name] = value;
        return this;
    }

    /**
     * Alias for readString()
     * @alias readString()
     * @param  {...any} args
     * @returns {string}
     */
    static read(key: string): string {
        return this.readString(key);
    }

    /**
     * Read env variable as string
     * @param  {...any} args
     * @returns {string}
     * @ref https://github.com/ctavan/node-getenv#envstringname-fallback
     */
    static readString(key: string): string {
        return getenv.string(key);
    }

    /**
     * Read env variable as integer
     * @param  {...any} args
     * @returns {number}
     * @ref https://github.com/ctavan/node-getenv#envintname-fallback
     */
    static readInt(key: string): number {
        return getenv.int(key);
    }

    /**
     * Read env variable as float
     * @param  {...any} args
     * @returns {number}
     * @ref https://github.com/ctavan/node-getenv#envfloatname-fallback
     */
    static readFloat(key: string): number {
        return getenv.float(key);
    }

    /**
     * Read env variable as boolean
     * @param  {...any} args
     * @returns {boolean}
     * @ref https://github.com/ctavan/node-getenv#envboolishname-fallback
     */
    static readBool(key: string): boolean {
        return getenv.boolish(key);
    }

    /**
     * Read env variable as boolean (cast any value)
     * @param  {...any} args
     * @returns {boolean}
     */
    static readBoolish(key: string): boolean {
        try {
            try {
                return this.readBool(key);
            } catch (e) {
                if (/^GetEnv\.NoBoolean:/i.test(e.message)) {
                    return !!this.readString(key);
                }

                throw e;
            }
        } catch (e) {
            if (/^GetEnv\.Nonexistent:/i.test(e.message)) {
                return false;
            }

            throw e;
        }
    }

    /**
     * Read env variable as array
     * @param  {...any} args
     * @returns {Array}
     * @ref https://github.com/ctavan/node-getenv#envarrayname-type-fallback
     */
    static readArray(key: string): Array<unknown> {
        return getenv.array(key);
    }

    /**
     * Read env variable as node url
     * @param  {...any} args
     * @returns {*}
     * @ref https://github.com/ctavan/node-getenv#envurlname-fallback
     */
    static readUrl(key: string): object {
        return getenv.url(key);
    }

    /**
     * Read env variable as object
     * @param  {...any} args
     * @returns {*}
     */
    static readObj(key: string): unknown {
        const raw = this.readString(key);

        try {
            return JSON.parse(raw);
        } catch (_) {
            // mimic getenv behavior
            throw new Error(`GetEnv.NoObject: * is not an object.`);
        }
    }

    /**
     * Process env overrides, e.g. OVERRIDE_DB_DSN to replace DB_DSN
     */
    static _processOverrides(): void {
        const OV_REGEXP = /^override_/i;
        const overrides = Object.keys(process.env).filter((k) => OV_REGEXP.test(k));

        for (const overrideKey of overrides) {
            const key = overrideKey.replace(OV_REGEXP, '');

            if (!process.env.hasOwnProperty(key) || !process.env[overrideKey]) {
                continue;
            }

            process.env[key] = process.env[overrideKey];
            delete process.env[overrideKey];
        }
    }

    /**
     * Env file name
     * @returns {string}
     */
    static get ENV_FILE(): string {
        return '.env';
    }

    /**
     * Sample env file name
     * @returns {string}
     */
    static get SAMPLE_ENV_FILE(): string {
        return '.sample.env';
    }
}
