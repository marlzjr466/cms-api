Set WshShell = WScript.CreateObject("WScript.Shell")
Return = WshShell.Run("cmd.exe /C npm run local-build", 0, true)