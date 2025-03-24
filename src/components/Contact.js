import { Component } from '../lib/sharpy.js';

export class ContactPage extends Component {

    async render() {
        const { params, state } = this.props;
        console.log('State:', state);
        
        return `
            <div class="contact-page">
                <h1>Contact Page</h1>
                <p>Contact ID: ${params.id}</p>
                ${state ? `
                    <p>User ID: ${state.userId}</p>
                    <p>Previous Page: ${state.previousPage}</p>
                    <p>Extra Data: ${state.someData.foo}</p>
                ` : ''}
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