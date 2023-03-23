
const FormRowTextArea = ({
  register,
  labelText,
  customCss,
}) => {
  return (
   <>
      <div className={`form-row ${customCss}`}>
        <label htmlFor={register.name} className="form-label">
          {labelText || register.name}
        </label>
        <textarea
          className="form-textarea"
          {...register}
        />
      </div>
    </>
  )
}

export default FormRowTextArea
