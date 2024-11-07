export const removeClassLiActive = () => {
    const headerMenu = document.querySelector('.navbar__menu') as HTMLDivElement;

    if (headerMenu) {
        const listItems = headerMenu.querySelectorAll('li');
        listItems.forEach((item) => {
            item.classList.remove('navbar__menu-active');
        });
    }
};
