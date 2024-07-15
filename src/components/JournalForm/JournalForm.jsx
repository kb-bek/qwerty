import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css'
import cn from 'classnames';

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

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

    if(!isFormValid) {
      return;
    }

    onSubmit(formProps);
  };

  return (
    <form onSubmit={addJournalItem} className={styles['journal-form']}>
      <input type="text" name="title" className={cn(styles['input'], {
				[styles['invalid']]: !formValidState.title
      })}/>
      <input type="date" name="date" className={`${styles['input']} ${formValidState.date ? '' : 'invalid'}`}/>
      <input type="text" name="tag"/>
      <textarea name="text" id="" cols={30} rows={20} className={`${styles['input']} ${formValidState.text ? '' : 'invalid'}`}></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
