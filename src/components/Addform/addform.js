import { useState } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import {
  NameInputTitle,
  NameInput,
  PhoneInputTitle,
  PhoneInput,
  SectionInputs,
  Submit,
} from "./addform.styled";

export const InputForm = ({ contacts, onUpdateContact, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

  const ChangeName = (e) => {
    const { value } = e.currentTarget;
    const nameRegex = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\s'-]+$/;
    if (value !== "" && !nameRegex.test(value)) {
      alert(
        "Name may contain only letters, apostrophe, dash, spaces, and Cyrillic characters. For example Adrian, Jacob Mercer, Іван, Олена"
      );
      return;
    }
    setName(value);
  };

  const ChangePhone = (e) => {
    const { value } = e.currentTarget;
    const phoneRegex = /^[+\-\d]+$/;
    if (value !== "") {
      if (!phoneRegex.test(value)) {
        alert("Phone may contain only +, -, and digits.");
        return;
      }
      if (value.length > 15) {
        alert("Phone number should not exceed 15 characters.");
        return;
      }
    }
    setId(shortid.generate());
    setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || phone.trim() === "") {
      alert("Fill in all fields!");
      return;
    }
    if (contacts) {
      const existingContact = contacts.find(
        (contact) => contact.name === name && contact.phone !== phone
      );
      const existingContactByName = contacts.find(
        (contact) => contact.name === name && contact.phone === phone
      );
      const existingContactByPhone = contacts.find(
        (contact) => contact.phone === phone
      );

      if (existingContact) {
        if (
          window.confirm(
            "Another number is recorded for this contact, should I correct it?"
          )
        ) {
          const updatedContacts = contacts.map((contact) =>
            contact.id === existingContact.id
              ? {
                  ...existingContact,
                  phone,
                }
              : contact
          );
          onUpdateContact(updatedContacts);
        }
        reset();
        return;
      }

      if (existingContactByName) {
        alert(`Such a contact already exists`);
        return;
      }

      if (existingContactByPhone) {
        alert(
          `Such a phone number is recorded for ${existingContactByPhone.name}`
        );
        return;
      }
    }

    onSubmit({ name, phone, id });
    reset();
  };

  const reset = () => {
    setName("");
    setPhone("");
    setId("");
  };

  return (
    <SectionInputs onSubmit={handleSubmit}>
      <NameInputTitle>
        Name
        <NameInput name="name" value={name} onChange={ChangeName} />
      </NameInputTitle>
      <PhoneInputTitle>
        Phone
        <PhoneInput name="phone" value={phone} onChange={ChangePhone} />
      </PhoneInputTitle>
      <Submit>Add contact</Submit>
    </SectionInputs>
  );
};

InputForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateContact: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
