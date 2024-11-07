import { saveData } from '@/components/app/app';
import { result } from '@/components/result/result';

const duration = 5 * 60 * 1000; // Длительность таймера
let startTime: number;
let timerInterval: NodeJS.Timeout; // Интервал таймера

// Запуск таймера с передачей номера теста
export const startTimer = (testNumber: number, selectedAnswers: (number | null)[]) => {
    startTime = Date.now();
    timerInterval = setInterval(() => updateTimerDisplay(testNumber, selectedAnswers), 500);
};

// Обновление отображения таймера с учетом номера теста
export const updateTimerDisplay = (testNumber: number, selectedAnswers: (number | null)[]) => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = duration - elapsedTime;

    if (remainingTime <= 0) {
        handleTimeUp(testNumber, selectedAnswers);
    } else {
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        const timerElement = document.querySelector('.testContent__header-info-timer');
        if (timerElement) timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
};

// Остановка таймера при завершении времени
export const handleTimeUp = (testNumber: number, selectedAnswers: (number | null)[]): void => {
    clearInterval(timerInterval);
    saveData(`timer${testNumber}`, 0);
    saveSelectedAnswers(testNumber, selectedAnswers);
    renderResultPage(testNumber);
};

// Получение оставшегося времени
export const getRemainingTime = (): number => duration - (Date.now() - startTime);

// Сохранение выбранных ответов
export const saveSelectedAnswers = (testNumber: number, selectedAnswers: (number | null)[]) => {
    saveData(`selectedAnswers${testNumber}`, JSON.stringify(selectedAnswers));
};

// Отображение страницы с результатами
export const renderResultPage = (testNumber: number) => {
    const testContainer = document.querySelector<HTMLDivElement>(`#test${testNumber}`)!;
    if (testContainer) testContainer.innerHTML = result(testNumber);
};

// Остановка таймера (при необходимости)
export const stopTimer = () => {
    clearInterval(timerInterval);
};
