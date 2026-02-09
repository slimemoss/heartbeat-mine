from datetime import datetime, timedelta, timezone

from flask import Flask, jsonify

import storage

app = Flask(__name__)


@app.route("/")
def root():
    data = storage.read_all()
    return jsonify(data.model_dump())


@app.route("/ping")
def ping():
    prev = storage.read_all().dates
    now = datetime.now(timezone(timedelta(hours=9)))
    kept = update_pings(prev, now)
    storage.write_all(storage.PingStore(dates=kept))
    return "OK\n"


def update_pings(prev: list[datetime], now: datetime):
    RETENTION_DAYS = 30

    cutoff = now - timedelta(days=RETENTION_DAYS)

    kept: list[datetime] = []
    for ts in prev:
        if ts >= cutoff:
            kept.append(ts)

    kept.append(now)
    return kept


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
