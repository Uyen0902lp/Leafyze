import React from 'react';
import blogData from '@/data/blog-data';
import Image from 'next/image';
import Link from 'next/link';

import user from '@/assets/images/users/user-ava.jpg';
// import signature from '@/assets/images/blog/signature/signature.png';
import signature from '@/assets/images/blog/signature/sig.png';
import { Search } from '../svg';

const latest_post = blogData.slice(0, 2);

export default function BlogSidebar() {
    return (
        <div className="tp-sidebar-wrapper tp-sidebar-ml--24">
            <div className="tp-sidebar-widget mb-35">
                <div className="tp-sidebar-search">
                    <form action="#">
                        <div className="tp-sidebar-search-input">
                            <input type="text" placeholder="Search..." />
                            <button type="submit">
                                <Search />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* about  */}
            <div className="tp-sidebar-widget mb-35">
                <h3 className="tp-sidebar-widget-title">About me</h3>
                <div className="tp-sidebar-widget-content">
                    <div className="tp-sidebar-about">
                        <div className="tp-sidebar-about-thumb mb-25">
                            <a href="#">
                                <Image src={user} alt="user" />
                            </a>
                        </div>
                        <div className="tp-sidebar-about-content">
                            <h3 className="tp-sidebar-about-title">
                                <a href="#">Vu Thu Phuong</a>
                            </h3>
                            <span className="tp-sidebar-about-designation">Plant Enthusiast & Eco-Blogger</span>
                            <p>Passionate about sustainable practices that nurture plant health and promote a greener planet.</p>
                            <div className="tp-sidebar-about-signature">
                                <Image src={signature} alt="signature" width={120} height={60} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about end */}

            {/* latest post start */}
            <div className="tp-sidebar-widget mb-35">
                <h3 className="tp-sidebar-widget-title">Latest Posts</h3>
                <div className="tp-sidebar-widget-content">
                    <div className="tp-sidebar-blog-item-wrapper">
                        {latest_post.map(b => (
                            <div key={b.id} className="tp-sidebar-blog-item d-flex align-items-center">
                                <div className="tp-sidebar-blog-thumb">
                                    <Link href={`/blog-details/${b.id}`}>
                                        <Image src={b.img as string} alt="blog img" width={80} height={70} />
                                    </Link>
                                </div>
                                <div className="tp-sidebar-blog-content">
                                    <div className="tp-sidebar-blog-meta">
                                        <span>{b.date}</span>
                                    </div>
                                    <h3 className="tp-sidebar-blog-title">
                                        <Link href={`/blog-details/${b.id}`}>{b.title.slice(0, 30)}...</Link>
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* latest post end */}

            {/* categories start */}
            <div className="tp-sidebar-widget widget_categories mb-35">
                <h3 className="tp-sidebar-widget-title">Categories</h3>
                <div className="tp-sidebar-widget-content">
                    <ul>
                        <li><Link href="/blog">Plant Disease Diagnosis <span>(12)</span></Link></li>
                        <li><Link href="/blog">Organic Farming Techniques <span>(6)</span></Link></li>
                        <li><Link href="/blog">Natural Pest Control <span>(2)</span></Link></li>
                        <li><Link href="/blog">Eco-Friendly Gardening <span>(8)</span></Link></li>
                        <li><Link href="/blog">Sustainable Practices <span>(0)</span></Link></li>
                        <li><Link href="/blog">Soil & Fertilization <span>(3)</span></Link></li>
                    </ul>
                </div>
            </div>
            {/* categories end */}

            {/* tag cloud start */}
            <div className="tp-sidebar-widget mb-35">
                <h3 className="tp-sidebar-widget-title">Popular Tags</h3>
                <div className="tp-sidebar-widget-content tagcloud">
                    <a href="#">Plant Health</a>
                    <a href="#">Disease Prediction</a>
                    <a href="#">Organic Farming</a>
                    <a href="#">Sustainable Practices</a>
                    <a href="#">Eco-Friendly Living</a>
                    <a href="#">Biodiversity</a>
                </div>
            </div>
            {/* tag cloud end */}

        </div>
    )
}
