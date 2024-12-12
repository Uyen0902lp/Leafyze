import * as Yup from "yup";

// register schema
const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").label("Name"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid")
    .label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .label("Password"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed.")
    .required("You must agree to the terms and conditions to proceed.")
    .label("Terms and Conditions"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const checkoutSchema = Yup.object().shape({
  fname: Yup.string().required().label("First Name"),
  lname: Yup.string().required().label("Last Name"),
  company: Yup.string().label("Company"),
  state: Yup.string().required().label("State"),
  address: Yup.string().required().label("Address"),
  city: Yup.string().required().label("City"),
  country:Yup.string().required().label("Country"),
  zipCode:Yup.string().required().label("zipCode"),
  phone:Yup.string().required().label("Phone"),
  email:Yup.string().required().email().label("Email"),
  orderNote:Yup.string().label("Order Note"),
});

const contactSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email:Yup.string().required().email().label("Email"),
  subject:Yup.string().required().label("Subject"),
  msg: Yup.string().required().label("Message"),
});

const reviewSchema = Yup.object().shape({
  review:Yup.string().required().label("Review"),
  name: Yup.string().required().label("Name"),
  email:Yup.string().required().email().label("Email"),
});

export { registerSchema,loginSchema,checkoutSchema,contactSchema,reviewSchema };
