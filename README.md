# Sharpy Router

Sharpy Router는 순수 자바스크립트로 구현된 경량 SPA(Single Page Application) 라우팅 라이브러리입니다.

## 특징

- 순수 자바스크립트로 구현된 클라이언트 사이드 라우터
- History API 및 Hash 기반 라우팅 지원
- 컴포넌트 기반 아키텍처
- URL 파라미터 지원
- 페이지 간 상태(state) 전달 기능
- 로딩 인디케이터 내장

## 설치

프로젝트에 `src/lib/sharpy.js` 파일을 추가하여 사용할 수 있습니다.

## 사용법

### 1. 기본 설정
```

<!DOCTYPE html>
<html>
        <head>
         <title>Sharpy Router Application</title>
        </head>
        <body>
            <div id="loading">
                <div class="loading-spinner"></div>
            </div>
            <main id="content"></main>
            <script type="module" src="/src/app.js"></script>
        </body>
</html>
```

### 2. 컴포넌트 생성

```javascript
import { Component } from '../lib/sharpy.js';

export class HomePage extends Component {
    async render() {
        return `
            <div class="home-page">
                <h1>Welcome to Homepage</h1>
            </div>
        `;
    }
}
```

### 3. 라우터 설정

```javascript
import { Sharpy } from './lib/sharpy.js';
import { HomePage } from './components/Home.js';
import { AboutPage } from './components/About.js';

const router = new Sharpy({
    root: document.getElementById('content'),
    loading: document.getElementById('loading'),
    mode: 'hash' // 또는 'history'
});

router
    .route('/', HomePage)
    .route('/about', AboutPage)
    .route('/users/:id', UserProfile);
```

### 4. 네비게이션

```javascript
// URL 파라미터와 상태 전달
router.navigate('/users/123', {
    userId: 123,
    previousPage: '/home'
});
```

### 5. 컴포넌트에서 파라미터와 상태 사용

```javascript
export class UserProfile extends Component {
    async render() {
        const { params, state } = this.props;
        return `
            <div class="user-profile">
                <h1>User Profile</h1>
                <p>User ID: ${params.id}</p>
                <p>Previous Page: ${state.previousPage}</p>
            </div>
        `;
    }
}
```

## 라이프사이클 훅

컴포넌트는 다음과 같은 라이프사이클 훅을 제공합니다:

- `beforeMount()`: 컴포넌트가 마운트되기 전 호출
- `mounted()`: 컴포넌트가 마운트된 후 호출
- `beforeUnmount()`: 컴포넌트가 언마운트되기 전 호출

```javascript
export class HomePage extends Component {
    async beforeMount() {
        console.log('컴포넌트가 마운트되기 전');
    }

    async mounted() {
        console.log('컴포넌트가 마운트된 후');
    }

    async beforeUnmount() {
        console.log('컴포넌트가 언마운트되기 전');
    }
}
```

## 로딩 인디케이터

라우터는 페이지 전환 시 자동으로 로딩 인디케이터를 표시합니다. 로딩 인디케이터는 다음과 같이 커스터마이징할 수 있습니다:

```css
#loading {
    /* 로딩 스타일 커스터마이징 */
}

.loading-spinner {
    /* 스피너 스타일 커스터마이징 */
}
```

## 프로젝트 구조

```
project/
├── src/
│   ├── lib/
│   │   └── sharpy.js
│   ├── components/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── Contact.js
│   └── app.js
└── index.html
```

## 브라우저 지원

- 모던 브라우저 (Chrome, Firefox, Safari, Edge)
- History API 또는 Hash 기반 라우팅 지원

## 라이선스

MIT License

## 기여하기

이슈와 풀 리퀘스트를 환영합니다. 주요 변경사항의 경우, 먼저 이슈를 열어 변경하고자 하는 내용을 논의해주세요.
