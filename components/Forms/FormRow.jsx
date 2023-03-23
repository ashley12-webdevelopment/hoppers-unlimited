const FormRow = ({
  type,
  register,
  labelText,
  required,
  errors,
  placeholder,
  additionalProperties,
  customCss
  // handleChange,
  // refHandler,
}) => {

  // console.log('register',register);
  return (
    <>
      <div className={`form-row ${customCss}`} >
        <label htmlFor={register.name} className={`form-label`}>
          {labelText || register.name}
          {required && <span className={`form-row-required`}> *</span>}
        </label>
        <input
          className={`form-input`}
          type={type}
          {...additionalProperties}
          {...register}
          id={register.name}
          placeholder={placeholder?placeholder:labelText}
          // onChange={handleChange}
          // ref={refHandler}
        />
        {errors[register.name] && <span className={`form-row-error`}>{errors[register.name].message}</span>}
      </div>
    </>
  );
};

export default FormRow;
