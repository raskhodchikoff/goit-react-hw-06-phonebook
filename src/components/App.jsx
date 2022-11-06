import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { MainTitle, ContactsTitle } from './App.styled';
import { Box } from './Box';

export const App = () => {
  return (
    <Box
      as="main"
      mx="auto"
      mt={5}
      width="400px"
      p={5}
      bg="mainBgr"
      border="m"
      borderRadius="m"
      borderColor="greyBorder"
      boxShadow="shadow"
    >
      <Box as="section" mb={3}>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm />
      </Box>
      <Box as="section">
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        <ContactList />
      </Box>
    </Box>
  );
};
