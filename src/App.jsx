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
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === 'init':
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500)
        break
      default:
        const chats = this.state.chats
        chats.push({
          text: selectedAnswer,
          type: 'answer',
        })

        this.setState({
          chats: chats,
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000)

        break
    }
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId]
    const initAnswers = initDataset.answers
    this.setState({
      answers: initAnswers,
    })
  }

  componentDidMount() {
    const initAnswer = ''
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render() {
    return (
      <div className="App">
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats} />
            <AnswersList
              answers={this.state.answers}
              select={this.selectAnswer}
            />
          </div>
        </section>
      </div>
    )
  }
}
