from datetime import datetime, timezone

import pytest

from storage import PingStore, read_all, write_all


def test_write_and_read_all(fs):
    dt = datetime(2026, 2, 10, 12, 0, 0, tzinfo=timezone.utc)
    data = PingStore(dates=[dt])

    write_all(data)
    store = read_all()

    assert store.dates == [dt]
