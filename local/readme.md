* 設定
```
set -Ux HEARTBEAT_MINE_SERVER https://example.com
```

* 変更の反映
```
cp ./heartbeat-mine.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user restart heartbeat-mine.service
systemctl --user status heartbeat-mine.service
```

* 起動・有効化
```
cp ./heartbeat-mine.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now heartbeat-mine.service
systemctl --user status heartbeat-mine.service
```
* 停止・無効化
```
systemctl --user disable --now heartbeat-mine.service
```
