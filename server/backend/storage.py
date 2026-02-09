import json
from datetime import datetime
from pathlib import Path
from typing import Annotated

from pydantic import BaseModel, PlainSerializer


def filepath():
    return Path("/", "data", "pings.json")


CustomDatetime = Annotated[
    datetime,
    PlainSerializer(lambda dt: dt.isoformat())
]


class PingStore(BaseModel):
    dates: list[CustomDatetime]


def read_all():
    if not filepath().exists():
        return PingStore(dates=[])

    with open(filepath(), "r", encoding="utf-8") as f:
        raw = json.load(f)

    store = PingStore.model_validate(raw)
    return store


def write_all(data: PingStore):
    # datetime は ISO8601 で JSON 化
    json_data = data.model_dump(mode="json")

    filepath().parent.mkdir(parents=True, exist_ok=True)
    with open(filepath(), "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
