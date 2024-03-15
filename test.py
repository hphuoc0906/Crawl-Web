from flask import Flask, jsonify, request
import os
import pandas as pd

app = Flask(__name__)

folder_path = os.path.join(os.getcwd(), "csv")
csv_files = [file for file in os.listdir(folder_path) if file.endswith('.csv')]

def getQuestion(fileID, questionID):
    if fileID >= len(csv_files):
        return {"message": "Vượt quá giới hạn số lượng  file",
                "status": 0}
    
    current_file = csv_files[fileID]
    if os.path.isfile(os.path.join(folder_path, current_file)):
        df = pd.read_csv(os.path.join(folder_path, current_file))
    else:
        return {"message": "Không tồn tại file",
                "status": 0}
    
    if questionID > len(df['question']):
        return {"message": "Không tồn tại câu hỏi",
                "status": 0}
    tmp = df.iloc[questionID]
    return {"message": tmp,
            "status" : 1}

@app.route('/question', methods=['POST'])
def requestQuestion():
    data = request.get_json()
    fileIdx = data['fileIdx']
    questionIdx = data['questionIdx']
    tmp = getQuestion(fileIdx, questionIdx)
    if tmp['status'] == 1:
        obj = tmp['message']
        respone_data = {"question": obj['question'],
                        "choices": obj['choices'],
                        "subject": obj['subject'],
                        "grade": obj['grade']}
        return jsonify(respone_data)
    else:
        return jsonify(tmp)

# @app.route('/')
# def re

if __name__ == '__main__':
    app.run()