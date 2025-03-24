import { Sharpy } from './lib/sharpy.js';
import { HomePage } from './components/Home.js';
import { AboutPage } from './components/About.js';
import { ContactPage } from './components/Contact.js';

// 라우터 초기화
const router = new Sharpy({
    root: document.getElementById('content'),
    loading: document.getElementById('loading'),
    loadingParent: document.getElementById('content'), // 로딩을 표시할 부모 요소 지정
    mode: 'hash' // 해시 모드 활성화
});

// 라우트 설정
router
    .route('/', HomePage)
    .route('/about', AboutPage)
    .route('/contact', ContactPage);

// 초기 라우트 처리
router.handleRoute(); 