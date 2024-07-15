import './Button.css';
import { useState } from 'react';

function Button({ text }) {
  return <button className="button save-btn">{text}</button>;
}

export default Button;
