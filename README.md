
## Usages
### Contents 추가 방법
1. 명령어로 추가하기 
```bash
# post 추가 시
hugo new content post/post_name.md

# project 추가 시
hugo new content project/project_name.md
```

    - 수동으로 content/post, content/project 경로에 md 파일 추가 후 아래 내용을 파일 상단에 입력
    ```
        +++
        title = 'tile'
        date = 2025-01-16
        +++
    ```

2. 마크다운으로 내용 작성 (이미지 첨부 필요 시 images 경로에 위치)
3. local 검증 후 main 브런치에 push
```bash
# test
hugo server

# push
git add .
git commit -m "content/post/name.md 작성"
git push origin main
```

---

## 정보
### 환경 구축
```bash
brew install hugo 
```

### Hugo
```bash
# new content
hugo new content docs/post1.md

# Start a local testing server
hugo server -D

# create static files
hugo
```

### Current theme example and docs

```bash
git submodule add https://github.com/apvarun/digital-garden-hugo-theme.git themes/digitalgarden
```
- https://digital-garden-hugo-theme.vercel.app/
- https://github.com/apvarun/digital-garden-hugo-theme/tree/main
