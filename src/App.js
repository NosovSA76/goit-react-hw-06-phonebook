import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteContact } from "./redux/contacts/contacts-slice";
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
import { getContacts } from "./redux/contacts/contacts-selectors";
import { setFilter } from "./redux/filter/filter-slice";

export const App = () => {
  const [searchText, setSearchText] = useState("");
  const [isSecondButtonVisible, setIsSecondButtonVisible] = useState(true);
  const contacts = useSelector(getContacts);

  const changeFilter = (e) => {
    setSearchText(e.currentTarget.value);
  };

  const handleToggleSecondButtonVisibility = () => {
    setIsSecondButtonVisible((prevVisibility) => !prevVisibility);
    dispatch(setFilter(""));
    setSearchText("");
  };

  const dispatch = useDispatch();

  const handleDeleteContact = (contactId) => {
    setIsSecondButtonVisible(contacts.length === 1);
    dispatch(setFilter(""));
    setSearchText("");
    dispatch(deleteContact(contactId));
  };

  return (
    <WrapperPhonebook>
      <Title text="PhoneBook" />
      {isSecondButtonVisible && <InputForm />}
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
          <Search valueSearch={searchText} onChange={changeFilter} />
          {contacts.length === 0 ? (
            <WarningText>Nothing was found for your request</WarningText>
          ) : (
            <ContactList
              contacts={contacts}
              onDeleteContact={handleDeleteContact}
            />
          )}
        </>
      )}
      <ToastContainer />
    </WrapperPhonebook>
  );
};
