import React from "react";
//react forms hook needs to be installed as a dependency npm install...
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
  //add useForm hook to manage form state
  const form = useForm();

  //destructure to bring out register
  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  //destructure to unpack register. Then add each as variable to the input as a prop

  const { name, ref, onChange, onBlur } = register("username", {
    required: "username is required",
  });

  //a quicker way to do this is to add {...register('id name')} in place of the name attribute, this will provide state tracking as above, without all the typing.  Now react hook form is in charge of the form state.

  //Is It Working?:  to verify state is being managed, install devtools with npm install -D @hookform/devtools.  Import DevTool and add component after form. Destructure the control from the form constant, then add this control as a prop to the DevTool component. This component will create a clickable icon on the browser page which will show that form state is being tracked properly.

  //Submitting Data:  Now, we can unpack a handleSubmit function from the form object. Create a onSubmit function to send of the form data package (data), and then add this to the form tag with onSubmit={handleSubmit(onSubmit)}. Notice how data is just fired off as a object of key:values. making it perfect for using to fetch and post to apis.

  //Form Validation:  covered is required, minLength and maxLength, min and max, pattern. Add noValidate to form tag (blocks browser validation). for required, add {required: 'Username is required'} to the ...register part.  For email we add an object {pattern:{value:"email regex", message:'proper email require'}} which will validate good email address. The required validation, for posterity, can be set up as an object as well: {required:{value: true, message: 'username required'}}

  //Getting validation error messages to user:  destructure formState from form.  This contains a lot of info.  We can destructure the errors out of this object by const {errors}= formState.  we can show errors in a tag {errors.username?.message} the question mark (option chaining) is required.
  //Custom validation:  What if a particular email, etc,etc needs to be excluded?  Add validate function next to pattern object. It has a function that accepts fieldValue.  validate: (fieldValue)=>{ return (fieldvalue !== "forbidden.ex@email.com" || "Enter a different Email")}.  This is example is a security measure to prevent a admin login attempt by using default admin email addresses. validate can also be an object with key value pairs which define conditions.  we can add for example: notBlackListed: (fieldValue)=>{ return (!fieldValue.endsWith("baddomain.com")||"This domain not supported")}

  const onSubmit = (data) => {
    console.log("forms submittee", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />
        <p>{errors.username?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address!"
                );
              },
              notBlackListed: (fieldValue)=>{
                return(
                  !fieldValue.endsWith("baddomain.com")||"This domain is not supported"
                )
              }
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "channel name required",
            },
          })}
        />
        <p>{errors.channel?.message}</p>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
