import { Component } from '../lib/sharpy.js';

export class AboutPage extends Component {
    async render() {
        return `
            <div class="about-page">
                <h1>About Us</h1>
                <p>Learn more about our company and mission.</p>
            </div>
        `;
    }
} 