import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selector';
import { deleteContact } from 'redux/phonebookSlice';

import { Button, ListItem } from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteringContact = () =>
    contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  const filteredContacts = filteringContact();

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <ListItem key={id}>
            {name}: {number}
            <Button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Button>
          </ListItem>
        );
      })}
    </ul>
  );
};
