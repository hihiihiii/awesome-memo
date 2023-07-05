from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pymongo import MongoClient


client = MongoClient(
    "mongodb+srv://a96689636:#3gjdirhtn@cluster0.aqcybvg.mongodb.net/?retryWrites=true&w=majority"
)

db = client.python_test


# 생성
# doc = {"name": "kim", "age": 19}
# db.users.insert_one(doc)


class Memo(BaseModel):
    id: str
    content: str


# memos = []
app = FastAPI()


# 메모 생성
@app.post("/memos")
def create_memo(memo: Memo):
    doc = {"id": memo.id, "content": memo.content}
    db.memos.insert_one(doc)
    return "성공했습니다."


# 메모 불러오기
@app.get("/memos")
def read_memo():
    memo = list(db.memos.find({}, {"_id": False}))
    return memo


# 메모 수정
@app.put("/memos/{memo_id}")
def edit_memo(req_memo: Memo):
    print(req_memo.id, req_memo.content)

    db.memos.update_one({"id": req_memo.id}, {"$set": {"content": req_memo.content}})

    # for memo in memos:
    #     if memo.id == req_memo.id:
    #         memo.content = req_memo.content
    #         return "성공했습니다."
    return "그런 메모는 없습니다."


# 메모 삭제
@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    db.memos.delete_one({"id": memo_id})
    # for index, memo in enumerate(memos):
    #     if memo.id == memo_id:
    #         memos.pop(index)
    return "성공했습니다."


@app.get("/memos?sort_by=created&sorted=ASC")
def sort_asc_memo():
    memos.id.sort()
    return "성공했습니다."


@app.get("/memos?sort_by=created&sorted=DESC")
def sort_desc_memo():
    return "성공했습니다."


app.mount("/", StaticFiles(directory="static", html=True), name="static")
