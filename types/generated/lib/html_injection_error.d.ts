export default class HTMLInjectionError extends Error {
    /**
     * @param {string} reason
     * @param {string} html
     */
    constructor(reason: string, html: string);
    html: string;
}
