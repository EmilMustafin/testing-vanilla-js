import './test-content.scss';

import { questions_list } from '@/constants/constants';

import { getData, saveData } from '../app/app';
import {
    getRemainingTime,
    renderResultPage,
    saveSelectedAnswers,
    startTimer,
    stopTimer,
} from '../description/lib/update-timer-display';

export const testContent = (testNumber: number): string => {
    const selectedAnswers: (number | null)[] = Array(questions_list[testNumber].questions.length).fill(null);

    const initialize = () => {
        saveData('currentPage', 'testContent');
        startTimer(testNumber, selectedAnswers);
        attachEventListeners();
    };

    const resetAnswers = (): void => {
        selectedAnswers.fill(null);
        document
            .querySelectorAll<HTMLInputElement>(`input[name^="question"]`)
            .forEach((input) => (input.checked = false));
        updateAnswerCount();
    };

    const updateAnswerCount = (): void => {
        const selectedCount = selectedAnswers.filter((answer) => answer !== null).length;
        const totalQuestions = questions_list[testNumber].questions.length;
        const answerCountElement = document.querySelector('.testContent__header-info-answers');
        if (answerCountElement) answerCountElement.textContent = `${selectedCount}/${totalQuestions}`;
    };

    const handleAnswerSelection = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.type === 'radio') {
            const questionNumber = parseInt(target.name.replace('question', ''));
            const selectedOptionIndex = parseInt(target.value);
            selectedAnswers[questionNumber - 1] = selectedOptionIndex;
            updateAnswerCount();
        }
    };

    const handleExit = () => {
        const modal = document.querySelector<HTMLDivElement>('.modal');
        if (modal) modal.style.display = 'block';
    };

    const handleSubmit = () => {
        saveData(`timer${testNumber}`, getRemainingTime());
        saveSelectedAnswers(testNumber, selectedAnswers);
        renderResultPage(testNumber);
        stopTimer();
        const doneArray = JSON.parse(getData('doneArray'));
        doneArray[testNumber] = true;
        saveData('doneArray', JSON.stringify(doneArray));
    };

    const attachEventListeners = () => {
        const test = document.querySelector<HTMLDivElement>(`#test${testNumber}`);
        if (test) {
            test.addEventListener('click', (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                if (target.classList.contains('testContent__header-info-reset')) resetAnswers();
                if (target.classList.contains('testContent__header-exit')) handleExit();
                if (target.classList.contains('testContent__button-element')) handleSubmit();
            });
            test.addEventListener('change', handleAnswerSelection);
        }
    };

    initialize();

    return `
    <div class="testContent">
            <div class="testContent__header">
                <div class="testContent__header-exit">Выход</div>
                <div class="testContent__header-text">${questions_list[testNumber].name}</div>
                <div class="testContent__header-info">
                    <div class="testContent__header-info-reset"> Сбросить все ответы </div>
                    <div class="testContent__header-info-answers">${selectedAnswers.filter((a) => a !== null).length}/${questions_list[testNumber].questions.length}</div>
                    <div class="testContent__header-info-timer"></div>
                </div>
            </div>
            <div class="testContent__content">
                ${questions_list[testNumber].questions
                    .map(
                        (question) => `
                    <div class="testContent__content-question">
                        <div class="testContent__content-question-text">${question.question_number}. ${question.question}</div>
                        <div class="testContent__content-question-options">
                            <div class="${question.is_long ? 'testContent__content-question-options-long' : 'testContent__content-question-options-short'}">
                                ${question.options
                                    .map(
                                        (option, optionIndex) => `
                                    <div>
                                        <label>
                                            <input type="radio" name="question${question.question_number}" value="${optionIndex}">
                                            ${option}
                                        </label>
                                    </div>
                                `,
                                    )
                                    .join('')}
                            </div>
                        </div>  
                    </div>
                `,
                    )
                    .join('')}
            </div>
        <div class="testContent__button">
            <button class="testContent__button-element"> Завершить </button>
        </div>
    </div>`;
};
