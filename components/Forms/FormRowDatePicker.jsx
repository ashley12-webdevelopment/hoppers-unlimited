import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller } from 'react-hook-form'


const FormRowDatePicker = ({
  control,
  rules,
  errors,
  name,
  labelText,
  required,
  dateFormat,
   minDate,
}) => {
  return (
    <div className={`form-row`}>
        <label className={`form-label`}>
        {labelText || `Date`}
        {required && <span className={`form-row-required`}>*</span>}
      </label>
         <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
            <DatePicker
                placeholderText='Select date'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className={`form-input`}
                dateFormat={dateFormat || `dd/MM/yyyy h:mm aa`}
                showTimeSelect
                minDate={minDate}
            />
            )}
        />
         {errors[name] && <span className={`form-row-error`}>{errors[name].message}</span>}  
    </div>
  )
}

export default FormRowDatePicker
