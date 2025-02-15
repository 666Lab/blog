+++
title = '팀 블로그에 글 작성하는 방법'
date = 2025-01-15T12:19:30+09:00
draft = false
+++


### 블로그 구조 

- 레포지토리 https://github.com/666Lab/blog.git
- https://666lab.github.io/blog 도메인으로 접속 가능
- hugo와 digitalgarden 테마를 커스터마이징해서 사용 중

---

### Contents 추가 방법
1. 명령어로 추가하기 
```bash
# post 추가 시
hugo new content manuals/mannuals-1.md

# project 추가 시
hugo new content project/pluto.md
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
git commit -m "commit message"
git push origin main
```

