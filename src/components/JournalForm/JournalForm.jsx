import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';

const INITIAL_STATE = {
  title: true,
  text: true,
  date: true,
};

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if (!formValidState.date || !formValidState.text || !formValidState.title) {
      timerId = setTimeout(() => {
        console.log('Очистка состояние');
        setFormValidState(INITIAL_STATE);
      }, 2000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [formValidState]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    onSubmit(formProps);
  };

  return (
    <form onSubmit={addJournalItem} className={styles['journal-form']}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(styles['input-title'], {
            [styles['invalid']]: !formValidState.title,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-lable']}>
          <img src="/calendar_.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={cn(styles['input'], {
            [styles['invalid']]: !formValidState.date,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-lable']}>
          <img src="/folder_.svg" alt="Иконка метки" />
          <span>Метки</span>
        </label>
        <input type="text" name="tag" id="id" className={styles['input']} />
      </div>
      <textarea
        name="text"
        id=""
        cols={30}
        rows={20}
        className={cn(styles['input'], {
          [styles['invalid']]: !formValidState.text,
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
