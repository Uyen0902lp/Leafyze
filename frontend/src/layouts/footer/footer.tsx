import React from 'react';
import Image from 'next/image';
import { Email, Location } from '@/components/svg';
import logo from '@/assets/images/logo/logo.svg';
import logo_tomato from "@/assets/images/logo/logo-tomato.svg";
import pay from '@/assets/images/footer/footer-pay-2.png';
import image from '@/assets/images/footer/img.png';
import Link from 'next/link';

type IProps = {
    clr?: string
}
export default function Footer({ clr = '#f4f7f9' }: IProps) {
    return (
        <footer>
            <div className="tp-footer-area tp-footer-style-2 tp-footer-style-5" style={{ backgroundColor: clr }}>
                <div className="tp-footer-top pt-95 pb-45">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                                <div className="tp-footer-widget footer-col-1 mb-50">
                                    <div className="tp-footer-widget-content">
                                        <div className="tp-footer-logo">
                                            <Link href="/">
                                                <Image src={logo_tomato} alt="logo" />
                                            </Link>
                                        </div>
                                        <p className="tp-footer-desc">Leafyze is here with diagnosis and treatment solutions to help you manage and nurture your garden effortlessly.</p>
                                        <div className="tp-footer-social">
                                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="tp-footer-widget footer-col-2 mb-50">
                                    <h4 className="tp-footer-widget-title">My Account</h4>
                                    <div className="tp-footer-widget-content">
                                        <ul>
                                            <li><a href="/wishlist">Wishlist</a></li>
                                            <li><a href="/detect">Diagnose</a></li>
                                            {/* <li><a href="#">Track Orders</a></li> */}
                                            {/* <li><a href="#">My Account</a></li> */}
                                            {/* <li><a href="#">Order History</a></li> */}
                                            <li><a href="/history">Prediction History</a></li>
                                            {/* <li><a href="#">Returns</a></li> */}
                                            <li><a href="/pathology">Pathology</a></li>
                                            <li><a href="/analytics">Analytics</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                <div className="tp-footer-widget footer-col-3 mb-50">
                                    <h4 className="tp-footer-widget-title">Infomation</h4>
                                    <div className="tp-footer-widget-content">
                                        <ul>
                                            <li><a href="/about">Our Story</a></li>
                                            {/* <li><a href="#">Careers</a></li> */}
                                            {/* <li><a href="#">Privacy Policy</a></li> */}
                                            {/* <li><a href="#">Terms & Conditions</a></li> */}
                                            <li><a href="/blog">Latest News</a></li>
                                            <li><a href="/contact">Contact Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                <div className="tp-footer-widget footer-col-4 mb-50">
                                    <h4 className="tp-footer-widget-title">Talk To Us</h4>
                                    <div className="tp-footer-widget-content">
                                        <div className="tp-footer-talk mb-20">
                                            <span>Got Questions? Call us</span>
                                            <h4><a href="tel:670-413-90-762">+84 413 90 762</a></h4>
                                        </div>
                                        <div className="tp-footer-contact">
                                            <div className="tp-footer-contact-item d-flex align-items-start">
                                                <div className="tp-footer-contact-icon">
                                                    <span>
                                                        <Email />
                                                    </span>
                                                </div>
                                                <div className="tp-footer-contact-content">
                                                    <p><a href="mailto:leafyze@gmail.com">leafyze@gmail.com</a></p>
                                                </div>
                                            </div>
                                            <div className="tp-footer-contact-item d-flex align-items-start">
                                                <div className="tp-footer-contact-icon">
                                                    <span>
                                                        <Location />
                                                    </span>
                                                </div>
                                                <div className="tp-footer-contact-content">
                                                    <p><a href="https://www.google.com/maps/place/1160+%C4%90.+L%C3%A1ng,+L%C3%A1ng+Th%C6%B0%E1%BB%A3ng,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i+100000,+Vi%E1%BB%87t+Nam/@21.0263868,105.7968971,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab4483d21b81:0xda4affec15a92e95!8m2!3d21.0263818!4d105.799472!16s%2Fg%2F11kqclvngj?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D" target="_blank">Lang St. <br /> Dong Da, Ha Noi, Viet Nam</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tp-footer-bottom">
                    <div className="container">
                        <div className="tp-footer-bottom-wrapper">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <div className="tp-footer-copyright">
                                        <p>© {new Date().getFullYear()} All Rights Reserved </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tp-footer-payment text-md-end">
                                        <p>
                                            <Image src={image} alt="image-declaration" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
