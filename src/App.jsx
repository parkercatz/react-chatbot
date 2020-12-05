import React, { useState, useEffect, useCallback } from 'react'
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index'
import { FormDialog } from './components/Forms/index'
import { db } from './firebase/index'

const App = () => {
  const [answers, setAnswers] = useState([]) // 回答コンポーネントに表示するデータ
  const [chats, setChats] = useState([]) // チャットコンポーネントに表示するデータ
  const [currentId, setCurrentId] = useState('init') // 現在の質問ID
  const [dataset, setDataset] = useState({}) // 質問と回答のデータセット
  const [open, setOpen] = useState(false) // お問い合わせフォーム用モーダルの開閉を管理

  // 次の質問をチャットエリアに表示する関数
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question',
    })
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  // 回答が選択された時に呼ばれる関数
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === 'contact':
        handleOpen()
        break
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a')
        a.href = nextQuestionId
        a.target = '_blank'
        a.click()
        break
      default:
        addChats({
          text: selectedAnswer,
          type: 'answer',
        })

        setTimeout(
          () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),
          750
        )

        break
    }
  }

  // 新しいチャットを追加するCallback関数
  const addChats = useCallback(
    (chat) => {
      setChats((prevChats) => {
        return [...prevChats, chat]
      })
    },
    [setChats]
  )

  // お問い合わせフォーム用モーダルを開くCallback関数
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  // お問い合わせフォーム用モーダルを閉じるCallback関数
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  // 最初の質問をチャットエリアに表示する
  useEffect(() => {
    ;(async () => {
      const initDataset = {}

      // FireStoreから'question'を取得する
      await db
        .collection('questions')
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id
            const data = doc.data()
            initDataset[id] = data
          })
        })

      // FireStoreから取得したデータセットを反映
      setDataset(initDataset)

      // 最初の質問を表示
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  }, [])

  // 最初のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <div className="App">
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer} />
          <FormDialog
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </div>
      </section>
    </div>
  )
}

export default App
