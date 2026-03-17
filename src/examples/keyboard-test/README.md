Keyboard test example

- Shows an on-screen keyboard (letters, numbers, function keys, navigation cluster, numpad).
- Press keys while the SDL window is focused — keys turn green when pressed, red otherwise.

Useful env vars:

- `SHOW_KEY_BACKDROP=1` — draw dark backdrops behind keys for better contrast.
- `INPUT_KEY_DEBUG=1` — (was available during development) log raw SDL key names; now removed by default.

Run:

```bash
bun run example keyboard-test
```

If some keys don't register on your platform, run with debug logging temporarily (re-enable in `InputManager.ts`) and paste the raw names so mappings can be extended.
