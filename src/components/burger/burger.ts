import './burger.scss';

import { questions_list } from '@/constants/constants';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector<HTMLDivElement>('#navbar')!;
    navbar.classList.add('navbar');
    navbar.innerHTML = `
      <nav class="sidebar close">
          <header class="header">
              <div class="burger">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <h1>Тесты</h1>
          </header>
          <ul class="navbar__menu"></ul>
      </nav>
  `;

    const menuList = navbar.querySelector('.navbar__menu') as HTMLUListElement;
    questions_list.forEach((question) => {
        const menuItem = document.createElement('li');
        menuItem.textContent = question.name;
        menuList.appendChild(menuItem);
    });

    const burger = navbar.querySelector('.burger');
    const sidebar = navbar.querySelector('.sidebar');

    if (burger && sidebar) {
        burger.addEventListener('click', () => {
            sidebar.classList.toggle('close');
        });
    }
});
