# Vercel 배포 가이드 - poe2act_checker

이 프로젝트는 Vite/React 정적 웹앱이라 Vercel에 올리면 내 컴퓨터를 서버로 열지 않고도 누구나 접속할 수 있습니다.

## 1. 로컬 빌드 확인

```bash
npm install
npm run build
```

정상이라면 `dist/` 폴더가 생성됩니다.

## 2. GitHub 저장소에 올리기

아직 git 저장소가 아니라면 프로젝트 폴더에서:

```bash
git init
git add .
git commit -m "Initial poe2 act checker"
```

GitHub에서 새 repository를 만든 뒤, GitHub가 안내하는 remote 명령을 실행합니다. 예:

```bash
git remote add origin https://github.com/YOUR_NAME/poe2act_checker.git
git branch -M main
git push -u origin main
```

## 3. Vercel에서 Import

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. Add New... > Project
4. `poe2act_checker` repository 선택
5. 설정 확인:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Deploy 클릭

## 4. 배포 후 사용

배포가 끝나면 Vercel이 아래 같은 공개 URL을 줍니다.

```text
https://poe2act-checker.vercel.app
```

이 URL을 다른 사람에게 공유하면 됩니다.

## 보안 메모

- 내 PC, WSL, 공유기 포트를 외부에 열지 않습니다.
- 체크 상태는 사용자 각자의 브라우저 localStorage에 저장됩니다.
- 서버 DB/로그인 기능은 없습니다.
- 여러 기기 간 진행상황 동기화가 필요해지면 그때 Supabase/Firebase 같은 백엔드를 추가하는 방식이 좋습니다.
