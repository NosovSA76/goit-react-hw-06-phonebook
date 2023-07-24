import { useState, useEffect } from "react";
import { WrapperPhonebook } from "./components/Phonebookwrapper/phonebookwrapper";
import { Title } from "./components/Title/title";
import { InputForm } from "./components/Addform/addform";
import { ContactsTitle } from "./components/Contacttitle/contactTitle";
import { Search } from "./components/Search/search";
import { ContactList } from "./components/Contactslist/contactList";
import { ShowButton } from "./components/ShowButton/showButton";
import { CountMessage } from "./components/CountMessage/CountMessage";
import { WarningText } from "./App.styled";
import { getCountMessage } from "./utils/getCountMessage";
import { save, load } from "./utils/localStorageJSON";

export const App = () => {
  const [contacts, setContacts] = useState(load("contacts") ?? []);
  const [searchText, setSearchText] = useState("");
  const [isSecondButtonVisible, setIsSecondButtonVisible] = useState(true);
  const [filterContacts, setFilterContacts] = useState(contacts);

  useEffect(() => {
    save("contacts", contacts);
  }, [contacts]);

  useEffect(() => {
    setFilterContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, contacts]);

  const changeFilter = (e) => {
    setSearchText(e.currentTarget.value);
  };

  const handleDeleteContact = (contactID) => {
    setContacts(contacts.filter((contact) => contact.id !== contactID));
    setIsSecondButtonVisible(contacts.length === 1);
    if (filterContacts.length === 1) {
      setFilterContacts(contacts);
      setSearchText("");
    }
  };

  const handleWriteContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleToggleSecondButtonVisibility = () => {
    setIsSecondButtonVisible((prevVisibility) => !prevVisibility);
    setFilterContacts(contacts);
  };

  return (
    <WrapperPhonebook>
      <Title text="PhoneBook" />
      {isSecondButtonVisible && (
        <InputForm
          onSubmit={handleWriteContact}
          contacts={contacts}
          onUpdateContact={setContacts}
        />
      )}
      {isSecondButtonVisible && (
        <CountMessage text={getCountMessage(contacts.length)} />
      )}
      {contacts.length !== 0 && (
        <ShowButton
          contactCount={contacts.length}
          onButtonChange={handleToggleSecondButtonVisibility}
        ></ShowButton>
      )}
      {!isSecondButtonVisible && (
        <>
          <ContactsTitle text="Contacts" />
          <Search
            valueSearch={searchText}
            onChange={changeFilter}
            text={"Find contacts by name"}
          />
          {filterContacts.length === 0 ? (
            <WarningText>Nothing was found for your request</WarningText>
          ) : (
            <ContactList
              contacts={filterContacts}
              onDeleteContact={handleDeleteContact}
            />
          )}
        </>
      )}
    </WrapperPhonebook>
  );
};
