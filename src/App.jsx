import React from 'react'
import './assets/styles/style.css'
import defaultDataset from './dataset'
import { AnswersList, Chats } from './components/index'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false,
    }
  }

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId]
    const chat = {
      text: initDataset.question,
      type: 'question',
    }
    const chats = this.state.chats
    chats.push(chat)
    this.setState({
      chats: chats,
    })
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId]
    const initAnswers = initDataset.answers
    this.setState({
      answers: initAnswers,
    })
  }

  componentDidMount() {
    this.initChats()
    this.initAnswer()
  }

  render() {
    return (
      <div className="App">
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats} />
            <AnswersList answers={this.state.answers} />
          </div>
        </section>
      </div>
    )
  }
}
