import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { BsFillTelephoneFill, BsPersonFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import {
  addContact,
  updatedContacts,
} from "../../redux/contacts/contacts-slice";
import { getContacts } from "../../redux/contacts/contacts-selectors";

import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
  LabelSpan,
} from "./addform.styled";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\s'-]+$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan"
    )
    .required(),
  number: yup
    .string()
    .matches(
      /^\+38-\d{3}-\d{3}-\d{2}-\d{2}$/,
      "Phone number is not valid. Please use format +38-XXX-XXX-XX-XX"
    )
    .required(),
});

const initialValues = { name: "", number: "" };

export const InputForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onAddContact = ({ name, number }) => {
    const existingContact = contacts.find(
      (contact) => contact.name === name && contact.number === number
    );
    const existingContactByName = contacts.find(
      (contact) => contact.name === name && contact.number !== number
    );
    const existingContactByPhone = contacts.find(
      (contact) => contact.number === number
    );

    if (existingContact) {
      Report.failure("Such a contact already exists", "", "Okay");
      return;
    }

    if (existingContactByName) {
      const id = existingContactByName.id;
      Confirm.show(
        "",
        "Another number is recorded for this contact should I correct it?",
        "Yes",
        "No",
        () => {
          dispatch(updatedContacts({ id, number }));
        },
        () => {
          return;
        }
      );
    }

    if (existingContactByPhone) {
      console.log("333");
      alert(
        `Such a phone number is recorded for ${existingContactByPhone.name}`
      );
      return;
    }

    dispatch(addContact({ name, number }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onAddContact({ ...values });
        resetForm();
      }}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField>
          <LabelWrapper>
            <BsPersonFill />
            <LabelSpan>Name</LabelSpan>
          </LabelWrapper>
          <FieldFormik type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          <LabelWrapper>
            <BsFillTelephoneFill />
            <LabelSpan>Number</LabelSpan>
          </LabelWrapper>
          <FieldFormik
            type="tel"
            name="number"
            placeholder="+38-050-123-45-67"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">
          <IoMdPersonAdd size="16" />
          Add contact
        </StyledButton>
      </Form>
    </Formik>
  );
};
