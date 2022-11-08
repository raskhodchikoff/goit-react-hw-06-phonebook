import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selector';
import { addContact } from 'redux/phonebookSlice';

import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Button, Label, FormBox, Input } from './ContactForm.styled';

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      nameRegex,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Please enter first and last name'),
  number: yup
    .string()
    .min(7)
    .max(14)
    .matches(
      phoneRegex,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Please enter the phone number'),
});

const initialValues = { name: '', number: '' };

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formSubmitHandler = ({ name, number }, actions) => {
    const data = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Notify.warning(`${name} is already in contacts.`, {
          timeout: 2000,
          position: 'center-top',
          fontSize: '20px',
          width: '400px',
          clickToClose: true,
        })
      : dispatch(addContact(data)) && actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmitHandler}
      validationSchema={schema}
    >
      <FormBox autoComplete="off">
        <Label htmlFor="name">
          <span>Name</span>
          <Input type="text" name="name" placeholder="Enter name" />
          <ErrorMessage name="name" component="div" />
        </Label>
        <Label>
          <span>Number</span>
          <Input type="tel" name="number" placeholder="Enter phone number" />
          <ErrorMessage name="number" component="div" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormBox>
    </Formik>
  );
};
