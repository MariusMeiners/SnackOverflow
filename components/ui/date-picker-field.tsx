import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerFieldProps {
    selectedDate: Date | null
    id: string
    onDateChange: (date: Date | null) => void
    placeholder?: string
    minDate?: Date;
  }
  

const DatePickerField: React.FC<DatePickerFieldProps> = ({
    id,
    selectedDate,
    onDateChange,
    placeholder = "Select delivery date",
    minDate = new Date(),
  }) => {
    return (
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          placeholderText={placeholder}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          id={id}
        />
      </div>
    );
  };
  
  export { DatePickerField };