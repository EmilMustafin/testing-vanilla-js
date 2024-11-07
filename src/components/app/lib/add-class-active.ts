import { getData } from '../app';

export function waitForElm(selector: string): Promise<Element> {
    return new Promise((resolve) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
        } else {
            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }
    });
}
export const addClassLiActive = () => {
    waitForElm('.navbar__menu').then((elm) => {
        elm.children[getData<number>('activeLi')].classList.add('navbar__menu-active');
        const active = document.querySelector('.navbar') as HTMLDivElement;
        active.classList.toggle('active');
    });
};
