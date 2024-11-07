import './quit-modal.scss';

import { clearData, saveData } from '../app/app';
import { removeClassLiActive } from '../description/lib/remove-class-active';
import { mainScreen } from '../main-screen/main-screen';

const appElement = document.querySelector<HTMLDivElement>('#modal')!;
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
    <div class="modal__content">
        <p class="modal__content__text-first">Вы уверены, что хотите выйти?</p>
        <p class="modal__content__text-second">Все результаты будут сброшены.</p>
        <div class="modal__content__buttons">
            <button class="modal__content__buttons-confirm">Выход</button>
            <button class="modal__content__buttons-cancel">Отмена</button>
        </div>
    </div>
    `;

document.addEventListener('click', (event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('modal__content__buttons-cancel')) {
        modal.style.display = 'none';
    }
});

modal.addEventListener('click', (event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('modal')) {
        modal.style.display = 'none';
    }
});

document.addEventListener('click', (event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('modal__content__buttons-confirm')) {
        const return_start_screen = document.querySelector<HTMLDivElement>('#app')!;
        return_start_screen.innerHTML = mainScreen();
        removeClassLiActive();
        clearData();
        saveData('doneArray', JSON.stringify([false, false, false, false]));
        modal.style.display = 'none';
    }
});

appElement.appendChild(modal);
