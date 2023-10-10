import type { NextPage } from 'next'
import { SyntheticEvent, useState } from 'react'

const Home: NextPage = () => {

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    fetch("http://localhost:5328/api/openai?question="+question)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setAnswer(data.answer)
    })
  }

    return (
      <div className="uk-section uk-section-large uk-height-viewport">
      <div className="uk-container uk-text-center uk-padding-large">
          <h1 className="uk-heading-medium"><strong>Ask Me</strong> Questions About Your Data </h1>
      </div>
      <div className="uk-container uk-text-center">
          <form className="uk-grid-collapse" onSubmit={onSubmit}>
            <div className="uk-width-1-1 ">
              <input onChange={(e) => setQuestion(e.target.value)} id="question" className="uk-input uk-width-1-3" type="text"/>
              <button type="submit" className="uk-button uk-button-default uk-width-1-5">ASK</button>
            </div>
          </form>
      </div>
      <div className="uk-container uk-text-center uk-padding">
        <div className="uk-inline">
          <div id="answer" className="uk-flex uk-flex-center uk-flex-middle uk-padding uk-width-expand">{answer}</div>
        </div>
      </div>
    </div>
    )
    
}

export default Home