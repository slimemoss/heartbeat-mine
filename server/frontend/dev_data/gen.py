import json
import random
from datetime import datetime, timedelta

# 設定
start_date = datetime(2026, 1, 10)
end_date = datetime(2026, 2, 10)
interval_minutes = 5

dates = []
current_time = start_date

while current_time <= end_date:
    # N時間の束（ランダム）
    N = random.randint(5, 15)
    bundle_end = current_time + timedelta(hours=N)

    while current_time <= bundle_end and current_time <= end_date:
        dates.append(current_time.isoformat())
        current_time += timedelta(minutes=interval_minutes)

    # M時間あける（ランダム）
    M = random.randint(5, 15)
    current_time += timedelta(hours=M)

data = {"dates": dates}

# JSON ファイルに出力
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Generated data.json with {len(dates)} entries")
