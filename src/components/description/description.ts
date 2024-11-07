import './description.scss';

import { questions_list } from '@/constants/constants';

import { getData, removeData, saveData } from '../app/app';
import { waitForElm } from '../app/lib/add-class-active';
import { mainScreen } from '../main-screen/main-screen';
import { result } from '../result/result';
import { testContent } from '../test-content/test-content';
import { removeClassLiActive } from './lib/remove-class-active';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
waitForElm('.navbar__menu').then((elm: any) => {
    let test_number = 0;
    for (let i = 0; i < elm.children.length; i++) {
        elm.children[i].addEventListener('click', function () {
            if (!elm.children[i].className.includes('navbar__menu-active')) {
                removeClassLiActive();
                test_number = i;
                const app = document.querySelector<HTMLDivElement>('#app')!;
                app.innerHTML = `<div id='test${test_number}'></div>`;
                const test = app.querySelector<HTMLDivElement>(`#test${test_number}`);
                const checkDone = JSON.parse(getData('doneArray'));
                elm.children[i].classList.add('navbar__menu-active');
                saveData('activeLi', i.toString());
                if (test) {
                    if (checkDone[i] === true) {
                        test.innerHTML = result(test_number);
                    } else {
                        removeData('currentPage');
                        test.innerHTML =
                            `
                            <div class = "description">` +
                            `
                                <div class="description__header">
                                    <div class="description__header-text">Описание</div>
                                </div>
                                ` +
                            `<div class = "description-text">` +
                            questions_list[i].description +
                            `</div> 
                                <div class="description__buttons"> 
                                    <button class="description__buttons-start">Начать</button>
                                    <button class="description__buttons-cancel">Отмена</button>
                                </div> 
                            </div>
                        `;
                        const startButton = document.querySelector<HTMLDivElement>('.description__buttons-start')!;
                        startButton.addEventListener('click', function () {
                            if (test) {
                                test.innerHTML = testContent(test_number);
                                saveData(test_number.toString(), true);
                            }
                        });
                        const cancelButton = document.querySelector<HTMLDivElement>('.description__buttons-cancel')!;
                        cancelButton.addEventListener('click', function () {
                            removeClassLiActive();
                            const description = document.querySelector<HTMLDivElement>('#app')!;
                            description.innerHTML = mainScreen();
                        });
                    }
                }
            }
        });
    }
});
