@echo off
cls
setlocal
REM 0 and 1 are used to represnt false and true in this logic, respectively
set /A automatic=0
set /A token=0
set /A initial=1
echo Node.js Bot Launcher [Version 2.1]
goto selection

:selection
@echo off
echo.
echo Choices:
if %initial% == 1 (
  if %token% == 0 (
    echo 1. Start
  ) else (
    echo 1. Start with token ^"%token%^"
  )
) else (
  if %token% == 0 (
    echo 1. Restart
  ) else (
    echo 1. Restart with token ^"%token%^"
  )
)
if %token% == 0 (
  echo 2. Set non-persisted token
) else (
  echo 2. Change non-persisted token
)
if %automatic% == 1 (
  echo 3. Disable auto restarting
) else (
  echo 3. Enable auto restarting
)
echo 4. Open command prompt in directory (Exit Launcher)
echo 5. Close command prompt
echo.
if %automatic% == 1 (
  echo 1. will be chosen after 10 seconds
  choice /T 10 /C 12345 /D 1
) else (
  choice /C 12345
)

if errorlevel 5 goto close
if errorlevel 4 goto leave
if errorlevel 3 (
  echo.
  if %automatic% == 1 (
    echo Auto restarting disabled
    set /A automatic=0
  ) else (
    echo Auto restarting enabled
    set /A automatic=1
  )
  goto selection
)
if errorlevel 2 goto token
if errorlevel 1 goto run

:run
if %initial% == 1 (
  set /A initial=0
)
cd /d %~dp0
if %token% == 0 (
  @echo on
  node index.js
  @echo off
) else (
  @echo on
  node index.js %token%
  @echo off
)
echo.
echo Node.js has ceased
goto selection

:token
echo.
if %token% == 0 (
  set /p token="Enter Token: "
) else (
  echo Current token: %token%
  echo Reply 0 to unset/remove
  set /p token="Change Token: "
)
goto selection

:leave
endlocal
@echo on
cd /d %~dp0
@echo off
call cmd

:close
endlocal
@echo on
exit