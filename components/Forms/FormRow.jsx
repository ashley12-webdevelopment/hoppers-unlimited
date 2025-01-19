const FormRow = ({
  type,
  register,
  labelText,
  required,
  errors,
  placeholder,
  additionalProperties,
  customCss,
  // handleChange,
  // refHandler,
  setValue,
  setHeadCount
}) => {

  const handleHeadCount = (e)=>{
    if(register.name=="headCount"){
      const newHeadCount = e.target.value;
      // console.log(e.target.value)
      setValue("headCount",newHeadCount);
      setHeadCount(newHeadCount);
}
  }

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
          onChange={handleHeadCount}
        />
        {errors[register.name] && <span className={`form-row-error`}>{errors[register.name].message}</span>}
      </div>
    </>
  );
};

export default FormRow;
