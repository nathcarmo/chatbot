import os
import pandas as pd
from flask_cors import CORS
from flask import Flask, jsonify, request
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
from langchain.agents import create_pandas_dataframe_agent

# Set the OpenAI API key to an empty string (You should replace this with your actual API key)
os.environ["OPENAI_API_KEY"] = "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"

app = Flask(__name__)
CORS(app)

@app.route('/api/openai', methods=['GET'])
def ask():

    def _handle_error(error) -> str:
        return str(error)[:50]

    query_data = request.args
    user_input = query_data["question"]

    df = pd.read_csv('ifood_df.csv')
    llm = ChatOpenAI(temperature=0)
    agent = create_pandas_dataframe_agent(llm, df, verbose=True, agent_type=AgentType.OPENAI_FUNCTIONS, handle_parsing_errors=_handle_error)
    response = agent.run(user_input)

    return jsonify({
        "question":user_input,
        "answer":response,
    })

if __name__ == '__main__':
    app.run(debug=True, port=5328)