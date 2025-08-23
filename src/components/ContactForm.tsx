import React, { useState, useRef, useEffect } from 'react';
import { Mail, HelpCircle, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon, Unlink } from 'lucide-react';

interface ContactFormData {
  customer: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    customer: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        // Reset form
        setFormData({
          customer: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternative: Direct email link
  const handleDirectEmail = () => {
    const mailtoLink = `mailto:ronniehaque@gmail.com?subject=Contact from frameshop.com.au&body=Hello, I would like to get in touch regarding your services.`;
    window.open(mailtoLink);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Email Us</h2>
      </div>
      <p className="text-gray-600 mb-6">We're here to help!</p>
      
      {/* Contact Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <div className="relative">
            <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Subject of your inquiry"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          
          {/* Text Editor Toolbar */}
          <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <Bold className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <Italic className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <Underline className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <List className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <ListOrdered className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <AlignLeft className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <AlignCenter className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <AlignRight className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <AlignJustify className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <div className="w-4 h-4 border border-gray-400 rounded-sm bg-red-500"></div>
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <div className="w-4 h-4 border border-gray-400 rounded-sm bg-yellow-300"></div>
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <LinkIcon className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <Unlink className="w-4 h-4" />
            </button>
          </div>
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={8}
            className="w-full border border-gray-300 rounded-b-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>

        {/* Submit Status Message */}
        {submitStatus !== 'idle' && (
          <div className={`p-3 rounded-md ${
            submitStatus === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-800'
            } text-white`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>

      {/* Alternative Email */}
      <div className="mt-6 bg-gray-50 rounded-md">
        <div className="py-4 text-left">
          <p className="text-gray-600 mb-2">You can also use the email below.</p>
          <p className="text-gray-900 mb-3">
            <span className="font-medium">Email:</span> ronniehaque@gmail.com
          </p>
          <button
            onClick={handleDirectEmail}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Click here to send email directly
          </button>
        </div>
      </div>
    </div>
  );
} 