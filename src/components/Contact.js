import { Component } from '../lib/sharpy.js';

export class ContactPage extends Component {
    async render() {
        return `
            <div class="contact-page">
                <h1>Contact Us</h1>
                <form id="contact-form">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <textarea placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        `;
    }

    async mounted() {
        document.getElementById('contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
        });
    }
} 