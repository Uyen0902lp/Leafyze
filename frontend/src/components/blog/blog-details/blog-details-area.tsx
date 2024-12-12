import React, { CSSProperties } from 'react';
import BlogSidebar from '../blog-sidebar';
import { Comments, Date, UserTwo } from '@/components/svg';
import BlogReplyForm from '@/components/form/blog-reply-form';
import BlogDetailsComments from './blog-details-comments';
import Image from 'next/image';
import { IBlogType } from '@/types/blog-type';

const imgStyle: CSSProperties = { width: '100%', height: 'auto' };

// type 
type IProps = {
    blog: IBlogType
}
export default function BlogDetailsArea({ blog }: IProps) {
    return (
        <section className="tp-postbox-details-area pb-120 pt-95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9">
                        <div className="tp-postbox-details-top">
                            <div className="tp-postbox-details-category">
                                <span>
                                    <a href="#">Beauty,</a>
                                </span>
                                <span>
                                    <a href="#">Trends</a>
                                </span>
                            </div>
                            <h3 className="tp-postbox-details-title">{blog.title}</h3>
                            <div className="tp-postbox-details-meta mb-50">
                                <span data-meta="author">
                                    <UserTwo />
                                    By <a href="#">TraoStudio</a>
                                </span>
                                <span>
                                    <Date />
                                    30 October, 2023
                                </span>
                                <span>
                                    <Comments />
                                    <a href="#">Comments (2)</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="tp-postbox-details-thumb">
                            <Image src="/assets/images/blog/details/big-blog-8.jpg" alt="blog-img" width={1200} height={600} style={imgStyle} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <div className="tp-postbox-details-main-wrapper">
                            <div className="tp-postbox-details-content">
                                <p className="tp-dropcap">The health of your plants is critical to the success of your crop and business. If you've never seen a truly skilled agronomist or plant health specialist at work, it seems almost effortless. They observe subtle signs, ask the right questions, identify potential issues, recommend treatments, and ensure plants stay resilient. Behind that expertise, however, are countless hours dedicated to studying plant health, disease patterns, and effective treatments to ensure every crop thrives.</p>

                                <p>One of the challenges that often surfaces when  working with a remote sales team is a lack of transparency over what is happening, and where in the process things are taking place. We’re going to peel back the curtain and show you how to create the best sales.</p>

                                <h4 className="tp-postbox-details-heading">Embracing Sustainable Farming: Growing Healthier Plants with Eco-Friendly Practices</h4>
                                <p>Healthy plants start with mindful care and sustainable practices. By understanding soil health, optimizing water use, and choosing natural treatments, we create an environment where plants can thrive. Sustainable farming not only supports plant resilience but also protects the ecosystem, paving the way for a greener, more abundant future.</p>

                                <div className="tp-postbox-details-desc-thumb text-center">
                                    <Image src="/assets/images/blog/details/big-blog-9.jpg" alt="blog-sm-mg" width={636} height={393} style={imgStyle} />
                                    <span className="tp-postbox-details-desc-thumb-caption">Sunrise Over Verdant Fields: A Tribute to Sustainable Agriculture and Nature's Beauty</span>
                                </div>
                                <p>"We’re thrilled to support you in promoting healthier crops and sustainable practices. Attached are the details of your custom treatment plan. Next, you’ll receive an email from our plant health specialist to schedule your initial consultation and discuss your specific needs. During this meeting, we’ll introduce our team, review the resources required, and outline the steps to help your plants thrive."</p>

                                <div className="tp-postbox-details-quote">
                                    <blockquote>
                                        <div className="tp-postbox-details-quote-shape">
                                            <Image className="tp-postbox-details-quote-shape-1" src="/assets/images/blog/details/shape/line.png" alt="line-img" width={792} height={200} style={imgStyle} />
                                            <Image className="tp-postbox-details-quote-shape-2" src="/assets/images/blog/details/shape/quote.png" alt="quote-img" width={100} height={74} />
                                        </div>
                                        <p>There is a way out of every box, a solution to every puzzle; it's just a matter of finding it.</p>
                                        <cite>Captain Jean-Luc Picard</cite>
                                    </blockquote>
                                </div>

                                <h4 className="tp-postbox-details-heading">Exploring the Beauty of Sustainable Landscapes</h4>
                                <p>Healthy soil and mindful care are the foundation of resilient crops. Through balanced nutrients, careful watering, and eco-friendly treatments, we create an environment where plants can grow strong. Embracing sustainable practices ensures not only healthier plants but also a healthier planet.</p>

                                <div className="tp-postbox-details-list">
                                    <ul>
                                        <li>Prioritize soil health with natural fertilizers and compost.</li>
                                        <li>Monitor plant growth regularly to detect early signs of disease.</li>
                                        <li>Choose eco-friendly treatments to protect both plants and the environment.</li>
                                    </ul>
                                </div>
                                <p>Healthy plant growth begins with a balanced approach. Providing the right nutrients, monitoring moisture levels, and using natural treatments support resilience against disease. By fostering a sustainable environment, we help plants thrive and contribute to a healthier ecosystem.</p>

                                <div className="tp-postbox-details-share-wrapper">
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-6">
                                            <div className="tp-postbox-details-tags tagcloud">
                                                <span>Tags:</span>
                                                <a href="#">Plant Care</a>
                                                <a href="#">Sustainability</a>
                                                <a href="#">Agriculture</a>
                                                <a href="#">Eco-Friendly Solutions</a>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6">
                                            <div className="tp-postbox-details-share text-md-end">
                                                <span>Share:</span>
                                                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                                                <a href="#"><i className="fa-brands fa-vimeo-v"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tp-postbox-details-author d-sm-flex align-items-start" data-bg-color="#F4F7F9">
                                    <div className="tp-postbox-details-author-thumb">
                                        <a href="#">
                                            <Image src="/assets/images/users/user-1.jpg" alt="user" width={90} height={90} />
                                        </a>
                                    </div>
                                    <div className="tp-postbox-details-author-content">
                                        <span>Written by</span>
                                        <h5 className="tp-postbox-details-author-title">
                                            <a href="#">Theodore Handle</a>
                                        </h5>
                                        <p>Through sustainable practices, we foster healthy plants and a greener future.</p>

                                        <div className="tp-postbox-details-author-social">
                                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                                            <a href="#"><i className="fa-brands fa-vimeo-v"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="tp-postbox-details-comment-wrapper">
                                    <h3 className="tp-postbox-details-comment-title">Comments (2)</h3>

                                    <div className="tp-postbox-details-comment-inner">
                                        {/* comment start */}
                                        <BlogDetailsComments />
                                        {/* comment end */}
                                    </div>
                                </div>

                                <div className="tp-postbox-details-form">
                                    <h3 className="tp-postbox-details-form-title">Leave a Reply</h3>
                                    <p>Your email address will not be published. Required fields are marked *</p>

                                    <div className="tp-postbox-details-form-wrapper">
                                        {/* form start */}
                                        <BlogReplyForm />
                                        {/* form end */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </section>
    )
}
