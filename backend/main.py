from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import stocks, ai

app = FastAPI()

# Allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stocks.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "RealTicker Backend Running"}
