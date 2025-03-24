export class Component {
    constructor(props = {}) {
        this.props = props;
    }

    // 라이프사이클 메서드
    async beforeMount() {}
    async mounted() {}
    async beforeUnmount() {}
    
    // 렌더링 메서드
    async render() {
        return '';
    }
}

export class Sharpy {
    constructor(options = {}) {
        this.routes = new Map();
        this.currentComponent = null;
        this.rootElement = options.root || document.getElementById('content');
        this.mode = options.mode || 'history'; // 'history' 또는 'hash'
        this.loadingElement = options.loading || document.getElementById('loading');
        this.loadingParent = options.loadingParent || this.rootElement; // 로딩을 표시할 부모 요소
        this.init();
    }

    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }
    }

    hideLoading() {
        if (this.loadingElement) {
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
            }, 300); // 로딩이 너무 빨리 사라지는 것을 방지하기 위한 지연
        }
    }

    init() {
        if (this.mode === 'hash') {
            window.addEventListener('hashchange', () => this.handleRoute());
        } else {
            window.addEventListener('popstate', () => this.handleRoute());
        }

        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('data-route'));
            }
        });
    }

    getPath() {
        if (this.mode === 'hash') {
            return window.location.hash.slice(1) || '/';
        }
        return window.location.pathname;
    }

    async navigate(path, data = {}) {
        this.showLoading();
        try {
            if (this.mode === 'hash') {
                window.location.hash = path;
            } else {
                window.history.pushState(data, '', path);
                await this.handleRoute();
            }
        } finally {
            this.hideLoading();
        }
    }

    async handleRoute() {
        this.showLoading();
        try {
            const path = this.getPath();
            let match = null;
            let params = {};

            for (const [pattern, component] of this.routes) {
                const result = path.match(pattern);
                if (result) {
                    match = component;
                    params = result.groups || {};
                    break;
                }
            }

            if (match) {
                if (this.currentComponent && this.currentComponent.beforeUnmount) {
                    await this.currentComponent.beforeUnmount();
                }

                this.currentComponent = new match({
                    params,
                    state: this.mode === 'history' ? window.history.state : null
                });

                if (this.currentComponent.beforeMount) {
                    await this.currentComponent.beforeMount();
                }

                const content = await this.currentComponent.render();
                this.rootElement.innerHTML = content;

                if (this.currentComponent.mounted) {
                    await this.currentComponent.mounted();
                }
            }
        } finally {
            this.hideLoading();
        }
    }

    route(path, component) {
        // 파라미터를 포함한 경로 패턴 지원
        const pattern = path.replace(/:(\w+)/g, '(?<$1>[^/]+)');
        this.routes.set(new RegExp(`^${pattern}$`), component);
        return this;
    }
} 