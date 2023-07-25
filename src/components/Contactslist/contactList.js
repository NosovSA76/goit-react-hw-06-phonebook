import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getFilteredContacts } from "../../redux/contacts/contacts-selectors";

import React from "react";
import { FcCellPhone, FcBusinessman } from "react-icons/fc";
import {
  ContactListContainer,
  ContactListItem,
  ContactsName,
  ContactsPhone,
  DeleteContacts,
} from "./contactList.styled";

export const ContactList = ({ onDeleteContact }) => {
  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <ContactListContainer>
      {filteredContacts.map((contact) => (
        <ContactListItem key={contact.id}>
          <ContactsName>
            <FcBusinessman size={24}></FcBusinessman>
            {contact.name}
          </ContactsName>
          <ContactsPhone>
            <FcCellPhone size={24}></FcCellPhone>
            {contact.number}
          </ContactsPhone>
          <DeleteContacts onClick={() => onDeleteContact(contact.id)}>
            Delete
          </DeleteContacts>
        </ContactListItem>
      ))}
    </ContactListContainer>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};
