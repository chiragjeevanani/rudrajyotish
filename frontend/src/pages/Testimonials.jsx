import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';

const defaultReviews = [
  {
    name: 'Loki',
    text: 'I got Worlds🌎 Best Astrologer. It is miracle for my life. All problems solved within three month. Nakshtra remedy is so powerful. …',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Anand Ojha',
    text: 'Gwalior se badiya Jyotishi muze Rudra Jyotish me mile. Guruji ka knowledge bahut hi shandar hai. Nakshatra Photo ke upay se matra 20 din me mujhe apne kaam me safalta gai. Thanks Guruji 👍 …',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Suraj Sharma',
    text: 'Mere sath meri life mai jo chal ra tha . Mai bhot jada preshan tha . Phir mai guru ji se mila unhone sari problem mere bolne se pehel hi sab bata diya . Phir muze guru ji ne upaye bataye mein kiye upaye se muze bhot jada fayada hua . Or ah bhot relief hai .',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'PrratYush S MohTTa',
    text: 'Hi I am Pratyush from Bengluru. My life was completely messed up in terms of personal and professional. I consulted RUDRA JYOTISH KENDRA INDORE for my problems to instant solution. Guruji examined my Horoscope with details. He gave me … More',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Ashwin Gupta',
    text: 'Namste Gurudev. I am very lucky for pridicted my Horoscope. I have lot of troubles in my life, but your accurate pridiction is very useful to me. I am 100% satisfied to your remedies.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Kartavya Dhillon',
    text: 'Rudra Jyotish Kendra Indore truly provides clear and confidence-building guidance. The astrologer explained every point with patience and depth. I felt mentally relaxed after the session. very good service.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Bharat Kumar',
    text: 'I am from Burhanpur. I am suffering from Negetivity, Dipression and a lot of problems. I took my hocoroscpe in Rudra Jyotish kdndra Indore. Guruji gave me great remedy. Now I am very well and suitable position ❤️❤️❤️',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Manmohan Sarkar',
    text: 'Jai shree krishna. I am Aashi Sharma from Khargone. Guruji ka Ashirvad hamesha bana rahe yahi kamna hai.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Mukesh Chokhatiya',
    text: "It's Indore best Astrology Centre. I am very dipression and tension. Now I am very happy Very Nice Result. Good remedy.",
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'meenakshi chaudhary',
    text: 'Best astrologer..most accurate predictions..highly recommend to anyone ..ekdum sahi prediction hai',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Manish Advertising',
    text: 'One of the best astrology centers I’ve ever visited. The Astrologer is polite, and the astrologer explains everything in detail with great patience.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Yash Chouhan',
    text: 'I got my girlfriend love. She is very angry 😠. But guru ji remedy is very powerful. lot of thanks sir. …',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Suraj Damade',
    text: "Indore's Best astrologer. Very highly knowledgeable person. Very kind and Helpful nature. Thanks Guruji",
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Sandhya Thakur',
    text: 'Very best dicision and prediction for my two children. I always recommended for this astrology center.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Rijika Pradhan',
    text: 'I got very poweful remedy. It is a true Astrology center. I think I will get Govt. Job or a very good Husband. Thanks lot of Sir.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Pankaj Kumar (Yoga teacher)',
    text: 'My experience at Rudra Jyotish Kendra Indore was truly insightful as the astrologer shared accurate predictions and practical direction. The way they explained everything felt genuine and comforting. A great place for proper guidance. highly recommended.',
    rating: 5,
    role: 'Yoga Teacher'
  },
  {
    name: 'Jaiveer Singh',
    text: 'Rudra Jyotish Kendra Indore offered me a very detailed and meaningful horoscope reading. The astrologer clearly explained every planetary influence and its impact on my life. I received practical remedies that were easy to follow. truly a dependable astrology centre.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Nikesh',
    text: 'Meri family ke matters ko lekar yahan se bohot sahi suggestion mila. Simple words mein sab samjhaya aur proper direction diya. Kaafi relief feel hua consultation ke baad. trusted place.',
    rating: 5,
    role: 'Verified Reviewer'
  },
  {
    name: 'Piyush Sardiya',
    text: 'I have a lot of problems but guruji gave me best remedy now I am a SBI Officer. Thanks guruji.',
    rating: 5,
    role: 'SBI Officer'
  }
];

export default function Testimonials() {
  const reviews = defaultReviews;

  return (
    <div style={{ padding: '45px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Title */}
      <section style={{ textAlign: 'center', padding: '0 0 20px' }}>
        <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 'bold' }}>TESTIMONIALS</span>
        <h1 style={{ fontSize: '2.3rem', marginTop: '10px', marginBottom: '15px' }} className="gold-gradient-text">Words of Trust</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
          Real feedback from individuals and business owners who have experienced growth, stability, and peace through Rudra Ji's alignments.
        </p>
      </section>


      {/* Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', marginTop: '40px' }}>
        {reviews.map((rev, index) => (
          <div key={index} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            
            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px', color: 'var(--color-gold)' }}>
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.7', fontStyle: 'italic' }}>
              "{rev.text}"
            </p>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>{rev.name}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.role}</span>
              </div>
              <MessageSquare size={20} style={{ color: 'rgba(229, 62, 62, 0.2)' }} />
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}
