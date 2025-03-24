import { Component } from '../lib/sharpy.js';

export class HomePage extends Component {
    async beforeMount() {
        console.log('Home page will mount');
    }

    async render() {
        return `
            <div class="home-page">
                <h1>Welcome to Our Website</h1>
                <p>This is the home page content</p>
            </div>
        `;
    }

    async mounted() {
        console.log('Home page mounted');
    }
} 