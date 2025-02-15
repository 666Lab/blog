+++
date = '2025-02-15T18:05:40+09:00'
draft = false
title = 'nextjs'
descriptions = "test"
categories=["666daeva", "nextjs"]
+++

asdfasdfasdf


### asdf

<img src="/blog/images/666lab.png">



```mermaid

%%{init: {"flowchart": {"htmlLabels": false, "curve": "linear"}} }%%
flowchart LR
    subgraph server["OAuth2-Sample"]
        style server fill:#eee,stroke:#ddd,stroke-width:2px
        frontend["`frontend:3000`"]
        backend["`backend:5000`"]
    end
    google["Google Cloud API Server"]

    developer <-->|http://localhost:3000| frontend
    developer <-->|http://localhost:5000| backend
    frontend <--> |http://localhost:5000/auth/google| backend
    backend <--> google
```


```goat
      .               .                .               .--- 1          .-- 1     / 1
     / \              |                |           .---+            .-+         +
    /   \         .---+---.         .--+--.        |   '--- 2      |   '-- 2   / \ 2
   +     +        |       |        |       |    ---+            ---+          +
  / \   / \     .-+-.   .-+-.     .+.     .+.      |   .--- 3      |   .-- 3   \ / 3
 /   \ /   \    |   |   |   |    |   |   |   |     '---+            '-+         +
 1   2 3   4    1   2   3   4    1   2   3   4         '--- 4          '-- 4     \ 4

```

