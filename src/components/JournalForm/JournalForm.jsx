import React, { useEffect, useReducer, useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

  const { isValid, isFormReadyToSubmit, values } = formState;
  console.log(formState);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerId = setTimeout(() => {
        console.log('Очистка состояние');
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  return (
    <form onSubmit={addJournalItem} className={styles['journal-form']}>
      <div>
        <input
          type="text"
          value={values.title}
          name="title"
          onChange={onChange}
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title,
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
          value={values.date}
          name="date"
          id="date"
          onChange={onChange}
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-lable']}>
          <img src="/folder_.svg" alt="Иконка метки" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          value={values.tag}
          name="tag"
          id="id"
          onChange={onChange}
          className={styles['input']}
        />
      </div>
      <textarea
        value={values.text}
        name="text"
        id=""
        cols={30}
        rows={20}
        onChange={onChange}
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.text,
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
