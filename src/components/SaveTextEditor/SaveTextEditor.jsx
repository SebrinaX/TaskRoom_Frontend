import * as React from 'react'
import TextEditor from '../TextEditor'
const SaveTextEditor = ({
  isEditingContent,
  setIsEditingContent,
  content,
  setContent,
  children,
  style,
}) => {
  const handleContentOnClick = () => {
    setIsEditingContent(true)
  }

  const handleContentonSave = (editedDescription) => {
    setContent(editedDescription)
    setIsEditingContent(false)
  }

  const handleDescriptionCancel = () => {
    setContent('')
    setIsEditingContent(false)
  }
  return (
    <div style={style}>
      {isEditingContent ? (
        <div
          style={{
            borderRadius: '5px',
            marginTop: '10px',
            width: '93%',
          }}>
          <TextEditor
            value={content}
            setValue={setContent}
            onSave={handleContentonSave}
            onCancel={handleDescriptionCancel}
          />
        </div>
      ) : (
        <div
          style={{
            borderRadius: '5px',
            padding: '10px',
            marginTop: '10px',
            width: '93%',
            height: 'auto',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            overflowY: 'auto',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
          onClick={handleContentOnClick}>
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div style={{ color: 'grey' }}>
              <em>{children}</em>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SaveTextEditor
