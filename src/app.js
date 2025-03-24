import { Sharpy } from './lib/sharpy.js';
import { HomePage } from './components/Home.js';
import { AboutPage } from './components/About.js';
import { ContactPage } from './components/Contact.js';

// 라우터 초기화
const router = new Sharpy({
    root: document.getElementById('content'),
    loading: document.getElementById('loading'),
    mode: 'hash'
});

// 라우트 설정
router
    .route('/', HomePage)
    .route('/about', AboutPage)
    .route('/contact', ContactPage)
    .route('/contact/:id', ContactPage)
    .route('/contact/:id/edit', ContactPage, { type: 'edit' });

router.handleRoute(); 

setTimeout(() => {
    router.navigate('/contact/123', { 
        userId: 123,
        previousPage: '/home',
        someData: { foo: 'bar' }
    });
}, 3000);
// state와 함께 네비게이션
