import React from 'react'
import ReactQuill from 'react-quill'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ value, setValue, onSave, onCancel }) => {
  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleSave = () => {
    onSave(value)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div>
      <style>
        {`
          .ql-container {
            background-color: white;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .ql-toolbar {
            background-color: white;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
        `}
      </style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        style={{ height: '100%' }}
      />
      <div style={{ marginTop: '10px' }}>
        <PrimaryButton style={{ marginRight: '5px' }} onClick={handleSave}>
          Save
        </PrimaryButton>
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
      </div>
    </div>
  )
}

export default TextEditor
