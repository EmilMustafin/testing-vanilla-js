import './result.scss';

import { questions_list } from '@/constants/constants';

import { getData, saveData } from '../app/app';
import { testContent } from '../test-content/test-content';

export const result = (testNumber: number) => {
    const test = document.querySelector<HTMLDivElement>(`#test${testNumber}`)!;

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const resetAnswers = () => {
        const doneArray = JSON.parse(getData('doneArray'));
        doneArray[testNumber] = false;
        saveData('doneArray', JSON.stringify(doneArray));
        test.innerHTML = testContent(testNumber);
    };

    const setupEventListeners = () => {
        test.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('result__button-element')) resetAnswers();
        });
    };

    setupEventListeners();
    saveData('currentPage', 'result');

    const selectedAnswers = JSON.parse(getData(`selectedAnswers${testNumber}`)) || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedAnswersCount = selectedAnswers.filter((answer: any) => answer !== null).length;
    const formattedTime = formatTime(getData(`timer${testNumber}`));

    return `
        <div class="result">
            <div class="result__header">
                <div class="result__header-exit">Выход</div>
                <div class="result__header-text">${questions_list[testNumber].name}</div>
                <div class="result__header-info">
                    <div class="result__header-info-reset">Сбросить все ответы</div>
                    <div class="result__header-info-answers">${selectedAnswersCount}/${questions_list[testNumber].questions.length}</div>
                    <div class="result__header-info-timer">${formattedTime}</div>
                </div>
            </div>
            <div class="result__content">
                <div class="result__content-header">
                    <div class="result__content-header-end">Тест завершён</div>
                    <div class="result__content-header-count">Вы ответили на ${selectedAnswersCount} из ${questions_list[testNumber].questions.length} вопросов.</div>
                </div>
                <div class="result__content-answers">
                    <div class="result__content-answers-header">Ваши ответы</div>
                    <div class="result__content-answers-info">
                        ${questions_list[testNumber].questions
                            .map(
                                (question, index) => `
                            <div class="result__content-answers-info-element">
                                <div class="result__content-answers-info-element-question">
                                    ${question.question_number}. ${question.question}
                                </div>
                                <div class="result__content-answers-info-element-your">
                                    Ваш ответ: ${selectedAnswers[index] !== null ? question.options[selectedAnswers[index]] : `Не ответили`}
                                </div>
                                <div class="result__content-answers-info-element-right">
                                    Правильный ответ: ${question.options[question.correct_option_index]}
                                </div>
                            </div>
                        `,
                            )
                            .join('')}
                    </div>
                </div>
            </div>
            <div class="result__button">
                <button class="result__button-element">Пройти еще раз</button>
            </div>
        </div>`;
};
