import React, { useState, useEffect, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextInput from './TextInput'

const FormDialog = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const inputName = useCallback((event) => {
    setName({ name: event.target.value }, [setName])
  })

  const inputEmail = useCallback((event) => {
    setEmail({ email: event.target.value }, [setEmail])
  })

  const inputDescription = useCallback((event) => {
    setDescription({ description: event.target.value }, [setDescription])
  })

  const submitForm = () => {
    const payload = {
      text:
        'お問い合わせがありました\n' +
        'お名前：' +
        name +
        '\n' +
        'Email: ' +
        email +
        '\n' +
        'お問い合わせ内容:\n' +
        description,
    }

    const url =
      'https://hooks.slack.com/services/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'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(() => {
      alert('送信が完了しました。追って連絡します！')
      setName('')
      setEmail('')
      setDescription('')
      return props.handleClose()
    })
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={'お名前（必須）'}
          multiline={false}
          rows={1}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          label={'メールアドレス（必須）'}
          multiline={false}
          rows={1}
          value={email}
          type={'text'}
          onChange={inputEmail}
        />
        <TextInput
          label={'お問い合わせ内容（必須）'}
          multiline={true}
          rows={5}
          value={description}
          type={'text'}
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
