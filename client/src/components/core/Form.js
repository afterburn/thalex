import React from 'react'

import Button from './Button'

const FormContext = React.createContext({})

const Form = ({ children, onSubmit }) => {
  const formRef = React.useRef()

  const submit = (e, name) => {
    e.preventDefault()
    onSubmit(formRef.current, name)
  }

  const formContext = {
    submit
  }

  return <FormContext.Provider value={formContext}>
    <form ref={formRef}>
      {children}
    </form>
  </FormContext.Provider>
}

Form.Submit = ({ children, color, name }) => {
  const { submit } = React.useContext(FormContext)
  return <Button onClick={(e) => submit(e, name)} color={color}>{children}</Button>
}

export default Form