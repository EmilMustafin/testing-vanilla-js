import { mainScreen } from '../main-screen/main-screen';
import { result } from '../result/result';
import { testContent } from '../test-content/test-content';
import { addClassLiActive } from './lib/add-class-active';

export function saveData(key: string, data: string | number | boolean) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function getData<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
export function removeData(key: string) {
    localStorage.removeItem(key);
}
export function clearData() {
    localStorage.clear();
}
addEventListener('storage', () => {
    saveData('doneArray', JSON.stringify([false, false, false, false]));
});

const currentLi = getData<number>('activeLi');
const currentPage = getData<string>('currentPage');

if (currentPage) {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.innerHTML = `<div id='test${currentLi}'></div>`;
    const displayCurrentPage = document.querySelector<HTMLDivElement>(`#test${currentLi}`)!;
    if (currentPage === 'testContent') {
        displayCurrentPage.innerHTML = testContent(currentLi);
        addClassLiActive();
    } else if (currentPage === 'result') {
        displayCurrentPage.innerHTML = result(currentLi);
        addClassLiActive();
    } else {
        displayCurrentPage.innerHTML = mainScreen();
    }
} else {
    const displayCurrentPage = document.querySelector<HTMLDivElement>('#app')!;
    displayCurrentPage.innerHTML = mainScreen();
}
