# test_update_pings.py
from datetime import datetime, timedelta, timezone

from server import update_pings


def test_update_pings_keeps_recent_and_adds_now():
    JST = timezone(timedelta(hours=9))
    now = datetime(2026, 2, 10, 12, 0, 0, tzinfo=JST)

    old = now - timedelta(days=31)
    recent = now - timedelta(days=1)

    result = update_pings([old, recent], now)

    assert result == [recent, now]


def test_update_pings_all_old():
    JST = timezone(timedelta(hours=9))
    now = datetime(2026, 2, 10, 12, 0, 0, tzinfo=JST)

    old1 = now - timedelta(days=40)
    old2 = now - timedelta(days=31)

    result = update_pings([old1, old2], now)

    assert result == [now]


def test_update_pings_empty_prev():
    JST = timezone(timedelta(hours=9))
    now = datetime(2026, 2, 10, 12, 0, 0, tzinfo=JST)

    result = update_pings([], now)

    assert result == [now]
