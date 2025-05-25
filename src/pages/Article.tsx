
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleContent from '@/components/blog/ArticleContent';
import PostCard from '@/components/blog/PostCard';
import CommentsSection from '@/components/blog/CommentsSection';
import ArticleRating from '@/components/blog/ArticleRating';
import SocialShare from '@/components/blog/SocialShare';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Sample article data
const ARTICLES = [
  {
    id: "1",
    title: "The Future of Web Development: What's Next in 2025",
    content: `
      <p>The web development landscape continues to evolve at a breathtaking pace. As we look ahead to 2025 and beyond, several emerging trends and technologies are poised to reshape how we build for the web.</p>
      
      <h2>WebAssembly Goes Mainstream</h2>
      <p>WebAssembly (Wasm) has been gaining traction for years, but by 2025, expect it to become a standard part of web development workflows. With near-native performance, Wasm is enabling complex applications previously impossible in browsers, from advanced graphics processing to machine learning models running client-side.</p>
      
      <p>Major frameworks are already integrating WebAssembly support, and we're seeing more languages targeting Wasm as a compilation target. This trend opens the door for developers to use languages like Rust, C++, and Go directly in web applications while maintaining performance.</p>
      
      <h2>AI-Assisted Development</h2>
      <p>AI-powered development tools are dramatically changing how we write code. From intelligent code completion to automated testing and even AI pair programming, these tools are becoming sophisticated enough to handle increasingly complex tasks.</p>
      
      <p>By 2025, expect your IDE to not just autocomplete functions but to suggest entire implementation approaches, identify potential bugs before runtime, and even explain unfamiliar code in natural language. These tools won't replace developers but will significantly enhance productivity and code quality.</p>
      
      <h2>Edge Computing Revolution</h2>
      <p>The boundary between frontend and backend continues to blur with the rise of edge computing platforms. Instead of running code on centralized servers or purely in the client's browser, more application logic is moving to edge nodes distributed globally.</p>
      
      <p>This architecture provides the security and consistent execution of server-side rendering with the low latency and resilience of distributed systems. Frameworks that seamlessly deploy to the edge will become the default choice for new projects.</p>
      
      <h2>Component-Based Design Systems</h2>
      <p>The component revolution that began with React and Vue has evolved into comprehensive design systems that span organizations. By 2025, expect most companies to maintain platform-agnostic component libraries that can be shared across web, mobile, and desktop applications.</p>
      
      <p>These systems will increasingly include not just UI components but also built-in accessibility, internationalization, and theming capabilities out of the box. The goal is to allow developers and designers to focus on product experiences rather than reimplementing common patterns.</p>
      
      <h2>Conclusion</h2>
      <p>The web platform continues to mature in exciting ways. As these trends converge, we'll see web applications that rival native experiences in performance while maintaining the web's unique advantages of accessibility and instant updates. For developers, staying adaptable and continuing to learn will be more important than ever in this rapidly evolving landscape.</p>
    `,
    author: "Eya Zidi",
    date: "2025-05-01",
    readTime: "6 min read",
    categories: ["Technology", "Web Development"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "2",
    title: "Designing for Accessibility: Best Practices for Inclusive UX",
    content: `
      <p>Creating accessible web experiences isn't just a legal requirement or moral obligation—it's good business sense and results in better products for all users. This guide explores key principles and best practices for designing with accessibility in mind.</p>
      
      <h2>Understanding Accessibility Basics</h2>
      <p>Web accessibility means designing and developing websites and applications that people with disabilities can use effectively. This includes individuals with visual, auditory, motor, or cognitive impairments. The Web Content Accessibility Guidelines (WCAG) provide a framework with three levels of conformance: A, AA, and AAA.</p>
      
      <p>Most organizations should aim for at least WCAG 2.1 AA compliance, which covers the major accessibility concerns without requiring extraordinary measures that might fundamentally alter the nature of content.</p>
      
      <h2>Design With Keyboard Navigation in Mind</h2>
      <p>Many users with motor impairments rely on keyboards rather than mice or touchscreens. Others may use specialized input devices that simulate keyboard input. Ensuring your interface works well with keyboard navigation is fundamental to accessibility.</p>
      
      <p>Key considerations include:</p>
      <ul>
        <li>Logical tab order that follows the visual flow of the page</li>
        <li>Visible focus indicators that clearly show which element is currently selected</li>
        <li>No keyboard traps where users can navigate into an element but not out of it</li>
        <li>Accessible custom components like dropdown menus and modal dialogs</li>
      </ul>
      
      <h2>Provide Adequate Color Contrast</h2>
      <p>Color contrast is critical for users with low vision or color blindness. Text should have a contrast ratio of at least 4.5:1 against its background for normal text and 3:1 for large text (18pt or 14pt bold). UI components and graphical objects should also maintain a 3:1 contrast ratio with adjacent colors.</p>
      
      <p>Never rely solely on color to convey information. Always pair color differences with text labels, patterns, or icons to ensure information is accessible to everyone regardless of their color perception.</p>
      
      <h2>Design Responsive Layouts</h2>
      <p>Responsive design benefits users with low vision who may need to zoom into content. When designing layouts:</p>
      <ul>
        <li>Ensure text remains readable when zoomed up to 200%</li>
        <li>Maintain functionality when screens are resized</li>
        <li>Use relative units (em, rem) rather than fixed pixels for text</li>
        <li>Test with screen magnification tools</li>
      </ul>
      
      <h2>Write Clear, Concise Content</h2>
      <p>Straightforward language benefits everyone but is particularly important for users with cognitive disabilities. Content should be:</p>
      <ul>
        <li>Organized with clear headings and subheadings</li>
        <li>Written in plain language without unnecessary jargon</li>
        <li>Broken into digestible chunks with adequate whitespace</li>
        <li>Supplemented with images, diagrams, or videos when appropriate</li>
      </ul>
      
      <h2>Test With Real Users</h2>
      <p>While automated tools can catch many accessibility issues, nothing replaces testing with actual users who have disabilities. Consider including users with different disabilities in your user testing sessions and gathering their feedback about their experiences.</p>
      
      <h2>Conclusion</h2>
      <p>Accessibility shouldn't be an afterthought or a checkbox exercise—it should be integrated into your design process from the beginning. By adopting these best practices, you'll create more inclusive products that work better for everyone, not just users with disabilities.</p>
    `,
    author: "Eya Zidi",
    date: "2025-04-28",
    readTime: "8 min read",
    categories: ["Design", "Accessibility"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "3",
    title: "The Rise of AI-Powered Content Creation Tools",
    content: `
      <p>Artificial intelligence is transforming how we create, edit, and distribute content across industries. From writing assistants to image generators, AI tools are changing the creative landscape at a breathtaking pace.</p>
      
      <h2>Text Generation and Enhancement</h2>
      <p>Large language models (LLMs) have advanced dramatically in recent years. These AI systems can now generate remarkably coherent and contextually appropriate text for a variety of purposes:</p>
      
      <ul>
        <li><strong>Content drafting:</strong> Creating first drafts of articles, marketing copy, and social media posts</li>
        <li><strong>Creative writing:</strong> Assisting with storytelling, dialogue, and creative prompts</li>
        <li><strong>Editing assistance:</strong> Suggesting improvements for clarity, tone, and style</li>
        <li><strong>Summarization:</strong> Condensing long-form content into concise summaries</li>
      </ul>
      
      <p>While these tools don't replace human creativity, they can significantly speed up content production workflows and help overcome writer's block.</p>
      
      <h2>Visual Content Creation</h2>
      <p>AI image generators have made astonishing progress. Tools using diffusion models can create photorealistic images from text descriptions, offering new possibilities for designers and marketers:</p>
      
      <ul>
        <li><strong>Custom illustrations:</strong> Creating unique images based on specific requirements</li>
        <li><strong>Product visualization:</strong> Rendering product concepts without expensive photography</li>
        <li><strong>Design variations:</strong> Quickly generating multiple versions of visual assets</li>
        <li><strong>Style transfer:</strong> Applying artistic styles to existing images</li>
      </ul>
      
      <p>These tools are particularly valuable for teams without dedicated design resources or for rapid prototyping before investing in final assets.</p>
      
      <h2>Audio and Video Production</h2>
      <p>AI is also transforming audio and video content:</p>
      
      <ul>
        <li><strong>Voice synthesis:</strong> Creating natural-sounding voiceovers for videos and podcasts</li>
        <li><strong>Audio enhancement:</strong> Removing background noise and improving audio quality</li>
        <li><strong>Video editing:</strong> Automating clip selection and transitions based on content</li>
        <li><strong>Translation and dubbing:</strong> Creating localized content in multiple languages</li>
      </ul>
      
      <h2>Ethical Considerations</h2>
      <p>The rise of AI content tools brings important ethical questions:</p>
      
      <ul>
        <li><strong>Attribution:</strong> How should AI contributions be credited?</li>
        <li><strong>Copyright:</strong> Who owns content created with AI assistance?</li>
        <li><strong>Authenticity:</strong> How should AI-generated content be disclosed to audiences?</li>
        <li><strong>Bias:</strong> How can we prevent AI systems from perpetuating harmful stereotypes?</li>
      </ul>
      
      <p>These questions don't have simple answers, but responsible use requires considering them carefully.</p>
      
      <h2>The Future of Creative Work</h2>
      <p>Rather than replacing human creators, AI tools are evolving into sophisticated creative partners. The most successful content strategies will likely combine human creativity, judgment, and emotional intelligence with AI's speed and computational abilities.</p>
      
      <p>The creative professionals who thrive will be those who learn to effectively collaborate with AI tools—using them to handle routine aspects of content creation while focusing their human efforts on strategy, emotional connection, and original thinking.</p>
    `,
    author: "Eya Zidi",
    date: "2025-04-22",
    readTime: "5 min read",
    categories: ["AI", "Content"],
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80"
  }
];

// Sample related posts data (simplified version for demo)
const RELATED_POSTS = [
  {
    id: "4",
    title: "How to Build a Successful Remote Work Culture",
    excerpt: "Strategies for maintaining team cohesion, productivity, and employee satisfaction in distributed teams and remote work environments.",
    author: "Eya Zidi",
    date: "2025-04-15",
    readTime: "7 min read",
    categories: ["Business", "Remote Work"],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "5",
    title: "Understanding Web3 and the Decentralized Internet",
    excerpt: "A beginner's guide to Web3 technologies, blockchain applications, and how decentralized systems are changing online interactions.",
    author: "Eya Zidi",
    date: "2025-04-10",
    readTime: "9 min read",
    categories: ["Technology", "Blockchain"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "6",
    title: "The Psychology of Color in Digital Design",
    excerpt: "How color choices affect user perception, emotions, and behavior, with practical tips for effective color schemes in your designs.",
    author: "Eya Zidi",
    date: "2025-04-05",
    readTime: "6 min read",
    categories: ["Design", "Psychology"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
  }
];

const Article = () => {
  const { id } = useParams();
  const article = ARTICLES.find(article => article.id === id);
  
  if (!article) {
    return (
      <div className="blog-container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-blog-accent hover:bg-blog-highlight">
          <Link to="/articles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="pb-12">
      {/* Back navigation */}
      <div className="blog-container pt-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/articles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Articles
          </Link>
        </Button>
      </div>
      
      {/* Article content */}
      <ArticleContent article={article} />
      
      {/* Social sharing */}
      <div className="blog-container">
        <SocialShare title={article.title} />
      </div>
      
      {/* Article rating */}
      <div className="blog-container">
        <ArticleRating articleId={article.id} />
      </div>
      
      {/* Comments section */}
      <div className="blog-container">
        <CommentsSection articleId={article.id} />
      </div>
      
      {/* Related articles */}
      <section className="blog-container mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RELATED_POSTS.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Article;
